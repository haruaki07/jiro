<script>
	import BoardPropertiesButton from '$lib/components/Board/BoardPropertiesButton.svelte';
	import AddListButton from '$lib/components/List/AddListButton.svelte';
	import ListCard from '$lib/components/List/ListCard.svelte';
	import { arrayMove, DndContext, DragOverlay, SortableContext } from 'svelte-dnd-kit';
	import TaskCard from '../Task/TaskCard.svelte';
	import BoardName from './BoardName.svelte';
	import { dropAnimation, sensors } from './dnd';
	import Droppable from './Droppable.svelte';
	import { getNewOrder } from '$lib/utils';

	/** @type {{ board: import('$lib/states/board-state.svelte').Board }} */
	let { board } = $props();

	let activeId = $state(null);
	let activeType = $state(null);
	let activeItem = $state(null);

	const getId = (id) => +id.split('-')[1];

	const findContainer = (id) => {
		let index = null;
		const [type, _id] = id.split('-');

		if (type === 'task') {
			index = board.lists.findIndex((list) => list.tasks.some((task) => task.id == _id));
		} else if (type === 'list') {
			index = board.lists.findIndex((list) => list.id == _id);
		}

		return index !== -1 ? board.lists[index] : null;
	};

	function getTypeAndAccepts(active, over) {
		const activeType = active.data?.type;
		const overType = over?.data?.type;
		const acceptsTask = over?.data?.accepts?.includes('task');
		const acceptsList = over?.data?.accepts?.includes('list');
		return { activeType, overType, acceptsTask, acceptsList };
	}

	function handleDragStart(event) {
		activeId = event.active.id;
		activeType = event.active.data?.type;

		const container = findContainer(activeId);

		if (activeType === 'list') {
			activeItem = container;
		} else {
			activeItem = container?.tasks.find((task) => task.id === getId(activeId)) ?? null;
		}
	}

	async function handleDragEnd({ active, over }) {
		if (!over) return;

		const { activeType, overType, acceptsTask, acceptsList } = getTypeAndAccepts(active, over);

		// if the moved item is a list
		if (activeType === 'list' && (overType === 'list' || acceptsList)) {
			const oldIndex = board.lists.findIndex((list) => list.id === getId(active.id));
			const newIndex = board.lists.findIndex((list) => list.id === getId(over.id));
			if (oldIndex === newIndex) return;

			let order = getNewOrder(board.lists, oldIndex, newIndex);
			board.lists = arrayMove(board.lists, oldIndex, newIndex);
			board.lists[newIndex].order = order; // update the order

			await fetch(`/lists/${activeItem.id}`, {
				method: 'PUT',
				body: JSON.stringify({ order })
			});

			return;
		}

		// if the moved item is a task
		if (activeType === 'task' && (overType === 'task' || acceptsTask)) {
			const activeContainer = findContainer(active.id);
			const overContainer = findContainer(over.id);

			if (!activeContainer || !overContainer) return;

			if (activeContainer === overContainer) {
				const oldIndex = activeContainer.tasks.findIndex((task) => task.id === getId(active.id));
				const newIndex = activeContainer.tasks.findIndex((task) => task.id === getId(over.id));

				let order = getNewOrder(activeContainer.tasks, oldIndex, newIndex);
				activeContainer.tasks = arrayMove(activeContainer.tasks, oldIndex, newIndex);
				activeContainer.tasks[newIndex].order = order; // update the order

				await fetch(`/tasks/${activeItem.id}`, {
					method: 'PUT',
					body: JSON.stringify({ order, listId: overContainer.id })
				});
			}
		}
	}

	/** Handle task moving between lists */
	const handleDragOver = async ({ active, over }) => {
		if (!over) return;

		const { activeType: _activeType, overType, acceptsTask } = getTypeAndAccepts(active, over);
		activeType = _activeType;

		if (activeType !== 'task' || (!overType && !acceptsTask)) return;

		const activeContainer = findContainer(active.id);
		const overContainer = findContainer(over.id);

		if (!activeContainer || !overContainer || activeContainer === overContainer) return;

		const task = activeContainer.tasks.find((task) => task.id === getId(active.id));
		if (!task) return;

		activeContainer.tasks = activeContainer.tasks.filter((task) => task.id !== getId(active.id));
		overContainer.tasks.push(task);
	};
</script>

<div class="grid max-h-full grid-rows-[auto_1fr]">
	<div class="flex items-center justify-between">
		<BoardName />
		<BoardPropertiesButton />
	</div>

	<DndContext
		{sensors}
		onDragStart={handleDragStart}
		onDragEnd={handleDragEnd}
		onDragOver={handleDragOver}
	>
		<Droppable
			id="lists"
			data={{ accepts: ['list'] }}
			class="mt-4 flex items-start gap-4 overflow-hidden"
		>
			<SortableContext items={board.lists.map((l) => `list-${l.id}`)}>
				{#each board.lists as list (list.id)}
					<ListCard {list} />
				{/each}
			</SortableContext>

			<AddListButton lastOrder={board.lists[board.lists.length - 1]?.order ?? 0} />
		</Droppable>

		<DragOverlay {dropAnimation}>
			{#if activeId}
				{#if activeType === 'list'}
					<ListCard list={activeItem} isOverlay />
				{/if}
				{#if activeType === 'task'}
					<TaskCard task={activeItem} isOverlay />
				{/if}
			{/if}
		</DragOverlay>
	</DndContext>
</div>
