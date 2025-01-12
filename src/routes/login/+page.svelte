<script>
	/** @type {{ data: import('./$types').PageData, form: import('./$types').ActionData }} */
	let { data, form } = $props();
</script>

<div class="mx-auto mt-12">
	<div
		class="card mx-auto w-full max-w-md border-[1px] p-6 border-surface-200-800 preset-filled-surface-100-900"
	>
		<div class="text-center">
			<h1 class="h4 mb-2 font-bold">Welcome back</h1>
			<p>Log in to your account to continue.</p>

			{#if form?.message}
				<p class="mt-4 text-error-600">{form.message}</p>
			{/if}
		</div>

		<form method="post" class="mt-8 space-y-4">
			<label class="label">
				<span class="label-required label-text">Email</span>
				<input
					type="text"
					name="email"
					class="input"
					placeholder="anton@mail.com"
					required
					autosave="off"
				/>
			</label>
			<label class="label !mb-2">
				<span class="label-required label-text">Password</span>
				<input type="password" name="password" class="input" required />
			</label>
			<button type="submit" class="btn w-full preset-filled">Sign In</button>
		</form>
		<div class="text-md mt-6 text-center">
			Don't have an account?
			<a href="/register" class="font-medium underline">Sign Up</a>
		</div>
	</div>
</div>
