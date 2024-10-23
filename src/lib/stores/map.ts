import { writable } from 'svelte/store';

// Store para armazenar o país, limites, zoom e vista do mapa
export const country = writable("");
export const maxBounds = writable([[-90, -180], [90, 180]]);
export const maxBoundsViscosity = writable(1.0);
export const zoom = writable(3);
export const view = writable([0, 0]);

export const getCoordinatesForCountry = async (countryValue: string): Promise<[number, number] | null> => {
  const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryValue)}`);
  if (!response.ok) {
    console.error(`Erro ao buscar coordenadas para o país: ${countryValue}`);
    return null; // Retorna null se houver erro
  }
  const countries = await response.json();
  const coordinates = countries[0].latlng; // A API retorna a latitude e longitude em um array
  return coordinates ? [coordinates[0], coordinates[1]] : null;
}