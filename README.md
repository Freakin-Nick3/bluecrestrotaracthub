# BlueCrest Rotaract Hub PWA

A mobile-first Progressive Web App for managing BlueCrest Rotaract Club members, executives, meetings, attendance, projects, ideas, documents, tasks, finances, presidential plans and handover workflows.

The signed-out landing page is a public club website. Visitors can read club history, vision, mission, achievements, short blog/article previews with full reading pages, past presidents, current and former executive profiles with photos, a browsable photo/video gallery, social media links, and contribution details without registering. The President can edit public text, executive names and portraits, former executive details and photos, social platform links, and bank/mobile money information from the dashboard. The President and Public Image / PRO can post photos to the public gallery from Media & Public Image.

Authentication and all shared workspaces use Supabase Auth, Postgres tables with row-level security, and Supabase Storage. Project, finance, idea, task, document, attendance, notification, plan, audit, executive, and public media records sync across devices. The app imports legacy browser records automatically on the President's next sign-in.

Documents uploaded by the President or Secretary can be viewed and downloaded by every active registered member. Apply `supabase/migrations/20261019150000_documents_available_to_all_active_members.sql` to an existing Supabase project. Document upload and deletion remain limited to the President and Secretary.

## Shared database foundation

The Supabase schema and setup notes are in [`supabase/`](supabase/). The connected project is configured in `js/app.js`; its publishable key is designed for browser use. Never expose a service-role key in frontend code.

## UI direction
The interface follows the uploaded reference: a clean white campus-management dashboard, left navigation on desktop, compact top bar, card-based statistics, rounded tables, restrained blue branding, and a mobile bottom navigation.

## Included roles
- President
- Vice President
- Secretary
- Project Director
- Treasurer
- Public Image / PRO
- Membership Director
- Sergeant-at-Arms
- Member

## Accounts
The President and Secretary accounts are provisioned. New members create an account from the public site, confirm their email when prompted, and wait for an officer to approve them in **Members > Registration Queue**. Approval activates the profile, so normal member onboarding does not require dashboard or SQL access.

## Core workflows implemented
- Public member registration > pending queue > officer review and activation.
- Executive appointment and custom executive positions.
- President appointments apply the selected executive role to the member account, giving it the matching role dashboard, workspace navigation, and server-enforced permissions.
- Role-specific navigation and client-side permission gates.
- Meeting scheduling, attendance and minutes stored in shared tables.
- Shared project creation and progress tracking.
- Club idea submission, voting and review.
- Treasurer income/expense transaction records and CSV export.
- Presidential Plan of Action progress tracking.
- Club-wide notifications.
- Member profile editing, linked executive appointments, and Treasurer-published dues.
- Paystack checkout for member dues and contributions, with server-verified payment records.
- Device notifications for new club posts, including background web push when configured.
- Document centre.
- Task management.
- Presidential handover checklist and handover initiation.
- Audit activity log.

## Run
This is a static PWA and can be opened from a local development server. For service-worker installation, use a local HTTP server such as VS Code Live Server rather than `file://`.

Example:

```bash
python -m http.server 5500
```

Then open `http://localhost:5500` in a browser.

## Backend scope
Supabase handles authentication, member onboarding, public page content, executives, meetings, attendance and minutes, projects, ideas and votes, dues, verified payments, restricted finance records, tasks, documents and private file storage, per-member notification read state, presidential plans, audit history, and public gallery media. RLS enforces role permissions in Postgres and Storage. Shared records refresh through Supabase Realtime. A one-time President sign-in migration imports existing browser workspace records; legacy document rows without an uploaded file retain their metadata only. Payment and background push setup is documented in [`supabase/README.md`](supabase/README.md); apply the latest migration and deploy its Edge Functions before accepting payments.

