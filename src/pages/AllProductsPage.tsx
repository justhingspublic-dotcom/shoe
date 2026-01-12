import { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Select } from '../components/ui/Select';

const SORT_OPTIONS = [
  { label: '預設排序', value: 'default' },
  { label: '價格：由低到高', value: 'price-asc' },
  { label: '價格：由高到低', value: 'price-desc' },
];

export const AllProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [sortBy, setSortBy] = useState<string>('default');

  // 取得所有唯一的分類
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['全部', ...Array.from(cats)];
  }, []);

  // 篩選與排序邏輯
  const filteredProducts = useMemo(() => {
    let result = products;

    // 分類篩選
    if (selectedCategory !== '全部') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 排序
    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Area - 升級樣式 */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-gray-100 pb-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">所有商品</h1>
            <p className="text-gray-500 font-light">
              探索我們精心挑選的優質鞋款，共 <span className="font-bold text-black">{filteredProducts.length}</span> 件商品
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto z-30">
            {/* Custom Select Dropdown */}
            <div className="w-full md:w-48">
              <Select
                value={sortBy}
                onChange={setSortBy}
                options={SORT_OPTIONS}
                placeholder="選擇排序"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-gray-900 font-bold text-lg">
                <Filter className="w-5 h-5" />
                <span>商品分類</span>
              </div>
              <div className="space-y-1">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 flex items-center justify-between group border-l-2 ${
                      selectedCategory === category
                        ? 'border-black font-bold text-black pl-5'
                        : 'border-transparent text-gray-500 hover:text-black hover:pl-5'
                    }`}
                  >
                    <span>{category}</span>
                    {selectedCategory === category && (
                      <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Filter Bar */}
          <div className="lg:hidden mb-8">
            <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap border ${
                    selectedCategory === category
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-gray-900 hover:text-gray-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-grow z-0 relative">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 border-dashed">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                  <Filter className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">沒有找到相關商品</h3>
                <p className="text-gray-500 mb-6">試試看切換其他分類？</p>
                <button
                  onClick={() => {
                    setSelectedCategory('全部');
                    setSortBy('default');
                  }}
                  className="px-6 py-2.5 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors"
                >
                  清除所有篩選
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
