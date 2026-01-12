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
      className="group card-glass rounded-2xl overflow-hidden flex flex-col h-full relative"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      
      {/* 品牌 Logo */}
      <div className="relative aspect-video overflow-hidden bg-gray-50 border-b border-gray-100">
        <img
          src={brand.logo}
          alt={brand.name}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
      </div>

      {/* 品牌資訊 */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {brand.name}
          </h3>
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-grow">
          {brand.description}
        </p>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
            {brand.foundedYear} 年成立
          </span>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
            {brand.specialty}
          </span>
        </div>
      </div>
    </Link>
  );
};
