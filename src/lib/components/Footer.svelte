<script>
	import PlusIcon from '$lib/icons/PlusIcon.svelte';
	import ProfileIcon from '$lib/icons/ProfileIcon.svelte';
	import SearchBar from './SearchBar.svelte';
	import SearchResults from './SearchResults.svelte';
</script>

<!-- ----------------------- -->

<footer>
	<SearchResults />

	<div>
		<SearchBar />

		<button class="small">
			<ProfileIcon />
		</button>

		<button class="small">
			<PlusIcon />
		</button>
	</div>
</footer>

<!-- ----------------------- -->

<style>
	footer {
		z-index: var(--z-footer);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		gap: var(--xs);
		width: 100%;
		max-width: calc(var(--base) * 40);
		padding: var(--md) var(--sm);
		background-color: var(--bg);

		@media (min-width: 961px) {
			position: fixed;
			bottom: var(--xl);
			padding: var(--sm);
			border-radius: var(--radius-1);
			box-shadow: var(--shadow-1);
		}
	}

	div {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--xs);
		width: 100%;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-grow: 1;
		min-width: var(--xxxl);
		height: var(--xxxl);
		padding: var(--xs);
	}

	button.small {
		max-width: var(--xxxl);
	}
</style>
