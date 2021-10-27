import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import {
  LayoutComponent,
  LayoutComponents,
} from '../theme/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
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
        path: '',
        loadChildren: () =>
          import('./article/article.module').then((m) => m.ArticleModule),
        data: {
          layoutComponents: [
            LayoutComponents.RECENT_CARD,
            LayoutComponents.TAG_CARD,
            LayoutComponents.DIRECTORY,
          ],
        },
      },
      {
        path: '',
        loadChildren: () => import('./tag/tag.module').then((m) => m.TagModule),
        data: {
          layoutComponents: [
            LayoutComponents.RECENT_CARD,
            LayoutComponents.TAG_CARD,
            LayoutComponents.USER_CARD,
          ],
        },
      },
      {
        path: '',
        loadChildren: () =>
          import('./classification/classification.module').then(
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
        path: '',
        loadChildren: () =>
          import('./friend-link/friend-link.module').then(
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
        path: '',
        loadChildren: () =>
          import('./archive/archive.module').then((m) => m.ArchiveModule),
        data: {
          layoutComponents: [
            LayoutComponents.RECENT_CARD,
            LayoutComponents.TAG_CARD,
            LayoutComponents.USER_CARD,
          ],
        },
      },
      {
        path: '',
        loadChildren: () =>
          import('./about/about.module').then((m) => m.AboutModule),
        data: {
          layoutComponents: [
            LayoutComponents.RECENT_CARD,
            LayoutComponents.TAG_CARD,
            LayoutComponents.USER_CARD,
          ],
        },
      },
      {
        path: '',
        loadChildren: () =>
          import('./favorite/favorite.module').then((m) => m.FavoriteModule),
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
