/*
 * @Descripttion: 有关 app search 组件的动画
 * @Author: 杨湛杰
 * @Date: 2020-12-05 14:16:06
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2020-12-05 14:41:04
 */
import {
  animate,
  animation,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { SHORT_TIME } from '.';

// 官方方法复用动画
export const searchBarAnimation = trigger('openClose', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(SHORT_TIME, style({ opacity: 1 })),
  ]),
  transition(':leave', [animate(SHORT_TIME, style({ opacity: 0 }))]),
]);
// 抽离动画
export const searchBarBlurAnimation = trigger('bulrOpenClose', [
  state(
    'open',
    style({
      filter: 'blur(3px)',
    })
  ),
  state(
    'close',
    style({
      filter: 'blur(0px)',
    })
  ),
  transition('open => close', [
    animate(
      SHORT_TIME,
      style({
        filter: 'blur(0px)',
      })
    ),
  ]),
  transition('close => open', [
    animate(
      SHORT_TIME,
      style({
        filter: 'blur(3px)',
      })
    ),
  ]),
]);
