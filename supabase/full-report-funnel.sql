WITH day AS (
  SELECT (now() AT TIME ZONE 'Europe/Moscow')::date AS day
),
bounds AS (
  SELECT
    day::timestamp AT TIME ZONE 'Europe/Moscow' AS start_at,
    (day + 1)::timestamp AT TIME ZONE 'Europe/Moscow' AS end_at
  FROM day
),
home_counts AS (
  SELECT
    count(DISTINCT e.visitor_id) AS opened,
    count(DISTINCT e.visitor_id) FILTER (WHERE e.event = 'test_started') AS clicked
  FROM public.home_funnel_events e
  JOIN day d ON d.day = e.day_moscow
),
progress AS (
  SELECT
    c.id,
    c.partner_a_name,
    c.partner_b_name,
    count(DISTINCT (a.role, a.question_id))
      FILTER (WHERE a.question_id IS NOT NULL) AS answered,
    (
      SELECT min(e.created_at)
      FROM public.full_report_clicks e
      WHERE e.couple_id = c.id
        AND e.created_at >= b.start_at
        AND e.created_at < b.end_at
    ) AS first_click_at
  FROM public.couples c
  CROSS JOIN bounds b
  LEFT JOIN public.answers a
    ON a.couple_id = c.id
    AND a.created_at >= b.start_at
    AND a.created_at < b.end_at
    AND a.role IS NOT NULL
    AND a.answer_value IS NOT NULL
  WHERE c.created_at >= b.start_at AND c.created_at < b.end_at
  GROUP BY c.id, c.partner_a_name, c.partner_b_name, b.start_at, b.end_at
),
steps (step_no, threshold, stage, requires_click) AS (
  VALUES
    (1, 0,  'Создали пару', false),
    (2, 1,  'Ответили на 1 вопрос', false),
    (3, 5,  'Ответили на 5 вопросов', false),
    (4, 10, 'Ответили на 10 вопросов', false),
    (5, 11, 'Ответили на 11 вопросов', false),
    (6, 15, 'Ответили на 15 вопросов', false),
    (7, 20, 'Ответили на 20 вопросов', false),
    (8, 20, 'Нажали «Полный разбор»', true)
),
counts AS (
  SELECT
    s.step_no,
    s.stage,
    count(p.id) AS pairs,
    CASE WHEN s.requires_click THEN coalesce(
      jsonb_agg(
        jsonb_build_object(
          'Имя первого партнёра', p.partner_a_name,
          'Имя второго партнёра', p.partner_b_name,
          'Первый клик (МСК)', to_char(
            p.first_click_at AT TIME ZONE 'Europe/Moscow', 'DD.MM.YYYY HH24:MI'
          )
        ) ORDER BY p.first_click_at, p.id
      ) FILTER (WHERE p.id IS NOT NULL),
      '[]'::jsonb
    ) END AS clicked_pairs
  FROM steps s
  LEFT JOIN progress p
    ON p.answered >= s.threshold
    AND (NOT s.requires_click OR p.first_click_at IS NOT NULL)
  GROUP BY s.step_no, s.stage, s.requires_click
),
report_rows AS (
  SELECT 0 AS section, 1 AS step_no, 'Открыли главную' AS stage,
    'Браузеры' AS unit, opened AS total,
    CASE WHEN opened > 0 THEN 100.0 END AS from_start,
    NULL::numeric AS from_previous, NULL::jsonb AS clicked_pairs
  FROM home_counts
  UNION ALL
  SELECT 0, 2, 'Нажали «Пройти тест вдвоём»', 'Браузеры', clicked,
    round(100.0 * clicked / nullif(opened, 0), 1),
    round(100.0 * clicked / nullif(opened, 0), 1), NULL::jsonb
  FROM home_counts
  UNION ALL
  SELECT 1, step_no, stage, 'Пары', pairs,
    round(100.0 * pairs / nullif(first_value(pairs) OVER (ORDER BY step_no), 0), 1),
    round(100.0 * pairs / nullif(lag(pairs) OVER (ORDER BY step_no), 0), 1),
    clicked_pairs
  FROM counts
)
SELECT
  stage AS "Этап",
  unit AS "Единица",
  total AS "Количество",
  from_start AS "% от первого этапа в группе",
  from_previous AS "% от предыдущего этапа в группе",
  clicked_pairs AS "Кто нажал"
FROM report_rows
ORDER BY section, step_no;
