# Event Reminder Bot on Discord
Googleスプレッドシート上にまとめてある情報をDiscordなどのチャットアプリでリマインドしてくれるbotです.
自分が扱っていた環境のものをそのまま置いただけなため, インターンシップや説明会などの情報を通知する形に設定してあります.

# 環境
スクリプトの実行環境としてGoogle Apps Script(以下GAS)を用いています.\
下記のサンプルシートのようなGoogleスプレッドシート上から`拡張機能 > Google Apps Script`を選択して, 情報をまとめたスプレッドシートとGASプログラムを連携させました.
- [サンプルシート](https://docs.google.com/spreadsheets/d/1pNOjRnwvDSyEaLt6kOVcMQqpEOf69pfN0fmziwzrKsY/edit?usp=sharing)

上記の手順で作成したプログラムを, GAS上のトリガー機能を用いて毎朝7:00に定期実行して利用していました。


# 仕様
  - GoogleスプレッドシートのA-E列に今後あるイベントに関する情報を入力しておくと、期日の前日と当日にチャットアプリ上でリマインドします.
  - イベントの期日が過ぎると自動的に終了したイベントをまとめる領域に情報を移動させます.
  - 記入可能情報
    - A列: 期日
    - B列: 会社名
    - C列: イベント内容
    - D列: イベントに関するURL
    - E列: その他補足
  
  - Discordと連携してBotとしてリマインドメッセージを送るので、各々Webhookを用意する必要があります。([参考](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks))
