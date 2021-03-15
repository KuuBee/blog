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
    avatar:
      'https://pbs.twimg.com/profile_images/1362851757290713089/nSGrrtBu_400x400.jpg',
    link: 'https://www.twitch.tv/nyanners',
  },
  {
    // 绿毛歌姬
    name: 'thinkerbella',
    avatar:
      'https://pbs.twimg.com/profile_images/1360833041447362561/z_I-u3Zl_400x400.jpg',
    link: 'https://www.twitch.tv/thinkerbella',
  },
  {
    // 喵喵2号
    name: 'nyaadia',
    avatar:
      'https://pbs.twimg.com/card_img/1370918775839547393/-wDBnPjx?format=png&name=4096x4096',
    link: 'https://www.twitch.tv/nyaadia',
  },
  {
    // 水母
    name: 'ShimizuAiyu',
    avatar:
      'https://pbs.twimg.com/profile_images/1335489735536439297/bVkES1_M_400x400.jpg',
    link: 'https://www.twitch.tv/shimizuaiyu',
  },
  {
    // 大鲸鱼
    name: 'hikarustation',
    avatar:
      'https://pbs.twimg.com/profile_images/1370017325735362571/zIYJ8XC3_400x400.jpg',
    link: 'https://www.twitch.tv/hikarustation',
  },
  {
    // 可可爱爱的粉毛
    name: 'niniyuuna',
    avatar:
      'https://pbs.twimg.com/profile_images/1365910455814922240/Ej66TUFu_400x400.png',
    link: 'https://www.twitch.tv/niniyuuna',
  },
  {
    // 西语粉毛恶魔？
    name: 'ironmouse',
    avatar:
      'https://pbs.twimg.com/profile_images/1351248075906568197/Xjt2TTgF_400x400.jpg',
    link: 'https://www.twitch.tv/ironmouse',
  },
  {
    // 鲨鲨
    name: 'Gawr Gura',
    avatar:
      'https://pbs.twimg.com/profile_images/1309957523089354760/uRrxAmOB_400x400.jpg',
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
    console.log(this.favorite);
  }
  pullUp(link: string) {
    window.open(link);
  }
}
