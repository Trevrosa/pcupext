<script lang="ts">
    import type { UserSession } from "./auth";
    import SignInPage from "./SignInPage.svelte";
    import { removeLocalStorage } from "./toilet";

    let { session }: { session: UserSession | null } = $props();

    async function signOut() {
        try {
            await removeLocalStorage("session");
            session = null;
        } catch (err) {
            console.error(err);
        }
    }
</script>

{#snippet page()}
    <h1>app</h1>
    <p>{session?.id}</p>
    <button onclick={signOut}>sign out</button>
{/snippet}

<!-- we want to render the main app if we are signed in. (session is not null) -->
{#if session != null}
    {@render page()}
{:else}
    <SignInPage {session} />
{/if}
