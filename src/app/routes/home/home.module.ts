import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './index/home.component';
import { SharedModule } from '../../shared/shared.module';
import { UserCardComponent } from './shared/components/user-card/user-card.component';
import { RecentCardComponent } from './shared/components/recent-card/recent-card.component';
import { MarkdownCardComponent } from './shared/components/markdown-card/markdown-card.component';

@NgModule({
  declarations: [
    HomeComponent,
    UserCardComponent,
    RecentCardComponent,
    MarkdownCardComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
