<script>
	import { Plus } from 'phosphor-svelte';
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let openState = $state(false);
	let message = $state(null);

	function modalClose() {
		openState = false;
	}

	/** @type {import("@sveltejs/kit").SubmitFunction}*/
	const enhanceForm = () => {
		return async ({ result, action }) => {
			if (result.type === 'success') {
				message = null;
				openState = false;
				goto(`/boards/${result.data.slug}`);
			} else if (result.type === 'failure') {
				message = result.data.message;
			} else {
				message = null;
				await applyAction(action);
			}
		};
	};
</script>

<Modal
	bind:open={openState}
	triggerBase="btn preset-filled-primary-500 mt-4"
	contentBase="card bg-surface-100-900 p-6 shadow-xl max-w-xl w-full"
	backdropClasses="backdrop-blur-sm"
>
	{#snippet trigger()}
		<Plus />
		New Board
	{/snippet}
	{#snippet content()}
		<header>
			<h1 class="h4 mb-2 font-bold">New Board</h1>
			<p>Create a new board to get started.</p>

			{#if message}
				<p class="mt-4 text-error-600">{message}</p>
			{/if}
		</header>
		<form method="post" class="mt-8 space-y-4" use:enhance={enhanceForm}>
			<label class="label">
				<span class="label-required label-text">Name</span>
				<input
					type="text"
					name="name"
					class="input"
					placeholder="My Board"
					autocomplete="off"
					required
				/>
			</label>

			<label class="label">
				<span class="label-text">Description</span>
				<textarea name="description" class="input"></textarea>
			</label>

			<footer class="!mt-8 flex justify-end gap-4">
				<button type="button" class="btn hover:preset-tonal" onclick={modalClose}>Cancel</button>
				<button type="submit" class="btn preset-filled" formtarget="new-board-form">Create</button>
			</footer>
		</form>
	{/snippet}
</Modal>
