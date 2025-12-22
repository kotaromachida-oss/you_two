/**
 * 送信メールのテンプレート
 */

// メール設定
const Options = {
  from: 'test@youtwo.jp',      // 送信元メールアドレス
  name: 'YouTwo',      // 送信元表示名
  replyTo: 'test@youtwo.jp',   // 返信先メールアドレス
  cc: '',                                // CCメールアドレス
  bcc: '',                               // BCCメールアドレス
};

// 送信メールの件名
const MailSubject = `8/7(木)開催 第3回 Prototyping Contest オンライン説明会`;

// 送信メールの本文
const MailBody = () => (`

パワーカップル専用のサービスYouTwoへ
ご招待いたします。

以下のフォームより、必要事項をご登録ください。
https://youtwo.jp/application

`);



function doPost(e) {
  // const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("フォームの回答 1");
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.email,
  ]);

  GmailApp.sendEmail(data.email, MailSubject, MailBody(), Options);

  const output = ContentService.createTextOutput(
    JSON.stringify({ result: "success" })
  );
  output.setMimeType(ContentService.MimeType.JSON);

  return output.setHeader("Access-Control-Allow-Origin", "*")
               .setHeader("Access-Control-Allow-Methods", "POST");
}