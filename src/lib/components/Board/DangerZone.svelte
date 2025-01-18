<script>
	import { Trash, Warning, WarningCircle } from 'phosphor-svelte';
</script>

<div class="mt-6 space-y-3">
	<div class="flex items-center gap-2 font-medium text-error-400">
		<Warning size={20} weight="bold" />
		<div>Danger Zone</div>
	</div>
	<button type="button" class="btn preset-filled-error-500">
		<Trash size={20} weight="bold" />
		<div>Delete this board</div>
	</button>
</div>
