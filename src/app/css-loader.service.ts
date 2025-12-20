import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CssLoaderService {
  private loadedStyles = new Set<string>();

  loadCss(href: string, id?: string): Promise<void> {
    const styleId = id || href;
    
    // Check if already loaded
    if (this.loadedStyles.has(styleId)) {
      return Promise.resolve();
    }

    // Check if link already exists in DOM
    const existingLink = document.getElementById(styleId);
    if (existingLink) {
      this.loadedStyles.add(styleId);
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.id = styleId || '';
      link.media = 'print';
      link.onload = () => {
        link.media = 'all';
        this.loadedStyles.add(styleId);
        resolve();
      };
      link.onerror = () => {
        reject(new Error(`Failed to load CSS: ${href}`));
      };
      document.head.appendChild(link);
    });
  }
}

