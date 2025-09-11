<script lang="ts">
	import 'semantic-ui-css/semantic.min.css';
	import favicon from '$lib/assets/favicon.svg';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class='ui container' style='margin-top: 20px;'>
	<h2 class='ui header'>Job Hunting View</h2>

	<div class='ui top attached tabular menu'>
		<a class='active item' href='/'>Main Page</a>
		<a class='item' href='/'>Statistics</a>
		<a class='item' href='/'>Add New Job Record</a>
	</div>

	<div class='ui bottom attached segment'>
		{@render children?.()}
	</div>

</div>