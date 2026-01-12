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
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);

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
            <div className="absolute inset-0 bg-black/40"></div>
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center -mt-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-bold mb-6 tracking-wide border border-white/20">
            ✨ 台灣在地 • 職人精神 • 走向世界
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight drop-shadow-lg">
            探索台灣製鞋工藝<br />
            <span className="text-blue-400">
              邁出自信步伐
            </span>
          </h1>
          <p className="text-xl text-gray-100 mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            匯聚台灣優質鞋品品牌，從經典工藝到現代創新，
            為您提供最舒適、最時尚的穿著體驗。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:-translate-y-1"
            >
              瀏覽精選商品
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/brands"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 font-bold rounded-full hover:bg-white/20 transition-all duration-300"
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
      <section className="py-24 bg-white relative overflow-hidden">
        {/* 裝飾背景文字 */}
        <div className="absolute top-10 left-10 text-[10rem] font-bold text-gray-50 opacity-60 select-none -z-10 pointer-events-none">
          TRENDING
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 relative">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Selected for you</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">本季精選熱銷</h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
              嚴選本季最受歡迎的鞋款，結合時尚設計與極致舒適，
              讓您的每一步都充滿自信。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
             <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-900 text-gray-900 font-bold rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              查看所有商品 <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brands Section - 升級設計 */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">合作品牌</h2>
              <p className="text-gray-500 text-lg">匯聚台灣優質製鞋工藝</p>
            </div>
            <Link
              to="/brands"
              className="text-blue-600 font-bold hover:text-blue-700 flex items-center transition-colors text-lg"
            >
              探索所有品牌 <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - 升級設計 */}
      <section className="relative py-32 bg-gray-900 overflow-hidden">
        {/* 背景圖片 + 遮罩 */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1920&auto=format&fit=crop" 
            alt="Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight">
            準備好開始您的旅程了嗎？
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            穿上一雙好鞋，帶您去任何想去的地方。
            立即探索我們的完整系列，找到專屬於您的那一雙。
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg"
          >
            立即選購
          </Link>
        </div>
      </section>
    </div>
  );
};
