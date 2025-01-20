<script>
	import { goto } from '$app/navigation';
	import { getBoardState } from '$lib/states/board-state.svelte';
	import { Trash, Warning, WarningCircle } from 'phosphor-svelte';

	let boardState = getBoardState();

	const handleDelete = async () => {
		if (
			confirm(
				'Are you sure you want to delete this board? any lists, tasks, and the contents will be lost.'
			)
		) {
			await fetch(`/api/boards/${boardState.board.id}`, {
				method: 'DELETE'
			});
			goto('/');
		}
	};
</script>

<div class="mt-6 space-y-3">
	<div class="flex items-center gap-2 font-medium text-error-400">
		<Warning size={20} weight="bold" />
		<div>Danger Zone</div>
	</div>
	<button type="button" class="btn preset-filled-error-500" onclick={handleDelete}>
		<Trash size={20} weight="bold" />
		<div>Delete this board</div>
	</button>
</div>
