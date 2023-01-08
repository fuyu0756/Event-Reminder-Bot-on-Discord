# Event Reminder Bot on Discord
Googleスプレッドシート上にまとめてある情報をDiscordなどのチャットアプリでリマインドしてくれるbotです.
自分が扱っていた環境のものをそのまま置いただけなため、インターンシップや説明会などの情報を通知する形に設定してあります.

# 仕様
  - GoogleスプレッドシートのA-E列に今後あるイベントに関する情報を入力しておくと、期日の前日と当日にチャットアプリ上でリマインドします.
  - イベントの期日が過ぎると自動的に終了したイベントをまとめる領域に情報を移動させます.
  - 記入可能情報
    - A列: 期日
    - B列: 会社名
    - C列: イベント内容
    - D列: イベントに関するURL\
    - E列: その他補足
  - [サンプルシート](https://docs.google.com/spreadsheets/d/1pNOjRnwvDSyEaLt6kOVcMQqpEOf69pfN0fmziwzrKsY/edit?usp=sharing)
