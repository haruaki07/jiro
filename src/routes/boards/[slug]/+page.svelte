<script>
	import BoardPropertiesButton from '$lib/components/Board/BoardPropertiesButton.svelte';
	import { DotsThree, Plus } from 'phosphor-svelte';

	let { data } = $props();
</script>

<div class="grid h-full grid-rows-[auto_1fr]">
	<div class="mt-4 flex items-center justify-between">
		<h1 class="h5 pl-1 font-medium">{data.board.name}</h1>
		<BoardPropertiesButton />
	</div>

	<div class="mt-8 flex items-start gap-4 overflow-x-auto">
		{#each new Array(2) as _}
			<div class="card w-80 flex-shrink-0 bg-surface-800 p-4">
				<div class="mb-4 flex items-center justify-between">
					<p class="font-medium">Backlog</p>
					<button type="button" class="">
						<DotsThree size={24} />
					</button>
				</div>

				<div class="flex flex-col gap-4">
					{#each (() => new Array(Math.ceil(Math.random() * 5)))() as _}
						<div class="card w-full border border-surface-500 bg-surface-600 p-4 shadow">
							<p class="font-medium">Hello</p>
						</div>
					{/each}
				</div>

				<button class="btn mt-4 text-surface-200 hover:text-white hover:preset-tonal">
					<Plus size={20} />
					Add a task
				</button>
			</div>
		{/each}
		<button
			class="btn w-80 flex-shrink-0 justify-start text-surface-200 hover:text-white hover:preset-tonal"
		>
			<Plus size={20} />
			Add a list
		</button>
	</div>
</div>
