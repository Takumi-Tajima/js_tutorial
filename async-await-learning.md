# async/await学習まとめ

## 最初の課題

`.then()`チェーンを`async/await`に書き換えたい

---

## 試行錯誤

### 1. asyncをつける場所を間違えた

```javascript
export async function setupWeatherForm() {  // ← 外側につけた
  addEventListener('submit', function(e) {  // ← でもfetchはこっちの中
```

**学び**: `await`を使いたい関数**その関数自体**に`async`をつける

---

### 2. データを直接返そうとした

```javascript
const weatherData = fetchWeatherDate(cityCode);  // ← Promiseが返ってきた
```

**学び**: `fetch`は非同期やから、すぐにはデータが返らへん。Promiseという「後で届ける約束」が返る

---

### 3. response.json().dataを試した

```javascript
response.json().data  // ← undefined
```

**学び**: `response.json()`もPromiseを返す。データそのものやない

---

### 4. .then()の中でreturnを忘れた

```javascript
.then((data) => { data });  // ← 何も返してない！
```

**学び**: `{ }`を使うなら`return`が必要。または`(data) => data`で暗黙のreturn

---

## 解決策

**api.js** - Promiseを返す

```javascript
export const fetchWeatherDate = (cityCode) => {
  const apiUrl = `https://weather.tsukumijima.net/api/forecast/city/${cityCode}`;
  return fetch(apiUrl).then((response) => response.json());
}
```

**main.js** - awaitで待つ

```javascript
document.getElementById('weather-form').addEventListener('submit', async(e) => {
  e.preventDefault();
  const cityCode = document.getElementById('city-code').value;
  const weatherData = await fetchWeatherDate(cityCode);  // ← 待って受け取る
  console.log(weatherData);
});
```

---

## 核心の理解

| 概念 | 意味 |
|------|------|
| `fetch` | ネットワーク越しにデータを取りに行く（時間かかる） |
| `Promise` | 「データは後で届けるで」という約束 |
| `.then()` | 「届いたらこれ実行して」という予約 |
| `async` | 「この関数の中でawaitを使うで」という宣言 |
| `await` | 「Promiseが解決するまで待つ」 |
