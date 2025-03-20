<script lang="ts">
    import type { UserSession } from "./auth";
    import SignInPage from "./SignInPage.svelte";
    import { syncUserData, type UserData } from "./sync";
    import { removeLocalStorage } from "./toilet";

    let { session }: { session: UserSession | null } = $props();

    let synced: UserData | null = $state(null);
    let toSync: string = $state("");

    syncUserData(session!.id, null)
        .then((recv) => {
            if (recv.Ok) {
                synced = recv.Ok.data;
            } else {
                console.error(`sync error: ${recv.Err}`);
            }
        })
        .catch((err) => {
            console.error(err);
        });

    async function signOut() {
        try {
            await removeLocalStorage("session");
            session = null;
        } catch (err) {
            console.error(err);
        }
    }

    async function sync(ev: MouseEvent) {
        const response = await syncUserData(session!.id, {
            app_usage: [],
            debug: [{ stored: toSync }],
        });
        const target = ev.target as HTMLElement;
        const orig = target.innerText;
        if (response.Ok) {
            synced = response.Ok.data;
            target.innerText = "synced ok!";
            await new Promise((resolve) => setTimeout(resolve, 1000));
            target.innerText = orig;
        } else {
            target.innerText = `synced err! ${response.Err}`;
            await new Promise((resolve) => setTimeout(resolve, 1000));
            target.innerText = orig;
        }
    }
</script>

{#snippet page()}
    <h1>app</h1>
    <p>{session?.id}</p>
    <button onclick={signOut}>sign out</button>

    <ul>
        {#if synced != null}
            {#each synced!.debug as debug, i (debug)}
                <li>debug[{i}]: "{debug.stored}"</li>
            {/each}
        {:else}
            <li>loading data!1!1111!</li>
        {/if}
    </ul>

    <input bind:value={toSync} />
    <button onclick={sync}>sync now!</button>

    <!-- <div id="nav">
        <div onclick={}>home</div>
        <div onclick={}>settings</div>
    </div> -->
{/snippet}

<!-- we want to render the main app if we are signed in. (session is not null) -->
{#if session != null}
    {@render page()}
{:else}
    <SignInPage {session} />
{/if}

<!-- <style>
    #nav {
        display: flex;
        flex-direction: row;
        position: absolute;
        bottom: 0;
    }
    #nav div {
        background-color: green;
    }
</style> -->
