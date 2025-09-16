<script lang="ts">
    import { Accepted, Applied, Rejected } from "$lib/utils/record";
    import { onMount } from "svelte";
    import _ from "lodash";
    import AppContainer from "$lib/components/AppContainer.svelte";
    import { recordStore, loadRecords } from "$lib/components/global/globalState.svelte";
    import { dateToLocaleString, diffMonths } from "$lib/utils/helpers";

    let filterValue = $state('');

    onMount(async () => {
        await loadRecords();
    });

    async function deleteRecord(id: number){
        let isDeleted = confirm("Delete this company? Warning: this can not be undone!");

        if (isDeleted){
            const requestOptions = {
                method: 'DELETE',
            };

            recordStore.loading = true;
            fetch(`http://localhost:4001/api/records/${id}`, requestOptions).then(async response => {
                await loadRecords();
            })
        }
    }
</script>

<AppContainer menuIndex=1>
    {#if recordStore.loading}
    <h3><i class='notched circle loading icon'></i>Loading data...</h3>
    {:else}

    <table class='ui celled table'>
        <thead>
            <tr>
                <th colspan=5 style='position: sticky; top: 0;'>
                    <div class='ui left icon input'>
                        <i class='search icon'></i>
                        <input type='text' placeholder="Filter by title..." bind:value={filterValue}>
                    </div>
                </th>
            </tr>
            <tr>
                <th style='position: sticky; top: 64px;'>Company Name</th>
                <th style='position: sticky; top: 64px;'>Job Title</th>
                <th style='position: sticky; top: 64px;'>Application Date</th>
                <th style='position: sticky; top: 64px;'>Status</th>
                <th style='position: sticky; top: 64px; text-align: center'>Edit/Delete</th>
            </tr>
        </thead>
        <tbody>
        {#each recordStore.records as rec}
            {#if rec.companyName.includes(filterValue)}
                <tr>
                    <td>{rec.companyName}</td>
                    <td>{rec.jobTitle}</td>
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
                    <td style='text-align: center'>
                        <a href='/edit/{rec.id}' aria-label='Edit record'><i class='large edit icon'></i></a>
                        <a href='#top' aria-label='Delete record' onclick={() => {deleteRecord(rec.id)}}><i class='large eraser icon'></i></a>
                    </td>
                </tr>
            {/if}
        {/each}
        </tbody>
    </table>
    {/if}
</AppContainer>