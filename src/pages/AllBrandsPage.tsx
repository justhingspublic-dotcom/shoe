import { brands } from '../data/brands';
import { BrandCard } from '../components/BrandCard';

export const AllBrandsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">品牌館</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            匯集台灣優質鞋品品牌，從傳統工藝到現代創新，
            在這裡您可以找到最適合您的品牌故事與產品。
          </p>
        </div>

        {/* 品牌列表 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map(brand => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>

        {/* 合作邀請區塊 */}
        <div className="mt-20 bg-white rounded-2xl p-8 sm:p-12 border border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">想要加入我們嗎？</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            如果您也是台灣優質鞋品品牌，歡迎加入鞋品協會的大家庭，
            讓我們一起推廣台灣製鞋工藝，走向世界。
          </p>
          <a
            href="mailto:contact@taiwanshoes.org.tw"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all duration-300 hover:scale-105"
          >
            聯絡我們
          </a>
        </div>
      </div>
    </div>
  );
};
