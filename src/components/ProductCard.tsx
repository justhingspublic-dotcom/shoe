import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <Link
      to={`/products/${product.id}`}
      className="group card-glass rounded-2xl overflow-hidden flex flex-col h-full"
    >
      {/* 商品圖片容器 */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        
        {/* 標籤群組 */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold rounded-md border border-gray-100"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 折扣標籤 */}
        {hasDiscount && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-md">
              -{discountPercent}%
            </span>
          </div>
        )}
      </div>

      {/* 商品資訊 */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed flex-grow">
          {product.description}
        </p>

        {/* 底部價格與按鈕區域 */}
        <div className="mt-auto">
          <div className="flex items-end gap-2 mb-3">
            <span className="text-2xl font-bold text-blue-600">
              NT$ {product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through mb-1">
                ${product.originalPrice!.toLocaleString()}
              </span>
            )}
          </div>

          <div className="w-full py-2.5 bg-gray-50 text-center text-sm font-semibold text-gray-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            查看詳情
          </div>
        </div>
      </div>
    </Link>
  );
};
