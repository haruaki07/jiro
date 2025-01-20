<script>
	import { applyAction, enhance } from '$app/forms';
	import { getBoardState } from '$lib/states/board-state.svelte';
	import { FileText } from 'phosphor-svelte';

	let boardState = getBoardState();
	let isOpen = $state(false);

	const open = () => (isOpen = true);
	const close = () => (isOpen = false);

	const enhanceForm = () => {
		return async ({ result, action }) => {
			if (result.type === 'success') {
				boardState.updateBoard(result.data.board);
				close();
			} else if (result.type === 'failure') {
				console.log(result.data.message);
			} else {
				await applyAction(action);
			}
		};
	};
</script>

<div class="mt-8 space-y-3">
	<div class="flex items-center gap-2 font-medium">
		<FileText size={20} weight="bold" />
		<div>Description</div>
		{#if !isOpen}
			<button type="button" class="btn btn-sm ml-auto preset-tonal" onclick={open}> Edit </button>
		{/if}
	</div>

	{#if isOpen}
		<form
			action={`/boards/${boardState.board.slug}?/description`}
			method="post"
			use:enhance={enhanceForm}
		>
			<textarea
				class="w-full rounded-md border border-surface-500 bg-surface-900/40 text-sm placeholder:text-sm"
				placeholder="Board description..."
				rows="6"
				name="desc">{boardState.board.desc}</textarea
			>

			<div class="mt-1 flex w-full items-center justify-start gap-1">
				<button type="submit" class="btn btn-sm preset-filled">Save</button>
				<button type="button" class="btn btn-sm hover:preset-tonal" onclick={close}>
					Cancel
				</button>
			</div>
		</form>
	{:else}
		<p class="whitespace-pre-line text-sm">
			{boardState.board.desc || '-'}
		</p>
	{/if}
</div>
