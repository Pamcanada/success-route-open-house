# Success Route October 2026 Free Immigration Open House

A mobile-first Next.js registration website backed by Google Sheets through Google Apps Script. There is **no attendance capacity or slot limit**. Arrival times are planning estimates only.

## What you need to provide
- Event start and end time for each of the four dates.
- Final deployed registration URL.
- Google Apps Script Web App URL.
- Success Route logo at `public/images/success-route-logo.png`.
- Optional GA4, Meta Pixel and TikTok Pixel IDs.
- Optional social image at `public/images/open-house-social.jpg`.

## Setup — non-technical administrator
1. Install Node.js 20+ on the computer used to build/deploy the website.
2. Open this project folder and run `npm install`, then `npm run dev` to preview it.
3. Create a blank Google Sheet.
4. Open **Extensions → Apps Script** in that Sheet.
5. Copy `google-apps-script/Code.gs` into Apps Script and run `setupSheets()` once. It creates the `Registrations` and `EventSettings` tabs automatically.
6. In `EventSettings`, enter the real **Start Time** and **End Time** for all four dates. Do not leave them blank when opening registration to the public. Interval Minutes is already 30.
7. Deploy Apps Script as a Web App and copy its `/exec` URL. See `google-apps-script/README.md`.
8. Copy `.env.example` to `.env.local`. Add the Apps Script URL to `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`.
9. Put the Success Route logo at `public/images/success-route-logo.png`.
10. Deploy the Next.js site (for example to a Next.js-compatible host). Copy the final public registration URL.
11. Add that public URL to `NEXT_PUBLIC_REGISTRATION_URL` in the production environment and redeploy.
12. Locally, add the same URL to `.env.local`, then run `npm run generate:qr`. This creates general, Brampton and Halifax PNG/SVG QR files in `public/qr` plus a poster QR SVG block.
13. Redeploy once more so `/qr` can display/download the generated QR assets.
14. Add the general QR to the event poster. Use the city QR codes for city-specific flyers.
15. Test one Brampton and one Halifax registration from a phone before publishing widely.
16. Confirm registrations appear in the `Registrations` Sheet.
17. Staff can update Attendance Status, Consultant, Follow-up Required, Follow-up Date and Staff Notes directly in the Sheet.
18. Export the Sheet to CSV/XLSX from Google Sheets whenever required.

## Event settings
Only these dates are accepted server-side: Brampton `2026-10-10`, `2026-10-24`; Halifax `2026-10-17`, `2026-10-18`. The Apps Script validates location, date and arrival time against active EventSettings. Multiple people may select the same time without restriction.

## QR links
The generator creates tracked URLs for general, Brampton and Halifax traffic. `?location=brampton` or `?location=halifax` preselects only the city; it never preselects a date.

## Commands
- `npm run dev` — local preview
- `npm run typecheck` — TypeScript check
- `npm run lint` — ESLint
- `npm run build` — production build
- `npm run generate:qr` — generate QR assets after final URL is configured

## Production test checklist
Test responsive mobile/desktop layouts, both cities, all four dates, 30-minute time generation, same-slot registrations by different people, duplicate same-person/date rejection, UTM capture, QR city preselection, WhatsApp, Google Calendar/.ICS, optional query, expiry date, consent, honeypot, service failure behavior, and staff Sheet columns.
