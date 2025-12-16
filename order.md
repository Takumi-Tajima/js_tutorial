# 天気検索アプリ 機能要件書

**JavaScript 学習用プロジェクト**

## 1. 概要

このアプリは、JavaScript の非同期処理（fetch, async/await）とエラーハンドリング（try/catch）を実践的に学ぶためのプロジェクトです。都市名を入力して天気情報を取得・表示するシンプルなWebアプリケーションを作成します。

## 2. 学習目標

このプロジェクトを通じて、以下のスキルを身につけます：

| カテゴリ | 学ぶこと |
|----------|----------|
| 非同期処理 | fetch API, async/await, Promise |
| エラーハンドリング | try/catch, エラー時のUI表示 |
| イベント処理 | addEventListener, preventDefault |
| DOM操作 | 動的なUI更新、エラーメッセージ表示 |
| データ永続化 | localStorage を使った検索履歴の保存 |
| モジュール分割 | ES Modules (import/export) によるファイル分割 |

## 3. 機能要件

### 3.1 必須機能

1. **地域選択：** プルダウンから地域を選択し、検索ボタンを押すと天気情報を取得する
2. **天気情報表示：** 天気（晴れ、曇りなど）、気温、降水確率、天気アイコンを画面に表示する
3. **エラー表示：** API通信に失敗した場合、エラーメッセージを表示する
4. **検索履歴保存：** 検索した地域を localStorage に保存し、画面に履歴として表示する
5. **履歴から再検索：** 履歴に表示された地域をクリックすると、その地域の天気を再検索する

### 3.2 任意機能（余裕があれば）

- ローディング表示（検索中にスピナーを表示）
- 履歴の削除機能
- 現在地の天気を自動取得（Geolocation API）

## 4. 使用するAPI

**天気予報 API（livedoor 天気互換）** を使用します。

- **公式サイト：** https://weather.tsukumijima.net/
- **必要な作業：** なし（APIキー不要）
- **エンドポイント：**
```
https://weather.tsukumijima.net/api/forecast/city/{地域コード}
```
- **リクエスト例（東京）：**
```
https://weather.tsukumijima.net/api/forecast/city/130010
```

### 4.1 主な地域コード

| 地域 | コード |
|------|--------|
| 東京 | 130010 |
| 大阪 | 270000 |
| 名古屋 | 230010 |
| 福岡 | 400010 |
| 札幌 | 016010 |
| 仙台 | 040010 |
| 広島 | 340010 |
| 那覇 | 471010 |

※ 全地域コードは https://weather.tsukumijima.net/primary_area.xml で確認できます

### 4.2 レスポンス例

```json
{
  "publicTime": "2024-01-15T17:00:00+09:00",
  "publishingOffice": "気象庁",
  "title": "東京都 東京 の天気",
  "forecasts": [
    {
      "date": "2024-01-15",
      "dateLabel": "今日",
      "telop": "晴れ",
      "image": {
        "url": "https://www.jma.go.jp/bosai/forecast/img/100.svg",
        "title": "晴れ"
      },
      "temperature": {
        "min": { "celsius": "2" },
        "max": { "celsius": "10" }
      },
      "chanceOfRain": {
        "T00_06": "0%",
        "T06_12": "0%",
        "T12_18": "10%",
        "T18_24": "0%"
      }
    }
  ]
}
```

### 4.3 API利用時の注意

- **連続アクセスは0.5秒以上の間隔を空けること**（学習用途では問題ない）
- データは気象庁から取得しているが、正確性は保証されない

## 5. ファイル構成

以下の構成でファイルを分割し、モジュール化を学びます：
```
weather-app/
├── index.html
├── style.css
└── js/
    ├── main.js     （エントリーポイント、イベント登録）
    ├── api.js      （API通信、fetch処理）
    ├── ui.js       （DOM操作、画面表示）
    └── storage.js  （localStorage操作）
```

### 5.1 各ファイルの役割

#### main.js

アプリのエントリーポイント。イベントリスナーの登録と、各モジュールの連携を行う。

- フォームの submit イベントを監視
- 履歴クリック時のイベントを監視
- api.js, ui.js, storage.js の関数を呼び出して処理を組み立てる

