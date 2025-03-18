<script lang="ts">
    let input = $state("");
</script>

<input bind:value={input} />
<button
    onclick={() => {
        console.log(input);
        console.error(1);
    }}
>
    click me!</button
>
