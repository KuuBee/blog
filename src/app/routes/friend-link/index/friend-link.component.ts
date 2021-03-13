import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FriendLinkApiService,
  FriendLinkApiType,
} from '@app/core/api/friend-link-api.service';
import {
  FriendCardComponent,
  FRIEND_CARD_COMPONENT_MIN_WIDTH,
} from '@app/shared/components/friend-card/friend-card.component';
import { AppDialogService } from '@app/shared/services/app-dialog.service';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-friend-link',
  templateUrl: './friend-link.component.html',
  styleUrls: ['./friend-link.component.scss'],
})
export class FriendLinkComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private _appDialog: AppDialogService,
    private _friednLinkApi: FriendLinkApiService
  ) {}

  @ViewChild('friendCard') friendCardRef!: ElementRef<HTMLElement>;
  @ViewChild(FriendCardComponent) friendCard!: FriendCardComponent;
  cols = 3;
  eventSub?: Subscription;
  friednLinkArr: FriendLinkApiType.Response.IndexData[] = [];
  get friendCardDom() {
    return this.friendCardRef.nativeElement;
  }
  get minimumFriendCardWidth() {
    return this.cols * FRIEND_CARD_COMPONENT_MIN_WIDTH;
  }

  ngOnInit(): void {
    this.eventSub = fromEvent(window, 'resize').subscribe(() => {
      this.calcCols();
    });
    this.requestFriendLinkIndex();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.calcCols();
    });
  }
  ngOnDestroy() {
    this.eventSub?.unsubscribe();
  }
  requestFriendLinkIndex() {
    this._friednLinkApi.index().subscribe((res) => {
      console.log(res);
      this.friednLinkArr = res.data;
    });
  }
  calcCols() {
    this.cols = Math.floor(
      this.friendCardDom.clientWidth / FRIEND_CARD_COMPONENT_MIN_WIDTH
    );
  }
  openDialog() {
    this._appDialog.createFriendLink();
  }
}
