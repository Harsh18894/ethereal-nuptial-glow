# 🖼️ Gallery Management - Manual Setup Guide

## 🎯 **How to Add Images to Gallery:**

### **Manual Method (Current Approach)**

1. **Prepare Images**
   - Convert your images to WebP format
   - Use online converters or image editing software
   - Ensure images are optimized for web

2. **Add to Gallery Folder**
   - Place WebP files in `/public/gallery-photos/` folder
   - Use naming convention: `photo-1.webp`, `photo-2.webp`, etc.
   - Maximum 25 images supported

3. **View in Gallery**
   - Go to `/gallery` page
   - Click "Refresh Gallery" button to reload images
   - Images appear automatically

## 🔧 **Technical Details:**

### **Image Requirements:**
- **Format:** WebP only
- **Naming:** `photo-1.webp`, `photo-2.webp`, etc.
- **Location:** `/public/gallery-photos/` folder
- **Positioning:** All images use `objectPosition: 'top'`
- **Maximum:** 50 images total

### **File Structure:**
```
/public/gallery-photos/
├── photo-1.webp
├── photo-2.webp
├── photo-3.webp
└── ... (up to photo-50.webp)
```

### **Gallery Display:**
- **Automatic detection:** Gallery scans for WebP files
- **Dynamic loading:** Only existing images are displayed
- **Refresh button:** Manual reload when you add new images
- **Loading states:** Shows loading spinner while scanning

## 📋 **Step-by-Step Instructions:**

### **Adding Images:**

1. **Convert Images to WebP**
   - Use online WebP converters
   - Or use image editing software
   - Ensure good quality and compression

2. **Add to Gallery Folder**
   ```bash
   # Create gallery folder if it doesn't exist
   mkdir -p public/gallery-photos
   
   # Copy your WebP files
   cp your-images/*.webp public/gallery-photos/
   
   # Rename files to follow convention
   cd public/gallery-photos
   # Rename files to photo-1.webp, photo-2.webp, etc.
   ```

3. **Refresh Gallery**
   - Go to `/gallery` page
   - Click "Refresh Gallery" button
   - Images will appear automatically

## 🚀 **Helper Script:**

### **Check Gallery Status:**
```bash
./setup-gallery.sh
```
This will:
- Create gallery-photos directory if needed
- Show current image count
- Display existing images

## ✅ **Features:**

### **Gallery Features:**
- ✅ **Automatic detection** (scans for WebP files)
- ✅ **Dynamic loading** (only shows existing images)
- ✅ **Top positioning** (`objectPosition: 'top'`)
- ✅ **Responsive grid** (works on all devices)
- ✅ **Lightbox view** (click to expand)
- ✅ **Navigation** (arrow keys, close button)
- ✅ **Refresh button** (manual reload)
- ✅ **Loading states** (spinner while scanning)

## 🔍 **Troubleshooting:**

### **Images Not Appearing:**
1. Check file format (must be .webp)
2. Verify file location (`/public/gallery-photos/`)
3. Check naming convention (`photo-1.webp`, etc.)
4. Click "Refresh Gallery" button
5. Check browser console for errors

### **Performance Tips:**
1. Optimize WebP images for web
2. Use appropriate compression (0.8-0.9 quality)
3. Keep file sizes reasonable (< 500KB per image)
4. Use consistent naming convention

## 📊 **Current Status:**

- **Gallery folder:** `/public/gallery-photos/`
- **Supported format:** WebP only
- **Naming convention:** `photo-1.webp` to `photo-25.webp`
- **Positioning:** `objectPosition: 'top'`
- **Max images:** 25 total
- **Detection:** Automatic scanning on page load
- **Refresh:** Manual button to reload images

The gallery now automatically detects and displays WebP images from the gallery-photos folder. Simply add your images and click refresh!
