<script lang="ts">
    import type { Result } from "$lib";
    import { authenticate, type UserSession } from "$lib/auth";
    import MainApp from "./MainApp.svelte";
    import { getLocalStorage, setLocalStorage } from "./toilet";

    let username: string = $state("");
    let password: string = $state("");

    let status: string = $state("");

    let { session }: { session: UserSession | null } = $props();

    try {
        getLocalStorage("username").then((stored) => {
            if (stored) {
                username = stored as string;
            }
        });
    } catch {
        console.log("no stored username");
    }

    async function submit() {
        status = "";
        const statusEle = document.getElementById("status")!;
        statusEle.style.backgroundColor = "";

        setLocalStorage({ username: username });

        let sessionResult: Result<UserSession> | null = null;
        try {
            sessionResult = await authenticate(username, password);
        } catch (err) {
            status = `req error: ${JSON.stringify(err)}`;
            return;
        }

        if (sessionResult.Err) {
            statusEle.style.backgroundColor = "RED";
            statusEle.style.color = "WHITE";

            if (typeof sessionResult.Err === "object") {
                status = `error! ${JSON.stringify(sessionResult.Err)}`;
            } else {
                status = `error! ${sessionResult.Err.toString()}`;
            }
            return;
        } else {
            statusEle.style.color = "BLACK";
            status = "ok!";
        }

        // .Ok should not be null because (look above) if it was .Err, the function would have returned.
        await setLocalStorage({ session: sessionResult.Ok! });
        session = sessionResult.Ok!;
    }
</script>

{#snippet page()}
    <p>
        <label for="username">Username</label>
        <input type="text" id="username" name="username" bind:value={username} />
    </p>
    <p>
        <label for="username">Password</label>
        <input type="text" id="password" name="password" bind:value={password} />
    </p>
    <p id="status">{status}</p>
    <button aria-label="submit" onclick={submit}>submit</button>
{/snippet}

<!-- we want to render the sign in page if we are signed out. (session is null) -->
{#if session == null}
    {@render page()}
{:else}
    <MainApp {session} />
{/if}

<style>
    label {
        display: flex;
        flex-direction: column;
    }
</style>
