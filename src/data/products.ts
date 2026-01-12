import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'prod-1',
    name: '極速跑鞋 Pro',
    brandId: 'brand-1',
    price: 3200,
    originalPrice: 3800,
    description: '採用最新氣墊科技，提供絕佳的避震效果與支撐力，適合長距離跑步與訓練。',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
    ],
    category: '運動鞋',
    colors: ['黑色', '白色', '藍色'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    isFeatured: true,
    tags: ['新品', '熱銷']
  },
  {
    id: 'prod-2',
    name: '經典商務皮鞋',
    brandId: 'brand-2',
    price: 4500,
    description: '精選頂級牛皮，手工縫製，展現專業紳士風範。適合正式場合穿著。',
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&h=800&fit=crop',
    ],
    category: '皮鞋',
    colors: ['黑色', '棕色'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10'],
    isFeatured: true,
    tags: ['經典款']
  },
  {
    id: 'prod-3',
    name: '輕便帆布鞋',
    brandId: 'brand-3',
    price: 1280,
    description: '透氣舒適的帆布材質，百搭又時尚，是日常穿搭的最佳選擇。',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&h=800&fit=crop',
    ],
    category: '休閒鞋',
    colors: ['白色', '黑色', '紅色', '藍色'],
    sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10'],
    isFeatured: true,
    tags: ['人氣商品']
  },
  {
    id: 'prod-4',
    name: '籃球鞋 Elite',
    brandId: 'brand-4',
    price: 3800,
    originalPrice: 4200,
    description: '專業籃球鞋，提供極佳的腳踝支撐與抓地力，助你在球場上發揮最佳表現。',
    images: [
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop',
    ],
    category: '運動鞋',
    colors: ['紅色', '黑色', '白色'],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    isFeatured: true,
    tags: ['運動', '專業']
  },
  {
    id: 'prod-5',
    name: '機能健走鞋',
    brandId: 'brand-5',
    price: 2800,
    description: '符合人體工學設計，足弓支撐完美，適合長時間步行與健走活動。',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&h=800&fit=crop',
    ],
    category: '機能鞋',
    colors: ['灰色', '黑色', '藍色'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10'],
    isFeatured: true,
    tags: ['舒適', '健康']
  },
  {
    id: 'prod-6',
    name: '潮流老爹鞋',
    brandId: 'brand-6',
    price: 3500,
    description: '復古與現代完美結合，厚底設計增高又時尚，街頭穿搭必備單品。',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop',
    ],
    category: '潮鞋',
    colors: ['白色', '米色', '黑色'],
    sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10'],
    isFeatured: true,
    tags: ['潮流', '熱銷']
  },
  {
    id: 'prod-7',
    name: '兒童運動鞋',
    brandId: 'brand-7',
    price: 1580,
    description: '專為活潑好動的孩子設計，安全防滑，讓孩子盡情玩耍無憂。',
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=800&fit=crop',
    ],
    category: '童鞋',
    colors: ['粉紅色', '藍色', '黃色'],
    sizes: ['童鞋 13', '童鞋 1', '童鞋 2', '童鞋 3'],
    isFeatured: false,
    tags: ['兒童', '安全']
  },
  {
    id: 'prod-8',
    name: '專業登山鞋',
    brandId: 'brand-8',
    price: 4800,
    description: '防水透氣材質，堅固耐用，提供絕佳的抓地力與穩定性，征服各種地形。',
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&h=800&fit=crop',
    ],
    category: '登山鞋',
    colors: ['咖啡色', '灰色', '黑色'],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11'],
    isFeatured: true,
    tags: ['戶外', '專業']
  },
  {
    id: 'prod-9',
    name: '休閒懶人鞋',
    brandId: 'brand-3',
    price: 1680,
    description: '一腳蹬設計，穿脫方便，柔軟舒適，是日常休閒的好夥伴。',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop',
    ],
    category: '休閒鞋',
    colors: ['黑色', '藍色', '灰色'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10'],
    isFeatured: false,
    tags: ['舒適', '便利']
  },
  {
    id: 'prod-10',
    name: '馬拉松跑鞋',
    brandId: 'brand-1',
    price: 3600,
    description: '輕量化設計，專為長跑愛好者打造，提供持久的舒適感與支撐力。',
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
    ],
    category: '運動鞋',
    colors: ['橘色', '黑色', '綠色'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    isFeatured: false,
    tags: ['專業', '輕量']
  },
  {
    id: 'prod-11',
    name: '正裝牛津鞋',
    brandId: 'brand-2',
    price: 5200,
    description: '經典牛津款式，精緻工藝，適合重要場合與商務會議。',
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&h=800&fit=crop',
    ],
    category: '皮鞋',
    colors: ['黑色', '棕色'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    isFeatured: false,
    tags: ['正式', '經典']
  },
  {
    id: 'prod-12',
    name: '訓練運動鞋',
    brandId: 'brand-4',
    price: 2980,
    description: '多功能訓練鞋，適合健身房各種運動項目，穩定舒適。',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800&h=800&fit=crop',
    ],
    category: '運動鞋',
    colors: ['黑色', '白色', '灰色'],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11'],
    isFeatured: false,
    tags: ['健身', '訓練']
  },
  {
    id: 'prod-13',
    name: '女款涼鞋',
    brandId: 'brand-5',
    price: 1980,
    description: '夏日必備涼鞋，透氣舒適，足部支撐良好，時尚又健康。',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=800&fit=crop',
    ],
    category: '涼鞋',
    colors: ['米色', '黑色', '白色'],
    sizes: ['US 5', 'US 6', 'US 7', 'US 8'],
    isFeatured: false,
    tags: ['夏季', '女款']
  },
  {
    id: 'prod-14',
    name: '街頭高筒鞋',
    brandId: 'brand-6',
    price: 3200,
    description: '街頭風格高筒設計，個性十足，是潮人必備款式。',
    images: [
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop',
    ],
    category: '潮鞋',
    colors: ['黑色', '白色', '紅色'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    isFeatured: false,
    tags: ['街頭', '潮流']
  },
  {
    id: 'prod-15',
    name: '學步鞋',
    brandId: 'brand-7',
    price: 1280,
    description: '專為學步期寶寶設計，柔軟鞋底，保護小腳丫健康發展。',
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800&h=800&fit=crop',
    ],
    category: '童鞋',
    colors: ['粉色', '藍色', '米色'],
    sizes: ['幼兒 4', '幼兒 5', '幼兒 6'],
    isFeatured: false,
    tags: ['嬰幼兒', '學步']
  },
  {
    id: 'prod-16',
    name: '越野跑鞋',
    brandId: 'brand-8',
    price: 4200,
    description: '專業越野跑鞋，強大抓地力，應對各種複雜地形。',
    images: [
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&h=800&fit=crop',
    ],
    category: '運動鞋',
    colors: ['橘色', '黑色', '綠色'],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11'],
    isFeatured: false,
    tags: ['越野', '戶外']
  },
  {
    id: 'prod-17',
    name: '時尚高跟鞋',
    brandId: 'brand-2',
    price: 3800,
    description: '優雅高跟設計，精緻皮革，展現女性魅力與自信。',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&h=800&fit=crop',
    ],
    category: '女鞋',
    colors: ['黑色', '裸色', '紅色'],
    sizes: ['US 5', 'US 6', 'US 7', 'US 8'],
    isFeatured: false,
    tags: ['正式', '女款']
  },
  {
    id: 'prod-18',
    name: '極簡白鞋',
    brandId: 'brand-3',
    price: 1880,
    description: '純白簡約設計，百搭經典，永不退流行的時尚單品。',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&h=800&fit=crop',
    ],
    category: '休閒鞋',
    colors: ['白色'],
    sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    isFeatured: true,
    tags: ['經典', '百搭']
  },
  {
    id: 'prod-19',
    name: '氣墊慢跑鞋',
    brandId: 'brand-4',
    price: 3400,
    description: '全掌氣墊設計，緩震舒適，適合日常慢跑與健走。',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
    ],
    category: '運動鞋',
    colors: ['灰色', '黑色', '藍色'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    isFeatured: false,
    tags: ['氣墊', '舒適']
  },
  {
    id: 'prod-20',
    name: '復古板鞋',
    brandId: 'brand-6',
    price: 2680,
    description: '80年代復古風格，滑板文化經典款式，街頭穿搭首選。',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop',
    ],
    category: '潮鞋',
    colors: ['黑白', '藍色', '紅色'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    isFeatured: false,
    tags: ['復古', '滑板']
  }
];
