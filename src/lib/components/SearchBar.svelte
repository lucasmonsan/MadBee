<script>
	import CloseIcon from '$lib/icons/CloseIcon.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fade, fly, slide } from 'svelte/transition';

	let searchTerm = '';
</script>

<!-- ----------------------- -->

<form>
	<button type="button" class="search">
		<SearchIcon />
	</button>

	<label>
		<input placeholder="Cidade, município ou distrito..." bind:value={searchTerm} />
	</label>

	{#if searchTerm.length > 0}
		<button type="button" class="clear" on:click={() => (searchTerm = '')} transition:fade={{ duration: 250 }}>
			<CloseIcon />
		</button>
	{/if}
</form>

<!-- ----------------------- -->

<style>
	form {
		overflow-x: hidden;
		position: relative;
		display: flex;
		align-items: center;
		gap: var(--xxs);
		width: 100%;
		height: var(--xxxl);
		padding: 0 var(--xs);
		border-radius: var(--radius-1);
		border: solid 2px var(--comp);
		background-color: var(--bg);
	}

	button.search {
		width: var(--xl);
		height: 100%;
		padding: var(--xxs);
		border-radius: 0;
		background-color: transparent;
	}

	label {
		width: 100%;
	}

	input {
		flex-grow: 1;
		width: 100%;
		font-size: var(--md);
	}

	button.clear {
		position: absolute;
		right: 0;
		width: var(--xl);
		padding: var(--xxs);
		background: linear-gradient(to left, var(--bg), var(--bg));
	}
</style>
