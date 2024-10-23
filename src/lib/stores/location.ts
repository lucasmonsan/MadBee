import { writable } from 'svelte/store';

export let country = writable("Brazil");
export let cityId = writable("")