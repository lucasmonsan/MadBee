<script>
	/* CSS files */
	import '../styles/variables.css';
	import '../styles/reset.css';
	import '../styles/tags.css';
	import '../styles/leaflet.css';

	/* Imports */
	import { page } from '$app/stores'; // para acessar a rota atual
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	/* Components */
	import Debug from '$lib/components/Debug.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import GlobalUpdater from '$lib/components/GlobalUpdater.svelte';

	onMount(() => {
		const lastAccess = sessionStorage.getItem('lastAccess');
		const today = new Date().getDate().toString();

		if ((!lastAccess || parseInt(lastAccess) < parseInt(today)) && $page.url.pathname !== '/splash') goto('/splash');
	});
</script>

<!-- ----------------------- -->

<slot />

<Debug />
<GlobalUpdater />

<Loading />

<!-- ----------------------- -->
