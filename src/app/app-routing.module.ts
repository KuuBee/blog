import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './theme/layout/layout.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'customers',
        loadChildren: () =>
          import('./routes/customers/customers.module').then(
            (m) => m.CustomersModule
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./routes/orders/orders.module').then((m) => m.OrdersModule),
        data: {
          animation: 'OrderPage',
        },
      },
      {
        path: '',
        loadChildren: () =>
          import('./routes/home/home.module').then((m) => m.HomeModule),
        data: {
          animation: 'HomePage',
        },
      },
      {
        path: 'article',
        loadChildren: () =>
          import('./routes/article/article.module').then(
            (m) => m.ArticleModule
          ),
      },
      {
        path: 'tag',
        loadChildren: () =>
          import('./routes/tag/tag.module').then((m) => m.TagModule),
      },
      {
        path: 'classification',
        loadChildren: () =>
          import('./routes/classification/classification.module').then(
            (m) => m.ClassificationModule
          ),
      },
      {
        path: 'friend-link',
        loadChildren: () =>
          import('./routes/friend-link/friend-link.module').then(
            (m) => m.FriendLinkModule
          ),
      },
      {
        path: 'archive',
        loadChildren: () =>
          import('./routes/archive/archive.module').then(
            (m) => m.ArchiveModule
          ),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./routes/about/about.module').then((m) => m.AboutModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
