// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Measure component render time
  measureRender(componentName: string, startTime: number): void {
    const renderTime = performance.now() - startTime;
    this.metrics.set(`${componentName}_render`, renderTime);
    
    if (renderTime > 16) { // More than one frame (60fps)
      console.warn(`Slow render detected: ${componentName} took ${renderTime.toFixed(2)}ms`);
    }
  }

  // Measure image load time
  measureImageLoad(imageSrc: string, startTime: number): void {
    const loadTime = performance.now() - startTime;
    this.metrics.set(`image_${imageSrc}`, loadTime);
    
    if (loadTime > 1000) { // More than 1 second
      console.warn(`Slow image load: ${imageSrc} took ${loadTime.toFixed(2)}ms`);
    }
  }

  // Measure API call time
  measureApiCall(endpoint: string, startTime: number): void {
    const apiTime = performance.now() - startTime;
    this.metrics.set(`api_${endpoint}`, apiTime);
    
    if (apiTime > 2000) { // More than 2 seconds
      console.warn(`Slow API call: ${endpoint} took ${apiTime.toFixed(2)}ms`);
    }
  }

  // Get performance metrics
  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  // Clear metrics
  clearMetrics(): void {
    this.metrics.clear();
  }

  // Report Core Web Vitals
  reportWebVitals(): void {
    if (typeof window !== 'undefined' && 'web-vitals' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      });
    }
  }
}

// React hook for measuring component performance
export const usePerformanceMonitor = (componentName: string) => {
  const monitor = PerformanceMonitor.getInstance();
  const startTime = performance.now();

  useEffect(() => {
    monitor.measureRender(componentName, startTime);
  });

  return monitor;
};

// Higher-order component for performance monitoring
export const withPerformanceMonitor = <P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) => {
  return memo((props: P) => {
    const monitor = usePerformanceMonitor(componentName);
    return <Component {...props} />;
  });
};

// Image preloader utility
export class ImagePreloader {
  private static cache = new Set<string>();

  static async preloadImages(urls: string[]): Promise<void> {
    const promises = urls.map(url => {
      if (this.cache.has(url)) return Promise.resolve();
      
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          this.cache.add(url);
          resolve();
        };
        img.onerror = reject;
        img.src = url;
      });
    });

    await Promise.allSettled(promises);
  }

  static preloadCriticalImages(): void {
    const criticalImages = [
      '/src/assets/hero-image.webp',
      '/src/assets/bride-portrait.webp',
      '/src/assets/groom-portrait.webp',
    ];
    
    this.preloadImages(criticalImages);
  }
}

// Bundle analyzer helper
export const analyzeBundle = () => {
  if (process.env.NODE_ENV === 'development') {
    import('webpack-bundle-analyzer').then(({ BundleAnalyzerPlugin }) => {
      console.log('Bundle analyzer available for performance analysis');
    });
  }
};