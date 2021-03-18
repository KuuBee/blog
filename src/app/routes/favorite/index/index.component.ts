import { Component, OnInit } from '@angular/core';
interface FavoriteType {
  name: string;
  avatar: string;
  link: string;
}
const favorite: FavoriteType[] = [
  {
    // 喵喵人大哥
    name: 'nyanners',
    avatar: 'https://autocode.icu/assets/images/favorite/nSGrrtBu_400x400.jpeg',
    link: 'https://www.twitch.tv/nyanners',
  },
  {
    // 绿毛歌姬
    name: 'thinkerbella',
    avatar: 'https://autocode.icu/assets/images/favorite/z_I-u3Zl_400x400.jpeg',
    link: 'https://www.twitch.tv/thinkerbella',
  },
  {
    // 喵喵2号
    name: 'nyaadia',
    avatar: 'https://autocode.icu/assets/images/favorite/-wDBnPjx.png',
    link: 'https://www.twitch.tv/nyaadia',
  },
  {
    // 水母
    name: 'ShimizuAiyu',
    avatar: 'https://autocode.icu/assets/images/favorite/bVkES1_M_400x400.jpeg',
    link: 'https://www.twitch.tv/shimizuaiyu',
  },
  {
    // 大鲸鱼
    name: 'hikarustation',
    avatar: 'https://autocode.icu/assets/images/favorite/zIYJ8XC3_400x400.jpeg',
    link: 'https://www.twitch.tv/hikarustation',
  },
  {
    // 可可爱爱的粉毛
    name: 'niniyuuna',
    avatar: 'https://autocode.icu/assets/images/favorite/Ej66TUFu_400x400.png',
    link: 'https://www.twitch.tv/niniyuuna',
  },
  {
    // 西语粉毛恶魔？
    name: 'ironmouse',
    avatar: 'https://autocode.icu/assets/images/favorite/Xjt2TTgF_400x400.jpeg',
    link: 'https://www.twitch.tv/ironmouse',
  },
  {
    // 鲨鲨
    name: 'Gawr Gura',
    avatar: 'https://autocode.icu/assets/images/favorite/uRrxAmOB_400x400.jpeg',
    link: 'https://www.youtube.com/channel/UCoSrY_IQQVpmIRZ9Xf-y93g',
  },
];

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor() {}
  favorite: FavoriteType[] = favorite;
  ngOnInit(): void {
  }
  pullUp(link: string) {
    window.open(link);
  }
}
