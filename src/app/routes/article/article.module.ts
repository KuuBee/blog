import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './info/article.component';
import { SharedModule } from '@app/shared/shared.module';
import { MarkdownModule } from 'ngx-markdown';
import { FloatingActionButtonComponent } from './shared/components/floating-action-button/floating-action-button.component';

@NgModule({
  declarations: [ArticleComponent, FloatingActionButtonComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    SharedModule,
    MarkdownModule.forChild(),
  ],
})
export class ArticleModule {}
