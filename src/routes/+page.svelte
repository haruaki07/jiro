<script>
	import NewBoardButton from '$lib/components/NewBoardButton/NewBoardButton.svelte';

	let { data } = $props();
</script>

<NewBoardButton />

<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each data.boards as board}
		<a href="/boards/{board.slug}" class="card h-36 p-6 shadow-xl bg-surface-100-900">
			<h1 class="h5 mb-2 truncate font-bold">{board.name}</h1>
			<p>{board.desc || '-'}</p>
			<div class="flex justify-between">
				<span class="mt-3 text-sm text-surface-400">
					Last updated {new Date(board.updatedAt ?? board.createdAt).toLocaleDateString()}
				</span>
			</div>
		</a>
	{/each}
</div>
