import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
const routes: Routes = [
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
      import('./routes/article/article.module').then((m) => m.ArticleModule),
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
