import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CoreModule } from '@app/core//core.module';
import { MaterialRootModule } from '@app/shared/material-root.module';
import '@app/core/rxjs/rxjs-operators';

import { AppComponent } from './app.component';

import { AppLoadService } from '@app/core';

export function LoadAppSettings(appLoadService: AppLoadService) {
    return () => appLoadService.getSettings();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    NoopAnimationsModule,//90KB aditional
    TransferHttpCacheModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
       enabled: environment.production
    }),
    CoreModule.forRoot(),
  //  BootStrapModule,
  //  MaterialRootModule,
    AppRoutingModule,

  ],
  providers: [
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: LoadAppSettings, deps: [AppLoadService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
