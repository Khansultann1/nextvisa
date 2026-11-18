# Netlify deployment checklist

## What this repository now contains
- `site/index.html` — responsive premium homepage and enquiry form
- `site/visa/*.html` — five destination information pages (Schengen, USA, UK, Canada, Australia)
- `site/privacy.html`, `site/terms.html`, `site/thank-you.html`, `site/404.html`
- `site/robots.txt`, `site/sitemap.xml`, `site/llms.txt`
- `netlify.toml` — static publish directory and basic security headers

## Important: verify the connected production repository first
This repository is `Khansultann1/nextvisa`. The current Netlify site is known as `https://nextvis.netlify.app/`, but its connected source repository has not been verified. Do not assume this GitHub repository controls the live site.

1. Sign in to Netlify.
2. Open the site that serves `nextvis.netlify.app`.
3. Open **Site configuration → Build & deploy → Continuous deployment**.
4. Check the connected Git repository. It must be exactly `Khansultann1/nextvisa` before expecting pushes here to update production.
5. If it is already connected, confirm production branch `main`, publish directory `site`, and no build command.
6. Trigger a deploy and review the deploy log and production preview before announcing launch.

## Enquiry form
The homepage uses Netlify Forms markup (`data-netlify="true"`) with a required privacy-consent checkbox and spam honeypot. After the first successful deploy, open the site's **Forms** area and confirm that the form named `nextvisa-leads` has been detected. Submit a test enquiry and verify that it appears once. Configure an email notification to the real business inbox in Netlify; no email address has been invented in this repository.

## Required before public launch
- Complete the legal operator details in `privacy.html` and have both legal pages reviewed for Kazakhstan and any relevant destination-market rules.
- Verify the business name, IP/LLP details, actual service scope, prices and contact channels.
- Verify all destination-specific visa instructions against official sources and add a reviewed date and reviewer.
- Check that real staff can receive and respond to form enquiries. Never promise visa approval.
- Test the form, consent, mobile layout, 404, links, external official sources and search indexing.

## Limits
No Netlify deployment or DNS change has been performed from this repository. GitHub commits become live only if the Netlify site is connected to this repository and a successful deploy completes.