#### api.js

API通信を担当。fetch と async/await を使った非同期処理を実装する。

- `getWeather(cityCode)` 関数を export する
- fetch で天気予報APIを呼び出す
- エラー時は例外を throw する

#### ui.js

画面表示を担当。DOM操作をこのファイルに集約する。

- `displayWeather(data)` - 天気情報を画面に表示
- `displayError(message)` - エラーメッセージを表示
- `displayHistory(history)` - 検索履歴を表示

#### storage.js

データ永続化を担当。localStorage の読み書きを行う。

- `saveCity(cityCode, cityName)` - 地域コードと地域名を履歴に追加
- `getHistory()` - 保存された履歴を取得
- `JSON.stringify` / `JSON.parse` を使う

## 6. 実装のヒント

### 6.1 fetch + async/await の基本形

以下のパターンを覚えておくと便利です：
```javascript
async function getWeather(cityCode) {
  const url = `https://weather.tsukumijima.net/api/forecast/city/${cityCode}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
```

### 6.2 try/catch の基本形

エラーハンドリングは呼び出し側で行います：
```javascript
try {
  const data = await getWeather(city);
  displayWeather(data);
} catch (error) {
  displayError(error.message);
}
```

### 6.3 APIレスポンスのエラー判定

fetch は 404 エラーでも reject しません。`response.ok` を確認する必要があります：
```javascript
if (!response.ok) {
  throw new Error('天気情報の取得に失敗しました');
}
```

### 6.4 レスポンスデータの取り出し方

天気予報APIのレスポンスから必要なデータを取り出す例：
```javascript
const data = await getWeather('130010');

// 今日の天気
const today = data.forecasts[0];
console.log(today.telop);        // "晴れ"
console.log(today.image.url);    // 天気アイコンのURL
console.log(today.temperature.max?.celsius); // 最高気温（nullの場合あり）
console.log(today.chanceOfRain.T12_18);      // 12-18時の降水確率
```

### 6.5 ES Modules の使い方

HTMLで `type="module"` を指定し、import/export を使います：
```html
<!-- index.html -->
<script type="module" src="./js/main.js"></script>
```
```javascript
// api.js
export async function getWeather(cityCode) { ... }

// main.js
import { getWeather } from './api.js';
```

### 6.6 preventDefault の使い方

フォーム送信時にページリロードを防ぐために使います：
```javascript
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // これがないとページがリロードされる
  // 検索処理...
});
```

### 6.7 localStorage の使い方

配列を保存する場合は JSON に変換します：
```javascript
// 保存
localStorage.setItem('history', JSON.stringify(historyArray));

// 取得
const history = JSON.parse(localStorage.getItem('history')) || [];
```

## 7. 推奨する進め方

| 日程 | やること |
|------|----------|
| 1日目 | HTMLとCSSでUIを作成（検索フォーム、結果表示エリア、履歴エリア） |
| 2日目 | api.js を作成。fetch + async/await で API を叩き、console.log で確認 |
| 3日目 | ui.js を作成。取得したデータを画面に表示する |
| 4日目 | try/catch でエラーハンドリングを追加。エラー時の動作をテスト |
| 5日目 | storage.js を作成。localStorage で検索履歴を保存・表示 |
| 6日目 | 履歴クリックで再検索機能を実装。全体の動作確認 |
| 7日目 | コードを整理して上司にレビューしてもらう |

## 8. 参考リンク

- **fetch/async/await 解説：** https://ja.javascript.info/async-await
- **天気予報API ドキュメント：** https://weather.tsukumijima.net/
- **MDN - Fetch API：** https://developer.mozilla.org/ja/docs/Web/API/Fetch_API
- **MDN - localStorage：** https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage

## 9. 備考

このドキュメントには意図的に完全なコードを載せていません。ヒントを参考に、自分で考えて実装してください。詰まったら以下の順で対処しましょう：

1. console.log でどこまで動いているか確認
2. エラーメッセージを読んで検索
3. MDN や ja.javascript.info で該当機能を調べる
4. それでもわからなければ上司やClaudeに質問
