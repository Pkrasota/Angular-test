import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import './rxjs-demo';
import './canvas';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
