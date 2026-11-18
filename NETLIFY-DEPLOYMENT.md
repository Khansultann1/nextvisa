# Legacy Netlify deployment note

**Netlify is no longer the active production host for NextVisa.** The live site is served from Vercel at https://nextvisa.vercel.app/.

The active Vercel project is linked to the GitHub repository `Khansultann1/nextvisa` and its Root Directory is `site/`. The static homepage, country guides, shared assets, and the serverless API are all inside that directory.

## Current form integration

The old Netlify Forms markup has been removed from the live website. Enquiries are now designed to be delivered through the Vercel function at `site/api/lead.js`, which sends a message to a Telegram chat.

The Vercel Production environment still needs these two variables:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Until both are configured, the public form is intentionally disabled and the API reports `{"enabled":false}`. Do not test by submitting personal data while it is disabled.

## Do not use for current production

The `netlify.toml` file is retained only as a legacy configuration reference. Do not spend Netlify build credits or change the Netlify publish directory to deploy current production. Use Vercel Project Settings and the connected GitHub repository instead.
