'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Couple = {
    id: string;
    partner_a_name: string;
    partner_b_name: string;
    invite_token: string;
    partner_a_completed?: boolean;
    partner_b_completed?: boolean;
};

export default function WaitingPage() {
    const params = useParams<{ coupleId: string }>();
    const router = useRouter();

    const coupleId = params.coupleId;

    const [couple, setCouple] = useState<Couple | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

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

            const data: Couple = await response.json();

            setCouple(data);

            if (
                data.partner_a_completed &&
                data.partner_b_completed
            ) {
                router.replace(`/result/${coupleId}`);
            }
        } catch (err) {
            console.error(err);
            setError('Не удалось загрузить данные пары.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCouple();

        const interval = window.setInterval(() => {
            loadCouple();
        }, 5000);

        return () => {
            window.clearInterval(interval);
        };
    }, [coupleId]);

    if (loading) {
        return (
            <main className="waiting-page">
                <div className="waiting-container">
                    <div className="loading-text">
                        Загружаем...
                    </div>
                </div>

                <style jsx>{styles}</style>
            </main>
        );
    }

    if (error || !couple) {
        return (
            <main className="waiting-page">
                <div className="waiting-container">
                    <h1 className="waiting-title">
                        Не удалось найти пару
                    </h1>

                    <p className="waiting-description">
                        {error ||
                            'Возможно, ссылка устарела или была открыта неправильно.'}
                    </p>
                </div>

                <style jsx>{styles}</style>
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
        'Я прошёл небольшой тест про наши отношения 👀\n\n' +
        'Теперь твоя очередь. Ответь отдельно от меня — ' +
        'потом посмотрим, насколько одинаково мы воспринимаем наши отношения.';

    async function copyInviteLink() {
        try {
            await navigator.clipboard.writeText(inviteUrl);

            setCopied(true);

            window.setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (err) {
            console.error(err);

            const textarea =
                document.createElement('textarea');

            textarea.value = inviteUrl;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';

            document.body.appendChild(textarea);

            textarea.focus();
            textarea.select();

            document.execCommand('copy');

            document.body.removeChild(textarea);

            setCopied(true);

            window.setTimeout(() => {
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
        } catch (err) {
            if (
                err instanceof DOMException &&
                err.name === 'AbortError'
            ) {
                return;
            }

            console.error(err);

            await copyInviteLink();
        }
    }

    return (
        <main className="waiting-page">
            <div className="waiting-container">

                <div className="couple-visual">
                    <div className="couple-circle couple-circle-left" />
                    <div className="couple-circle couple-circle-right" />
                </div>

                <div className="waiting-status">
                    1 ИЗ 2 ГОТОВ
                </div>

                <h1 className="waiting-title">
                    Твоя часть готова.
                </h1>

                <p className="waiting-description">
                    Теперь очередь:{' '}
                    <strong>
                        {couple.partner_b_name}
                    </strong>
                    .
                    <br />
                    После второго ответа вы увидите картину целиком.
                </p>

                <button
                    type="button"
                    className="waiting-share-button"
                    onClick={shareInvite}
                >
                    Отправить приглашение
                </button>

                <div className="invite-link-section">

                    <div className="invite-link-label">
                        ССЫЛКА ДЛЯ ПАРТНЁРА
                    </div>

                    <div className="invite-link-box">

                        <div className="invite-link-value">
                            {inviteUrl}
                        </div>

                        <button
                            type="button"
                            className={
                                copied
                                    ? 'invite-copy-button copied'
                                    : 'invite-copy-button'
                            }
                            onClick={copyInviteLink}
                        >
                            {copied
                                ? 'Скопировано ✓'
                                : 'Копировать'}
                        </button>

                    </div>

                </div>

                <p className="waiting-note">
                    Результат откроется автоматически,
                    когда вы оба закончите.
                </p>

            </div>

            <style jsx>{styles}</style>
        </main>
    );
}

const styles = `

  .waiting-page {
    min-height: 100svh;
    box-sizing: border-box;

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

  .waiting-status {
    margin-bottom: 22px;

    color: #a9476b;

    font-size: 15px;
    font-weight: 600;

    letter-spacing: 0.14em;
  }

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

    margin: 30px auto;

    color: #81777a;

    font-size: 21px;
    line-height: 1.45;
  }

  .waiting-description strong {
    color: #171515;
    font-weight: 600;
  }

  .waiting-share-button {
    width: 100%;

    border: 0;
    border-radius: 20px;

    background: #171515;
    color: #ffffff;

    padding: 23px 24px;

    font-size: 19px;
    font-weight: 650;

    cursor: pointer;
  }

  .waiting-share-button:hover {
    opacity: 0.92;
  }

  .invite-link-section {
    width: 100%;

    margin-top: 28px;

    text-align: left;
  }

  .invite-link-label {
    margin: 0 0 10px 4px;

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

    padding: 9px 9px 9px 18px;

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
  }

  .invite-copy-button.copied {
    background: #e8efe9;
    color: #52705a;
  }

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

    .invite-link-box {
      gap: 8px;
      padding-left: 14px;
    }

    .invite-link-value {
      font-size: 12px;
    }

    .invite-copy-button {
      padding: 11px 12px;

      font-size: 12px;
    }

  }

`;