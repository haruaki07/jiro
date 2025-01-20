<script>
	import ListDropdown from '$lib/components/List/ListDropdown.svelte';
	import { CSS, SortableContext, styleObjectToString, useSortable } from 'svelte-dnd-kit';
	import AddTaskButton from '../Task/AddTaskButton.svelte';
	import TaskCard from '../Task/TaskCard.svelte';
	import ListName from './ListName.svelte';

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

<div class="relative h-full select-none" bind:this={node.current} {style}>
	<div
		class="card flex max-h-full w-72 flex-col bg-surface-800"
		class:rotate-3={isOverlay}
		class:hidden={isDragging.current}
		bind:this={listCardEl}
	>
		<div class="flex flex-shrink-0 items-center justify-between">
			<ListName {...listeners.current} {...attributes.current} {list} />
			{#if !list.tasks || list.tasks.length === 0}
				<ListDropdown listId={list.id} />
			{/if}
		</div>

		<div
			class={[
				'scrollbar scrollbar-thin scrollbar-track-transparent scrollbar-thumb-surface-500',
				'mr-1 flex flex-1 flex-col gap-3 overflow-y-auto px-3 pr-2'
			]}
		>
			<SortableContext items={list.tasks.map((t) => `task-${t.id}`)}>
				{#each list.tasks as task (task.id)}
					<TaskCard {task} />
				{/each}
			</SortableContext>
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
