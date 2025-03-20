<script lang="ts">
    import type { UserSession } from "$lib/auth";
    import { getLocalStorage } from "$lib/toilet";

    import MainApp from "$lib/MainApp.svelte";
    import SignInPage from "$lib/SignInPage.svelte";

    // this is passed around the components. when this is null, the sign in page will appear.
    // when this is not null, the app will appear.
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

<style>
    :global(body) {
        width: 250px;
    }
</style>

<div id="main">
    {#if session != null}
        <MainApp {session} />
    {:else}
        <SignInPage {session} />
    {/if}
</div>
