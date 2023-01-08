function myFunction() {
  
  const webhook_url = "" ; //DiscordのテキストチャットのwebhookURLを記入

  //スプレッドシートから必要な情報を取得
  let spreadSheet = SpreadsheetApp.openByUrl(""); //GoogleスプレッドシートのURLを記入
  let sheet = spreadSheet.getSheetByName("期日シート"); //イベントがまとめてあるシート名を指定
  let cellData = sheet.getRange("A2:E50"); //まだ終わっていないイベント内容が記入してあるセル領域を指定
  let data = cellData.getValues();
  let cellData2 = sheet.getRange("F2:J50"); //既に終わったイベント内容を記入するセル領域(cellDataと同じ列数)を指定
  let data2 = cellData2.getValues();

  //現在の日付を取得
  var now = new Date();
  var tom = new Date();
  tom.setDate(tom.getDate() + 1);
  var yes = new Date();
  yes.setDate(yes.getDate() - 1);
  console.log(now, tom, yes);

  //セルに情報がある限り上から下に処理
  offset = 0;
  for (let l = 0; l < 49; l++) {
    i = l - offset;
    var dead = data[l-offset][0];
    console.log(data[l-offset][1], dead);
    if (dead == "" || dead == "99/99") {
      break;
    }

    //翌日のセル移動＆整列処理
    if (yes.getFullYear() == dead.getFullYear() && yes.getMonth() == dead.getMonth() && yes.getDate() == dead.getDate()) {
      console.log("昨日", data[i]);

      //空白の行を探索して期日の過ぎたデータを格納
      cnt = 2;
      for (let j = 0; j < 49; j++) {
        var contents = data2[j][i];
        if (contents == "") {
          break;
        }
        cnt++;
      }
      var index = 'F' + cnt + ':J' + cnt;
      console.log(index);
      let range = sheet.getRange(`${index}`);
      range.setValues([data[i]]);

      //コピー元のデータを削除して上に整列 
      range = sheet.getRange('A2:E2');
      range.deleteCells(SpreadsheetApp.Dimension.ROWS);
      offset++;
      console.log(offset, i)

      //data,data2の更新(しないと処理が永遠に繰り返す)
      data = cellData.getValues();
      data2 = cellData2.getValues();
    }

    //当日の通知処理
    if (now.getFullYear() == dead.getFullYear() && now.getMonth() == dead.getMonth() && now.getDate() == dead.getDate()) {
      console.log("今日", data[i][1], data[i][2], data[i][3]);

      var message = `【連絡】今日(${now.getMonth()+1}/${now.getDate()})は"${data[i][1]}"の${data[i][2]}です！出し忘れてないですか？\n 補足:${data[i][4]}\n URL → ${data[i][3]}`; //送信する任意のメッセージを入力
      
      const payload = {
        username: "インターン期日お知らせbot", //botの名前を記入 
        content: message,
      };

      UrlFetchApp.fetch(webhook_url, {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(payload),
      });

      Utilities.sleep(500); //一気に複数件送ろうとするとエラー吐かれるので通知ごとに0.5秒ほど待つ
    }

    //前日の通知処理
    if (tom.getFullYear() == dead.getFullYear() && tom.getMonth() == dead.getMonth() && tom.getDate() == dead.getDate()) {
      console.log("明日", data[i][1], data[i][2], data[i][3]);

      var message = `【連絡】明日(${now.getMonth()+1}/${now.getDate()+1})は"${data[i][1]}"の${data[i][2]}です！急げ～！\n 補足:${data[i][4]}\n URL → ${data[i][3]}`; //送信する任意のメッセージを入力

      const payload = {
        username: "インターン期日お知らせbot", //botの名前を記入 
        content: message,
      };

      UrlFetchApp.fetch(webhook_url, {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(payload),
      });

      Utilities.sleep(500); //一気に複数件送ろうとするとエラー吐かれるので通知ごとに0.5秒ほど待つ
    }
  }
}
