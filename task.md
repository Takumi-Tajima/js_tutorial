- [ ] フォームに都市を入力して、天気情報を取得する
  - [X] *curlでapi叩く*
  - [X] *ブラウザから決め打ちでapiを送信する*
  - [X] *inputに入力した値から送ってみる*
  - [X] *main.jsに処理を移す*
  - [X] *api.jsに処理を移して、main.jsで読み込む*
- [ ] 取得した情報を表示する
- [ ] 取得した情報を履歴として残す


#### api.js

API通信を担当。fetch と async/await を使った非同期処理を実装する。

- `getWeather(cityCode)` 関数を export する
- fetch で天気予報APIを呼び出す
- エラー時は例外を throw する
