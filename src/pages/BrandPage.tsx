import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Globe, Calendar, Award, Filter, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
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
      {/* 1. Hero Section - 品牌旗艦店形象區 */}
      <section className="relative h-[600px] sm:h-[700px] w-full overflow-hidden bg-gray-900 text-white">
        {/* 背景圖 */}
        <div className="absolute inset-0">
          <img
            src={coverImage}
            alt="Brand Cover"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        </div>

        {/* 頂部導航 */}
        <div className="absolute top-28 left-0 w-full z-20 px-6 sm:px-12">
          <Link
            to="/brands"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-300 group"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-medium tracking-wide">返回品牌列表</span>
          </Link>
        </div>

        {/* 品牌核心資訊 (整合至上方) */}
        <div className="absolute bottom-0 left-0 w-full p-8 sm:p-16 z-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-10">
             {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-2xl p-2 shadow-2xl flex-shrink-0 hidden md:block"
            >
              <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover rounded-xl" />
            </motion.div>

            <div className="flex-1 mb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">
                    官方旗艦店
                  </span>
                  <div className="flex gap-4 text-sm text-gray-300">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {brand.foundedYear} 創立</span>
                    <span className="flex items-center gap-1"><Award className="w-4 h-4" /> {brand.specialty}</span>
                  </div>
                </div>

                <h1 className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight">
                  {brand.name}
                </h1>
                
                <p className="text-lg text-gray-200 max-w-2xl leading-relaxed mb-8">
                  {brand.description}
                </p>

                {/* 聯絡資訊 */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-300 border-t border-white/10 pt-6">
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
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content - 專業電商佈局 (Sidebar + Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar - 分類篩選 */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* 分類篩選器 */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-gray-900 font-bold">
                  <Filter className="w-5 h-5" />
                  <h3>商品分類</h3>
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors duration-200 flex justify-between items-center ${
                        selectedCategory === category
                          ? 'bg-blue-50 text-blue-600 font-bold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{category}</span>
                      {selectedCategory === category && (
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 價格區間 (模擬) */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-gray-900 font-bold">
                  <SlidersHorizontal className="w-5 h-5" />
                  <h3>價格區間</h3>
                </div>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3 text-gray-600 cursor-pointer hover:text-blue-600">
                    <input type="radio" name="price" className="form-radio text-blue-600" defaultChecked />
                    <span>全部價格</span>
                  </label>
                  <label className="flex items-center space-x-3 text-gray-600 cursor-pointer hover:text-blue-600">
                    <input type="radio" name="price" className="form-radio text-blue-600" />
                    <span>$1,000 以下</span>
                  </label>
                  <label className="flex items-center space-x-3 text-gray-600 cursor-pointer hover:text-blue-600">
                    <input type="radio" name="price" className="form-radio text-blue-600" />
                    <span>$1,000 - $3,000</span>
                  </label>
                  <label className="flex items-center space-x-3 text-gray-600 cursor-pointer hover:text-blue-600">
                    <input type="radio" name="price" className="form-radio text-blue-600" />
                    <span>$3,000 以上</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedCategory === '全部' ? '全站商品' : selectedCategory}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  共 {filteredProducts.length} 件商品
                </p>
              </div>

              <div className="flex items-center gap-3 z-30">
                <span className="text-sm text-gray-500 whitespace-nowrap">排序：</span>
                <div className="w-44">
                  <Select
                    value={sortBy}
                    onChange={setSortBy}
                    options={SORT_OPTIONS}
                  />
                </div>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 z-0 relative">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 border-dashed">
                <p className="text-gray-500 text-lg">此分類目前沒有商品</p>
                <button 
                  onClick={() => setSelectedCategory('全部')}
                  className="mt-4 text-blue-600 hover:underline font-medium"
                >
                  查看全部商品
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
