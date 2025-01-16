<script>
	import { useDroppable } from 'svelte-dnd-kit';

	/**
	 * @type {import('svelte-dnd-kit').UseDroppableArguments & {
	 * 	children?: Snippet;
	 * 	class?: string;
	 * }}
	 */
	let { children, class: className, ...rest } = $props();

	const { isOver, node } = useDroppable(rest);
</script>

<div bind:this={node.current} class={className}>
	{@render children?.()}
</div>
