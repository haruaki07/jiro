<script>
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	import { DotsThree, User, X } from 'phosphor-svelte';
	import UserCard from '../UserCard.svelte';
	import BoardDescription from './BoardDescription.svelte';
	import DangerZone from './DangerZone.svelte';
	import { getBoardState } from '$lib/states/board-state.svelte';

	let { data } = $props();

	let boardState = getBoardState();

	let drawerState = $state(false);

	function drawerClose() {
		drawerState = false;
	}
</script>

<Modal
	bind:open={drawerState}
	triggerBase="btn-icon preset-tonal"
	contentBase="bg-surface-200-800 w-[360px] h-screen p-3 text-surface-200"
	positionerJustify="justify-end"
	positionerAlign=""
	positionerPadding=""
	transitionsPositionerIn={{ x: 360, duration: 200 }}
	transitionsPositionerOut={{ x: 360, duration: 200 }}
>
	{#snippet trigger()}<DotsThree size={24} />{/snippet}
	{#snippet content()}
		<button
			type="button"
			class="btn-icon absolute right-3 top-4 hover:preset-tonal"
			onclick={drawerClose}
		>
			<X size={24} />
		</button>

		<div class="mt-2 flex items-center justify-center border-b border-surface-700 pb-4">
			<div class="font-medium">About this board</div>
		</div>

		<div class="mt-3 space-y-3">
			<div class="flex items-center gap-2 font-medium">
				<User size={20} weight="bold" />
				<div>Board admins</div>
			</div>
			<UserCard />
		</div>

		<BoardDescription />
		<DangerZone />
	{/snippet}
</Modal>
