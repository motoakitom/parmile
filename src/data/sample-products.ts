export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  color: string;
  size?: string;
  material?: string;
  url: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "オーバーサイズTシャツ",
    brand: "UNIQLO",
    price: 2990,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
    ],
    description: "ゆったりとしたシルエットが特徴のオーバーサイズTシャツ。柔らかな肌触りの綿素材を使用。",
    category: "トップス",
    color: "ブラック",
    material: "コットン100%",
    url: "https://example.com/product/1"
  },
  {
    id: "2",
    name: "ストレートデニムパンツ",
    brand: "ZARA",
    price: 5990,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599447292180-45fd84092ef4?auto=format&fit=crop&w=800&q=80"
    ],
    description: "クラシックなストレートフィットのデニムパンツ。上質な生地で耐久性に優れています。",
    category: "ボトムス",
    color: "インディゴ",
    material: "コットン98%、ポリウレタン2%",
    url: "https://example.com/product/2"
  },
  {
    id: "3",
    name: "オーバーサイズパーカー",
    brand: "H&M",
    price: 3990,
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80"
    ],
    description: "快適な着心地のオーバーサイズパーカー。カジュアルなスタイルに最適。",
    category: "トップス",
    color: "グレー",
    material: "コットン80%、ポリエステル20%",
    url: "https://example.com/product/3"
  },
  {
    id: "4",
    name: "スリムフィットジーンズ",
    brand: "GU",
    price: 2490,
    images: [
      "https://images.unsplash.com/photo-1604176424472-17cd740f74e9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80"
    ],
    description: "体のラインに沿ったスリムフィットジーンズ。ストレッチ素材で動きやすい。",
    category: "ボトムス",
    color: "ブラック",
    material: "コットン95%、ポリウレタン5%",
    url: "https://example.com/product/4"
  },
  {
    id: "5",
    name: "ロングスリーブTシャツ",
    brand: "UNIQLO",
    price: 1990,
    images: [
      "https://images.unsplash.com/photo-1618354691438-25bc04f85a89?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80"
    ],
    description: "シンプルで着回しやすいロングスリーブTシャツ。ソフトな肌触りが特徴。",
    category: "トップス",
    color: "ホワイト",
    material: "コットン100%",
    url: "https://example.com/product/5"
  },
  {
    id: "6",
    name: "ワイドパンツ",
    brand: "MUJI",
    price: 4900,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551854638-8a7e7ecdca94?auto=format&fit=crop&w=800&q=80"
    ],
    description: "ゆったりとしたシルエットのワイドパンツ。リラックスした着心地と洗練されたスタイルを両立。",
    category: "ボトムス",
    color: "ベージュ",
    material: "コットン100%",
    url: "https://example.com/product/6"
  },
  {
    id: "7",
    name: "クルーネックセーター",
    brand: "GAP",
    price: 5990,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588187284031-6f6ede741c7a?auto=format&fit=crop&w=800&q=80"
    ],
    description: "柔らかな肌触りのクルーネックセーター。シンプルなデザインで様々なコーディネートに合わせやすい。",
    category: "トップス",
    color: "ネイビー",
    material: "ウール70%、アクリル30%",
    url: "https://example.com/product/7"
  },
  {
    id: "8",
    name: "スキニージーンズ",
    brand: "ZARA",
    price: 4990,
    images: [
      "https://images.unsplash.com/photo-1603217192634-61068e4d4bf9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=80"
    ],
    description: "体のラインに沿ったスキニーフィットのジーンズ。伸縮性のある素材で快適な着心地。",
    category: "ボトムス",
    color: "ライトブルー",
    material: "コットン92%、ポリエステル6%、ポリウレタン2%",
    url: "https://example.com/product/8"
  },
  {
    id: "9",
    name: "ボタンダウンシャツ",
    brand: "UNIQLO",
    price: 3990,
    images: [
      "https://images.unsplash.com/photo-1598961942613-ba897716405b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=800&q=80"
    ],
    description: "クラシックなボタンダウンシャツ。オックスフォード生地で耐久性と快適さを両立。",
    category: "トップス",
    color: "ライトブルー",
    material: "コットン100%",
    url: "https://example.com/product/9"
  },
  {
    id: "10",
    name: "チノパン",
    brand: "GAP",
    price: 4990,
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7b70b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "定番のチノパン。様々なスタイルに合わせやすく、オールシーズン活躍するアイテム。",
    category: "ボトムス",
    color: "カーキ",
    material: "コットン98%、ポリウレタン2%",
    url: "https://example.com/product/10"
  }
]; 