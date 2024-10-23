<script>
	import { page } from '$app/stores';
	import { pathname } from '$lib/stores/route';

	// Acesso ao store 'page' reativo
	$: $page && pathname.set($page.url.pathname);
</script>

<!-- ----------------------- -->
