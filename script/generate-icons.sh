#!/bin/bash

# アイコン生成スクリプト
# 使用方法: ./script/generate-icons.sh [source_image]

set -e

SOURCE_IMAGE=${1:-"icons/icon.png"}

if [ ! -f "$SOURCE_IMAGE" ]; then
    echo "❌ エラー: ソース画像 '$SOURCE_IMAGE' が見つかりません"
    exit 1
fi

echo "🎨 Chrome拡張機能用アイコンを生成しています..."

# 必要なサイズ
SIZES=(16 48 128)

for size in "${SIZES[@]}"; do
    output_file="icons/icon-${size}.png"
    
    if command -v sips >/dev/null 2>&1; then
        # macOS の場合
        sips -z $size $size "$SOURCE_IMAGE" --out "$output_file"
        echo "✅ ${size}x${size} アイコンを生成: $output_file"
    elif command -v convert >/dev/null 2>&1; then
        # ImageMagick の場合
        convert "$SOURCE_IMAGE" -resize ${size}x${size} "$output_file"
        echo "✅ ${size}x${size} アイコンを生成: $output_file"
    else
        echo "⚠️  警告: sips または ImageMagick が見つかりません"
        echo "   手動でアイコンをリサイズしてください: ${size}x${size}"
    fi
done

echo "🎉 アイコン生成完了！"