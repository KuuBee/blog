import { CommonModule } from '@angular/common';
import { NgModule, SecurityContext } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { AppSearchComponent } from './components/app-search/app-search.component';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { AppMarkdownComponent } from './components/markdown/markdown.component';
import { DirectoryComponent } from './components/directory/directory.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentInputComponent } from './components/comment-input/comment-input.component';

// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();
  renderer.del = (text) => {
    console.log(text);

    return `<span class="del">${text}</span>`;
  };
  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false,
  };
}

const MODULES: any[] = [
  MaterialModule,
  FlexLayoutModule,
  NgxSkeletonLoaderModule,
  MarkdownModule.forRoot({
    // 开启远程加载
    loader: HttpClient,
    // 防止xss
    sanitize: SecurityContext.NONE,
    markedOptions: {
      provide: MarkedOptions,
      useFactory: markedOptionsFactory,
    },
  }),
];
const COMPONENTS: any[] = [
  AppSearchComponent,
  AppMarkdownComponent,
  DirectoryComponent,
  SkeletonComponent,
  CommentComponent,
];
const PROVIDERS: any[] = [];

@NgModule({
  declarations: [...COMPONENTS, CommentInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...MODULES,
  ],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...MODULES,
    ...COMPONENTS,
  ],
})
export class SharedModule {}
