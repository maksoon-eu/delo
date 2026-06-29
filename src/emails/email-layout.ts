type EmailLayoutInput = {
  title: string;
  intro: string;
  ctaLabel: string;
  ctaUrl: string;
  note: string;
};

export function createEmailLayout(input: EmailLayoutInput) {
  const { title, intro, ctaLabel, ctaUrl, note } = input;

  return `
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
  </head>
  <body style="margin:0;color:#f5f3ff;font-family:Inter,Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:440px;overflow:hidden;border:1px solid #352457;border-radius:20px;background:#13091f;">
            <tr>
              <td style="padding:28px 32px 16px;">
                <div style="display:inline-block;border-radius:999px;background:#7c3aed;padding:8px 12px;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:0;">
                  Delo
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 8px;">
                <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.2;font-weight:700;letter-spacing:0;">
                  ${title}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 24px;">
                <p style="margin:0;color:#d8d1e8;font-size:16px;line-height:1.6;">
                  ${intro}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 28px;">
                <a href="${ctaUrl}" style="display:inline-block;border-radius:12px;background:#8b5cf6;padding:14px 18px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;">
                  ${ctaLabel}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 28px;text-align:center;">
                <div style="border-top:1px solid #352457;padding-top:20px;color:#a99dbc;font-size:13px;line-height:1.6;">
                  <p style="margin:0 0 12px;">${note}</p>
                  <p style="margin:0;">Если кнопка не открылась, вставьте ссылку в браузер:<br /><a href="${ctaUrl}" style="color:#c4b5fd;text-decoration:underline;">${ctaUrl}</a></p>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
}
