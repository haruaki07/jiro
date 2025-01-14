<script>
	import ListDropdown from '$lib/components/List/ListDropdown.svelte';
	import { Plus } from 'phosphor-svelte';

	let { list } = $props();
</script>

<div class="card w-80 flex-shrink-0 bg-surface-800 p-3">
	<div class="mb-4 flex items-center justify-between px-2 pt-1">
		<p class="font-medium">{list.name}</p>
		{#if !list.tasks}
			<ListDropdown listId={list.id} />
		{/if}
	</div>

	<div class="flex flex-col gap-3">
		<!-- {#each (() => new Array(Math.ceil(Math.random() * 5)))() as _}
						<div class="card w-full border border-surface-500 bg-surface-600 p-4 shadow">
							<p class="font-medium">Hello</p>
						</div>
					{/each} -->
	</div>

	<button
		class="btn mx-1 mb-1 text-surface-200 hover:text-white hover:preset-tonal"
		class:mt-4={list.tasks?.length > 0}
	>
		<Plus size={20} />
		Add a task
	</button>
</div>
