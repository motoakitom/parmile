import { Product } from "@/data/sample-products";

// GUの商品情報
const guProducts: Product[] = [
  {
    id: "gu-357051",
    name: "ドライポンチT(5分袖)",
    brand: "GU",
    price: 990,
    images: [
      "https://image.uniqlo.com/GU/ST3/AsianCommon/imagesgoods/357051/item/goods_08_357051_3x4.jpg?width=300",
      "https://image.uniqlo.com/GU/ST3/AsianCommon/imagesgoods/357051/sub/goods_357051_sub1.jpg?width=300",
      "https://image.uniqlo.com/GU/ST3/AsianCommon/imagesgoods/357051/sub/goods_357051_sub2.jpg?width=300"
    ],
    description: "適度なハリ感で、きれいめスタイリングに最適なポンチ素材を使用。表地はコットン糸、裏地にポリエステル糸を使用し、なめらかな肌触りを実現。",
    category: "トップス",
    color: "ダークグレー",
    material: "綿56%・ポリエステル44%(リサイクルポリエステル繊維を100%使用)",
    url: "https://www.gu-global.com/jp/ja/products/E357051-000/00"
  },
  {
    id: "gu-349488",
    name: "スウェT(5分袖)",
    brand: "GU",
    price: 990,
    images: [
      "https://image.uniqlo.com/GU/ST3/AsianCommon/imagesgoods/349488/item/goods_35_349488_3x4.jpg?width=300",
      "https://image.uniqlo.com/GU/ST3/AsianCommon/imagesgoods/349488/sub/goods_349488_sub1.jpg?width=300",
      "https://image.uniqlo.com/GU/ST3/AsianCommon/imagesgoods/349488/sub/goods_349488_sub2.jpg?width=300"
    ],
    description: "スウェットのディテールを取り入れた1枚。製品にリサイクルポリエステルを使用。",
    category: "トップス",
    color: "ブラウン",
    material: "綿60%・ポリエステル40%(リサイクルポリエステル繊維を100%使用)",
    url: "https://www.gu-global.com/jp/ja/products/E349488-000/00"
  },
  {
    id: "gu-355835",
    name: "ワイドフィットジーンズ",
    brand: "GU",
    price: 2490,
    images: [
      "https://image.uniqlo.com/GU/ST3/AsianCommon/imagesgoods/355835/item/goods_09_355835_3x4.jpg?width=300",
      "https://image.uniqlo.com/GU/ST3/AsianCommon/imagesgoods/355835/sub/goods_355835_sub1.jpg?width=300",
      "https://image.uniqlo.com/GU/ST3/AsianCommon/imagesgoods/355835/sub/goods_355835_sub2.jpg?width=300"
    ],
    description: "トレンドのワイドシルエットのジーンズ。ゆったりとしたシルエットで快適な着心地。",
    category: "ボトムス",
    color: "ブルー",
    material: "綿99%・ポリウレタン1%",
    url: "https://www.gu-global.com/jp/ja/products/E355835-000/00"
  },
  {
    id: "gu-355872",
    name: "ベイカーパンツ",
    brand: "GU",
    price: 2490,
    images: [
      "https://image.uniqlo.com/GU/ST3/AsianCommon/imagesgoods/355872/item/goods_07_355872_3x4.jpg?width=300",
      "https://image.uniqlo.com/GU/ST3/AsianCommon/imagesgoods/355872/sub/goods_355872_sub1.jpg?width=300",
      "https://image.uniqlo.com/GU/ST3/AsianCommon/imagesgoods/355872/sub/goods_355872_sub2.jpg?width=300"
    ],
    description: "ワークテイストのベイカーパンツ。ウエストはゴム仕様で着脱しやすく、快適な履き心地。",
    category: "ボトムス",
    color: "ベージュ",
    material: "綿100%",
    url: "https://www.gu-global.com/jp/ja/products/E355872-000/00"
  }
];

