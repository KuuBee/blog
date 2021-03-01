import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FriendCardComponent } from '@app/shared/components/friend-card/friend-card.component';
import { AppDialogService } from '@app/shared/services/app-dialog.service';
import { fromEvent, Subscription } from 'rxjs';
import { CreateLinkDialogRefComponent } from '../shared/components/create-link-dialog-ref/create-link-dialog-ref.component';

@Component({
  selector: 'app-friend-link',
  templateUrl: './friend-link.component.html',
  styleUrls: ['./friend-link.component.scss'],
})
export class FriendLinkComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private _appDialog: AppDialogService) {}
  @ViewChild('friendCard') friendCardRef!: ElementRef<HTMLElement>;
  @ViewChild(FriendCardComponent) friendCard!: FriendCardComponent;
  cols = 3;
  eventSub?: Subscription;
  get friendCardDom() {
    return this.friendCardRef.nativeElement;
  }
  get minimumFriendCardWidth() {
    return this.cols * this.friendCard.MIN_WINTH;
  }

  ngOnInit(): void {
    this.eventSub = fromEvent(window, 'resize').subscribe(() => {
      this.calcCols();
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.calcCols();
    });
  }
  ngOnDestroy() {
    if (this.eventSub) this.eventSub.unsubscribe();
  }
  calcCols() {
    this.cols = Math.floor(
      this.friendCardDom.clientWidth / this.friendCard.MIN_WINTH
    );
  }
  openDialog() {
    this._appDialog.createFriendLink();
  }
}
