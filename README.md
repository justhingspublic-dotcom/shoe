# 台灣鞋品協會展示網站

一個使用 React + TypeScript + Tailwind CSS 建立的鞋品展示靜態網站。

## 技術棧

- **React 18** - UI 框架
- **TypeScript** - 型別安全
- **Vite** - 建置工具
- **Tailwind CSS** - 樣式框架
- **React Router** - 路由管理
- **Lucide React** - 圖示庫

## 功能特色

- 📱 **響應式設計** - 完整支援手機、平板、桌面裝置
- 🎨 **活潑但克制的設計** - 採用灰白藍配色，適度的圓角與陰影
- 🏃 **流暢動畫** - 精心設計的過渡效果與互動反饋
- 🛍️ **三大頁面**：
  - **首頁** - Hero 區塊、精選商品、品牌展示、特色介紹
  - **商品頁** - 圖片輪播、詳細資訊、尺寸顏色選擇
  - **品牌館** - 品牌介紹、聯絡資訊、品牌商品列表

## 專案結構

```
demo/
├── src/
│   ├── components/        # React 元件
│   │   ├── Header.tsx    # 導覽列
│   │   ├── Footer.tsx    # 頁尾
│   │   ├── ProductCard.tsx   # 商品卡片
│   │   └── BrandCard.tsx     # 品牌卡片
│   ├── pages/            # 頁面元件
│   │   ├── HomePage.tsx      # 首頁
│   │   ├── ProductPage.tsx   # 商品頁
│   │   └── BrandPage.tsx     # 品牌館
│   ├── data/             # 模擬資料
│   │   ├── products.ts       # 商品資料
│   │   └── brands.ts         # 品牌資料
│   ├── App.tsx           # 主應用
│   └── main.tsx          # 進入點
├── tailwind.config.js    # Tailwind 設定
└── package.json
```

## 開始使用

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

網站將在 `http://localhost:5173` 啟動

### 建置正式版本

```bash
npm run build
```

建置檔案將輸出至 `dist` 目錄

### 預覽正式版本

```bash
npm run preview
```

## 已實現功能

✅ **首頁** - 包含 Hero 橫幅、特色介紹、精選商品展示、品牌列表
✅ **所有商品頁** - 完整的商品列表，包含分類篩選與排序功能
✅ **所有品牌頁** - 匯集所有合作品牌的入口頁面
✅ **商品頁** - 完整的商品詳情、圖片切換、顏色尺寸選擇、購買按鈕（展示用）
✅ **品牌館** - 品牌介紹、聯絡資訊、品牌所有商品列表
✅ **響應式設計** - 完美支援手機、平板、桌面裝置
✅ **互動動畫** - 平滑的過渡效果與 hover 互動
✅ **通知系統** - 購買按鈕點擊後顯示「此為靜態展示頁面」提示

## 設計規範

### 配色

- **主色藍**：`#3B82F6`
- **中性灰**：`#6B7280`
- **白色**：`#FFFFFF`

### 圓角

- 卡片元件：`rounded-xl` (0.75rem)
- 按鈕：`rounded-lg` (0.5rem)

### 陰影

- 預設：`shadow-sm`
- Hover：`shadow-md`

### 動畫

- 過渡時間：`duration-300`
- Hover 縮放：`hover:scale-105`
- 顏色過渡：`transition-colors`
- 全屬性過渡：`transition-all`

## 資料說明

專案包含：
- **8 個品牌**：涵蓋運動、休閒、商務等不同類型
- **20 個商品**：包含完整的商品資訊、圖片、價格、尺寸、顏色等

## 注意事項

此為**靜態展示頁面**，購買按鈕點擊後會顯示提示訊息，不具備實際購物功能。

## 授權

© 2026 台灣鞋品協會 版權所有
