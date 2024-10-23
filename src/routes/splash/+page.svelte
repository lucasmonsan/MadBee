<script>
	import { goto } from '$app/navigation';
	import { deleteIndexedDB, getAllDistricts, getAllMunicipalities } from '$lib/api/indexedDB';
	import LogoIcon from '$lib/icons/LogoIcon.svelte';
	import { country } from '$lib/stores/location';

	const handleClick = async () => {
		document.title = 'MadBee - Splash';
		sessionStorage.setItem('lastAccess', new Date().getDate().toString());

		try {
			await deleteIndexedDB();
			console.log('MadBeeDB foi apagado com sucesso.');

			await getAllMunicipalities($country);
			console.log('Municípios salvos.');

			await getAllDistricts($country);
			console.log('Distritos salvos.');

			setTimeout(() => goto('/'), 500);
		} catch (error) {
			console.error('Erro na busca de cidades:', error);
		} finally {
		}
	};
</script>

<!-- ----------------------- -->

<LogoIcon />
<h1>MadBee!</h1>
<button on:click={() => handleClick()}>Entrar</button>

<!-- ----------------------- -->
