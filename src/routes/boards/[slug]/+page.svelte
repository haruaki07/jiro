<script>
	import ListCard from '../../../lib/components/List/ListCard.svelte';

	import BoardPropertiesButton from '$lib/components/Board/BoardPropertiesButton.svelte';
	import AddListButton from '$lib/components/List/AddListButton.svelte';
	import ListDropdown from '$lib/components/List/ListDropdown.svelte';
	import { setBoardState } from '$lib/states/board-state.svelte.js';
	import { DotsThree, Plus } from 'phosphor-svelte';

	let { data } = $props();

	const boardState = setBoardState(data.board);
</script>

<div class="grid h-full grid-rows-[auto_1fr]">
	<div class="mt-4 flex items-center justify-between">
		<h1 class="h5 pl-1 font-medium">{data.board.name}</h1>
		<BoardPropertiesButton />
	</div>

	<div class="mt-8 flex items-start gap-4 overflow-x-auto">
		{#each boardState.board.lists as list (list.id)}
			<ListCard {list} />
		{/each}

		<AddListButton
			lastOrder={boardState.board.lists[boardState.board.lists.length - 1]?.order ?? 0}
		/>
	</div>
</div>
