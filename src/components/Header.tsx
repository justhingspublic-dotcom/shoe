import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  // 品牌館頁面（列表頁和詳情頁）都有深色 Hero，需要白字模式
  const isBrandPage = location.pathname === '/brands' || location.pathname.startsWith('/brands/');

  // 監聽滾動事件以改變 Header 樣式
  useEffect(() => {
    const handleScroll = () => {
      // 增加一點閾值，避免剛開始滾動就頻繁切換
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 判斷是否處於「透明背景 + 白色文字」的模式
  // 條件：(在首頁 OR 在品牌詳情頁) AND 尚未滾動
  const isWhiteTextMode = (isHomePage || isBrandPage) && !isScrolled;

  // 決定 Header 的外觀狀態
  const headerStyle = () => {
    if (isScrolled) {
      return 'bg-white/90 backdrop-blur-md shadow-sm text-gray-900';
    }
    // 未滾動時一律透明
    // 但根據是否為 WhiteTextMode 決定文字顏色 (由 logoStyle/navLinkStyle 控制)
    return 'bg-transparent';
  };

  const navLinkStyle = (path: string) => {
    const active = location.pathname === path;
    // 只過渡文字顏色，不過渡背景
    const baseStyle = "text-sm font-medium px-4 py-2 rounded-full border transition-[color] duration-300";
    
    if (isWhiteTextMode) {
      // 深色背景：毛玻璃半透明膠囊
      return `${baseStyle} ${active 
        ? 'bg-white/15 backdrop-blur-md text-white font-bold border-white/20' 
        : 'text-white/80 hover:text-white hover:bg-white/10 border-transparent'}`;
    }
    
    // 淺色背景：輕透明膠囊
    return `${baseStyle} ${active 
      ? 'bg-black/10 text-gray-900 font-bold border-transparent' 
      : 'text-gray-600 hover:text-gray-900 hover:bg-black/5 border-transparent'}`;
  };

  const logoStyle = () => {
    if (isWhiteTextMode) {
      return 'text-white';
    }
    return 'text-gray-900';
  };

  const mobileButtonStyle = () => {
    if (isWhiteTextMode) {
      return 'hover:bg-white/20 text-white';
    }
    return 'hover:bg-gray-100 text-gray-700';
  }

  const iconButtonStyle = () => {
    const baseStyle = "p-2 rounded-full transition-all duration-300";
    if (isWhiteTextMode) {
      return `${baseStyle} text-white/80 hover:text-white hover:bg-white/10`;
    }
    return `${baseStyle} text-gray-600 hover:text-gray-900 hover:bg-black/5`;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${headerStyle()}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* 左：Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-1">
            <div className={`flex flex-col ${logoStyle()} transition-colors duration-300`}>
              <div className="flex items-baseline gap-1 leading-none" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                <span className="text-2xl font-black tracking-tight">台灣</span>
                <span className="text-xl font-bold tracking-widest">鞋品協會</span>
              </div>
              <span className="text-[10px] tracking-[0.3em] font-light uppercase opacity-70 leading-tight mt-1">
                Taiwan Footwear
              </span>
            </div>
          </Link>

          {/* 中：Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center space-x-2 flex-1">
            <Link to="/" className={navLinkStyle('/')}>首頁</Link>
            <Link to="/products" className={navLinkStyle('/products')}>所有商品</Link>
            <Link to="/brands" className={navLinkStyle('/brands')}>品牌館</Link>
          </nav>

          {/* 右：搜尋框 + 功能按鈕 */}
          <div className="hidden md:flex items-center justify-end space-x-3 flex-1">
            {/* 搜尋輸入框 - 不做背景過渡 */}
            <div className={`flex items-center px-4 py-2 rounded-full border ${
              isWhiteTextMode 
                ? 'bg-white/15 backdrop-blur-md border-white/20 text-white placeholder-white/60' 
                : 'bg-black/5 border-transparent text-gray-900 placeholder-gray-400 focus-within:bg-black/10'
            }`}>
              <Search className={`w-4 h-4 mr-2 ${isWhiteTextMode ? 'text-white/60' : 'text-gray-400'}`} />
              <input 
                type="text" 
                placeholder="搜尋商品..." 
                className="bg-transparent border-none outline-none text-sm w-32 placeholder-inherit"
              />
            </div>
            <button className={iconButtonStyle()} aria-label="購物車">
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button className={iconButtonStyle()} aria-label="會員">
              <User className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${mobileButtonStyle()}`}
            aria-label="選單"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100 animate-slide-in bg-white absolute left-0 right-0 px-4 shadow-xl text-gray-900">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
              >
                首頁
              </Link>
              <Link
                to="/products"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
              >
                所有商品
              </Link>
              <Link
                to="/brands"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
              >
                品牌館
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
