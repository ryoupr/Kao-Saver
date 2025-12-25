# Kao-Saver (Kaonavi JSON Tool)

カオナビの評価入力画面の内容をJSON形式で**バックアップ（Export）**したり、外部で編集したJSONデータを**一括反映（Import）**したりできるGoogle Chrome拡張機能です。

## 📁 プロジェクト構造

```
.
├── README.md                    # プロジェクト概要
├── .gitignore                   # Git除外設定
├── manifest.json                # Chrome拡張機能設定
├── content-script.js            # コンテンツスクリプト
├── styles.css                   # スタイルシート
├── icons/                       # アイコンファイル格納
│   ├── .gitkeep
│   └── icon.png
├── screenshot/                  # スクリーンショット格納
│   └── .gitkeep
├── lib/                         # ライブラリファイル（オプション）
├── src/                         # ソースファイル
│   ├── html/
│   │   └── popup.html
│   └── js/
│       └── popup.js
└── script/                      # ビルドスクリプト
    ├── build-chrome-extension.sh
    ├── generate-icons.sh
    └── resize-to-1280x800.sh
```

## 🚀 主な機能

* **Export (出力)**:
  * 現在開いている評価シートの入力内容を、項目IDをキーとしたJSON形式で取得します。
  * 「クリップボードにコピー」または「ファイルとして保存（.json）」が可能です。
* **Import (入力)**:
  * JSONテキストを貼り付けるか、JSONファイルを読み込んで「Import」ボタンを押すと、画面上の該当する項目に自動入力されます。
  * **React対応**: 内部Stateを更新するイベントを発火させるため、Import後に保存ボタンを押してもデータが消えません。

## 📦 インストール方法

### 開発版のインストール

1. このリポジトリをクローンまたはダウンロードします
2. ビルドスクリプトを実行します：
   ```bash
   ./script/build-chrome-extension.sh
   ```
3. Google Chromeを開き、URLバーに `chrome://extensions/` と入力してアクセスします
4. 右上の **「デベロッパーモード」** をONにします
5. 左上の **「パッケージ化されていない拡張機能を読み込む」** をクリックします
6. `build` フォルダを選択します

### 手動インストール（ビルドなし）

1. このフォルダを任意の場所に保存します
2. Google Chromeを開き、URLバーに `chrome://extensions/` と入力してアクセスします
3. 右上の **「デベロッパーモード」** をONにします
4. 左上の **「パッケージ化されていない拡張機能を読み込む」** をクリックします
5. このプロジェクトのルートフォルダを選択します

## 📝 使い方

### データのバックアップ (Export)

1. カオナビの評価入力画面を開きます（編集モードにしてください）。
2. ブラウザ右上の `K` アイコン（Kao-Saver）をクリックします。
3. **「📋 クリップボードへ」** または **「💾 ファイルに保存」** をクリックします。
    * これで手元のエディタやファイルにバックアップが取れます。

### データの一括反映 (Import)

1. カオナビの評価入力画面を開きます。
2. Kao-Saverアイコンをクリックします。
3. テキストエリアにJSONを貼り付けるか、**「ファイルを選択」** からJSONファイルを読み込みます。
4. **「Import (画面へ反映)」** ボタンをクリックします。
5. 「〇〇箇所の項目に入力しました」と表示されたら完了です。

## ⚠️ 注意事項

* このツールは非公式の支援ツールです。
* HTML構造の変更などにより、予告なく動作しなくなる可能性があります。
* 重要なデータは必ず目視で確認してから保存してください。

## 🛠️ 開発

### ビルドスクリプト

- `./script/build-chrome-extension.sh` - 拡張機能をビルドして `build/` ディレクトリに出力
- `./script/generate-icons.sh [source_image]` - 各サイズのアイコンを生成
- `./script/resize-to-1280x800.sh [input] [output]` - スクリーンショットを1280x800にリサイズ

### ファイル構成

- `manifest.json` - Chrome拡張機能の設定ファイル
- `content-script.js` - Webページに注入されるスクリプト
- `styles.css` - ポップアップのスタイルシート
- `src/html/popup.html` - ポップアップのHTML
- `src/js/popup.js` - ポップアップのJavaScript

## 🔧 技術仕様

- **Manifest Version**: 3
- **対応ブラウザ**: Google Chrome
- **権限**: `activeTab`, `scripting`
- **React対応**: 内部Stateを適切に更新