<script lang="ts">
    import { Accepted, Applied, Rejected } from "$lib/utils/record";
    import { onMount } from "svelte";
    import _ from "lodash";
    import AppContainer from "$lib/components/AppContainer.svelte";
    import { recordStore, loadRecords } from "$lib/components/global/globalState.svelte";
    import { dateToLocaleString, dateToString, diffMonths } from "$lib/utils/helpers";

    let filterValue = $state('');

    onMount(async () => {
        await loadRecords();
    });
</script>

<AppContainer menuIndex=1>
    {#if recordStore.loading}
    <h3><i class='notched circle loading icon'></i>Loading data...</h3>
    {:else}

    <table class='ui celled table'>
        <thead>
            <tr>
                <th colspan=4>
                    <div class='ui left icon input'>
                        <i class='search icon'></i>
                        <input type='text' placeholder="Filter by title..." bind:value={filterValue}>
                    </div>
                </th>
            </tr>
            <tr>
                <th>Company Name</th>
                <th>Application Date</th>
                <th>Status</th>
                <th>Edit/Delete</th>
            </tr>
        </thead>
        <tbody>
        {#each recordStore.records as rec}
            {#if rec.companyName.includes(filterValue)}
                <tr>
                    <td>{rec.companyName}</td>
                    <td>{dateToLocaleString(rec.timeApplied)}</td>
                    {#if rec.status == Applied}
                        {#if diffMonths(new Date(), rec.timeApplied) > 1}
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
                        <a href='/edit/{rec.id}' aria-label='Edit record'><i class='edit icon'></i></a>
                        <i class='eraser icon'></i>
                    </td>
                </tr>
            {/if}
        {/each}
        </tbody>
    </table>
    {/if}
</AppContainer>