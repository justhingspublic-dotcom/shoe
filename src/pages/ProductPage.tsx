import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { brands } from '../data/brands';
import { ProductCard } from '../components/ProductCard';

export const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const brand = product ? brands.find((b) => b.id === product.brandId) : null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  if (!product || !brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">找不到商品</h2>
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            返回首頁
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.brandId === product.brandId && p.id !== product.id)
    .slice(0, 4);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const handlePurchaseClick = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="min-h-screen pt-24 pb-8">
      {/* Notification Toast */}
      <div 
        className={`fixed top-24 right-4 z-50 transform transition-all duration-300 ${
          showNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-sm font-bold">i</span>
          </div>
          <div>
            <p className="font-bold text-sm">此為靜態展示頁面</p>
            <p className="text-xs text-gray-400">目前不提供實際購買功能</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link to="/" className="hover:text-blue-600 transition-colors">首頁</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-blue-600 transition-colors">所有商品</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 mb-20">
          {/* Left Column: Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-gray-200 relative group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {hasDiscount && (
                <div className="absolute top-4 left-4">
                   <span className="px-2.5 py-1 bg-gray-900 text-white text-xs font-bold rounded-full">
                    -{discountPercent}%
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? 'border-gray-900'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Details */}
          <div>
            <div className="mb-8">
              <Link
                to={`/brands/${brand.id}`}
                className="inline-block text-gray-500 font-medium text-sm tracking-wide mb-3 hover:text-gray-900 transition-colors"
              >
                {brand.name}
              </Link>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight tracking-tight">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-black text-gray-900">
                  NT$ {product.price.toLocaleString()}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-gray-400 line-through">
                    NT$ {product.originalPrice!.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 border border-gray-200 text-gray-600 text-xs font-medium rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <label className="block text-sm font-bold text-gray-900 mb-4">
                顏色選擇：<span className="text-gray-900">{product.colors[selectedColor]}</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                      selectedColor === index
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-900'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <label className="block text-sm font-bold text-gray-900 mb-4">
                尺寸選擇
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                      selectedSize === size
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handlePurchaseClick}
                className="flex-1 bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors"
              >
                立即購買
              </button>
              <button
                 className="flex-1 bg-white border-2 border-gray-900 text-gray-900 font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors"
                 onClick={handlePurchaseClick}
              >
                加入購物車
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-6 border-t border-gray-200 pt-8">
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck className="w-6 h-6 text-gray-400" />
                <span className="text-xs font-medium text-gray-600">正品保證</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="w-6 h-6 text-gray-400" />
                <span className="text-xs font-medium text-gray-600">快速出貨</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="w-6 h-6 text-gray-400" />
                <span className="text-xs font-medium text-gray-600">七天鑑賞</span>
              </div>
            </div>
          </div>
        </div>

        {/* 商品詳情區塊 - 全寬 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t border-gray-200 pt-12 mb-16">
          {/* 商品特色 */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">商品特色</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-gray-400">•</span>
                <span>優質材料製作，耐穿舒適</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400">•</span>
                <span>專業設計團隊打造，兼具美觀與機能</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400">•</span>
                <span>符合人體工學，長時間穿著不疲累</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400">•</span>
                <span>多種顏色可選，輕鬆搭配各種風格</span>
              </li>
            </ul>
          </div>

          {/* 商品規格 */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">商品規格</h2>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="text-gray-500 w-20">品牌</span>
                <span className="text-gray-900">{brand.name}</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-20">產地</span>
                <span className="text-gray-900">台灣</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-20">材質</span>
                <span className="text-gray-900">優質皮革 / 透氣網布</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-20">尺寸建議</span>
                <span className="text-gray-900">建議選擇平時穿著的尺寸</span>
              </div>
            </div>
          </div>

          {/* 配送與退換貨 */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">配送與退換貨</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div>
                <p>• 宅配滿 $799 免運費</p>
                <p>• 一般商品約 3-5 個工作天送達</p>
              </div>
              <div>
                <p>• 商品到貨後享有 7 天鑑賞期</p>
                <p>• 退換貨商品須保持全新未使用狀態</p>
                <p>• 請保留完整包裝及配件</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-gray-200 pt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">您可能也喜歡</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
