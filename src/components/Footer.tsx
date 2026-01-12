import { Mail, Phone, Facebook, Instagram, Youtube, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">台灣鞋品協會</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              致力於推廣台灣優質鞋品，整合產業資源，
              為消費者提供最優質的產品與服務。
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">快速連結</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">首頁</Link></li>
              <li><Link to="/products" className="hover:text-blue-400 transition-colors">所有商品</Link></li>
              <li><Link to="/brands" className="hover:text-blue-400 transition-colors">品牌館</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">客戶服務</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">運送說明</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">退換貨政策</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">常見問題</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">聯絡我們</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">聯絡資訊</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span>02-1234-5678</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span>info@taiwanshoes.org.tw</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} 台灣鞋品協會. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