// ZARAの商品情報
const zaraProducts: Product[] = [
  {
    id: "zara-00840464",
    name: "スーパーバギーフィットジーンズ",
    brand: "ZARA",
    price: 6990,
    images: [
      "https://static.zara.net/assets/public/e581/8c3d/ce784014a2a1/e3ce256e3951/00840464800-a1/00840464800-a1.jpg?ts=1741351622127&w=706",
      "https://static.zara.net/assets/public/e581/8c3d/ce784014a2a1/e3ce256e3951/00840464800-a2/00840464800-a2.jpg?ts=1741351622127&w=706",
      "https://static.zara.net/assets/public/e581/8c3d/ce784014a2a1/e3ce256e3951/00840464800-a3/00840464800-a3.jpg?ts=1741351622127&w=706"
    ],
    description: "フロントにジッパー付きフライとボタン留めのスーパーバギーフィットジーンズ。フロントとバックにポケット付き。",
    category: "ボトムス",
    color: "ブルー",
    material: "コットン100%",
    url: "https://www.zara.com/jp/ja/%E3%82%B9%E3%83%BC%E3%83%8F%E3%82%9A%E3%83%BC%E3%83%8F%E3%82%99%E3%82%AD%E3%82%99%E3%83%BC%E3%83%95%E3%82%A3%E3%83%83%E3%83%88%E3%82%B7%E3%82%99%E3%83%BC%E3%83%B3%E3%82%B9%E3%82%99-p00840464.html?v1=426918102&v2=2541435"
  },
  {
    id: "zara-04518907",
    name: "ダブルブレスト仕様ボタンブレザー",
    brand: "ZARA",
    price: 12990,
    images: [
      "https://static.zara.net/assets/public/e125/920c/45c14d37a003/452f7ac55c79/04518907401-a1/04518907401-a1.jpg?ts=1744726123883&w=706",
      "https://static.zara.net/assets/public/e125/920c/45c14d37a003/452f7ac55c79/04518907401-a2/04518907401-a2.jpg?ts=1744726123883&w=706",
      "https://static.zara.net/assets/public/e125/920c/45c14d37a003/452f7ac55c79/04518907401-a3/04518907401-a3.jpg?ts=1744726123883&w=706"
    ],
    description: "ラペルカラーのダブルブレスト仕様ブレザー。フロントにボタン付き。長袖。フロントにフラップ付きポケット。背面にセンターベント入り。フロントボタン留め。",
    category: "アウター",
    color: "ネイビーブルー",
    material: "表地：ポリエステル70%、ビスコース28%、エラスタン2%",
    url: "https://www.zara.com/jp/ja/%E3%82%BF%E3%82%99%E3%83%95%E3%82%99%E3%83%AB%E3%83%95%E3%82%99%E3%83%AC%E3%82%B9%E3%83%88%E4%BB%95%E6%A7%98%E3%83%9B%E3%82%99%E3%82%BF%E3%83%B3%E3%83%95%E3%82%99%E3%83%AC%E3%82%B5%E3%82%99%E3%83%BC-p04518907.html?v1=443039648&v2=2541435"
  },
  {
    id: "zara-06045411",
    name: "ダメージ加工バギーフィットジーンズ",
    brand: "ZARA",
    price: 7990,
    images: [
      "https://static.zara.net/assets/public/3dd9/6429/68f644a490a6/6adc69f7654e/06045411406-a1/06045411406-a1.jpg?ts=1746006572982&w=706",
      "https://static.zara.net/assets/public/3dd9/6429/68f644a490a6/6adc69f7654e/06045411406-a2/06045411406-a2.jpg?ts=1746006572982&w=706",
      "https://static.zara.net/assets/public/3dd9/6429/68f644a490a6/6adc69f7654e/06045411406-a3/06045411406-a3.jpg?ts=1746006572982&w=706"
    ],
    description: "フロントにジッパー付きフライとボタン留めのバギーフィットジーンズ。5ポケット。ダメージ加工入り。裾にスリット入り。",
    category: "ボトムス",
    color: "ブルー",
    material: "コットン100%",
    url: "https://www.zara.com/jp/ja/%E3%82%BF%E3%82%99%E3%83%A1%E3%83%BC%E3%82%B7%E3%82%99%E5%8A%A0%E5%B7%A5%E3%83%8F%E3%82%99%E3%82%AD%E3%82%99%E3%83%BC%E3%83%95%E3%82%A3%E3%83%83%E3%83%88%E3%82%B7%E3%82%99%E3%83%BC%E3%83%B3%E3%82%B9%E3%82%99-p06045411.html?v1=438828480&v2=2541435"
  },
  {
    id: "zara-04515908",
    name: "ストライプ柄スーツブレザー",
    brand: "ZARA",
    price: 14990,
    images: [
      "https://static.zara.net/assets/public/38fb/7bf7/639747a4b2dd/129046786856/04515908401-a1/04515908401-a1.jpg?ts=1744726115311&w=706",
      "https://static.zara.net/assets/public/38fb/7bf7/639747a4b2dd/129046786856/04515908401-a2/04515908401-a2.jpg?ts=1744726115311&w=706",
      "https://static.zara.net/assets/public/38fb/7bf7/639747a4b2dd/129046786856/04515908401-a3/04515908401-a3.jpg?ts=1744726115311&w=706"
    ],
    description: "ラペルカラーのストライプ柄ブレザー。長袖。フロントにフラップ付きポケット。胸元にウェルトポケット。背面にセンターベント入り。フロントボタン留め。",
    category: "アウター",
    color: "ブルー/ホワイト",
    material: "表地：ポリエステル65%、ビスコース33%、エラスタン2%",
    url: "https://www.zara.com/jp/ja/%E3%82%B9%E3%83%88%E3%83%A9%E3%82%A4%E3%83%95%E3%82%9A%E6%9F%84%E3%82%B9%E3%83%BC%E3%83%84%E3%83%95%E3%82%99%E3%83%AC%E3%82%B5%E3%82%99%E3%83%BC-p04515908.html?v1=442525852&v2=2541435"
  }
];

// すべての商品情報を結合
export const externalProducts: Product[] = [...guProducts, ...zaraProducts];

// 商品をランダムに並び替える関数
export function getRandomizedProducts(): Product[] {
  return [...externalProducts].sort(() => Math.random() - 0.5);
}