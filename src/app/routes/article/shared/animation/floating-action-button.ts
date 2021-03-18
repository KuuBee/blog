/*
 * @Descripttion: 浮动按钮动画
 * @Author: KuuBee
 * @Date: 2021-01-30 17:27:07
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-01-30 17:46:36
 */
import { trigger, transition, style, animate } from '@angular/animations';

const floatingActionButtonDefaultStyle = style({
  opacity: 0.7,
  transform: 'scale(0) rotate(180deg)',
});

export const floatingActionButtonRemoveTrigger = trigger(
  'floatingActionButtonRemoveTrigger',
  [
    transition(':enter', [
      floatingActionButtonDefaultStyle,
      animate(
        '100ms',
        style({
          opacity: 1,
          transform: 'scale(1) rotate(0)',
        })
      ),
    ]),
    transition(':leave', [animate('100ms', floatingActionButtonDefaultStyle)]),
  ]
);
