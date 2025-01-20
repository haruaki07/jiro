<script>
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { getBoardState } from '$lib/states/board-state.svelte';
	import { tick } from 'svelte';

	let { list, ...props } = $props();

	let boardState = getBoardState();
	let textEl = $state();
	let inputEl = $state();
	let value = $state(list.name);
	let width = $state(0);
	let isEditing = $state(false);
	let isSaving = $state(false);

	const edit = async () => {
		isEditing = true;
		await tick();
		inputEl.focus();
	};

	const cancel = () => {
		isEditing = false;
		value = list.name;
	};

	const save = async () => {
		try {
			isSaving = true;

			if (value === '') {
				return cancel();
			}

			isEditing = false;

			let response = await fetch(`/lists/${list.id}?/edit`, {
				method: 'PUT',
				body: JSON.stringify({ name: value })
			});

			const result = deserialize(await response.text());

			if (result.success) {
				boardState.updateList(list.id, result.list);
			}
		} catch (e) {
			console.error(e);
		} finally {
			isSaving = false;
		}
	};

	const handleBlur = async () => {
		if (!isSaving) await save();
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

<div class="relative min-w-0 flex-grow py-4 pl-5 pr-5" {...props}>
	<input
		bind:this={inputEl}
		bind:value
		class="max-w-full rounded-md !border-0 bg-transparent p-0 text-base font-medium outline-none hover:preset-tonal focus:ring-2 focus:ring-primary-500"
		class:hidden={!isEditing}
		style="width: {width}px"
		onblur={handleBlur}
		onkeydown={handleKeyDown}
	/>
	<button
		bind:this={textEl}
		type="button"
		class="block max-w-full truncate text-base font-medium"
		class:invisible={isEditing}
		class:absolute={isEditing}
		onclick={edit}
	>
		{value}
	</button>
</div>
