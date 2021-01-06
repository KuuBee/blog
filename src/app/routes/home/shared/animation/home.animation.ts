import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { SHORT_TIME } from '@app/shared/animation';

const ANIMATE_TIEM = `${SHORT_TIME} cubic-bezier(0.050, 0.740, 0.175, 0.795)`;
export const homePageAnimation = trigger('homePageAnimation', [
  transition(':enter', [
    group([
      query('.home-module__content', [
        style({
          opacity: 0,
        }),
        animate(SHORT_TIME, style({ opacity: 1 })),
      ]),
      query('.home-module__left', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate(ANIMATE_TIEM, style({ opacity: 1, transform: 'none' })),
      ]),
      query('.home-module__right', [
        style({ opacity: 0, transform: 'translateX(100px)' }),
        animate(ANIMATE_TIEM, style({ opacity: 1, transform: 'none' })),
      ]),
    ]),
  ]),
  transition(':leave', [
    group([
      query('.home-module__content', [
        animate(SHORT_TIME, style({ width: '1000px' })),
      ]),
      query('.home-module__left', [
        style({ opacity: 1, transform: 'none' }),
        animate(
          ANIMATE_TIEM,
          style({ opacity: 0, transform: 'translateX(-100px)' })
        ),
      ]),
      query('.home-module__right', [
        style({ opacity: 1, transform: 'none' }),
        animate(
          ANIMATE_TIEM,
          style({ opacity: 0, transform: 'translateX(100px)' })
        ),
      ]),
    ]),
  ]),
]);
