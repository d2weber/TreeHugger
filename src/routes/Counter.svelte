<script lang="ts">
	import { spring } from 'svelte/motion';
	import { quadIn, quadOut, sineIn, sineOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import tree from '$lib/images/tree.svg'; // https://commons.wikimedia.org/wiki/File:%D8%A3%D9%8A%D9%82%D9%88%D9%86%D8%A9_%D8%B4%D8%AC%D8%B1%D8%A9.svg
	import { createMessageStore } from './messages';

	let count = 0;
	let messages = createMessageStore(['Welcome to TreeHugger']);

	const displayed_count = spring();
	$: displayed_count.set(count);
	$: offset = modulo($displayed_count, 1);

	$: if (count == 3)
		messages.add('You found out how to play this game. Nice. There will not be a tutorial level.');
	$: if (count == 1000) messages.add('Congrats!');

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
</script>

{#each $messages as msg (msg.id)}
	<div
		class="alert alert-info shadow-lg"
		in:fly={{ duration: 400, x: 500, easing: quadOut }}
		out:fly={{ duration: 200, x: -500 }}
	>
		<p>{msg.description}</p>
		<div class="flex-none">
			<button class="btn btn-sm btn-ghost" on:click={() => messages.remove(msg)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current flex-shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				></button
			>
		</div>
	</div>
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
