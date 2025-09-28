// Performance optimization configuration
export const PERFORMANCE_CONFIG = {
  // Image optimization
  IMAGE_QUALITY: 0.8,
  IMAGE_FORMAT: 'webp',
  MAX_IMAGE_WIDTH: 1920,
  MAX_IMAGE_HEIGHT: 1080,
  
  // Lazy loading
  LAZY_LOAD_THRESHOLD: 0.1,
  LAZY_LOAD_ROOT_MARGIN: '50px',
  
  // Caching
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  STATIC_CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  
  // Bundle optimization
  CHUNK_SIZE_LIMIT: 1000, // KB
  MAX_CONCURRENT_REQUESTS: 6,
  
  // Performance monitoring
  SLOW_RENDER_THRESHOLD: 16, // ms (60fps)
  SLOW_IMAGE_LOAD_THRESHOLD: 1000, // ms
  SLOW_API_THRESHOLD: 2000, // ms
  
  // Preloading
  PRELOAD_DELAY: 1000, // ms
  CRITICAL_RESOURCES: [
    '/src/assets/hero-image.webp',
    '/src/assets/bride-portrait.webp',
    '/src/assets/groom-portrait.webp',
  ],
  
  // Service Worker
  CACHE_STRATEGY: 'cache-first', // 'cache-first' | 'network-first' | 'stale-while-revalidate'
  
  // Animation optimization
  REDUCE_MOTION: false,
  ANIMATION_DURATION: 300, // ms
};

// Performance budgets
export const PERFORMANCE_BUDGETS = {
  // Core Web Vitals
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100, // First Input Delay (ms)
  CLS: 0.1, // Cumulative Layout Shift
  
  // Bundle size
  JS_BUNDLE_SIZE: 500, // KB
  CSS_BUNDLE_SIZE: 100, // KB
  TOTAL_BUNDLE_SIZE: 1000, // KB
  
  // Image optimization
  MAX_IMAGE_SIZE: 500, // KB
  IMAGE_COUNT_LIMIT: 25,
  
  // Network
  MAX_REQUEST_TIME: 2000, // ms
  MAX_CONCURRENT_REQUESTS: 6,
};

// Performance monitoring utilities
export const PerformanceUtils = {
  // Check if device is low-end
  isLowEndDevice(): boolean {
    if (typeof navigator === 'undefined') return false;
    
    const connection = (navigator as any).connection;
    const memory = (performance as any).memory;
    
    return (
      connection?.effectiveType === 'slow-2g' ||
      connection?.effectiveType === '2g' ||
      memory?.jsHeapSizeLimit < 100000000 || // Less than 100MB
      navigator.hardwareConcurrency < 4
    );
  },
  
  // Get device performance score
  getDeviceScore(): number {
    if (this.isLowEndDevice()) return 1;
    
    const connection = (navigator as any).connection;
    const memory = (performance as any).memory;
    
    let score = 5; // Base score
    
    if (connection?.effectiveType === '4g') score += 2;
    if (connection?.effectiveType === '3g') score += 1;
    if (memory?.jsHeapSizeLimit > 500000000) score += 1; // More than 500MB
    if (navigator.hardwareConcurrency >= 8) score += 1;
    
    return Math.min(score, 10);
  },
  
  // Adjust performance settings based on device
  getOptimizedConfig() {
    const deviceScore = this.getDeviceScore();
    
    return {
      ...PERFORMANCE_CONFIG,
      IMAGE_QUALITY: deviceScore < 5 ? 0.6 : PERFORMANCE_CONFIG.IMAGE_QUALITY,
      LAZY_LOAD_THRESHOLD: deviceScore < 5 ? 0.2 : PERFORMANCE_CONFIG.LAZY_LOAD_THRESHOLD,
      MAX_CONCURRENT_REQUESTS: deviceScore < 5 ? 3 : PERFORMANCE_CONFIG.MAX_CONCURRENT_REQUESTS,
      PRELOAD_DELAY: deviceScore < 5 ? 2000 : PERFORMANCE_CONFIG.PRELOAD_DELAY,
    };
  },
};

// Performance metrics collector
export class PerformanceMetrics {
  private static metrics: Map<string, number[]> = new Map();
  
  static record(metric: string, value: number): void {
    if (!this.metrics.has(metric)) {
      this.metrics.set(metric, []);
    }
    this.metrics.get(metric)!.push(value);
  }
  
  static getAverage(metric: string): number {
    const values = this.metrics.get(metric) || [];
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }
  
  static getMetrics(): Record<string, { average: number; count: number; latest: number }> {
    const result: Record<string, { average: number; count: number; latest: number }> = {};
    
    this.metrics.forEach((values, metric) => {
      result[metric] = {
        average: this.getAverage(metric),
        count: values.length,
        latest: values[values.length - 1] || 0,
      };
    });
    
    return result;
  }
  
  static clear(): void {
    this.metrics.clear();
  }
}
