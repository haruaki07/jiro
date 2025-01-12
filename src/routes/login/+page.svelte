<script>
	/** @type {{ data: import('./$types').PageData, form: import('./$types').ActionData }} */
	let { data, form } = $props();
</script>

{#if form?.message}
	<p>{form.message}</p>
{/if}

<form method="post">
	<input type="text" name="email" placeholder="email" /> <br />
	<input type="password" name="password" placeholder="password" /> <br />
	<button type="submit">Sign In</button>
</form>
