<script lang="ts">
    import _ from "lodash";

    let { labels, data, colors, total } = $props();

    let widthPercent = $derived((100 / data.length) * 0.9);
</script>

<table class='ui celled table'>
    <tbody>
        <tr>
            {#each data as d, i}
            <td class='bar-holder' style="width: {widthPercent}">
                <div class='bar {labels[i]}' style="background: {colors[i]}; height: {d * 100 / total}%;"></div>
            </td>
            {#if i < data.length-1}
            <td class='graph-gap'></td>
            {/if}
            {/each}
        </tr>
        <tr>
            {#each data as d, i}
            <td class='graph-label' style="color: {colors[i]}">{labels[i]}</td>
            {#if i < data.length-1}
            <td class='graph-gap'></td>
            {/if}
            {/each}
        </tr>
    </tbody>
</table>

<style>
    .bar-holder {
        height: 400px;
        border-bottom: 1px solid rgba(34,36,38,.15);
        position: relative;
        background-color: rgb(243, 243, 243);
    }

    .bar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .graph-label {
        text-align: center !important;
    }
</style>