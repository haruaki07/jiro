<script>
	import Board from '$lib/components/Board/Board.svelte';
	import { setBoardState } from '$lib/states/board-state.svelte.js';

	let { data } = $props();

	const boardState = setBoardState(data.board);
</script>

<Board board={boardState.board} />
