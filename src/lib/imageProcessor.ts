// Face Detection and Image Cropping Utility
// Uses MediaPipe Face Detection API for accurate face detection and cropping

interface FaceDetectionResult {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
}

interface CropOptions {
  aspectRatio: number; // width/height ratio
  targetWidth: number;
  targetHeight: number;
}

interface ProcessedImage {
  original: string;
  portrait: string; // 4:5 aspect ratio
  square: string;   // 1:1 aspect ratio
}

export class ImageProcessor {
  private faceDetection: any = null;

  constructor() {
    this.initializeFaceDetection();
  }

  private async initializeFaceDetection() {
    try {
      // Load MediaPipe Face Detection
      const { FaceDetection } = await import('@mediapipe/face_detection');
      const { Camera } = await import('@mediapipe/camera_utils');
      
      this.faceDetection = new FaceDetection({
        locateFile: (file: string) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
        }
      });

      this.faceDetection.setOptions({
        model: 'short',
        minDetectionConfidence: 0.5,
      });
    } catch (error) {
      console.warn('Face detection not available, will use fallback cropping:', error);
    }
  }

  // Detect faces in an image
  private async detectFaces(imageElement: HTMLImageElement): Promise<FaceDetectionResult[]> {
    if (!this.faceDetection) {
      return [];
    }

    return new Promise((resolve) => {
      this.faceDetection.onResults((results: any) => {
        const faces: FaceDetectionResult[] = results.detections.map((detection: any) => {
          const bbox = detection.locationData.relativeBoundingBox;
          return {
            x: bbox.xCenter - bbox.width / 2,
            y: bbox.yCenter - bbox.height / 2,
            width: bbox.width,
            height: bbox.height,
            confidence: detection.score[0]
          };
        });
        resolve(faces);
      });

      this.faceDetection.send({ image: imageElement });
    });
  }

  // Calculate optimal crop area based on face detection
  private calculateCropArea(
    imageWidth: number,
    imageHeight: number,
    faces: FaceDetectionResult[],
    aspectRatio: number
  ): { x: number; y: number; width: number; height: number } {
    
    if (faces.length === 0) {
      // No faces detected - center crop
      return this.centerCrop(imageWidth, imageHeight, aspectRatio);
    }

    // Find the largest/most prominent face
    const primaryFace = faces.reduce((largest, current) => 
      current.width * current.height > largest.width * largest.height ? current : largest
    );

    // Calculate crop dimensions
    const cropHeight = imageHeight;
    const cropWidth = cropHeight * aspectRatio;

    // Position face in upper third of frame
    const faceCenterX = primaryFace.x + primaryFace.width / 2;
    const faceCenterY = primaryFace.y + primaryFace.height / 2;

    // Calculate crop position
    let cropX = faceCenterX - cropWidth / 2;
    let cropY = faceCenterY - cropHeight * 0.33; // Upper third positioning

    // Ensure we don't crop outside image bounds
    cropX = Math.max(0, Math.min(cropX, imageWidth - cropWidth));
    cropY = Math.max(0, Math.min(cropY, imageHeight - cropHeight));

    // Adjust if face would be cut off
    const faceTop = primaryFace.y;
    const faceBottom = primaryFace.y + primaryFace.height;
    const faceLeft = primaryFace.x;
    const faceRight = primaryFace.x + primaryFace.width;

    // Ensure entire head and shoulders are visible
    if (faceTop < cropY) {
      cropY = Math.max(0, faceTop - cropHeight * 0.1); // Add some padding
    }
    if (faceBottom > cropY + cropHeight) {
      cropY = Math.min(imageHeight - cropHeight, faceBottom - cropHeight + cropHeight * 0.1);
    }
    if (faceLeft < cropX) {
      cropX = Math.max(0, faceLeft - cropWidth * 0.1);
    }
    if (faceRight > cropX + cropWidth) {
      cropX = Math.min(imageWidth - cropWidth, faceRight - cropWidth + cropWidth * 0.1);
    }

    return {
      x: Math.max(0, cropX),
      y: Math.max(0, cropY),
      width: Math.min(cropWidth, imageWidth),
      height: Math.min(cropHeight, imageHeight)
    };
  }

  // Center crop fallback when no faces detected
  private centerCrop(
    imageWidth: number,
    imageHeight: number,
    aspectRatio: number
  ): { x: number; y: number; width: number; height: number } {
    
    const cropHeight = imageHeight;
    const cropWidth = cropHeight * aspectRatio;

    if (cropWidth > imageWidth) {
      // If crop width exceeds image width, adjust
      const adjustedCropWidth = imageWidth;
      const adjustedCropHeight = adjustedCropWidth / aspectRatio;
      
      return {
        x: 0,
        y: (imageHeight - adjustedCropHeight) / 2,
        width: adjustedCropWidth,
        height: adjustedCropHeight
      };
    }

    return {
      x: (imageWidth - cropWidth) / 2,
      y: 0,
      width: cropWidth,
      height: cropHeight
    };
  }

  // Crop image to specified dimensions
  private cropImage(
    imageElement: HTMLImageElement,
    cropArea: { x: number; y: number; width: number; height: number },
    targetWidth: number,
    targetHeight: number
  ): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        resolve(imageElement.src);
        return;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Draw cropped image
      ctx.drawImage(
        imageElement,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        targetWidth,
        targetHeight
      );

      // Convert to blob and return URL
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          resolve(url);
        } else {
          resolve(imageElement.src);
        }
      }, 'image/webp', 0.9);
    });
  }

  // Process a single image
  async processImage(imageSrc: string): Promise<ProcessedImage> {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = async () => {
        try {
          // Detect faces
          const faces = await this.detectFaces(img);
          
          // Calculate crop areas for different aspect ratios
          const portraitCrop = this.calculateCropArea(img.width, img.height, faces, 4/5);
          const squareCrop = this.calculateCropArea(img.width, img.height, faces, 1);
          
          // Create cropped versions
          const portraitUrl = await this.cropImage(img, portraitCrop, 400, 500);
          const squareUrl = await this.cropImage(img, squareCrop, 500, 500);
          
          resolve({
            original: imageSrc,
            portrait: portraitUrl,
            square: squareUrl
          });
        } catch (error) {
          console.error('Error processing image:', error);
          resolve({
            original: imageSrc,
            portrait: imageSrc,
            square: imageSrc
          });
        }
      };
      
      img.onerror = () => {
        resolve({
          original: imageSrc,
          portrait: imageSrc,
          square: imageSrc
        });
      };
      
      img.src = imageSrc;
    });
  }

  // Batch process multiple images
  async batchProcessImages(imageSources: string[]): Promise<ProcessedImage[]> {
    const results: ProcessedImage[] = [];
    
    // Process images in batches to avoid overwhelming the browser
    const batchSize = 3;
    for (let i = 0; i < imageSources.length; i += batchSize) {
      const batch = imageSources.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(src => this.processImage(src))
      );
      results.push(...batchResults);
    }
    
    return results;
  }
}

// Export singleton instance
export const imageProcessor = new ImageProcessor();
