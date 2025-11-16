import heroImage from '../assets/images/hero.svg';
import interiorImage from '../assets/images/interior.svg';
import latteArtImage from '../assets/images/latte-art.svg';
import roasteryImage from '../assets/images/roastery.svg';
import dessertImage from '../assets/images/dessert.svg';
import galleryImage1 from '../assets/images/gallery1.svg';
import galleryImage2 from '../assets/images/gallery2.svg';
import galleryImage3 from '../assets/images/gallery3.svg';

export const contentData = {
  top: {
    title: 'Sample Cafe へようこそ',
    subtitle: '一杯ごとに、ちいさなひと休みを。',
    body:
      'こちらはカフェ・飲食店向けのデモサイトです。写真や文章、色合いを整えることで、初めてのお客様にもお店の雰囲気やこだわりが伝わるトップページを表現できます。管理画面からテキストや画像を自由に編集して、あなたのお店様にカスタマイズしてください。',
    highlight: '淹れたての時間を、ゆっくりと。',
    image: heroImage,
    extra_info: 'signature=季節ごとに変わるシングルオリジンコーヒーと自家製デザート',
  },
  access: {
    title: 'アクセス・営業時間',
    subtitle: '落ち着いた時間を過ごせる、あなたの隠れ家へ。',
    body:
      'こちらのページでは、住所・電話番号・最寄り駅からの道順など、ご来店に必要な情報をまとめて案内できます。管理画面から営業時間や定休日などを変更して、実際の店舗情報に合わせてご利用ください。',
    highlight: '平日 09:00〜20:00 / 土日祝 10:00〜22:00',
    image: interiorImage,
    extra_info: '住所=デモ市サンプル区サンプル町1-2-3\n電話=000-0000-0000\n定休日=年中無休',
  },
  reservations: {
    title: 'ご予約について',
    subtitle: 'お席のご予約はお気軽にどうぞ。',
    body:
      'お客様がスムーズにお席を予約できるように、予約方法をわかりやすくまとめておくスペースです。外部の予約システムへのリンクや、お電話・メールでの受付方法などを自由に記載できます。',
    highlight: '一人ひとりに合わせた心地よい時間をご用意します。',
    image: latteArtImage,
    extra_info: 'cta=Webで予約する|link=#',
  },
  about: {
    title: 'ストーリーとこだわり',
    subtitle: '一杯のコーヒーに込めた想い。',
    body:
      'お店のはじまりや、豆・食材へのこだわり、空間づくりへの想いなどを伝えるためのページです。産地とのつながりや、地域への想い、スタッフのストーリーなどを自由に書き換えて、ブランドの世界観をお客様に届けてください。',
    highlight: '心をほどく一杯を、ていねいに。',
    image: roasteryImage,
    extra_info: 'team=オーナー, バリスタ, パティシエ',
  },
  features: {
    title: 'ハイライト',
    subtitle: '訪れるたびにうれしい、小さな特別をご用意しています。',
    body:
      'おすすめメニューや季節限定、イベント情報など、お店の「推しポイント」をカード形式で一覧表示できます。管理画面から自由に追加・削除・編集可能です。',
    highlight: '今日の気分に寄り添う一杯を。',
    image: dessertImage,
    extra_info: '',
  },
};

export const featureData = [
  {
    id: 1,
    title: '季節のペアリング',
    description: 'コーヒーごとに相性を考えた、季節限定のデザートセットをご用意しています。',
    icon: 'fa-leaf',
  },
  {
    id: 2,
    title: 'アコースティックナイト',
    description: '週末の夜には、地域のアーティストによる生演奏をお楽しみいただけます。',
    icon: 'fa-music',
  },
  {
    id: 3,
    title: 'バリスタワークショップ',
    description: 'ご自宅でも楽しめるハンドドリップ講座など、少人数制のワークショップを開催しています。',
    icon: 'fa-chalkboard-teacher',
  },
];

export const galleryData = [
  { id: 1, file_path: galleryImage1, caption: '看板エスプレッソの一杯' },
  { id: 2, file_path: galleryImage2, caption: 'イベントやポップアップの様子' },
  { id: 3, file_path: galleryImage3, caption: '季節のデザートとドリンクのペアリング' },
];

export const announcementData = [
  {
    id: 1,
    title: '本日のおすすめ豆が変わりました',
    content: '季節のおすすめや新入荷の豆など、最新情報をここでお知らせできます。',
    published_at: '2024-05-01T09:00:00',
  },
  {
    id: 2,
    title: '週末はライブイベントを開催',
    content: '地域アーティストによるアコースティックライブを毎週末に実施しています。',
    published_at: '2024-05-08T12:00:00',
  },
  {
    id: 3,
    title: '母の日限定のギフトセット登場',
    content: '焼き菓子とドリップバッグを組み合わせたギフトセットを数量限定で販売します。',
    published_at: '2024-05-10T15:00:00',
  },
];
