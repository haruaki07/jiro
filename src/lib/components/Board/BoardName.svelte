<script>
	import { applyAction, deserialize } from '$app/forms';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { getBoardState } from '$lib/states/board-state.svelte';
	import { tick } from 'svelte';
	import { isKeyboardEvent } from 'svelte-dnd-kit';

	let boardState = getBoardState();
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
		if (value === '') {
			return cancel();
		}

		isEditing = false;

		const data = new FormData();
		data.append('name', value);

		let response = await fetch(`/boards/${boardState.board.slug}?/edit`, {
			method: 'POST',
			body: data
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			boardState.updateBoard(result.data.board);
			await invalidateAll();
			return;
		} else if (result.type === 'failure') {
			console.log(result.data.message);
			return;
		}

		applyAction(result);

		boardState.updateBoard(await response.json());
	};

	const handleBlur = async () => {
		save();
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

<div class="relative">
	<input
		bind:this={inputEl}
		class="field-sizing-content rounded-md !border-0 bg-transparent px-2 py-0 text-lg font-medium outline-none hover:preset-tonal focus:ring-2 focus:ring-primary-500"
		class:hidden={!isEditing}
		style="width: {width}px"
		bind:value
		onblur={handleBlur}
		onkeydown={handleKeyDown}
	/>
	<button
		bind:this={textEl}
		type="button"
		class="cursor-pointer rounded-md px-2 text-lg font-medium outline-none hover:preset-tonal"
		class:invisible={isEditing}
		class:whitespace-pre={isEditing}
		onclick={edit}
	>
		{value}
	</button>
</div>
