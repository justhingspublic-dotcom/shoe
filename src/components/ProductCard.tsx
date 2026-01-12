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
            <span className="px-2.5 py-1 bg-gray-900 text-white text-xs font-bold rounded-full">
              -{discountPercent}%
            </span>
          </div>
        )}
      </div>

      {/* 商品資訊 */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors duration-200 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed flex-grow">
          {product.description}
        </p>

        {/* 底部價格與按鈕區域 */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              NT$ {product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice!.toLocaleString()}
              </span>
            )}
          </div>

          <span className="text-sm font-medium text-sky-600 group-hover:translate-x-1 transition-transform duration-200">
            查看詳情 →
          </span>
        </div>
      </div>
    </Link>
  );
};
