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

export default function InvitePage() {
    const params = useParams<{ token: string }>();
    const router = useRouter();

    const token = params.token;

    const [couple, setCouple] = useState<Couple | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function loadCouple() {
            try {
                const response = await fetch(
                    `/api/couples?token=${encodeURIComponent(token)}`,
                    {
                        cache: 'no-store',
                    }
                );

                if (!response.ok) {
                    throw new Error('Invite not found');
                }

                const data = await response.json();

                setCouple(data);

                if (
                    data.partner_a_completed &&
                    data.partner_b_completed
                ) {
                    router.replace(`/result/${data.id}`);
                }
            } catch (error) {
                console.error(error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        loadCouple();
    }, [token, router]);

    function startTest() {
        if (!couple) {
            return;
        }

        router.push(
            `/test/${couple.id}?role=b`
        );
    }

    if (loading) {
        return (
            <main className="invite-page">
                <div className="invite-container">
                    <div className="loading-text">
                        Загружаем приглашение...
                    </div>
                </div>
            </main>
        );
    }

    if (error || !couple) {
        return (
            <main className="invite-page">
                <div className="invite-container">

                    <div className="couple-visual">
                        <div className="couple-circle couple-circle-left" />
                        <div className="couple-circle couple-circle-right" />
                    </div>

                    <h1 className="invite-title">
                        Ссылка не найдена.
                    </h1>

                    <p className="invite-description">
                        Возможно, приглашение устарело или ссылка была
                        скопирована не полностью.
                    </p>

                    <button
                        type="button"
                        className="invite-button"
                        onClick={() => router.push('/')}
                    >
                        На главную
                    </button>

                </div>

                <style jsx>{styles}</style>
            </main>
        );
    }

    return (
        <main className="invite-page">
            <div className="invite-container">

                <div className="couple-visual">
                    <div className="couple-circle couple-circle-left" />
                    <div className="couple-circle couple-circle-right" />
                </div>

                <div className="invite-eyebrow">
                    ВАША ПАРА
                </div>

                <h1 className="invite-title">
                    Первый ответ уже готов.
                </h1>

                <p className="invite-description">
                    Теперь твоя очередь.
                    <br />
                    Ответы первого человека тебе не показываются.
                </p>

                <div className="names-card">
                    <div className="person">
                        <div className="person-dot person-dot-ready">
                            ✓
                        </div>

                        <div className="person-name">
                            {couple.partner_a_name}
                        </div>

                        <div className="person-status">
                            готово
                        </div>
                    </div>

                    <div className="names-line" />

                    <div className="person">
                        <div className="person-dot">
                            2
                        </div>

                        <div className="person-name">
                            {couple.partner_b_name}
                        </div>

                        <div className="person-status">
                            твоя очередь
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    className="invite-button"
                    onClick={startTest}
                >
                    Начать свою часть
                </button>

                <p className="invite-note">
                    Прохождение займёт около 7 минут.
                    Ваши ответы будут сравнены только после завершения теста.
                </p>

            </div>

            <style jsx>{styles}</style>
        </main>
    );
}

const styles = `

  .invite-page {
    min-height: 100svh;

    background: #faf8f6;

    display: flex;
    justify-content: center;

    padding:
      max(48px, env(safe-area-inset-top))
      20px
      max(40px, env(safe-area-inset-bottom));

    box-sizing: border-box;
  }

  .invite-container {
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
    margin-bottom: 32px;
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

  .invite-eyebrow {
    margin-bottom: 20px;

    color: #a9476b;

    font-size: 13px;
    font-weight: 700;

    letter-spacing: 0.14em;
  }

  .invite-title {
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

  .invite-description {
    max-width: 680px;

    margin:
      30px
      auto
      28px;

    color: #81777a;

    font-size: 21px;
    line-height: 1.45;
  }

  .names-card {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;

    margin-bottom: 24px;
    padding: 22px 28px;

    border: 1px solid #e8dfdc;
    border-radius: 22px;

    background: rgba(255, 255, 255, 0.7);
  }

  .person {
    flex: 1;

    min-width: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .person-dot {
    width: 42px;
    height: 42px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 10px;

    border-radius: 50%;

    background: #f0e3e7;
    color: #a9476b;

    font-size: 14px;
    font-weight: 700;
  }

  .person-dot-ready {
    background: #a9476b;
    color: #ffffff;
  }

  .person-name {
    max-width: 100%;

    overflow: hidden;

    color: #171515;

    font-size: 17px;
    font-weight: 650;

    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .person-status {
    margin-top: 4px;

    color: #93898b;

    font-size: 12px;
  }

  .names-line {
    width: 60px;
    height: 1px;

    flex-shrink: 0;

    margin: 0 14px;

    background: #dfd2d5;
  }

  .invite-button {
    width: 100%;

    border: 0;
    border-radius: 20px;

    background: #171515;
    color: #ffffff;

    padding: 23px 24px;

    font-size: 19px;
    font-weight: 650;

    cursor: pointer;

    transition:
      transform 160ms ease,
      opacity 160ms ease;
  }

  .invite-button:hover {
    opacity: 0.92;
  }

  .invite-button:active {
    transform: scale(0.985);
  }

  .invite-note {
    max-width: 600px;

    margin:
      20px
      auto
      0;

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

    .invite-page {
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

    .invite-eyebrow {
      margin-bottom: 16px;

      font-size: 11px;
    }

    .invite-title {
      font-size: 46px;
    }

    .invite-description {
      margin-top: 22px;
      margin-bottom: 24px;

      font-size: 17px;
    }

    .names-card {
      padding: 18px 14px;

      border-radius: 18px;
    }

    .names-line {
      width: 32px;

      margin-left: 8px;
      margin-right: 8px;
    }

    .person-name {
      font-size: 15px;
    }

    .person-status {
      font-size: 11px;
    }

    .invite-button {
      padding: 19px 20px;

      border-radius: 17px;

      font-size: 17px;
    }

  }

`;