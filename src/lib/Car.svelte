<script lang="ts">
	let input = $state('');
</script>

<input bind:value={input} />
<button
	onclick={() => {
		console.log(input);
	}}>click me!</button
>
