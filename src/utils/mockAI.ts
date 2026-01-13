import { products } from '../data/products';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
  links?: { text: string; url: string }[];
}

// 生成唯一 ID
const generateId = () => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// 常見問題資料庫
const faqDatabase: Record<string, { answer: string; suggestions?: string[] }> = {
  退換貨: {
    answer: '我們提供 7 天鑑賞期，商品如有瑕疵或不合適，可在收到商品後 7 天內申請退換貨。請保持商品完整包裝及配件齊全。',
    suggestions: ['如何申請退貨？', '運費誰負擔？', '可以換尺寸嗎？']
  },
  配送: {
    answer: '我們提供全台灣配送服務，一般訂單會在 3-5 個工作天內送達。台北市、新北市部分地區可享次日配送服務。',
    suggestions: ['可以指定配送時間嗎？', '有超商取貨嗎？', '國際配送服務？']
  },
  尺寸: {
    answer: '建議您參考商品頁面的尺寸表。如果您平常穿著的尺寸介於兩個尺寸之間，建議選擇大一號。我們也提供免費的換尺寸服務。',
    suggestions: ['如何量腳長？', '不同品牌尺寸一樣嗎？', '寬腳適合什麼鞋？']
  },
  付款: {
    answer: '我們接受信用卡、ATM 轉帳、超商代碼繳費、貨到付款等多種付款方式。所有交易都經過 SSL 加密保護，請安心購物。',
    suggestions: ['可以分期付款嗎？', '有開立發票嗎？', '什麼時候扣款？']
  },
  保養: {
    answer: '建議定期清潔鞋面，避免長時間曝曬。皮革鞋款請使用專用保養油。運動鞋可用軟毛刷與清水輕柔清潔。',
    suggestions: ['如何清洗運動鞋？', '皮鞋如何保養？', '如何除臭？']
  }
};

// 商品推薦邏輯
const getProductRecommendations = (query: string): { products: typeof products; reason: string } => {
  const lowerQuery = query.toLowerCase();
  
  // 運動相關
  if (lowerQuery.includes('運動') || lowerQuery.includes('跑步') || lowerQuery.includes('健身') || lowerQuery.includes('籃球')) {
    return {
      products: products.filter(p => p.category === '運動鞋').slice(0, 3),
      reason: '根據您的需求，我推薦以下運動鞋款：'
    };
  }
  
  // 休閒相關
  if (lowerQuery.includes('休閒') || lowerQuery.includes('日常') || lowerQuery.includes('舒適') || lowerQuery.includes('百搭')) {
    return {
      products: products.filter(p => p.category === '休閒鞋').slice(0, 3),
      reason: '為您精選以下舒適休閒鞋款：'
    };
  }
  
  // 正式場合
  if (lowerQuery.includes('正式') || lowerQuery.includes('商務') || lowerQuery.includes('皮鞋') || lowerQuery.includes('上班')) {
    return {
      products: products.filter(p => p.category === '皮鞋').slice(0, 3),
      reason: '為您推薦專業商務鞋款：'
    };
  }
  
  // 潮流相關
  if (lowerQuery.includes('潮') || lowerQuery.includes('時尚') || lowerQuery.includes('街頭')) {
    return {
      products: products.filter(p => p.category === '潮鞋').slice(0, 3),
      reason: '以下潮流鞋款推薦給您：'
    };
  }
  
  // 戶外活動
  if (lowerQuery.includes('登山') || lowerQuery.includes('戶外') || lowerQuery.includes('越野')) {
    return {
      products: products.filter(p => p.category === '登山鞋' || p.tags.includes('戶外')).slice(0, 3),
      reason: '為您推薦專業戶外鞋款：'
    };
  }
  
  // 兒童鞋
  if (lowerQuery.includes('小孩') || lowerQuery.includes('兒童') || lowerQuery.includes('童鞋') || lowerQuery.includes('寶寶')) {
    return {
      products: products.filter(p => p.category === '童鞋').slice(0, 3),
      reason: '為您推薦兒童鞋款：'
    };
  }
  
  // 預設推薦熱銷商品
  return {
    products: products.filter(p => p.isFeatured).slice(0, 3),
    reason: '為您推薦本季熱銷商品：'
  };
};

