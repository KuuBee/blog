import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { TestService } from './test.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { httpInterceptorProviders } from '@app/core/interceptors/index';
import { appInitializerProviders } from '@app/core/initializers';
import { ThemeModule } from '@app/theme/theme.module';
import { RoutesModule } from './routes/routes.module';

// enableProdMode();
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RoutesModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    ThemeModule,
  ],
  providers: [
    TestService,
    httpInterceptorProviders,
    appInitializerProviders,
    {
      provide: APP_BASE_HREF,
      useValue: '/blog',
    },
    // FIXME 路由复用策略，有问题
    // { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
