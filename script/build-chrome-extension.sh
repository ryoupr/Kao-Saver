#!/bin/bash

# Chrome拡張機能ビルドスクリプト
# 使用方法: ./script/build-chrome-extension.sh

set -e

echo "🔧 Chrome拡張機能をビルドしています..."

# ビルドディレクトリを作成
BUILD_DIR="build"
rm -rf $BUILD_DIR
mkdir -p $BUILD_DIR

# 必要なファイルをコピー
echo "📁 ファイルをコピーしています..."
cp manifest.json $BUILD_DIR/
cp content-script.js $BUILD_DIR/
cp styles.css $BUILD_DIR/
cp -r src/ $BUILD_DIR/
cp -r icons/ $BUILD_DIR/

# README.mdもコピー（オプション）
cp README.md $BUILD_DIR/

echo "✅ ビルド完了！"
echo "📦 ビルドファイルは $BUILD_DIR/ ディレクトリにあります"
echo ""
echo "Chrome拡張機能のインストール方法:"
echo "1. Chrome で chrome://extensions/ を開く"
echo "2. 「デベロッパーモード」をONにする"
echo "3. 「パッケージ化されていない拡張機能を読み込む」をクリック"
echo "4. $BUILD_DIR フォルダを選択する"