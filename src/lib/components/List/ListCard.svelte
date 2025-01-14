<script>
	import ListDropdown from '$lib/components/List/ListDropdown.svelte';
	import { Plus } from 'phosphor-svelte';
	import AddTaskButton from '../Task/AddTaskButton.svelte';
	import TaskCard from '../Task/TaskCard.svelte';

	/**
	 * @type {{ list: import('$lib/states/board-state.svelte').List }}
	 */
	let { list } = $props();
</script>

<div class="card w-80 flex-shrink-0 bg-surface-800 p-3">
	<div class="mb-4 flex items-center justify-between px-2 pt-1">
		<p class="font-medium">{list.name}</p>
		{#if !list.tasks || list.tasks.length === 0}
			<ListDropdown listId={list.id} />
		{/if}
	</div>

	<div class="flex flex-col gap-3" class:mb-3={list.tasks?.length > 0}>
		{#each list.tasks as task (task.id)}
			<TaskCard {task} />
		{/each}
	</div>

	<AddTaskButton lastOrder={list.tasks?.[list.tasks.length - 1]?.order ?? 0} listId={list.id} />
</div>
