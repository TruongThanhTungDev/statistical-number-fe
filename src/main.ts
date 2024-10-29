import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/showcase/layout/app.component';
import { AppModule } from '@layout/app.module';
import { importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
