<script>
	import SearchBar from './SearchBar.svelte';
</script>

<!-- ----------------------- -->

<footer>
	Footer

	<SearchBar />
</footer>

<!-- ----------------------- -->

<style>
	footer {
		z-index: var(--z-footer);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--xs);
		width: 100%;
		max-width: calc(var(--base) * 40);
		padding: 0 var(--sm);
		background-color: var(--bg);

		@media (min-width: 961px) {
			position: fixed;
			bottom: var(--xl);
		}
	}
</style>
