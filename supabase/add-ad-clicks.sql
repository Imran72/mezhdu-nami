begin;

create table if not exists public.ad_clicks (
  click_id uuid primary key,
  created_at timestamptz not null default now(),
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  ip_hash text check (ip_hash ~ '^[0-9a-f]{64}$'),
  user_agent text,
  referer text,
  is_preview boolean not null default false,
  is_suspicious boolean not null default false
);

alter table public.ad_clicks enable row level security;
revoke all on public.ad_clicks from public, anon, authenticated;
grant insert on public.ad_clicks to service_role;
create index if not exists ad_clicks_created_at_idx on public.ad_clicks (created_at);

-- Attribution can outlive a failed or timed-out click insert.
alter table public.couples add column if not exists click_id uuid;
alter table public.full_report_clicks add column if not exists click_id uuid;

create index if not exists couples_click_idx
  on public.couples (click_id) where click_id is not null;
create index if not exists full_report_clicks_click_idx
  on public.full_report_clicks (click_id) where click_id is not null;

-- One existing daily event can be reached through multiple ad clicks.
create table if not exists public.home_funnel_ad_clicks (
  click_id uuid not null,
  day_moscow date not null,
  visitor_id uuid not null,
  event text not null,
  primary key (click_id, day_moscow, visitor_id, event),
  foreign key (day_moscow, visitor_id, event)
    references public.home_funnel_events (day_moscow, visitor_id, event) on delete cascade
);
alter table public.home_funnel_ad_clicks enable row level security;
revoke all on public.home_funnel_ad_clicks from public, anon, authenticated;
grant insert on public.home_funnel_ad_clicks to service_role;
create index if not exists home_funnel_ad_clicks_event_idx
  on public.home_funnel_ad_clicks (day_moscow, visitor_id, event);

create or replace function public.record_attributed_home_event(
  p_visitor_id uuid, p_event text, p_click_id uuid
) returns void
language sql
set search_path = ''
as $$
  insert into public.home_funnel_events (visitor_id, event)
  values (p_visitor_id, p_event)
  on conflict do nothing;

  insert into public.home_funnel_ad_clicks (click_id, day_moscow, visitor_id, event)
  values (p_click_id, (now() at time zone 'Europe/Moscow')::date, p_visitor_id, p_event)
  on conflict do nothing;
$$;
revoke all on function public.record_attributed_home_event(uuid, text, uuid)
  from public, anon, authenticated;
grant execute on function public.record_attributed_home_event(uuid, text, uuid) to service_role;

commit;
