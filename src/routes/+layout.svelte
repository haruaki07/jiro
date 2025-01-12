<script>
	import AppBar from '$lib/components/AppBar/AppBar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<AppBar />
<div class="container mx-auto p-4">
	{@render children()}
</div>
