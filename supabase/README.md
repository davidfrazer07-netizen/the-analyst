# Backend setup (Supabase)

The AI Assistant needs a real backend because this app deploys as a static
site on GitHub Pages — a static site can't hold a secret API key safely, so
the OpenRouter key must live server-side.

## One-time setup

1. Create a free project at supabase.com.
2. Install the Supabase CLI and log in: `npx supabase login`
3. Link this repo to the project: `npx supabase link --project-ref <your-project-ref>`
4. Deploy the function: `npx supabase functions deploy ai-assistant --no-verify-jwt`
5. Set the OpenRouter key as a server-side secret (never in the repo):
   `npx supabase secrets set OPENROUTER_API_KEY=sk-or-...`
6. Copy the function's URL (shown after deploy, looks like
   `https://<project-ref>.supabase.co/functions/v1/ai-assistant`).
7. In the GitHub repo settings → Secrets and variables → Actions → Variables,
   add `NEXT_PUBLIC_AI_ASSISTANT_URL` with that URL. It's safe to expose
   publicly — it's an endpoint, not a credential.
8. Push to `main` (or re-run the `Deploy to GitHub Pages` workflow) to pick
   up the new build-time variable.

Until this is done, the AI Assistant in the Technicals tab silently falls
back to canned placeholder replies — no broken UI, just no live model.

## Model

Uses `nvidia/nemotron-3-ultra-550b-a55b:free` via OpenRouter. Free-tier model
slugs rotate — check `npx supabase functions deploy` still works and swap the
`MODEL` constant in `functions/ai-assistant/index.ts` if OpenRouter retires it.
The AI Coach tab (`CoachTab.tsx`) calls this same function URL.

## Login (Supabase Auth)

Uses `@supabase/supabase-js` directly from the browser — the anon key is
meant to be public (Row Level Security policies protect data, not key
secrecy), so no proxy is needed here, unlike the OpenRouter key above.

1. In your Supabase project: Authentication → Providers → enable Google,
   following Supabase's Google OAuth setup guide (needs a Google Cloud OAuth
   client ID/secret).
2. Authentication → URL Configuration → add your GitHub Pages URL
   (`https://davidfrazer07-netizen.github.io/the-analyst/`) to the redirect
   allowlist.
3. Add two more GitHub Actions repo variables (Settings → Secrets and
   variables → Actions → Variables): `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` (both from Project Settings → API in
   Supabase — the anon key, never the service role key).
4. Push to `main` to rebuild with auth enabled.

Until these are set, the app shows a "Sign-in not configured yet" screen
with a "Continue as guest (dev preview)" bypass, so local testing still
works without blocking on this setup.
