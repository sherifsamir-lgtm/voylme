# VOYLME MASTER

## Environment
- Project path: ~/projects/voylme/voylme-web
- Platform: Termux on Android
- Hosting and preview: Vercel
- Current branch: rebuild/homepage-clean-v3
- Never use nano.
- Never use npm run dev or local preview commands.
- Keep all operations inside Termux/server.

## Mandatory workflow
1. Read this file before every step.
2. Inspect the target file and related CSS first.
3. Check git status and current branch.
4. Send one safe Termux command only.
5. Do not use long heredoc commands.
6. Do not guess deployment commands.
7. Run build/type checks before deployment.
8. Review git diff before commit or push.
9. Do not move to the next section until user approval.
10. Update this file after every approved section.

## Design source of truth
- Use the approved homepage reference image.
- Burgundy header.
- Navigation: Flights, Hotels, Cars, Activities, Insurance, Yachts, Deals.
- Hero with airplane wing and clouds.
- Search form inside Hero.
- Four trust badges.
- Large service cards.
- Burgundy footer.
- Mobile bottom navigation.
- Do not modify or recreate the approved Voylme logo.

## Launch services
- Flights
- Hotels
- Cars
- Activities
- Insurance
- Yachts
- Visa is excluded.

## Completed booking flow
- Flight Details
- Passengers
- Extras
- Payment
- Confirmation
- Do not revisit unless requested.

## Current section
- Section: Header
- Status: Modified but not visually approved.
- Next: verify git/build/deployment workflow, deploy to Vercel, review screenshot.

## Deployment safety
- Before any deployment command, inspect:
  git status --short
  git branch --show-current
  git remote -v
  cat package.json
- Never assume the Vercel deployment workflow.

## Build environment
- Android/Termux uses Webpack for builds.
- Never use: next build (Turbopack).
- Always use: npx next build --webpack

## Proven project rules
- Read VOYLME_MASTER.md before every task.
- Verify: git status --short
- Verify: git branch --show-current
- Use one safe Termux command per step.
- Never use nano.
- Never use long cat <<EOF blocks.
- Always inspect the target file before editing.
- On Android/Termux always build with: npx next build --webpack
- Never use Turbopack on Android/Termux.
- Never assume the Vercel deployment workflow; verify it first.
- Update this file whenever a new lesson or rule is discovered.

## Known Commands

### Check project status
git status --short

git branch --show-current

### Build (Android/Termux)
npx next build --webpack

### Forbidden Commands
- next build (uses Turbopack on Android)
- npm run dev
- nano
- Long cat <<EOF blocks


## VOYLME MASTER V3 (2026-07-18)
- This section is the active source of truth for Homepage V3.
- Legacy homepage is no longer the reference.

### Execution Rules
- Read this section before every task.
- Never reuse old Homepage code.
- Never delete files before checking references.
- One safe Termux command per step.
- Goal: publish the website today.

### Approved Asset Folders
- Logo: public/brand/
- Brand assets: public/assets/brand/
- Header icons: public/assets/icons/header/
- Account icons: public/assets/icons/account/
- Booking icons: public/assets/icons/booking/
- Search icons: public/assets/icons/search/
- Navigation icons: public/assets/icons/navigation/
- Status icons: public/assets/icons/status/
- Country flags: public/flags/countries/
- Language flags: public/flags/languages/
- Payment logos: public/assets/payments/ and public/payments/
- Hero images: public/images/

### Homepage V3 Roadmap
1. Verify references before editing.
2. Finish Homepage V3 components.
3. Replace legacy homepage with Homepage V3.
4. Remove unused legacy homepage files only after dependency check.
5. Build using: npx next build --webpack
6. Deploy using: vercel --prod
7. Review production and fix launch-blocking issues only.

### Do Not Rules
- Do not use long commands that may crash Termux.
- Do not use nano.
- Do not use long cat <<EOF blocks.
- Do not modify or delete files before checking dependencies.
- Do not reuse legacy Homepage code or CSS.
- Do not change the approved VOYLME logo.
- Always update VOYLME_MASTER.md before major project changes.

## Pending Launch Tasks
- Footer pages are intentionally deferred until after Homepage V3 completion.
- Create dedicated pages for: About, Help Centre, Privacy Policy, Terms & Conditions, and Contact.
- Replace all temporary links (/, mailto:) with their final routes before production release.
- Do not consider the project complete until all Footer links point to their dedicated pages.

## Assets & Design Rules

### Custom Assets
- All final custom icons, buttons and UI images are permanent project assets.
- Do not replace them with Lucide, Heroicons, FontAwesome or any placeholder icons unless explicitly approved.
- Always use the approved custom assets throughout the project.

### Assets Structure
public/assets/
├── icons/
│   ├── navigation/
│   ├── menu/
│   ├── services/
│   ├── account/
│   └── status/
├── buttons/
├── images/
├── illustrations/
└── logos/

### Development Rule
- Any newly approved icon, button or image must be copied into the proper assets folder immediately.
- All components must reference assets from public/assets only.
- No temporary assets before production.
- Never delete or overwrite approved assets without explicit approval.
- If a temporary asset is used, it must be marked as TODO in the master and replaced before production release.


## Hero Finalization Rule

- The Hero section is intentionally deferred until the very end of the project.
- Complete all pages, components, assets, navigation, testing, production build and website deployment first.
- Do not redesign, replace, move or delete any Hero files or assets before that final stage.
- The Hero will be reviewed and finalized only after the website has been deployed, unless explicitly approved otherwise.

## Current Development Roadmap (Locked)

Development order is fixed and must not be changed unless explicitly approved.

### Phase 1 — Homepage Foundation
- Complete Header.
- Complete floating interface buttons.
- Complete Header 2.

### Phase 2 — Search & Offers
- Complete the flight search section.
- Complete the offers section.

### Phase 3 — Footer
- Complete the entire Footer.
- Finalize all Footer links.

### Phase 4 — Internal Menu
- Complete the internal account/menu system.
- Finish all menu pages.

### Phase 5 — Integration
After every completed phase:
- Connect it with all related pages.
- Verify navigation.
- Verify UI consistency.
- Verify language & currency synchronization.
- Verify responsive behavior.
- Run a successful production build before moving to the next phase.

### Hero Rules
- Hero 1 (Landing Hero) is postponed until the entire project is completed and deployed.
- Hero 2 (Services Visual Section: Flights, Hotels, Cars, Activities, Insurance, Yachts) is developed during Homepage V3.

