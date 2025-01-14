<script>
	/** @type {{ task: import('$lib/states/board-state.svelte').Task }} */
	let { task } = $props();
</script>

<div class="card w-full border border-surface-500 bg-surface-600 p-4 shadow">
	<p class="font-medium">{task.name}</p>
</div>
