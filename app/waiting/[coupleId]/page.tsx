'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Couple = {
    id: string;
    partner_a_name: string;
    partner_b_name: string;
    invite_token: string;
    partner_a_completed: boolean;
    partner_b_completed: boolean;
};

export default function WaitingPage() {
    const params = useParams<{ coupleId: string }>();
    const router = useRouter();

    const coupleId = params.coupleId;

    const [couple, setCouple] = useState<Couple | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    async function loadCouple() {
        try {
            const response = await fetch(
                `/api/couples?id=${encodeURIComponent(coupleId)}`,
                {
                    cache: 'no-store',
                }
            );

            if (!response.ok) {
                throw new Error('Не удалось загрузить пару');
            }

            const data = await response.json();

            setCouple(data);

            // Если оба уже закончили — сразу открываем результат.
            if (data.partner_a_completed && data.partner_b_completed) {
                router.replace(`/result/${coupleId}`);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCouple();

        // Проверяем раз в несколько секунд:
        // вдруг партнёр уже закончил тест.
        const interval = setInterval(() => {
            loadCouple();
        }, 5000);

        return () => clearInterval(interval);
    }, [coupleId]);

    if (loading) {
        return (
            <main className="waiting-page">
                <div className="waiting-container">
                    <div className="loading-text">
                        Загружаем...
                    </div>
                </div>
            </main>
        );
    }

    if (!couple) {
        return (
            <main className="waiting-page">
                <div className="waiting-container">
                    <h1>Не удалось найти пару</h1>

                    <p className="waiting-description">
                        Возможно, ссылка устарела или была открыта неправильно.
                    </p>
                </div>
            </main>
        );
    }

    const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        (typeof window !== 'undefined'
            ? window.location.origin
            : '');

    const inviteUrl =
        `${siteUrl}/invite/${couple.invite_token}`;

    const shareText =
        `Я прошёл небольшой тест про наши отношения 👀\n\n` +
        `Теперь твоя очередь. Ответь отдельно от меня — ` +
        `потом посмотрим, насколько одинаково мы воспринимаем наши отношения.`;

    async function copyInviteLink() {
        try {
            await navigator.clipboard.writeText(inviteUrl);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error('Clipboard error:', error);

            // Fallback для старых браузеров
            const textarea = document.createElement('textarea');

            textarea.value = inviteUrl;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';

            document.body.appendChild(textarea);

            textarea.focus();
            textarea.select();

            document.execCommand('copy');

            document.body.removeChild(textarea);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }
    }

    async function shareInvite() {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'между нами',
                    text: shareText,
                    url: inviteUrl,
                });

                return;
            }

            await copyInviteLink();
        } catch (error) {
            // AbortError означает, что пользователь
            // просто закрыл системное меню Share.
            if (
                error instanceof DOMException &&
                error.name === 'AbortError'
            ) {
                return;
            }

            console.error('Share error:', error);

            await copyInviteLink();
        }
    }

    return (
        <main className="waiting-page">
            <div className="waiting-container">

                {/* VISUAL */}

                <div className="couple-visual">
                    <div className="couple-circle couple-circle-left" />
                    <div className="couple-circle couple-circle-right" />
                </div>

                {/* STATUS */}

                <div className="waiting-status">
                    1 ИЗ 2 ГОТОВ
                </div>

                {/* TITLE */}

                <h1 className="waiting-title">
                    Твоя часть готова.
                </h1>

                <p className="waiting-description">
                    Теперь нужен ответ {couple.partner_b_name}, чтобы увидеть
                    картину целиком.
                </p>

                {/* SHARE BUTTON */}

                <button
                    type="button"
                    className="waiting-share-button"
                    onClick={shareInvite}
                >
                    Пригласить {couple.partner_b_name}
                </button>

                {/* PERSONAL LINK */}

                <div className="invite-link-section">

                    <div className="invite-link-label">
                        ПЕРСОНАЛЬНАЯ ССЫЛКА ДЛЯ{' '}
                        {couple.partner_b_name.toUpperCase()}
                    </div>

                    <div className="invite-link-box">

                        <div className="invite-link-value">
                            {inviteUrl}
                        </div>

                        <button
                            type="button"
                            className={`invite-copy-button ${
                                copied ? 'invite-copy-button-copied' : ''
                            }`}
                            onClick={copyInviteLink}
                        >
                            {copied ? 'Скопировано ✓' : 'Копировать'}
                        </button>

                    </div>

                </div>

                <p className="waiting-note">
                    Мы автоматически откроем результат, когда{' '}
                    {couple.partner_b_name} закончит.
                </p>

            </div>

            <style jsx>{`

        .waiting-page {
          min-height: 100svh;
          background: #faf8f6;

          display: flex;
          justify-content: center;

          padding:
            max(48px, env(safe-area-inset-top))
            20px
            max(40px, env(safe-area-inset-bottom));
        }

        .waiting-container {
          width: 100%;
          max-width: 760px;

          display: flex;
          flex-direction: column;
          align-items: center;

          text-align: center;
        }

        /* VISUAL */

        .couple-visual {
          position: relative;

          width: 250px;
          height: 145px;

          margin-top: 105px;
          margin-bottom: 34px;
        }

        .couple-circle {
          position: absolute;

          width: 145px;
          height: 145px;

          border-radius: 50%;
        }

        .couple-circle-left {
          left: 0;

          background: rgba(173, 75, 111, 0.42);
        }

        .couple-circle-right {
          right: 0;

          background: rgba(217, 166, 184, 0.38);
        }

        /* STATUS */

        .waiting-status {
          color: #a9476b;

          font-size: 15px;
          font-weight: 600;

          letter-spacing: 0.14em;

          margin-bottom: 22px;
        }

        /* TITLE */

        .waiting-title {
          margin: 0;

          color: #171515;

          font-family:
            Georgia,
            'Times New Roman',
            serif;

          font-size: clamp(48px, 6vw, 72px);
          line-height: 0.98;

          font-weight: 500;

          letter-spacing: -0.04em;
        }

        .waiting-description {
          max-width: 720px;

          margin:
            30px
            auto
            30px;

          color: #81777a;

          font-size: 21px;
          line-height: 1.45;
        }

        /* PRIMARY BUTTON */

        .waiting-share-button {
          width: 100%;

          border: 0;

          border-radius: 20px;

          background: #171515;
          color: white;

          padding: 23px 24px;

          font-size: 19px;
          font-weight: 650;

          cursor: pointer;

          transition:
            transform 160ms ease,
            opacity 160ms ease;
        }

        .waiting-share-button:hover {
          opacity: 0.92;
        }

        .waiting-share-button:active {
          transform: scale(0.985);
        }

        /* PERSONAL LINK */

        .invite-link-section {
          width: 100%;

          margin-top: 28px;

          text-align: left;
        }

        .invite-link-label {
          margin:
            0
            0
            10px
            4px;

          color: #9a8f92;

          font-size: 11px;
          font-weight: 700;

          letter-spacing: 0.12em;
        }

        .invite-link-box {
          width: 100%;

          display: flex;
          align-items: center;

          gap: 14px;

          box-sizing: border-box;

          padding:
            9px
            9px
            9px
            18px;

          border: 1px solid #e6ddda;
          border-radius: 18px;

          background: #ffffff;
        }

        .invite-link-value {
          flex: 1;

          min-width: 0;

          overflow: hidden;

          color: #5f5759;

          font-size: 14px;

          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .invite-copy-button {
          flex-shrink: 0;

          border: 0;

          border-radius: 12px;

          background: #f1e6e9;
          color: #9f4667;

          padding: 12px 16px;

          font-size: 13px;
          font-weight: 650;

          cursor: pointer;

          transition:
            background 160ms ease,
            transform 160ms ease;
        }

        .invite-copy-button:hover {
          background: #ead9df;
        }

        .invite-copy-button:active {
          transform: scale(0.97);
        }

        .invite-copy-button-copied {
          background: #e8efe9;
          color: #52705a;
        }

        /* NOTE */

        .waiting-note {
          margin-top: 20px;

          color: #93898b;

          font-size: 14px;
          line-height: 1.5;
        }

        .loading-text {
          margin-top: 45vh;

          color: #81777a;

          font-size: 18px;
        }

        /* MOBILE */

        @media (max-width: 600px) {

          .waiting-page {
            padding-left: 18px;
            padding-right: 18px;
          }

          .couple-visual {
            width: 190px;
            height: 112px;

            margin-top: 55px;
            margin-bottom: 28px;
          }

          .couple-circle {
            width: 112px;
            height: 112px;
          }

          .waiting-status {
            font-size: 12px;

            margin-bottom: 18px;
          }

          .waiting-title {
            font-size: 48px;
          }

          .waiting-description {
            margin-top: 22px;
            margin-bottom: 26px;

            font-size: 17px;
          }

          .waiting-share-button {
            padding: 19px 20px;

            border-radius: 17px;

            font-size: 17px;
          }

          .invite-link-section {
            margin-top: 22px;
          }

          .invite-link-box {
            padding-left: 14px;

            gap: 8px;
          }

          .invite-link-value {
            font-size: 12px;
          }

          .invite-copy-button {
            padding: 11px 12px;

            font-size: 12px;
          }

        }

      `}</style>
        </main>
    );
}