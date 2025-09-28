#!/bin/bash

# Gallery Image Setup Script
# This script helps you copy converted WebP images to the gallery folder

echo "🖼️  Gallery Image Setup Script"
echo "================================"
echo ""

# Check if gallery-photos directory exists
if [ ! -d "public/gallery-photos" ]; then
    echo "📁 Creating gallery-photos directory..."
    mkdir -p public/gallery-photos
    echo "✅ Directory created!"
else
    echo "📁 Gallery-photos directory already exists"
fi

echo ""
echo "📋 Instructions:"
echo "1. Convert your images using the admin panel"
echo "2. Downloaded WebP files will be in your Downloads folder"
echo "3. Copy the downloaded files to: public/gallery-photos/"
echo "4. Refresh the gallery page to see your images"
echo ""

# Count existing images
image_count=$(find public/gallery-photos -name "*.webp" | wc -l)
echo "📊 Current images in gallery: $image_count"

if [ $image_count -gt 0 ]; then
    echo "🖼️  Existing images:"
    ls -la public/gallery-photos/*.webp 2>/dev/null | head -10
    if [ $image_count -gt 10 ]; then
        echo "... and $((image_count - 10)) more images"
    fi
fi

echo ""
echo "✨ Ready to add more images!"
