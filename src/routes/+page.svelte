<script lang="ts">
    // FIXME: BEWARE BASE STYLES: `https://tailwindcss.com/docs/preflight`
    // import "../app.css";

    import type { UserSession } from "$lib/auth";

    import MainApp from "$lib/App.svelte";
    import SignInPage from "$lib/SignInPage.svelte";
    import { getSession } from "$lib";

    // this is passed around the components. when this is null, the sign in page will appear.
    // when this is not null, the app will appear.
    let session: UserSession | null = $state(null);

    getSession()
        .then((val) => {
            session = val;
        })
        .catch((err) => {
            // no session
            console.error(err);
        });
</script>

<div id="main">
    {#if session != null}
        <MainApp {session} />
    {:else}
        <SignInPage {session} />
    {/if}
</div>

<style>
    :global(body) {
        width: 250px;
        height: 400px;

        font-family: Open Sans, Segoe UI, Helvetica Neue, Ubuntu, sans-serif;
        font-size: 75%;
    }
</style>
