<script>
	import Typewriter from './components/Typewriter.svelte'
	let curLine = 0
	function updateLine(event) {
		curLine = event.detail.line;
	}
</script>


<main>
	<Typewriter on:doneTyping={updateLine} txt={'You\'ve found my website.'} whichLine={1}/>

	{#if curLine >= 1}
	<Typewriter on:doneTyping={updateLine} txt={'It\'s still under construction.'} whichLine={2}/>
	{/if}

	{#if curLine >= 2}
	<Typewriter on:doneTyping={updateLine} txt={'Come back soon :)'} whichLine={3}/>
	{/if}

	

</main>

<style>
	:global(body) {
		background-color: rgb(26, 26, 26);
	}
</style>