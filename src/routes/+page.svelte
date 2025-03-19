<script lang="ts">
    import type { Result } from "$lib";
    import { authenticate, type UserSession } from "$lib/auth";
    // import { redirect } from "@sveltejs/kit";

    // const FormActionStatusCode = 303;

    let username: string = $state("");
    let password: string = $state("");

    let status: string = $state("");

    async function submit() {
        status = "";
        const statusEle = document.getElementById("status")!;
        statusEle.style.backgroundColor = "";

        let session: Result<UserSession> | null = null;
        try {
            session = await authenticate(username, password);
        } catch (err) {
            status = `req error: ${JSON.stringify(err)}`;
            return;
        }

        if (session.Err) {
            statusEle.style.backgroundColor = "RED";
            statusEle.style.color = "WHITE";
        }
        status = JSON.stringify(session);
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
