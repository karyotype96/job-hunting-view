<script lang="ts">
    import type IRecord from "$lib/utils/record";
    import { onMount } from "svelte";
    import _ from "lodash";
    import { Accepted, Applied, Rejected } from "$lib/utils/record";
    import { loadRecords, recordStore } from "$lib/components/global/globalState.svelte";
    import AppContainer from "$lib/components/AppContainer.svelte";
    import moment from "moment";
    import BarChart from "$lib/components/BarChart.svelte";
    import { diffMonths } from "$lib/utils/helpers";

    let totals = $state({
        applied: 0,
        ghosted: 0,
        rejected: 0,
        accepted: 0
    });

    let data = $derived([totals.applied, totals.ghosted, totals.rejected, totals.accepted]);
    let total = $derived(totals.applied + totals.ghosted + totals.rejected + totals.accepted);

    onMount(async () => {
        await loadRecords();
        recordStore.loading = true;

        recordStore.records.forEach(rec => {
            if (rec.status == Applied){
                if (diffMonths(new Date(), rec.timeApplied) > 1){
                    totals.ghosted += 1;
                } else {
                    totals.applied += 1;
                }
            } else if (rec.status == Rejected){
                totals.rejected += 1;
            } else if (rec.status == Accepted){
                totals.accepted += 1;
            }
        });

        recordStore.loading = false;
    });

    $inspect(totals);
</script>

<AppContainer menuIndex=2>
    {#if recordStore.loading}
    <h3><i class='notched circle loading icon'></i>Loading data...</h3>
    {:else}
    <table class='ui celled table'>
        <thead>
            <tr>
                <th style='width: 75%'>Chart</th>
                <th>Statuses</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <BarChart 
                        labels={['Applied', 'Ghosted', 'Rejected', 'Accepted']}
                        {data}
                        colors={[
                            'rgb(71, 166, 255)',
                            'rgb(60, 83, 105)',
                            'rgb(176, 4, 4)',
                            'rgb(0, 255, 0)'
                        ]}
                        {total}
                    />
                </td>
                <td></td>
            </tr>
        </tbody>
    </table>
    {/if}
</AppContainer>