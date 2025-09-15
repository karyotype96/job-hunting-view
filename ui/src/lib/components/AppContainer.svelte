<script lang="ts">
    let { menuIndex, children } = $props();

    let menuLabels = [
        ['Main Page', '/'],
        ['Statistics', '/statistics'],
        ['Add New Job Record', '/edit/new']
    ]
</script>

<div class='ui container' style='margin-top: 20px;'>
    <h2 class='ui header'>Job Hunting View</h2>

    <div class='ui top attached tabular menu'>
        {#each menuLabels as label, i}
            <a class={menuIndex == i+1 ? 'active item' : 'item'} href={label[1]}>{label[0]}</a>
        {/each}
    </div>

    <!-- svelte-ignore slot_element_deprecated -->
    <div class='ui bottom attached segment'>
        {@render children?.()}
    </div>
</div>

<style>
    .ui.bottom.attached.segment {
        max-height: 80vh;
        overflow-y: scroll;
    }
</style>