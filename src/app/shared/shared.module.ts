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
import { CommentContentComponent } from './components/comment-content/comment-content.component';
import { MarkdownEmojiComponent } from './components/markdown-emoji/markdown-emoji.component';
import { BugReportDialogComponent } from './components/bug-report-dialog/bug-report-dialog.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';
import { SnackBarRefComponent } from './components/snack-bar-ref/snack-bar-ref.component';
import { AuthDialogRefComponent } from './components/auth-dialog-ref/auth-dialog-ref.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ChipComponent } from './components/chip/chip.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { RecentCardComponent } from './components/recent-card/recent-card.component';
import { TagCardComponent } from './components/tag-card/tag-card.component';
import { ArticleAccordionComponent } from './components/article-accordion/article-accordion.component';

// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();
  // 删除线
  renderer.del = (text) => {
    return `<span class="del">${text}</span>`;
  };
  renderer.image = (href, _title, text) => {
    return `
      <p class="image" ${text ? 'title="' + text + '"' : ''}>
        <img src="${href}" alt="${text}"  ondragstart="return false">
      </p>
    `;
  };
  renderer.hr = () => {
    return `
      <div class="hr"></div>
    `;
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
  MaterialFileInputModule,
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
  BugReportDialogComponent,
  CommentInputComponent,
  CommentContentComponent,
  MarkdownEmojiComponent,
  LoginDialogComponent,
  RegisterDialogComponent,
  SnackBarRefComponent,
  AuthDialogRefComponent,
  ChipComponent,
  UserCardComponent,
  RecentCardComponent,
  TagCardComponent,
  ArticleAccordionComponent,
];
const PROVIDERS: any[] = [];

@NgModule({
  declarations: [...COMPONENTS],
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
