<script lang="ts">
    import type { Result } from "$lib";
    import { authenticate, type UserSession } from "$lib/auth";
    import { setLocalStorage } from "./toilet";

    let username: string = $state("");
    let password: string = $state("");

    let status: string = $state("");

    async function submit() {
        status = "";
        const statusEle = document.getElementById("status")!;
        statusEle.style.backgroundColor = "";

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
            status = `error! ${sessionResult.Err.toString()}`;

            return;
        } else {
            statusEle.style.color = "BLACK";
            status = "ok!";
        }

        // .Ok should not be null because (look above) if it was .Err, the function would have returned.
        await setLocalStorage({ "session": sessionResult.Ok! });
    }
</script>

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
