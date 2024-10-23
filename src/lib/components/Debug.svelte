<script>
	import { goto } from '$app/navigation';
	import { country } from '$lib/stores/map';
	import { isLoading } from '$lib/stores/triggers';
	import { onMount, onDestroy } from 'svelte';
	import { get } from 'svelte/store';

	let width = 0;
	let isClient = false;
	let isDark = false;

	//Largura da tela
	const updateWidth = () => {
		if (isClient) width = window.innerWidth;
	};

	onMount(() => {
		isClient = true; // Define que estamos no cliente (navegador)
		updateWidth();
		window.addEventListener('resize', updateWidth);

		// Restaurar tema
		const savedTheme = localStorage.getItem('theme');
		isDark = savedTheme === 'dark';
		if (isDark) document.documentElement.classList.add('dark-theme');
		else document.documentElement.classList.remove('dark-theme');
	});

	onDestroy(() => {
		if (isClient) window.removeEventListener('resize', updateWidth);
	});

	//Trocar tema
	const toggleTheme = () => {
		isDark = !isDark;
		if (isDark) {
			document.documentElement.classList.add('dark-theme');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark-theme');
			localStorage.setItem('theme', 'light');
		}
	};

	//Trocar tema
	const setCountry = () => {
		if (get(country) === '') country.set('Brazil');
		else country.set('');
	};

	//Apagar dados do navegador
	const handleDeleteData = async () => {
		isLoading.set(true);

		if (typeof window !== 'undefined') sessionStorage.removeItem('lastAccess');

		setTimeout(() => {
			isLoading.set(false);
			goto('/splash');
		}, 1500);
	};
</script>

<!-- ----------------------- -->

<header>
	<button>{width > 0 ? width + 'px' : 'Carregando...'}</button>

	<button class="switch_theme" on:click={toggleTheme}>
		{#if isDark}
			Dark
		{:else}
			Light
		{/if}
	</button>

	<button on:click={() => setCountry()}>{$country}</button>

	<button class="delete_data" on:click={() => handleDeleteData()} disabled={$isLoading}>
		{#if $isLoading}
			Carregando...
		{:else}
			Apagar dados
		{/if}
	</button>
</header>

<!-- ----------------------- -->

<style>
	header {
		z-index: var(--z-debug);
		position: fixed;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		width: 100%;
		height: 2rem;
	}

	button {
		min-width: 3rem;
		height: 100%;
		padding: var(--sm);
		background: rgba(0, 0, 0, 0.75);
		color: white;
		font-size: 1rem;
	}
</style>
