<script>
	import { Avatar, Popover } from '@skeletonlabs/skeleton-svelte';
	import { CaretDown } from 'phosphor-svelte';

	let open = $state(false);

	let { user } = $props();
</script>

<Popover
	bind:open
	positioning={{ placement: 'top-end' }}
	contentBase="card bg-surface-200-800 py-2 w-44"
	triggerBase="flex items-center gap-x-2"
	arrow
	arrowBackground="!bg-surface-200 dark:!bg-surface-800"
>
	{#snippet trigger()}
		<Avatar
			name={user.name}
			fallbackClasses="text-sm"
			size="size-8 btn-icon"
			rounded="rounded-sm"
		/>
		<CaretDown weight="fill" class="text-surface-400-600" />
	{/snippet}
	{#snippet content()}
		<div class="flex w-full flex-col items-center gap-y-2 text-surface-contrast-500">
			<div class="w-full px-6 pt-2">
				<p class="text-surface-200">Hi {user.name.split(' ')[0]}!</p>
			</div>
			<a href="/logout" class="w-full px-6 py-2 text-left hover:preset-tonal">Logout</a>
		</div>
	{/snippet}
</Popover>
