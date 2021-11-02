<script>
	import MediaQuery from "./MediaQuery.svelte";

	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import Projects from "./components/Projects.svelte";
</script>

<!-- for desktop -->
<MediaQuery query="(min-width: 481px)" let:matches>
	{#if matches}
		<main>
			<div id='name-and-body'>
				<Header />
				<Projects />
			</div>
		</main>
		<Footer isMobile={false} />

	{/if}
</MediaQuery>

<!-- for mobile -->
<MediaQuery query="(max-width: 480px)" let:matches>
	{#if matches}
		<main>
			<Header />
			<Projects />
			<Footer isMobile={true} />
		</main>
	{/if}
</MediaQuery>

<style>
	span {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	span > * {
		flex: 1 1 0;
	}

	main {
		padding-bottom: 64px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/* padding: 6px; */
	}

	main > * {
		flex: 1 1 0;
	}

	#name-and-body {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

</style>
