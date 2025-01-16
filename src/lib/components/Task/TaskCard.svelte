<script>
	import { CSS, styleObjectToString, useSortable } from 'svelte-dnd-kit';

	/** @type {{ task: import('$lib/states/board-state.svelte').Task }} */
	let { task, isOverlay } = $props();

	/** @type {HTMLDivElement | null} */
	let taskCardEl = $state(null);
	let cardHeight = $state(0);

	const { attributes, listeners, node, transform, transition, isDragging, isSorting } = useSortable(
		{
			id: `task-${task.id}`,
			data: { type: 'task' }
		}
	);

	const style = $derived(
		styleObjectToString({
			transform: CSS.Translate.toString(transform.current),
			transition: isSorting.current ? transition.current : undefined,
			zIndex: isDragging.current ? 1 : undefined
		})
	);
</script>

<div class="relative select-none" bind:this={node.current} {style}>
	<div
		bind:this={taskCardEl}
		class="card w-full cursor-pointer border border-surface-500 bg-surface-600 p-4 shadow ring-inset hover:ring-2 hover:ring-surface-200"
		class:invisible={isDragging.current}
		class:rotate-3={isOverlay}
		class:!ring-0={isOverlay}
		{...listeners.current}
		{...attributes.current}
	>
		<p class="font-medium">{task.name}</p>
	</div>

	{#if isDragging.current}
		<div class="card absolute inset-0 w-full bg-surface-600/50 shadow"></div>
	{/if}
</div>
