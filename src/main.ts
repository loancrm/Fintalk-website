import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// Bootstrap immediately for fastest initial render
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
