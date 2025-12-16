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

1. **都市名検索：** テキスト入力欄に都市名を入力し、検索ボタンを押すと天気情報を取得する
2. **天気情報表示：** 天気（晴れ、曇りなど）、気温、天気アイコンを画面に表示する
3. **エラー表示：** 存在しない都市名を入力した場合、「都市が見つかりません」などのエラーメッセージを表示する
4. **検索履歴保存：** 検索した都市名を localStorage に保存し、画面に履歴として表示する
5. **履歴から再検索：** 履歴に表示された都市名をクリックすると、その都市の天気を再検索する

### 3.2 任意機能（余裕があれば）

- ローディング表示（検索中にスピナーを表示）
- 履歴の削除機能
- 現在地の天気を自動取得（Geolocation API）

## 4. 使用するAPI

**OpenWeather API**（無料プラン）を使用します。

- **公式サイト：** https://openweathermap.org/api
- **必要な作業：** アカウント作成 → APIキーを取得
- **エンドポイント例：**
```
https://api.openweathermap.org/data/2.5/weather?q={都市名}&appid={APIキー}&units=metric&lang=ja
```

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

- `getWeather(cityName)` 関数を export する
- fetch で OpenWeather API を呼び出す
- エラー時は例外を throw する

#### ui.js

画面表示を担当。DOM操作をこのファイルに集約する。

- `displayWeather(data)` - 天気情報を画面に表示
- `displayError(message)` - エラーメッセージを表示
- `displayHistory(history)` - 検索履歴を表示

#### storage.js

データ永続化を担当。localStorage の読み書きを行う。

- `saveCity(cityName)` - 都市名を履歴に追加
- `getHistory()` - 保存された履歴を取得
- `JSON.stringify` / `JSON.parse` を使う

## 6. 実装のヒント

### 6.1 fetch + async/await の基本形

以下のパターンを覚えておくと便利です：
```javascript
async function getWeather(city) {
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
  throw new Error('都市が見つかりません');
}
```

### 6.4 ES Modules の使い方

HTMLで `type="module"` を指定し、import/export を使います：
```html
<!-- index.html -->
<script type="module" src="./js/main.js"></script>
```
```javascript
// api.js
export async function getWeather(city) { ... }

// main.js
import { getWeather } from './api.js';
```

### 6.5 preventDefault の使い方

フォーム送信時にページリロードを防ぐために使います：
```javascript
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // これがないとページがリロードされる
  // 検索処理...
});
```

### 6.6 localStorage の使い方

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
| 4日目 | try/catch でエラーハンドリングを追加。存在しない都市でテスト |
| 5日目 | storage.js を作成。localStorage で検索履歴を保存・表示 |
| 6日目 | 履歴クリックで再検索機能を実装。全体の動作確認 |
| 7日目 | コードを整理して上司にレビューしてもらう |

## 8. 参考リンク

- **fetch/async/await 解説：** https://ja.javascript.info/async-await
- **OpenWeather API ドキュメント：** https://openweathermap.org/current
- **MDN - Fetch API：** https://developer.mozilla.org/ja/docs/Web/API/Fetch_API
- **MDN - localStorage：** https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage

## 9. 備考

このドキュメントには意図的に完全なコードを載せていません。ヒントを参考に、自分で考えて実装してください。詰まったら以下の順で対処しましょう：

1. console.log でどこまで動いているか確認
2. エラーメッセージを読んで検索
3. MDN や ja.javascript.info で該当機能を調べる
4. それでもわからなければ上司やClaudeに質問
