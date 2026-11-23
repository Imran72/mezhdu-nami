begin;

create table if not exists public.full_report_clicks (
  id uuid primary key default gen_random_uuid(),
  couple_id uuid not null references public.couples(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.full_report_clicks enable row level security;
revoke all on table public.full_report_clicks from public, anon, authenticated;
grant insert on table public.full_report_clicks to service_role;

create index if not exists full_report_clicks_couple_created_idx
  on public.full_report_clicks (couple_id, created_at);

commit;
