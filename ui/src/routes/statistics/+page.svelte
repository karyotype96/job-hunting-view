<script lang="ts">
    import type IRecord from "$lib/utils/record";
    import { onMount } from "svelte";
    import _ from "lodash";
    import { Accepted, Applied, Rejected } from "$lib/utils/record";
    import { loadRecords, recordStore } from "$lib/components/global/globalState.svelte";
    import AppContainer from "$lib/components/AppContainer.svelte";

    onMount(async () => {
        await loadRecords();
    })
</script>

<AppContainer menuIndex=2>
    {#if recordStore.loading}
    <h3><i class='notched circle loading icon'></i>Loading data...</h3>
    {:else}
    <table class='ui celled table'>
        <thead>
            <tr>
                <th style='width: 80%'>Chart</th>
                <th>Statuses</th>
            </tr>
        </thead>
    </table>
    {/if}
</AppContainer>