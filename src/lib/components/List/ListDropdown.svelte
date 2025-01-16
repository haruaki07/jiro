<script>
	import { getBoardState } from '$lib/states/board-state.svelte';
	import { Popover } from '@skeletonlabs/skeleton-svelte';
	import { CaretDown, DotsThree } from 'phosphor-svelte';

	let { listId } = $props();

	let open = $state(false);
	let boardState = getBoardState();

	const handleDeleteList = async () => {
		open = false;

		await fetch(`/lists/${listId}`, {
			method: 'DELETE'
		});

		boardState.removeList(listId);
	};
</script>

<Popover
	bind:open
	positioning={{ placement: 'bottom-end', offset: { crossAxis: 0, mainAxis: 0 } }}
	contentBase="card bg-surface-100-900 py-2 w-44"
	triggerBase="block flex-shrink-0 pr-4"
	arrow
	arrowBackground="!bg-surface-100 dark:!bg-surface-900"
>
	{#snippet trigger()}
		<DotsThree size={24} />
	{/snippet}
	{#snippet content()}
		<div class="flex w-full flex-col items-center gap-y-2 text-surface-contrast-500">
			<button
				type="button"
				class="w-full px-6 py-2 text-left hover:preset-tonal"
				onclick={handleDeleteList}
			>
				Delete list
			</button>
		</div>
	{/snippet}
</Popover>
