import { Link } from 'react-router-dom';
import type { Brand } from '../types';
import { ArrowRight } from 'lucide-react';

interface BrandCardProps {
  brand: Brand;
}

export const BrandCard = ({ brand }: BrandCardProps) => {
  return (
    <Link
      to={`/brands/${brand.id}`}
      className="group relative block w-full aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* 背景圖片 - 滿版 */}
      <img
        src={brand.logo}
        alt={brand.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      
      {/* 漸層遮罩 - 讓文字可讀 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300"></div>
      
      {/* 內容區域 */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full">
        <div>
          <span className="inline-block px-2 py-1 mb-2 text-xs font-bold text-white/90 bg-white/20 backdrop-blur-md rounded border border-white/10">
            {brand.specialty}
          </span>
          
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
            {brand.name}
          </h3>
          
          <p className="text-sm text-gray-200 line-clamp-2 leading-relaxed mb-3 opacity-90">
            {brand.description}
          </p>

          <div className="flex items-center text-sm font-bold text-white group-hover:text-sky-400 transition-colors">
            探索品牌 <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};