// 檢測用戶意圖並生成回應
export const generateAIResponse = (userMessage: string): Message => {
  const lowerMessage = userMessage.toLowerCase();
  
  // 問候語
  if (lowerMessage.includes('你好') || lowerMessage.includes('嗨') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return {
      id: generateId(),
      text: '您好！我是智慧購鞋助手 👋 很高興為您服務！我可以幫您推薦商品、回答問題，或是協助您瀏覽網站。',
      sender: 'ai',
      timestamp: new Date(),
      suggestions: ['推薦運動鞋', '如何選尺寸？', '查看所有品牌']
    };
  }
  
  // 商品推薦意圖
  if (lowerMessage.includes('推薦') || lowerMessage.includes('找鞋') || lowerMessage.includes('買鞋') || 
      lowerMessage.includes('適合') || lowerMessage.includes('需要')) {
    const recommendation = getProductRecommendations(lowerMessage);
    
    const productLinks = recommendation.products.map(p => ({
      text: `${p.name} - NT$ ${p.price.toLocaleString()}`,
      url: `#/products/${p.id}`
    }));
    
    return {
      id: generateId(),
      text: `${recommendation.reason}\n\n${recommendation.products.map((p, i) => 
        `${i + 1}. ${p.name}\n   ${p.description.substring(0, 40)}...\n   NT$ ${p.price.toLocaleString()}`
      ).join('\n\n')}`,
      sender: 'ai',
      timestamp: new Date(),
      links: productLinks,
      suggestions: ['查看更多商品', '這些有什麼優惠？', '如何選尺寸？']
    };
  }
  
  // 導覽意圖
  if (lowerMessage.includes('品牌') || lowerMessage.includes('廠商')) {
    return {
      id: generateId(),
      text: '我們匯聚了台灣優質製鞋品牌，每一個品牌都代表著對品質的堅持。您可以瀏覽我們的品牌頁面了解更多。',
      sender: 'ai',
      timestamp: new Date(),
      links: [
        { text: '探索所有品牌', url: '#/brands' }
      ],
      suggestions: ['推薦熱門品牌', '品牌有什麼特色？', '查看商品']
    };
  }
  
  if (lowerMessage.includes('所有商品') || lowerMessage.includes('全部商品') || lowerMessage.includes('商品列表')) {
    return {
      id: generateId(),
      text: '您可以在商品頁面瀏覽我們的完整商品系列，包含運動鞋、休閒鞋、皮鞋等多種類型。',
      sender: 'ai',
      timestamp: new Date(),
      links: [
        { text: '查看所有商品', url: '#/products' }
      ],
      suggestions: ['推薦運動鞋', '推薦休閒鞋', '有什麼優惠？']
    };
  }
  
  if (lowerMessage.includes('首頁') || lowerMessage.includes('回到首頁') || lowerMessage.includes('主頁')) {
    return {
      id: generateId(),
      text: '為您導航到首頁，您可以在首頁看到本季精選商品和熱門品牌。',
      sender: 'ai',
      timestamp: new Date(),
      links: [
        { text: '返回首頁', url: '#/' }
      ],
      suggestions: ['推薦商品', '查看品牌', '有什麼問題可以問？']
    };
  }
  
  // 常見問題意圖
  let faqMatched = false;
  for (const [keyword, data] of Object.entries(faqDatabase)) {
    if (lowerMessage.includes(keyword)) {
      return {
        id: generateId(),
        text: data.answer,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: data.suggestions
      };
    }
  }
  
  // 尺寸相關問題
  if (lowerMessage.includes('尺寸') || lowerMessage.includes('大小') || lowerMessage.includes('合不合')) {
    return {
      id: generateId(),
      text: faqDatabase.尺寸.answer,
      sender: 'ai',
      timestamp: new Date(),
      suggestions: faqDatabase.尺寸.suggestions
    };
  }
  
  // 優惠活動
  if (lowerMessage.includes('優惠') || lowerMessage.includes('折扣') || lowerMessage.includes('特價') || lowerMessage.includes('促銷')) {
    return {
      id: generateId(),
      text: '我們目前有多項優惠商品！部分商品享有特別折扣，建議您瀏覽商品頁面查看最新優惠資訊。',
      sender: 'ai',
      timestamp: new Date(),
      links: [
        { text: '查看優惠商品', url: '#/products' }
      ],
      suggestions: ['推薦折扣商品', '如何獲得優惠？', '會員有優惠嗎？']
    };
  }
  
  // 預設回應
  return {
    id: generateId(),
    text: '感謝您的提問！我可以協助您：\n\n• 推薦適合的鞋款\n• 回答購物相關問題\n• 協助網站導覽\n\n請告訴我您需要什麼幫助？',
    sender: 'ai',
    timestamp: new Date(),
    suggestions: ['推薦運動鞋', '如何退換貨？', '查看所有品牌', '尺寸如何選？']
  };
};

// 獲取歡迎訊息
export const getWelcomeMessage = (): Message => {
  return {
    id: generateId(),
    text: '您好！我是您的智慧購鞋助手 🤖\n\n我可以協助您：\n• 依需求推薦適合的鞋款\n• 回答購物相關問題\n• 協助您快速找到想要的內容\n\n請問有什麼可以幫助您的嗎？',
    sender: 'ai',
    timestamp: new Date(),
    suggestions: ['推薦運動鞋', '推薦休閒鞋', '如何選尺寸？', '查看所有品牌']
  };
};

// 獲取快速回覆選項
export const getQuickReplies = (): string[] => {
  return [
    '推薦運動鞋',
    '推薦休閒鞋',
    '推薦商務鞋',
    '如何選尺寸？',
    '退換貨政策',
    '查看所有品牌',
    '查看所有商品'
  ];
};
