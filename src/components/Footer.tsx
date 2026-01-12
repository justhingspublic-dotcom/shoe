import { Mail, Phone, Facebook, Instagram, Youtube, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* 左側：品牌 + 訂閱 (佔 5/12) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shadow-lg shadow-white/10 group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-white tracking-wider">台灣鞋品協會</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md">
              致力於推廣台灣優質鞋品，整合產業資源，為消費者提供最優質的產品與服務。
              訂閱我們的電子報，獲取最新鞋款資訊與獨家優惠。
            </p>
            
            {/* 訂閱框 */}
            <div className="w-full max-w-sm relative">
              <input 
                type="email" 
                placeholder="輸入您的 Email" 
                className="w-full bg-gray-800 border border-gray-600 text-white px-5 py-3 rounded-full focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all placeholder-gray-400 text-sm"
              />
              <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-white text-black px-5 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors">
                訂閱
              </button>
            </div>
          </div>

          {/* 右側：連結列表 (佔 7/12) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 pt-2">
            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold mb-6 text-sm tracking-wider uppercase">快速連結</h3>
              <ul className="space-y-4 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors block py-1">首頁</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors block py-1">所有商品</Link></li>
                <li><Link to="/brands" className="hover:text-white transition-colors block py-1">品牌館</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-white font-bold mb-6 text-sm tracking-wider uppercase">客戶服務</h3>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-white transition-colors block py-1">運送說明</a></li>
                <li><a href="#" className="hover:text-white transition-colors block py-1">退換貨政策</a></li>
                <li><a href="#" className="hover:text-white transition-colors block py-1">常見問題</a></li>
                <li><a href="#" className="hover:text-white transition-colors block py-1">聯絡我們</a></li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h3 className="text-white font-bold mb-6 text-sm tracking-wider uppercase">聯絡資訊</h3>
              <ul className="space-y-4 text-sm mb-8">
                <li className="flex items-center gap-3 group cursor-pointer">
                  <Phone className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                  <span className="group-hover:text-white transition-colors">02-1234-5678</span>
                </li>
                <li className="flex items-center gap-3 group cursor-pointer">
                  <Mail className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                  <span className="group-hover:text-white transition-colors">info@taiwanshoes.org.tw</span>
                </li>
              </ul>
              
              <div className="flex gap-3">
                {[Facebook, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-500 hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>
            © {new Date().getFullYear()} 台灣鞋品協會. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-gray-400 transition-colors">隱私權政策</a>
            <a href="#" className="hover:text-gray-400 transition-colors">使用條款</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Cookie 政策</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
