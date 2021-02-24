/*
 * @Descripttion: 最近文章卡片动画
 * @Author: KuuBee
 * @Date: 2021-02-20 16:55:32
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-02-20 16:56:49
 */
import {
  query,
  transition,
  trigger,
  style,
  stagger,
  animate,
} from '@angular/animations';

export const recentCardAnimation = trigger('recentCardAnimation', [
  transition(':increment', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateX(100px)' }),
        stagger(100, [
          animate(
            '370ms cubic-bezier(0.050, 0.740, 0.175, 0.795)',
            style({ opacity: 1, transform: 'none' })
          ),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);
