# NextVisa — Visa & Travel Support

Premium visa-support and travel-planning brand. The public production website is:

- https://nextvisa.vercel.app/
- GitHub: `Khansultann1/nextvisa`

## Production architecture

Vercel is the active hosting provider. The Vercel project root directory is set to `site/`.

- `site/index.html` — homepage, KZ default with KZ/EN/RU switcher and enquiry form
- `site/visa/` — five destination guides: Schengen, USA, UK, Canada, Australia
- `site/assets/css/style.css` — shared styles for destination and legal pages
- `site/assets/js/page-language.js` — shared persistent language switcher for inner pages
- `site/api/lead.js` — Vercel serverless endpoint for enquiry delivery to a Telegram chat
- `site/privacy.html`, `site/terms.html`, `site/thank-you.html`, `site/404.html`
- `site/robots.txt`, `site/sitemap.xml`, `site/llms.txt`

The root-level `netlify.toml` and `NETLIFY-DEPLOYMENT.md` are legacy migration references; they do not control current Vercel production.

## Lead delivery configuration — still required

The homepage form sends JSON to `/api/lead`. The API sends a plain-text enquiry to Telegram and does not store application documents.

Configure these **Production** environment variables in Vercel Project Settings → Environment Variables:

- `TELEGRAM_BOT_TOKEN` — the bot token from BotFather
- `TELEGRAM_CHAT_ID` — the manager chat or group ID where enquiries should arrive

Do not commit these values to GitHub or paste the bot token into public chat. Until both variables are configured, `GET /api/lead` returns `{ "enabled": false }`, the homepage submit button stays disabled, and the form displays a setup notice. Redeploy after adding the variables, then test with a non-sensitive test enquiry.

The backend validates the required fields and consent checkbox, includes a honeypot and a basic per-instance rate limit, and sends only the initial enquiry fields. It does not request passport scans or banking records.

## Brand direction

- Positioning: premium, calm, clear, professional, international
- Visual system: Midnight Navy `#101B2D`, Champagne Gold `#D6B46A`, Warm Ivory `#F5F3EE`
- Voice: helpful, precise and calm; never promise visa approval
- Primary conversion: qualified consultation enquiry

## Planning and growth material

- [Brand and UX copy guide](BRAND-UX-COPY-GUIDE.md)
- [Lead funnel implementation spec](LEAD-FUNNEL-IMPLEMENTATION-SPEC.md)
- [SEO/GEO roadmap](SEO-GEO-ROADMAP.md)
- [SEO keyword map](SEO-KEYWORD-MAP.md)
- [Conversion playbook](NEXTVISA-CONVERSION-PLAYBOOK.md)
- [30-day growth sprint](NEXTVISA-30-DAY-GROWTH-SPRINT.md)
- [SEO content tracker](SEO-CONTENT-TRACKER.md)

## Production status

- [x] Vercel root directory set to `site/`
- [x] Main domain and latest production deployment verified
- [x] Homepage defaults to Kazakh and has a KZ/EN/RU selector
- [x] All five destination pages have the persistent language switcher and FAQ section
- [x] Privacy, terms, and confirmation pages localized
- [x] Vercel enquiry API deployed
- [x] Form UI safely remains disabled until Telegram delivery credentials are configured
- [ ] Add the two Telegram environment variables to Vercel Production
- [ ] Send and verify a real test enquiry
- [ ] Complete the legal operator details and have privacy/terms reviewed for Kazakhstan
- [ ] Verify real service scope, prices, staffed response process, and official contact channels
- [ ] Fact-check country guidance against official sources and record review dates
- [ ] Configure Search Console/Bing Webmaster and privacy-safe conversion analytics

## Safety and quality rules

- Never guarantee visa approval or imply influence over a consular decision.
- Keep government/consular fees separate from agency service charges.
- Verify visa requirements, fees, eligibility, processing times, and document lists against official sources before relying on them.
- Never publish fabricated testimonials, success rates, case studies, or credentials.
- Collect only necessary initial enquiry data and explain the purpose and handling before submission.
- Do not request passport scans, banking records, or other sensitive documents through the initial website form.
- Privacy and service terms remain `noindex` drafts until legal operator details and legal review are complete.
