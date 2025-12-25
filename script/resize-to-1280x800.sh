#!/bin/bash

# スクリーンショットリサイズスクリプト
# 使用方法: ./script/resize-to-1280x800.sh [input_image] [output_image]

set -e

INPUT_IMAGE=${1}
OUTPUT_IMAGE=${2:-"screenshot/resized-screenshot.png"}

if [ -z "$INPUT_IMAGE" ]; then
    echo "❌ エラー: 入力画像を指定してください"
    echo "使用方法: $0 <input_image> [output_image]"
    exit 1
fi

if [ ! -f "$INPUT_IMAGE" ]; then
    echo "❌ エラー: 入力画像 '$INPUT_IMAGE' が見つかりません"
    exit 1
fi

echo "🖼️  スクリーンショットを1280x800にリサイズしています..."

# 出力ディレクトリを作成
mkdir -p "$(dirname "$OUTPUT_IMAGE")"

if command -v sips >/dev/null 2>&1; then
    # macOS の場合
    sips -z 800 1280 "$INPUT_IMAGE" --out "$OUTPUT_IMAGE"
    echo "✅ リサイズ完了: $OUTPUT_IMAGE"
elif command -v convert >/dev/null 2>&1; then
    # ImageMagick の場合
    convert "$INPUT_IMAGE" -resize 1280x800! "$OUTPUT_IMAGE"
    echo "✅ リサイズ完了: $OUTPUT_IMAGE"
else
    echo "❌ エラー: sips または ImageMagick が見つかりません"
    echo "   以下のいずれかをインストールしてください:"
    echo "   - macOS: sips (標準搭載)"
    echo "   - ImageMagick: brew install imagemagick"
    exit 1
fi

echo "🎉 スクリーンショットのリサイズが完了しました！"