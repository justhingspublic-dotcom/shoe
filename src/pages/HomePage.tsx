import { useState, useEffect } from 'react';
import { ArrowRight, Star, Shield, Truck, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { BrandCard } from '../components/BrandCard';
import { products } from '../data/products';
import { brands } from '../data/brands';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1920&auto=format&fit=crop",
    alt: "運動鞋特寫"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1920&auto=format&fit=crop",
    alt: "時尚潮流鞋款"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1920&auto=format&fit=crop",
    alt: "舒適休閒鞋"
  }
];

export const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // 取前 5 個商品做 1+4 佈局
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 5);
  const heroProduct = featuredProducts[0];
  const sideProducts = featuredProducts.slice(1);

  // 自動輪播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel Section */}
      <section className="relative h-screen min-h-[700px] flex flex-col justify-center overflow-hidden bg-gray-900">
        
        {/* 輪播背景圖片 */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            {/* 增強對比度的漸層遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
        ))}

        {/* 輪播控制按鈕 */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all z-20 hidden md:block"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all z-20 hidden md:block"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* 輪播指示點 */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* 主要文字內容 */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left -mt-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-bold mb-6 tracking-wide border border-white/20">
            ✨ 台灣在地 • 職人精神 • 走向世界
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-tight drop-shadow-xl max-w-4xl">
            探索台灣製鞋工藝<br />
            <span className="text-sky-400">
              邁出自信步伐
            </span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl drop-shadow-md">
            匯聚台灣優質鞋品品牌，從經典工藝到現代創新，
            為您提供最舒適、最時尚的穿著體驗。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-sky-50 transition-colors duration-200"
            >
              瀏覽精選商品
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/brands"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors duration-200"
            >
              探索合作品牌
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/10 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { icon: Star, title: "品質保證", desc: "嚴選優質品牌" },
                { icon: Shield, title: "安全購物", desc: "安心購物環境" },
                { icon: Truck, title: "快速配送", desc: "送貨到府服務" },
                { icon: Award, title: "專業服務", desc: "貼心售後服務" }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 sm:gap-4 p-2 rounded-xl transition-all duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm sm:text-base font-bold text-white mb-0.5">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-300 hidden sm:block">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section - 升級設計 */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">本季精選熱銷</h2>
              <p className="text-lg text-gray-500 max-w-xl">
                嚴選本季最受歡迎的鞋款，結合時尚設計與極致舒適，
                讓您的每一步都充滿自信。
              </p>
            </div>
            <Link
              to="/products"
              className="hidden md:inline-flex items-center text-sm font-bold text-gray-500 hover:text-sky-600 transition-colors group"
            >
              查看所有商品 <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* 左側：主打 Hero 商品 */}
            <Link 
              to={`/products/${heroProduct.id}`}
              className="group relative flex flex-col h-full min-h-[500px] lg:min-h-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0">
                <img 
                  src={heroProduct.images[0]} 
                  alt={heroProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
              </div>
              
              <div className="relative h-full flex flex-col justify-end p-8 lg:p-12 text-white">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-sky-500 text-white text-xs font-bold rounded-full mb-4 inline-block">
                    本季主打
                  </span>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {heroProduct.tags.map(tag => (
                      <span key={tag} className="text-sm font-medium text-gray-300 border border-white/30 px-3 py-1 rounded-full backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <h3 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">
                  {heroProduct.name}
                </h3>
                
                <p className="text-lg text-gray-200 mb-8 line-clamp-2 max-w-md">
                  {heroProduct.description}
                </p>
                
                <div className="flex items-center justify-between border-t border-white/20 pt-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-white">
                      NT$ {heroProduct.price.toLocaleString()}
                    </span>
                    {heroProduct.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        ${heroProduct.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span className="px-6 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-sky-50 transition-colors flex items-center gap-2">
                    立即購買 <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </Link>

            {/* 右側：4 個商品 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {sideProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section - 升級設計 */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 標題區域 - 改為與商品區塊一致的 "左標題 + 右連結" 佈局 */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">合作品牌</h2>
              <p className="text-lg text-gray-500 max-w-xl">
                匯聚台灣優質製鞋工藝，每一個品牌都代表著一份對品質的堅持。
              </p>
            </div>
            <Link
              to="/brands"
              className="hidden md:inline-flex items-center text-sm font-bold text-gray-500 hover:text-sky-600 transition-colors group"
            >
              探索所有品牌 <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.slice(0, 8).map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
          
          {/* 手機版顯示的底部連結 */}
          <div className="mt-12 text-center md:hidden">
            <Link
              to="/brands"
              className="inline-flex items-center px-8 py-3 bg-white text-gray-900 font-bold rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100"
            >
              探索所有品牌 <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - 升級設計 */}
      <section className="relative py-32 overflow-hidden">
        {/* 背景圖片 - 使用更有生活感的圖片 */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=1920&auto=format&fit=crop" 
            alt="Start your journey" 
            className="w-full h-full object-cover"
          />
          {/* 漸層遮罩：左深右淺，讓文字可讀但保留圖片氛圍 */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          {/* 底部漸層：與 Footer 無縫接軌 */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-black"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              準備好開始<br/>您的旅程了嗎？
            </h2>
            <p className="text-xl text-gray-200 mb-10 leading-relaxed font-light">
              穿上一雙好鞋，帶您去任何想去的地方。<br className="hidden sm:block"/>
              探索我們的完整系列，找到專屬於您的那一雙。
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-sky-400 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
            >
              立即選購
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
