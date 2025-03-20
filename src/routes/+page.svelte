<script lang="ts">
    import type { UserSession } from "$lib/auth";
    import { getLocalStorage } from "$lib/toilet";

    import MainApp from "$lib/MainApp.svelte";
    import SignInPage from "$lib/SignInPage.svelte";

    let session: UserSession | null = $state(null);

    async function getSession(): Promise<UserSession | null> {
        return getLocalStorage("session");
    }

    getSession()
        .then((val) => {
            session = val;
        })
        .catch((err) => {
            // no session
            console.log(err);
        });
</script>

<div id="main">
    {#if session != null}
        <MainApp {session} />
    {:else}
        <SignInPage {session} />
    {/if}
</div>
