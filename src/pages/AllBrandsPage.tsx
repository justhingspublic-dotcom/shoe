import { brands } from '../data/brands';
import { BrandCard } from '../components/BrandCard';

export const AllBrandsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner - 職人氛圍 */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        {/* 背景圖片 - 製鞋工藝 */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1920&auto=format&fit=crop" 
            alt="Brand stories" 
            className="w-full h-full object-cover"
          />
          {/* 底部漸層遮罩 - 讓文字可讀 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          {/* 頂部漸層遮罩 - 讓 navbar 可讀 */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent"></div>
        </div>
        
        {/* 文字內容 */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-bold rounded-full mb-4 border border-white/20 tracking-wider">
            BRAND STORIES
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
            品牌館
          </h1>
          <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
            每一個品牌，都有一段故事。<br className="hidden sm:block" />
            探索台灣職人的製鞋精神，找到專屬於你的那一雙。
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">所有品牌</h2>
            <p className="text-gray-500 mt-1">共 {brands.length} 個合作品牌</p>
          </div>
        </div>

        {/* 品牌列表 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map(brand => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
};
