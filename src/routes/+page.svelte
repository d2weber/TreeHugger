<script>
	import Counter from './Counter.svelte';
</script>

<svelte:head>
	<title>TreeHugger</title>
	<meta name="description" content="Hug a tree" />
</svelte:head>

<section>
	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
