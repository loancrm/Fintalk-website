import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BootstrapLoaderService {
  private bootstrapLoaded = false;
  private loadingPromise: Promise<any> | null = null;

  loadBootstrap(): Promise<any> {
    if (this.bootstrapLoaded && (window as any).bootstrap) {
      return Promise.resolve((window as any).bootstrap);
    }

    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = new Promise((resolve, reject) => {
      // Check if already loaded
      if ((window as any).bootstrap) {
        this.bootstrapLoaded = true;
        resolve((window as any).bootstrap);
        return;
      }

      // Dynamically load Bootstrap JS
      const script = document.createElement('script');
      script.src = 'assets/js/bootstrap.bundle.min.js'; // We'll copy this to assets
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.bootstrapLoaded = true;
        resolve((window as any).bootstrap);
      };
      script.onerror = () => {
        reject(new Error('Failed to load Bootstrap'));
      };
      document.body.appendChild(script);
    });

    return this.loadingPromise;
  }
}

