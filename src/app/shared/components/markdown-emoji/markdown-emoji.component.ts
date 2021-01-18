import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

interface MarkdownEmojiType {
  icon: string;
  code: string;
  label?: string;
}

@Component({
  selector: 'app-markdown-emoji',
  templateUrl: './markdown-emoji.component.html',
  styleUrls: ['./markdown-emoji.component.scss'],
})
export class MarkdownEmojiComponent implements OnInit {
  constructor() {}

  @Output() select = new EventEmitter<string>();

  readonly markdownEmojiData: MarkdownEmojiType[] = [
    { icon: '💔', code: ':broken_heart:' },
    { icon: '❤️', code: ':heart:' },
    { icon: '👍', code: ':+1:' },
    { icon: '👎', code: ':-1:' },
    { icon: '🤡', code: ':clown_face:', label: '小丑竟是...' },
    { icon: '👴', code: ':older_man:', label: '爷' },
    { icon: '😊', code: ':blush:' },
    { icon: '😏', code: ':smirk:' },
    { icon: '😚', code: ':kissing_closed_eyes:' },
    { icon: '😆', code: ':satisfied:' },
    { icon: '😜', code: ':stuck_out_tongue_winking_eye:' },
    { icon: '😗', code: ':kissing:' },
    { icon: '😴', code: ':sleeping:' },
    { icon: '😧', code: ':anguished:' },
    { icon: '😕', code: ':confused:' },
    { icon: '😒', code: ':unamused:' },
    { icon: '😥', code: ':disappointed_relieved:' },
    { icon: '😞', code: ':disappointed:' },
    { icon: '😰', code: ':cold_sweat:' },
    { icon: '😭', code: ':sob:' },
    { icon: '😱', code: ':scream:' },
    { icon: '😠', code: ':angry:' },
    { icon: '😪', code: ':sleepy:' },
    { icon: '😎', code: ':sunglasses:' },
    { icon: '😈', code: ':smiling_imp:' },
    { icon: '😃', code: ':smiley:' },
    { icon: '😍', code: ':heart_eyes:' },
    { icon: '😳', code: ':flushed:' },
    { icon: '😁', code: ':grin:' },
    { icon: '😝', code: ':stuck_out_tongue_closed_eyes:' },
    { icon: '😙', code: ':kissing_smiling_eyes:' },
    { icon: '😟', code: ':worried:' },
    { icon: '😮', code: ':open_mouth:' },
    { icon: '😯', code: ':hushed:' },
    { icon: '😅', code: ':sweat_smile:' },
    { icon: '😩', code: ':weary:' },
    { icon: '😖', code: ':confounded:' },
    { icon: '😣', code: ':persevere:' },
    { icon: '😂', code: ':joy:' },
    { icon: '😫', code: ':tired_face:' },
    { icon: '😡', code: ':rage:' },
    { icon: '😋', code: ':yum:' },
    { icon: '😵', code: ':dizzy_face:' },
    { icon: '😐', code: ':neutral_face:' },
    { icon: '😘', code: ':kissing_heart:' },
    { icon: '😌', code: ':relieved:' },
    { icon: '😉', code: ':wink:' },
    { icon: '😀', code: ':grinning:' },
    { icon: '😛', code: ':stuck_out_tongue:' },
    { icon: '😦', code: ':frowning:' },
    { icon: '😬', code: ':grimacing:' },
    { icon: '😑', code: ':expressionless:' },
    { icon: '😓', code: ':sweat:' },
    { icon: '😔', code: ':pensive:' },
    { icon: '😨', code: ':fearful:' },
    { icon: '😢', code: ':cry:' },
    { icon: '😲', code: ':astonished:' },
    { icon: '😤', code: ':triumph:' },
    { icon: '😷', code: ':mask:' },
    { icon: '👿', code: ':imp:' },
    { icon: '😶', code: ':no_mouth:' },
  ];
  readonly emoji: string[] = [
    '😊',
    '😏',
    '😚',
    '😆',
    '😜',
    '😗',
    '😴',
    '😧',
    '😕',
    '😒',
    '😥',
    '😞',
    '😰',
    '😭',
    '😱',
    '😠',
    '😪',
    '😎',
    '😈',
    '😃',
    '😍',
    '😳',
    '😁',
    '😝',
    '😙',
    '😟',
    '😮',
    '😯',
    '😅',
    '😩',
    '😖',
    '😣',
    '😂',
    '😫',
    '😡',
    '😋',
    '😵',
    '😐',
    '😘',
    '😌',
    '😉',
    '😀',
    '😛',
    '😦',
    '😬',
    '😑',
    '😓',
    '😔',
    '😨',
    '😢',
    '😲',
    '😤',
    '😷',
    '👿',
    '😶',
  ];
  readonly emojiCode: string[] = [
    ':blush:',
    ':smirk:',
    ':kissing_closed_eyes:',
    ':satisfied:',
    ':stuck_out_tongue_winking_eye:',
    ':kissing:',
    ':sleeping:',
    ':anguished:',
    ':confused:',
    ':unamused:',
    ':disappointed_relieved:',
    ':disappointed:',
    ':cold_sweat:',
    ':sob:',
    ':scream:',
    ':angry:',
    ':sleepy:',
    ':sunglasses:',
    ':smiling_imp:',
    ':smiley:',
    ':heart_eyes:',
    ':flushed:',
    ':grin:',
    ':stuck_out_tongue_closed_eyes:',
    ':kissing_smiling_eyes:',
    ':worried:',
    ':open_mouth:',
    ':hushed:',
    ':sweat_smile:',
    ':weary:',
    ':confounded:',
    ':persevere:',
    ':joy:',
    ':tired_face:',
    ':rage:',
    ':yum:',
    ':dizzy_face:',
    ':neutral_face:',
    ':kissing_heart:',
    ':relieved:',
    ':wink:',
    ':grinning:',
    ':stuck_out_tongue:',
    ':frowning:',
    ':grimacing:',
    ':expressionless:',
    ':sweat:',
    ':pensive:',
    ':fearful:',
    ':cry:',
    ':astonished:',
    ':triumph:',
    ':mask:',
    ':imp:',
    ':no_mouth:',
  ];

