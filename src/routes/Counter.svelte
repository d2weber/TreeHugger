<script lang="ts">
	import { spring } from 'svelte/motion';
	import tree from '$lib/images/tree.svg'; // https://commons.wikimedia.org/wiki/File:%D8%A3%D9%8A%D9%82%D9%88%D9%86%D8%A9_%D8%B4%D8%AC%D8%B1%D8%A9.svg
	import { createMessageStore } from './messages';

	let count = 0;
	let messages = createMessageStore(["Welcome to TreeHugger"]);

	const displayed_count = spring();
	$: displayed_count.set(count);
	$: offset = modulo($displayed_count, 1);

	$: if (count == 3) messages.add("You found out how to play this game. Nice. There will not be a tutorial level.")

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
</script>

{#each $messages as msg (msg.id)}
	<p>{msg.description}</p>
	<button on:click={() => messages.remove(msg)}>
		<svg viewBox="0 0 24 24">
			<path fill="currentColor" stroke="none" d="M22 4.2h-5.6L15 1.6c-.1-.2-.4-.4-.7-.4H9.6c-.2 0-.5.2-.6.4L7.6 4.2H2c-.4 0-.8.4-.8.8s.4.8.8.8h1.8V22c0 .4.3.8.8.8h15c.4 0 .8-.3.8-.8V5.8H22c.4 0 .8-.3.8-.8s-.4-.8-.8-.8zM10.8 16.5c0 .4-.3.8-.8.8s-.8-.3-.8-.8V10c0-.4.3-.8.8-.8s.8.3.8.8v6.5zm4 0c0 .4-.3.8-.8.8s-.8-.3-.8-.8V10c0-.4.3-.8.8-.8s.8.3.8.8v6.5z" />
		</svg>
	</button>
{/each}

<div class="counter">
	<div class="counter-viewport">
		<div class="counter-digits" style="transform: translate(0, {100 * offset}%)">
			<strong class="hidden" aria-hidden="true">{Math.floor($displayed_count + 1)}</strong>
			<strong>{Math.floor($displayed_count)}</strong>
		</div>
	</div>
	<img on:click={() => (count += 1)} src={tree} alt="Tree" />
</div>

<style>
	.counter {
		display: flex;
		flex-direction: column;
	}

	.counter-viewport {
		width: 18em;
		height: 4em;
		overflow: hidden;
		text-align: center;
		margin: 0 auto;
		position: relative;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--color-theme-1);
		font-size: 4rem;
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.hidden {
		top: -100%;
		user-select: none;
	}
</style>
