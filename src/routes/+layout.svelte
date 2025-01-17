<script>
	import AppBar from '$lib/components/AppBar/AppBar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<AppBar />
<div class="container mx-auto min-h-0 flex-grow p-4">
	{@render children()}
</div>
