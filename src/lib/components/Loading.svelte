<script>
	import { isLoading } from '$lib/stores/triggers';
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
</script>

<!-- ----------------------- -->

{#if $isLoading}
	<section transition:fade={{ duration: 500, easing: cubicInOut }}>
		<div>
			<span />
			<span />
			<span />
			<span />
			<span />
			<span />
			<span />
			<span />
		</div>
	</section>
{/if}

<!-- ----------------------- -->

<style>
	section {
		z-index: var(--z-loading);
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		padding-bottom: var(--xl);
		background: #ffffffaa;
		backdrop-filter: blur(0.5rem);
		border-radius: 0;
		opacity: 1;
		transition: opacity var(--fast);
	}

	div {
		--uib-color: var(--color-1);
		position: relative;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		height: var(--xxxl);
		width: var(--xxxl);
	}

	span {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		height: 100%;
		width: 100%;
	}

	span::before {
		content: '';
		height: 20%;
		width: 20%;
		border-radius: 50%;
		background-color: var(--uib-color);
		transform: scale(0);
		opacity: 0.5;
		animation: pulse0112 calc(1s * 1.111) ease-in-out infinite;
		box-shadow: 0 0 20px rgba(18, 31, 53, 0.3);
	}

	span:nth-child(2) {
		transform: rotate(45deg);
	}

	span:nth-child(2)::before {
		animation-delay: calc(1s * -0.875);
	}

	span:nth-child(3) {
		transform: rotate(90deg);
	}

	span:nth-child(3)::before {
		animation-delay: calc(1s * -0.75);
	}

	span:nth-child(4) {
		transform: rotate(135deg);
	}

	span:nth-child(4)::before {
		animation-delay: calc(1s * -0.625);
	}

	span:nth-child(5) {
		transform: rotate(180deg);
	}

	span:nth-child(5)::before {
		animation-delay: calc(1s * -0.5);
	}

	span:nth-child(6) {
		transform: rotate(225deg);
	}

	span:nth-child(6)::before {
		animation-delay: calc(1s * -0.375);
	}

	span:nth-child(7) {
		transform: rotate(270deg);
	}

	span:nth-child(7)::before {
		animation-delay: calc(1s * -0.25);
	}

	span:nth-child(8) {
		transform: rotate(315deg);
	}

	span:nth-child(8)::before {
		animation-delay: calc(1s * -0.125);
	}

	@keyframes pulse0112 {
		0%,
		100% {
			transform: scale(0);
			opacity: 0.5;
		}

		50% {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
