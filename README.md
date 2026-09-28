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
