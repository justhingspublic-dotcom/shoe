import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  // 品牌詳情頁通常有深色大圖背景，所以也需要白字模式
  const isBrandPage = location.pathname.startsWith('/brands/');

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
    const baseStyle = "text-base font-medium transition-colors duration-300";
    
    if (isWhiteTextMode) {
      return `${baseStyle} ${active ? 'text-white font-bold' : 'text-white/80 hover:text-white'}`;
    }
    
    return `${baseStyle} ${active ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-blue-600'}`;
  };

  const logoStyle = () => {
    if (isWhiteTextMode) {
      return 'text-white';
    }
    return 'text-gray-900';
  };

  const logoIconStyle = () => {
    if (isWhiteTextMode) {
      return 'bg-white text-blue-600';
    }
    return 'bg-blue-600 text-white';
  }

  const mobileButtonStyle = () => {
    if (isWhiteTextMode) {
      return 'hover:bg-white/20 text-white';
    }
    return 'hover:bg-gray-100 text-gray-700';
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${headerStyle()}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${logoStyle()}`}>
              台灣鞋品協會
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={navLinkStyle('/')}>首頁</Link>
            <Link to="/products" className={navLinkStyle('/products')}>所有商品</Link>
            <Link to="/brands" className={navLinkStyle('/brands')}>品牌館</Link>
          </nav>

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
