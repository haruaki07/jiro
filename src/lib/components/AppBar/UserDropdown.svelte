<script>
	import { Avatar, Popover } from '@skeletonlabs/skeleton-svelte';
	import { CaretDown } from 'phosphor-svelte';

	let openState = $state(false);

	function popoverClose() {
		openState = false;
	}
</script>

<Popover
	bind:open={openState}
	positioning={{ placement: 'top' }}
	contentBase="card bg-surface-200-800 py-2 w-44"
	triggerBase="flex items-center gap-x-2"
	arrow
	arrowBackground="!bg-surface-200 dark:!bg-surface-800"
>
	{#snippet trigger()}
		<Avatar name="John Doe" fallbackClasses="text-sm" size="size-8 btn-icon" rounded="rounded-sm" />
		<CaretDown weight="fill" class="text-surface-400-600" />
	{/snippet}
	{#snippet content()}
		<div class="flex-cols flex w-full items-center gap-y-2 text-surface-contrast-500">
			<a href="/logout" class="w-full px-8 py-2 text-left hover:preset-tonal">Logout</a>
		</div>
	{/snippet}
</Popover>
