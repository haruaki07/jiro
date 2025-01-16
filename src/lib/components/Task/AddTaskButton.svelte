<script>
	import { applyAction, enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { getBoardState } from '$lib/states/board-state.svelte';
	import { Plus } from 'phosphor-svelte';
	import { tick } from 'svelte';

	let { listId, lastOrder } = $props();

	let boardState = getBoardState();
	let order = lastOrder + 32;
	let openState = $state(false);
	let inputEl = $state(null);

	const open = async () => {
		openState = true;
		await tick();
		inputEl?.focus();
	};

	const close = () => {
		openState = false;
	};

	let message = $state(null);

	/** @type {import('@sveltejs/kit').SubmitFunction} */
	const enhanceForm = () => {
		return async ({ result, action }) => {
			if (result.type === 'success') {
				boardState.addTask(result.data.task, listId);
				close();
			} else if (result.type === 'failure') {
				message = result.data.message;
			} else {
				await applyAction(action);
			}
		};
	};
</script>

{#if openState}
	<form
		method="post"
		action="/tasks"
		use:enhance={enhanceForm}
		class="card w-full border border-surface-500 bg-surface-600 p-4 shadow"
	>
		{#if message}
			<p class="mb-4 text-sm text-error-600">{message}</p>
		{/if}

		<input type="hidden" required name="boardId" value={boardState.board.id} />
		<input type="hidden" required name="listId" value={listId} />
		<input type="hidden" required name="order" value={order} />
		<input
			type="text"
			class="w-full border-none bg-transparent p-0 font-medium text-white placeholder:text-surface-300 focus:border-none focus:outline-none focus:ring-0"
			bind:this={inputEl}
			placeholder="Task name"
			name="name"
			autocomplete="off"
			required
		/>
		<div class="mt-3 flex w-full flex-row-reverse items-center justify-start gap-1">
			<button type="submit" class="btn btn-sm preset-filled">Add</button>
			<button type="button" class="btn btn-sm hover:preset-tonal" onclick={close}> Cancel </button>
		</div>
	</form>
{:else}
	<button
		type="button"
		class="btn text-surface-200 hover:text-white hover:preset-tonal"
		onclick={open}
	>
		<Plus size={20} />
		Add a task
	</button>
{/if}
