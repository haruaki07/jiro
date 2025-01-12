<script>
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import { MagnifyingGlass } from 'phosphor-svelte';
	import UserDropdown from './UserDropdown.svelte';
	import { page } from '$app/state';
</script>

<AppBar
	toolbarClasses="container mx-auto"
	leadClasses="items-center"
	trailClasses="items-center"
	padding="p-3"
>
	{#snippet lead()}
		<a href="/" class="text-lg font-bold uppercase"> Jiro </a>
	{/snippet}
	{#snippet trail()}
		{#if page.data.user}
			<UserDropdown user={page.data.user} />
		{:else}
			<a href="/login" class="btn hover:preset-tonal">Log In</a>
			<a href="/register" class="btn preset-filled-primary-500">Sign Up</a>
		{/if}
	{/snippet}

	{#if page.data.user}
		<button
			type="button"
			class="btn w-auto justify-start preset-tonal preset-outlined-surface-200-800 hover:preset-tonal"
		>
			<MagnifyingGlass class="size-4 opacity-60" />
			<span class="opacity-60">Search...</span>
			<kbd class="text-xs opacity-60">CTRL+K</kbd>
		</button>
	{/if}
</AppBar>
