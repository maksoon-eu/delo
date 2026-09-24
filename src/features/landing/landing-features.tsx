import Image from 'next/image';
import documentImage from '@/assets/images/landing/document.png';
import historyImage from '@/assets/images/landing/history.png';
import ordersImage from '@/assets/images/landing/orders.png';
import publicOrderImage from '@/assets/images/landing/public-order.png';

export function LandingFeatures() {
  return (
    <section id="features" className="landing-section py-24 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="font-display max-w-[720px] text-[clamp(32px,4.6vw,56px)] font-extrabold leading-[1.03] tracking-[-0.025em]">
          Один сервис вместо <span className="text-muted-foreground">десяти чатов</span>
        </h2>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          <article className="landing-feature-card flex min-h-[420px] flex-col px-8 pt-8 lg:col-span-2 lg:row-span-2">
            <div className="max-w-[380px]">
              <h3 className="font-display text-[26px] font-bold">Клиенты и заказы</h3>
              <p className="text-muted-foreground mt-2.5 text-[15px]">
                Все проекты, статусы и оплаты на одном дашборде.
              </p>
            </div>
            <div className="border-border bg-background mt-auto overflow-hidden rounded-t-xl border-x border-t">
              <Image
                src={ordersImage}
                alt="Дашборд заказов Delo"
                className="block h-auto w-full"
                sizes="(min-width: 1024px) 66vw, 100vw"
              />
            </div>
          </article>

          <article className="landing-feature-card flex flex-col justify-between gap-8 p-7">
            <span className="text-primary font-mono text-[11px] tracking-[0.2em]">01</span>
            <div>
              <h3 className="font-display text-[21px] font-bold">Фиксация условий</h3>
              <p className="text-muted-foreground mt-2 text-[14px] leading-[1.55]">
                Цена, сроки и состав работ — закреплены навсегда.
              </p>
            </div>
          </article>

          <article className="landing-feature-card flex flex-col justify-between gap-8 p-7">
            <span className="text-primary font-mono text-[11px] tracking-[0.2em]">02</span>
            <div>
              <h3 className="font-display text-[21px] font-bold">Согласование в клик</h3>
              <p className="text-muted-foreground mt-2 text-[14px] leading-[1.55]">
                Одна кнопка клиента — и согласие зафиксировано.
              </p>
            </div>
          </article>

          <article className="landing-feature-card flex min-h-[300px] flex-col px-6 pt-6">
            <h3 className="font-display text-[19px] font-bold">Ссылка для клиента</h3>
            <p className="text-muted-foreground mb-6 mt-1.5 text-[14px]">
              Без регистрации — всё видно по ссылке.
            </p>
            <div className="border-border bg-background mt-auto overflow-hidden rounded-t-xl border-x border-t">
              <Image
                src={publicOrderImage}
                alt="Публичная страница заказа по ссылке"
                className="block h-auto w-full"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
            </div>
          </article>

          <article className="landing-feature-card flex min-h-[300px] flex-col px-6 pt-6">
            <h3 className="font-display text-[19px] font-bold">Документы в PDF</h3>
            <p className="text-muted-foreground mb-6 mt-1.5 text-[14px]">
              Договор и акт — за пару секунд.
            </p>
            <div className="border-border bg-background mt-auto overflow-hidden rounded-t-xl border-x border-t">
              <Image
                src={documentImage}
                alt="Раздел файлов и документов с подписанным актом"
                className="block h-auto w-full"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
            </div>
          </article>

          <article className="landing-feature-card flex min-h-[300px] flex-col px-6 pt-6">
            <h3 className="font-display text-[19px] font-bold">История действий</h3>
            <p className="text-muted-foreground mb-6 mt-1.5 text-[14px]">
              Каждый шаг записан и доказуем.
            </p>
            <div className="border-border bg-background mt-auto overflow-hidden rounded-t-xl border-x border-t">
              <Image
                src={historyImage}
                alt="История действий по заказу"
                className="block h-auto w-full"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
