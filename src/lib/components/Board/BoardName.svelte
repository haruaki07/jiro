<script>
	import { applyAction, deserialize } from '$app/forms';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { getBoardState } from '$lib/states/board-state.svelte';
	import { tick } from 'svelte';
	import { isKeyboardEvent } from 'svelte-dnd-kit';

	let boardState = getBoardState();
	let isSaving = $state(false);
	let isEditing = $state(false);
	let textEl = $state();
	let inputEl = $state();
	let value = $state(boardState.board.name);
	let width = $state(0);

	const edit = async () => {
		isEditing = true;
		await tick();
		inputEl.focus();
	};

	const cancel = () => {
		isEditing = false;
		value = boardState.board.name;
	};

	const save = async () => {
		try {
			isSaving = true;

			if (value === '') {
				return cancel();
			}

			isEditing = false;

			let response = await fetch(`/api/boards/${boardState.board.id}`, {
				method: 'PUT',
				body: JSON.stringify({ name: value })
			});

			const result = await response.json();

			if (result.success) {
				boardState.updateBoard(result.board);
			}
		} catch (e) {
			console.error(e);
		} finally {
			isSaving = false;
		}
	};

	const handleBlur = async () => {
		if (!isSaving) save();
	};

	const handleKeyDown = async (e) => {
		if (e.key === 'Enter') {
			await save();
		} else if (e.key === 'Escape') {
			cancel();
		}
	};

	$effect(() => {
		value;
		{
			width = textEl.clientWidth;
		}
	});
</script>

<div class="relative min-w-0 flex-grow px-2">
	<input
		bind:this={inputEl}
		class="max-w-full rounded-md !border-0 bg-transparent p-0 text-lg font-medium outline-none hover:preset-tonal focus:ring-2 focus:ring-primary-500"
		class:hidden={!isEditing}
		style="width: {width}px"
		bind:value
		onblur={handleBlur}
		onkeydown={handleKeyDown}
	/>
	<button
		bind:this={textEl}
		type="button"
		class="max-w-full cursor-pointer truncate rounded-md text-left text-lg font-medium outline-none hover:preset-tonal"
		class:absolute={isEditing}
		class:invisible={isEditing}
		onclick={edit}
	>
		{value}
	</button>
</div>
