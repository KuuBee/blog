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
import { AppSnackBarService } from '@app/shared/services/app-snack-bar.service';
import { AuthService } from '@app/shared/services/auth.service';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-friend-link',
  templateUrl: './friend-link.component.html',
  styleUrls: ['./friend-link.component.scss'],
})
export class FriendLinkComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private _dialog: AppDialogService,
    private _friednLinkApi: FriendLinkApiService,
    private _auth: AuthService,
    private _snackBar: AppSnackBarService
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
      this.friednLinkArr = res.data;
    });
  }
  calcCols() {
    this.cols = Math.floor(
      this.friendCardDom.clientWidth / FRIEND_CARD_COMPONENT_MIN_WIDTH
    );
  }
  openDialog() {
    if (this._auth.isLogin) {
      this._dialog.createFriendLink();
    } else {
      this._snackBar.warning('登陆后才能创建友链哦');
      const sub = this._dialog
        .login()
        .afterClosed()
        .subscribe((res) => {
          if (res?.code === 1) {
            sub.unsubscribe();
            this._dialog.createFriendLink();
          }
        });
    }
  }
}
