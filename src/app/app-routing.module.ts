import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import {
  LayoutComponent,
  LayoutComponents,
} from './theme/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // {
      //   path: 'customers',
      //   loadChildren: () =>
      //     import('./routes/customers/customers.module').then(
      //       (m) => m.CustomersModule
      //     ),
      // },
      // {
      //   path: 'orders',
      //   loadChildren: () =>
      //     import('./routes/orders/orders.module').then((m) => m.OrdersModule),
      //   data: {
      //     animation: 'OrderPage',
      //   },
      // },
      {
        path: '',
        loadChildren: () =>
          import('./routes/home/home.module').then((m) => m.HomeModule),
        data: {
          animation: 'HomePage',
          layoutComponents: [
            LayoutComponents.RECENT_CARD,
            LayoutComponents.TAG_CARD,
            LayoutComponents.USER_CARD,
          ],
        },
      },
      {
        path: 'article',
        loadChildren: () =>
          import('./routes/article/article.module').then(
            (m) => m.ArticleModule
          ),
        data: {
          layoutComponents: [
            LayoutComponents.RECENT_CARD,
            LayoutComponents.TAG_CARD,
            LayoutComponents.DIRECTORY,
          ],
        },
      },
      {
        path: 'tag',
        loadChildren: () =>
          import('./routes/tag/tag.module').then((m) => m.TagModule),
        data: {
          layoutComponents: [
            LayoutComponents.RECENT_CARD,
            LayoutComponents.TAG_CARD,
            LayoutComponents.USER_CARD,
          ],
        },
      },
      {
        path: 'classification',
        loadChildren: () =>
          import('./routes/classification/classification.module').then(
            (m) => m.ClassificationModule
          ),
        data: {
          layoutComponents: [
            LayoutComponents.RECENT_CARD,
            LayoutComponents.TAG_CARD,
            LayoutComponents.USER_CARD,
          ],
        },
      },
      {
        path: 'friend-link',
        loadChildren: () =>
          import('./routes/friend-link/friend-link.module').then(
            (m) => m.FriendLinkModule
          ),
        data: {
          layoutComponents: [
            LayoutComponents.RECENT_CARD,
            LayoutComponents.TAG_CARD,
            LayoutComponents.USER_CARD,
          ],
        },
      },
      {
        path: 'archive',
        loadChildren: () =>
          import('./routes/archive/archive.module').then(
            (m) => m.ArchiveModule
          ),
        data: {
          layoutComponents: [
            LayoutComponents.RECENT_CARD,
            LayoutComponents.TAG_CARD,
            LayoutComponents.USER_CARD,
          ],
        },
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./routes/about/about.module').then((m) => m.AboutModule),
        data: {
          layoutComponents: [
            LayoutComponents.RECENT_CARD,
            LayoutComponents.TAG_CARD,
            LayoutComponents.USER_CARD,
          ],
        },
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
