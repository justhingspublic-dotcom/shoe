import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Globe } from 'lucide-react';
import { brands } from '../data/brands';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Select } from '../components/ui/Select';

// 預設的品牌背景圖庫
const BRAND_COVERS: Record<string, string> = {
  'brand-1': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1920&auto=format&fit=crop',
  'brand-2': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1920&auto=format&fit=crop',
  'brand-3': 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1920&auto=format&fit=crop',
  'brand-4': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1920&auto=format&fit=crop',
  'default': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1920&auto=format&fit=crop'
};

const SORT_OPTIONS = [
  { label: '最新上架', value: 'newest' },
  { label: '價格：由低到高', value: 'price-low' },
  { label: '價格：由高到低', value: 'price-high' },
  { label: '熱銷排行', value: 'popular' },
];

export const BrandPage = () => {
  const { id } = useParams();
  const brand = brands.find((b) => b.id === id);
  const coverImage = brand && BRAND_COVERS[brand.id] ? BRAND_COVERS[brand.id] : BRAND_COVERS['default'];

  // 狀態管理：分類篩選與排序
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [sortBy, setSortBy] = useState<string>('newest');

  if (!brand) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">找不到品牌</h2>
          <Link to="/brands" className="text-blue-600 hover:text-blue-700 font-medium">
            返回品牌列表
          </Link>
        </div>
      </div>
    );
  }

  // 取得該品牌的所有商品
  const allBrandProducts = products.filter((p) => p.brandId === brand.id);
  
  // 取得該品牌有的所有分類 (不重複)
  const categories = ['全部', ...Array.from(new Set(allBrandProducts.map(p => p.category)))];

  // 篩選與排序邏輯
  const filteredProducts = allBrandProducts
    .filter(product => selectedCategory === '全部' || product.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // default (newest/featured) logic can be added here
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - 簡約風格 */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        {/* 背景圖 */}
        <div className="absolute inset-0">
          <img
            src={coverImage}
            alt="Brand Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        </div>

        {/* 返回按鈕 */}
        <div className="absolute top-28 left-0 w-full z-20 px-6 sm:px-12">
          <Link
            to="/brands"
            className="inline-flex items-center text-white/70 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>品牌館</span>
          </Link>
        </div>

        {/* 品牌資訊 - 極簡風格 */}
        <div className="absolute bottom-0 left-0 w-full p-8 sm:p-12 z-20">
          <div className="max-w-7xl mx-auto">
            <p className="text-white/60 text-sm mb-2">{brand.specialty} · Since {brand.foundedYear}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
              {brand.name}
            </h1>
            <p className="text-white/80 max-w-xl text-sm sm:text-base leading-relaxed mb-6">
              {brand.description}
            </p>

            {/* 聯絡資訊 - 整合在此 */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
              <a href={`mailto:${brand.contact.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" /> {brand.contact.email}
              </a>
              <a href={`tel:${brand.contact.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" /> {brand.contact.phone}
              </a>
              {brand.contact.website && (
                <a href={brand.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Globe className="w-4 h-4" /> 官方網站
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* 分類篩選 - 橫向膠囊樣式 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500 whitespace-nowrap hidden sm:block">
              {filteredProducts.length} 件商品
            </p>
            <div className="w-40">
              <Select
                value={sortBy}
                onChange={setSortBy}
                options={SORT_OPTIONS}
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="min-h-[400px]">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500">此分類目前沒有商品</p>
              <button 
                onClick={() => setSelectedCategory('全部')}
                className="mt-4 text-gray-900 hover:underline font-medium text-sm"
              >
                查看全部商品
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
