# Cloudflare hosting

Two direct-upload Pages projects are deployed in the Onam Cloudflare account:
- Restaurant: https://onamveg-restaurant.pages.dev
- Ordering and staff: https://onamveg-order.pages.dev and /staff

The custom domains still point to Vercel until DNS migration is complete. Do not delete the Vercel project before verifying the custom domains and TLS on Cloudflare.

To publish updated static files from this repository:

```powershell
python scripts/prepare-cloudflare.py
npx wrangler pages deploy .cloudflare/restaurant --project-name onamveg-restaurant --branch main
npx wrangler pages deploy .cloudflare/ordering --project-name onamveg-order --branch main
```

For ordering changes, first build onam-customer-menu and copy its dist contents to this repository's dist/ordering, as documented there. The generated ordering deployment preserves /ordering asset paths, /staff routing and security headers.

These are direct uploads: GitHub pushes alone do not deploy to Cloudflare. Use the commands above until a deployment workflow is configured. Existing GitHub/Vercel deployment remains active for rollback.

To migrate domains: add onamveg.in as a Cloudflare zone, review imported DNS including email and verification records, update registrar nameservers, associate onamveg.in and www.onamveg.in with the restaurant Pages project and order.onamveg.in with the ordering project, then update corresponding DNS records. Preserve the www canonical redirect. Authentication still requires Supabase and Turnstile setup independently of hosting.