  // '😊' ':blush:'	                        😃 ':smiley:'
  // '😏' ':smirk:'	                        😍 ':heart_eyes:'	                  😘 ':kissing_heart:'
  // '😚' ':kissing_closed_eyes:'	          😳 ':flushed:'	                    😌 ':relieved:'
  // '😆' ':satisfied:'	                    😁 ':grin:'	                        😉 ':wink:'
  // '😜' ':stuck_out_tongue_winking_eye:'	😝 ':stuck_out_tongue_closed_eyes:'	😀 ':grinning:'
  // '😗' ':kissing:'                       😙 ':kissing_smiling_eyes:'	        😛 ':stuck_out_tongue:'
  // '😴' ':sleeping:'	                    😟 ':worried:'	                    😦 ':frowning:'
  // '😧' ':anguished:'	                    😮 ':open_mouth:'	                  😬 ':grimacing:'
  // '😕' ':confused:'	                    😯 ':hushed:'	                      😑 ':expressionless:'
  // '😒' ':unamused:'	                    😅 ':sweat_smile:'                  😓 ':sweat:'
  // '😥' ':disappointed_relieved:'	        😩 ':weary:'	                      😔 ':pensive:'
  // '😞' ':disappointed:'	                😖 ':confounded:'	                  😨 ':fearful:'
  // '😰' ':cold_sweat:'	                  😣 ':persevere:'	                  😢 ':cry:'
  // '😭' ':sob:'    	                      😂 ':joy:'	                        😲 ':astonished:'
  // '😱' ':scream:'		                    😫 ':tired_face:'
  // '😠' ':angry:'	                        😡 ':rage:'	                        😤 ':triumph:'
  // '😪' ':sleepy:'	                      😋 ':yum:'	                        😷 ':mask:'
  // '😎' ':sunglasses:'	                  😵 ':dizzy_face:'	                  👿 ':imp:'
  // '😈' ':smiling_imp:'	                  😐 ':neutral_face:'	                😶 ':no_mouth:'

  ngOnInit(): void {
    // console.log(this.textarea);
  }
  selectEmoji(code: string) {
    this.select.emit(code);
  }
}
