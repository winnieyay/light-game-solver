# 燈光翻轉遊戲

12 盞燈環形排列（時鐘布局），自訂題目後可顯示「3 步解法」：每次點擊會翻轉該盞與左右相鄰（頭尾相接）。提供兩個時鐘：**全暗（點擊點亮）** 與 **全亮（點擊點暗）**，各自出題並顯示解法。

---

## 使用方式

- **線上版**：若已透過 GitHub Pages 部署，網址為：  
  `https://<你的帳號>.github.io/<倉庫名稱>/`
- **本機**：用瀏覽器開啟 `index.html`，或執行：
  ```bash
  npx serve .
  ```
  再於瀏覽器或同一 Wi‑Fi 下的 iPad 開啟顯示的網址。

---

## 使用 GitHub Pages 部署

### 1. 建立倉庫並推送程式碼

```bash
cd light-game-solver
git init
git add index.html style.css game.js ui.js README.md
git commit -m "Initial: 燈光翻轉遊戲"
git branch -M main
git remote add origin https://github.com/<你的帳號>/<倉庫名稱>.git
git push -u origin main
```

（請將 `<你的帳號>`、`<倉庫名稱>` 換成你的 GitHub 使用者名稱與倉庫名稱。）

### 2. 開啟 GitHub Pages

1. 在 GitHub 上打開該倉庫
2. 點 **Settings** → 左側 **Pages**
3. 在 **Build and deployment** 底下：
   - **Source** 選 **Deploy from a branch**
   - **Branch** 選 `main`，資料夾選 **/ (root)**
4. 點 **Save**

### 3. 取得網址

約 1～2 分鐘後，頁面會顯示發布網址，格式為：

```
https://<你的帳號>.github.io/<倉庫名稱>/
```

將此連結分享給他人即可在瀏覽器或 iPad 上使用。

---

## 專案檔案

| 檔案 | 說明 |
|------|------|
| `index.html` | 頁面結構、兩個時鐘區塊 |
| `style.css` | 時鐘環形排版、亮/暗樣式、觸控友善、並排版面 |
| `game.js` | 環形操作、3 步求解器（`solveForState`） |
| `ui.js` | 雙時鐘渲染、點擊出題、解法顯示、重新出題 |

純前端靜態網站，無需後端或建置步驟。
