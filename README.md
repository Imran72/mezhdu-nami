# между нами — MVP

Парный AI-тест: два человека независимо отвечают на 18 вопросов, получают сравнение восприятия отношений и могут купить AI-разбор за 299 ₽.

## 1. Supabase
1. Создайте проект Supabase.
2. Откройте SQL Editor.
3. Выполните целиком `supabase`.
4. В Project Settings → API возьмите Project URL, anon key и service_role key.

## 2. Локальный запуск
```bash
cp .env.example .env.local
npm install
npm run dev
```
Заполните минимум:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```
Откройте http://localhost:3000.

## 3. Проверка основной механики
1. Пройдите тест первым человеком.
2. На waiting-экране скопируйте invite URL.
3. Откройте его в другом браузере/incognito/телефоне.
4. Пройдите тест партнёром.
5. После второго прохождения откроется `/result/<coupleId>`.

До подключения YooKassa и OpenAI весь бесплатный flow работает.

## 4. OpenAI
Добавьте в env:
```env
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-5-mini
```
Модель можно поменять через env без изменения кода.

## 5. YooKassa
Добавьте:
```env
YOOKASSA_SHOP_ID=...
YOOKASSA_SECRET_KEY=...
```
В кабинете YooKassa настройте HTTP notification на:
`https://ВАШ-ДОМЕН/api/webhook/yookassa`

Событие: `payment.succeeded`.

Webhook не доверяет входящему телу как доказательству оплаты: после уведомления сервер сам запрашивает платёж у YooKassa и только затем выставляет `paid=true`.

## 6. GitHub
В каталоге проекта:
```bash
git init
git add .
git commit -m "Initial MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```
Не коммитьте `.env.local`.

## 7. Railway
1. New Project → Deploy from GitHub repo.
2. Выберите репозиторий.
3. Railway распознает Next.js.
4. В Variables добавьте все production env.
5. `NEXT_PUBLIC_SITE_URL` должен быть публичным Railway-доменом или вашим доменом, например `https://mezhdunami.ru`.
6. Deploy.

Build command: `npm run build`
Start command: `npm run start`

После получения production URL обновите `NEXT_PUBLIC_SITE_URL` и URL webhook в YooKassa.

## 8. Что проверить перед реальным трафиком
- пройти flow на iPhone/Android;
- открыть invite на другом устройстве;
- проверить refresh каждого экрана;
- провести тестовую оплату;
- убедиться, что `paid=true` появляется только после webhook;
- проверить генерацию AI report;
- добавить политику конфиденциальности и оферту;
- настроить домен и HTTPS;
- настроить Яндекс Метрику.

## 9. Важно для production
Это MVP. Перед масштабированием нужны: нормальная авторизация доступа к конкретной паре (сейчас couple UUID фактически является секретом), rate limiting API, CAPTCHA/anti-abuse, логирование, полноценная обработка ошибок, privacy/delete flow, YooKassa receipt/налоговые настройки под вашу юр. схему, analytics events и юридические тексты.

## 10. Серверный учёт переходов из VK Ads

1. Выполните `supabase/add-ad-clicks.sql` в Supabase SQL Editor. Для новой базы сначала примените `schema.sql`, `add-home-funnel-events.sql` и `add-full-report-clicks.sql`.
2. Сгенерируйте секрет командой `openssl rand -hex 32`. Задайте его как `AD_CLICK_SECRET` в Railway Variables и в `.env.local` для локальной проверки. Приложение также использует существующие `NEXT_PUBLIC_SUPABASE_URL` и серверный `SUPABASE_SERVICE_ROLE_KEY`. При отсутствии нового секрета переходы сохраняются без хеша IP и привязки к сессии.
3. Разверните приложение и укажите в VK Ads конечный HTTPS-адрес главной, например `https://ВАШ-ДОМЕН/?utm_source=vk&utm_medium=cpc&utm_campaign=campaign&utm_content=creative&utm_term=audience`. Используйте домен, который уже отдаёт страницу напрямую. UTM и маркер `rb_clickid` остаются в исходном URL.

Next.js Proxy запускает запись для каждого GET главной с хотя бы одной непустой UTM-меткой. Ответ помечается `Cache-Control: private, no-store`. Запись выполняется в фоне с тайм-аутом 350 мс. `click_id` передаётся через подписанную HttpOnly-cookie браузерной сессии. IP хешируется HMAC-SHA256 по заголовку `X-Real-IP` от публичного HTTP-прокси Railway. Если корректный IP недоступен, хеш равен `NULL`.

Повторный GET, включая ручное обновление, создаёт новый UUID и обновляет атрибуцию браузера. По одинаковым UTM сервер не может различить обновление страницы и второй реальный клик. GET-предпросмотры, предзагрузки и запросы React Server Components помечаются и сохраняются без обновления cookie. HEAD-запросы пропускаются. Флаги определяются эвристически.

### Проверка

1. Запустите `node tests/ad-click-flow.cjs` после установки зависимостей, используя Node.js 22.13 или новее. Тест использует настоящие типы запросов Next.js и имитацию записи в Supabase.
2. Откройте тестовую рекламную ссылку в новой браузерной сессии. В Network проверьте первый запрос документа: статус `200`, отсутствие `Location`, исходный URL с UTM и `Cache-Control: private, no-store`. В `Set-Cookie` найдите `mezhdu_nami_ad_click`. UUID — часть значения до точки. Нажмите «Пройти тест вдвоём» и создайте пару.
3. Подставьте UUID в запросы Supabase SQL Editor. Ответы партнёра из другого браузера связываются с переходом через пару. Клик по «Полному разбору» появится после завершения теста обоими участниками и нажатия соответствующей кнопки.

```sql
select click_id, created_at, utm_source, utm_medium, utm_campaign,
       utm_content, utm_term, ip_hash, is_preview, is_suspicious
from public.ad_clicks where click_id = 'UUID';

select visitor_id, day_moscow, event
from public.home_funnel_ad_clicks where click_id = 'UUID';

select id, created_at from public.couples where click_id = 'UUID';

select a.couple_id, a.role, count(*) as answers
from public.answers a join public.couples c on c.id = a.couple_id
where c.click_id = 'UUID'
group by a.couple_id, a.role;

select r.couple_id, r.created_at, r.click_id as report_browser_click_id
from public.full_report_clicks r join public.couples c on c.id = r.couple_id
where c.click_id = 'UUID' or r.click_id = 'UUID';
```

4. Повторите переход из того же браузера. Для нового UUID появится отдельная запись; исходный отчёт по-прежнему считает уникальные браузеры за день. Для проверки предпросмотра выполните `curl -sS -D - -o /dev/null -H 'Sec-Purpose: prefetch' 'https://ВАШ-ДОМЕН/?utm_source=vk&utm_campaign=preview-check'`. Ожидаются `200`, отсутствие cookie атрибуции и строка с обоими флагами в `ad_clicks`.
5. Проверьте с ролями `anon` и `authenticated`, что `ad_clicks`, `home_funnel_ad_clicks` и RPC атрибуции недоступны через API. При сбое вставки главная открывается штатно. У события воронки в таком случае может быть UUID без строки в `ad_clicks`.

Сравнивайте отчёты за одинаковый период и по одинаковым UTM. `ad_clicks` считает запросы главной, включая отмеченные предпросмотры, а дневной отчёт считает браузеры.
