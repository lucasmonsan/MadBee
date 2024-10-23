<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import L from 'leaflet';
	import { onDestroy, onMount } from 'svelte';
	import { country, view, zoom, maxBounds, getCoordinatesForCountry } from '../stores/map';
	import { get } from 'svelte/store';

	let map: L.Map | null;
	let mapContainer: HTMLDivElement;

	const updateMapView = async (countryValue: string) => {
		if (!countryValue) {
			const generalView: L.LatLngTuple = [0, 0]; // Coordenadas para o centro do mapa mundi
			const generalZoom = 3; // Zoom geral
			console.log(`Revertendo para visualização global. Zoom: ${generalZoom}`);
			map?.setView(generalView, generalZoom); // Volta para o mapa geral
			return;
		}

		console.log(`País atualizado para: ${countryValue}`);
		const coordinates = await getCoordinatesForCountry(countryValue);
		if (!coordinates) return console.warn(`Coordenadas não encontradas para o país: ${countryValue}`);
		console.log(`Coordenadas obtidas para ${countryValue}:`, coordinates);
		let dynamicZoom = countryValue === 'Brazil' ? 5 : get(zoom); // Zoom para Brasil mais adequado
		console.log(`Zoom aplicado: ${dynamicZoom}`);
		map?.setView(coordinates as L.LatLngTuple, dynamicZoom); // Centraliza o mapa nas coordenadas com o zoom
	};

	onMount(() => {
		map = L.map(mapContainer).setView([0, 0], 2); // Visão inicial global

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; OpenStreetMap contributors',
			detectRetina: true,
			tileSize: 256
		}).addTo(map);

		const unsubscribeCountry = country.subscribe(async (value) => await updateMapView(value));

		const unsubscribeView = view.subscribe((newView) => {
			if (map && Array.isArray(newView) && newView.length === 2) {
				const currentZoom = get(zoom);
				map.setView(newView as [number, number], currentZoom); // Atualiza a vista manualmente
			}
		});

		const unsubscribeZoom = zoom.subscribe((newZoom) => map && map.setZoom(newZoom));

		const unsubscribeMaxBounds = maxBounds.subscribe((newBounds) => {
			if (map && newBounds.length === 2) {
				const bounds: L.LatLngBoundsExpression = [
					[newBounds[0][0], newBounds[0][1]], // Latitude e Longitude do ponto SW
					[newBounds[1][0], newBounds[1][1]] // Latitude e Longitude do ponto NE
				];
				map.setMaxBounds(bounds); // Define os limites máximos do mapa
			}
		});

		return () => {
			unsubscribeCountry();
			unsubscribeView();
			unsubscribeZoom();
			unsubscribeMaxBounds();
		};
	});

	onDestroy(() => {
		if (map) {
			map.remove(); // Remove o mapa ao destruir o componente
			map = null;
		}
	});
</script>

<!-- ----------------------- -->

<div bind:this={mapContainer} />

<!-- ----------------------- -->

<style>
	div {
		z-index: var(--z-map);
		flex-grow: 1;
		width: 100%;
		height: 100%; /* Altura total da viewport dinâmica */
	}
</style>
