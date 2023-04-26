import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import Swal from 'sweetalert2';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
