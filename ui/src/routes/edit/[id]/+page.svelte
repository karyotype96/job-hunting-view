<script lang="ts">
    import AppContainer from '$lib/components/AppContainer.svelte';
    import { recordStore } from '$lib/components/global/globalState.svelte';
    import { Accepted, Applied, Rejected } from '$lib/utils/record';

    let { data } = $props();

    let record = $state({...data})
    let formAction = (record.id == -1) ? "create" : "update";
</script>

<AppContainer menuIndex=3>
    {#if recordStore.loading}
    <h3><i class='notched circle loading icon'></i>Loading data...</h3>
    {:else}
    <form class='ui form' method='POST' action="?/{formAction}">
        <div class='field'>
            <label>Company Name: 
            <input
                name='companyName'
                class='half-size'
                placeholder="Enter the name of the company here..."
                required
                bind:value={record.companyName}
            ></label>
        </div>

        <div class='field'>
            <label>Application Status:
                <select name='status' class='half-size' bind:value={record.status}>
                    <option value={Applied}>Applied</option>
                    <option value={Rejected}>Rejected</option>
                    <option value={Accepted}>Accepted</option>
                </select>
            </label>
        </div>

        <div class='field'>
            <label>Application Date: 
                <input required name='timeApplied' class='half-size' type='date' bind:value={record.timeApplied}>
            </label>
        </div>

        <button type='submit' class='ui button green'>Submit</button>
    </form>
    {/if}
</AppContainer>

<style>
    .half-size {
        width: 50%;
    }
</style>