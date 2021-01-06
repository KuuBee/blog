import { Component, OnInit } from '@angular/core';
import { searchBarAnimation } from '../../animation/app-search.animation';
import { AppSearchService } from '../../services/app-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './app-search.component.html',
  styleUrls: ['./app-search.component.scss'],
  animations: [searchBarAnimation],
})
export class AppSearchComponent implements OnInit {
  constructor(private appSearchService: AppSearchService) {}
  escClose = ($event: KeyboardEvent) => {
    if ($event.code === 'Escape') {
      this.close();
    }
  };
  get isShow() {
    if (this.appSearchService.isShow) {
      window.addEventListener('keydown', this.escClose);
    }
    return this.appSearchService.isShow;
  }
  ngOnInit(): void {}
  close() {
    window.removeEventListener('keydown', this.escClose);
    this.appSearchService.changeStatus(false);
  }
}
