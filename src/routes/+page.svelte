<script lang="ts">
    import type { UserSession } from "$lib/auth";
    import SignInPage from "$lib/SignInPage.svelte";
    import { getLocalStorage } from "$lib/toilet";

    async function getSession(): Promise<UserSession> {
        return getLocalStorage("session") as Promise<UserSession>;
    }
</script>

<h1>
    {#await getSession()}
        LOADING
    {:then session}
        {JSON.stringify(session)}
    {/await}
</h1>
<div id="page">
    <!-- {#if }
    
    {/if} -->
    <SignInPage />
</div>
