<script lang="ts">
    import type IRecord from "$lib/utils/record";
    import { Accepted, Applied, Rejected } from "$lib/utils/record";
    import { onMount } from "svelte";
    import _ from "lodash";
    import moment from "moment";
    import AppContainer from "$lib/components/AppContainer.svelte";

    let recordStore = $state({
        loading: true,
        records: new Array<IRecord>(),
        currentRecordID: -1,
    });

    onMount(async () => {
        recordStore.loading = true;

        try {
            const response = await fetch("http://localhost:4001/api/records");
            if (!response.ok){
                return;
            }
            const data = await response.json();

            _.forEach(data["data"], (rec) => {
                let newRecord: IRecord = {
                    id: rec.id,
                    companyName: rec.companyName,
                    status: rec.status,
                    timeApplied: moment(rec.timeApplied)
                }

                recordStore.records.push(newRecord);
            })
        } catch (err) {
            // error(err);
        } finally {
            recordStore.loading = false;
        }
    });
</script>

<AppContainer menuIndex=1>
    {#if recordStore.loading}
    <h3><i class='notched circle loading icon'></i>Loading data...</h3>
    {:else}
    <table class='ui celled table'>
        <thead>
            <tr>
                <th>Company Name</th>
                <th>Application Date</th>
                <th>Status</th>
                <th>Edit/Delete</th>
            </tr>
        </thead>
        <tbody>
        {#each recordStore.records as rec}
            <tr>
                <td>{rec.companyName}</td>
                <td>{rec.timeApplied.format("MM/DD/YYYY")}</td>
                {#if rec.status == Applied}
                    {#if moment().diff(rec.timeApplied, 'months', true) > 1}
                        <td class='disabled'>Ghosted...</td>
                    {:else}
                        <td>Applied</td>
                    {/if}
                {:else if rec.status == Rejected}
                    <td class='negative'>Rejected</td>
                {:else if rec.status == Accepted}
                    <td class='positive'>Accepted!</td>
                {:else}
                    <td class='warning'>error: status</td>
                {/if}
                <td>
                    <i class='edit icon'></i>
                    <i class='eraser icon'></i>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
    {/if}
</AppContainer>