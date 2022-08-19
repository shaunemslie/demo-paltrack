import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SingleCardModule } from './layouts';
import { LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SingleCardModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
  ],
  providers: [AuthService, ScreenService, AppInfoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
