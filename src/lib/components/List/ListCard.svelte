<script>
	import ListDropdown from '$lib/components/List/ListDropdown.svelte';
	import { CSS, SortableContext, styleObjectToString, useSortable } from 'svelte-dnd-kit';
	import AddTaskButton from '../Task/AddTaskButton.svelte';
	import TaskCard from '../Task/TaskCard.svelte';

	/** @type {{ list: import('$lib/states/board-state.svelte').List }} */
	let { list, isOverlay } = $props();

	let listCardEl = $state(null);

	const { attributes, listeners, node, transform, transition, isDragging, isSorting } = useSortable(
		{
			id: `list-${list.id}`,
			data: { type: 'list', accepts: ['task'] }
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

<div class="relative h-full max-h-full select-none" bind:this={node.current} {style}>
	<div
		class="card flex max-h-full w-72 flex-col bg-surface-800"
		class:rotate-3={isOverlay}
		class:hidden={isDragging.current}
		bind:this={listCardEl}
	>
		<div class="flex flex-shrink-0 items-center justify-between">
			<p class="flex-grow py-4 pl-5 font-medium" {...listeners.current} {...attributes.current}>
				{list.name}
			</p>
			{#if !list.tasks || list.tasks.length === 0}
				<ListDropdown listId={list.id} />
			{/if}
		</div>

		<div
			bind:this={taskWrapperEl}
			class="scrollbar scrollbar-thin scrollbar-thumb-surface-500 scrollbar-track-transparent mr-1 flex-grow overflow-y-auto px-3 pr-2"
			style="max-height: calc(100vh - 19rem);"
		>
			<div class="flex flex-col gap-3">
				<SortableContext items={list.tasks.map((t) => `task-${t.id}`)}>
					{#each list.tasks as task (task.id)}
						<TaskCard {task} />
					{/each}
				</SortableContext>
			</div>
		</div>

		<div class="m-3" class:mt-0={list.tasks?.length === 0}>
			<AddTaskButton lastOrder={list.tasks?.[list.tasks.length - 1]?.order ?? 0} listId={list.id} />
		</div>
	</div>

	<!-- Drag placeholder - set to match original dimensions -->
	{#if isDragging.current}
		<div
			class="card w-72 flex-shrink-0 bg-surface-800/50"
			style="height: {listCardEl?.clientHeight}px"
		></div>
	{/if}
</div>
