/*
 * @Descripttion:
 * @Author: 杨湛杰
 * @Date: 2021-01-08 10:47:19
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-08 13:54:34
 */
import {
  animate,
  SHORT_TIME,
  style,
  transition,
  trigger,
  stagger,
  query,
  animateChild,
} from './index';
export const markdownEmojiTrigger = [
  trigger('markdownEmojiTrigger', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(SHORT_TIME, style({ opacity: 1 })),
    ]),
    transition(':leave', [animate(SHORT_TIME, style({ opacity: 0 }))]),
  ]),
];
