import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { provideSignalFormsConfig } from '@angular/forms/signals';


const routes = [
  {
    path: "",
    component: App
  }
]
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideSignalFormsConfig({
      classes: {
        'is-invalid': field => field.state().invalid() && field.state().dirty()
      }
    })
  ]
};
