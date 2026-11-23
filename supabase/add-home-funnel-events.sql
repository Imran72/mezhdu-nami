begin;

create table if not exists public.home_funnel_events (
  visitor_id uuid not null,
  event text not null check (event in ('home_opened', 'test_started')),
  created_at timestamptz not null default now(),
  day_moscow date generated always as
    ((created_at at time zone 'Europe/Moscow')::date) stored,
  primary key (day_moscow, visitor_id, event)
);

alter table public.home_funnel_events enable row level security;
revoke all on table public.home_funnel_events from public, anon, authenticated;
grant insert on table public.home_funnel_events to service_role;

commit;
