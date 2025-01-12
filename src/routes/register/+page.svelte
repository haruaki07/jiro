<script>
	/** @type {{ data: import('./$types').PageData, form: import('./$types').ActionData }} */
	let { data, form } = $props();
</script>

<div class="mx-auto mt-12">
	<div
		class="card mx-auto w-full max-w-md border-[1px] p-6 border-surface-200-800 preset-filled-surface-100-900"
	>
		<div class="text-center">
			<h1 class="h4 mb-2 font-bold">Welcome</h1>
			<p>Sign up to get started using Jiro.</p>

			{#if form?.message}
				<p class="mt-4 text-error-600">{form.message}</p>
			{/if}
		</div>

		<form method="post" class="mt-8 space-y-4">
			<label class="label">
				<span class="label-required label-text">Full name</span>
				<input
					type="text"
					name="name"
					class="input"
					placeholder="Anton Doe"
					required
					autosave="off"
				/>
			</label>

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

			<button type="submit" class="btn w-full preset-filled-primary-500">Sign Up</button>
		</form>

		<div class="text-md mt-6 text-center">
			Already have an account?
			<a href="/login" class="font-medium underline">Sign In</a>
		</div>
	</div>
</div>
