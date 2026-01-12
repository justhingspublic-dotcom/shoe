import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { PageTransition } from './components/PageTransition';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { BrandPage } from './pages/BrandPage';
import { AllProductsPage } from './pages/AllProductsPage';
import { AllBrandsPage } from './pages/AllBrandsPage';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <HomePage />
          </PageTransition>
        } />
        <Route path="/products" element={
          <PageTransition>
            <AllProductsPage />
          </PageTransition>
        } />
        <Route path="/products/:id" element={
          <PageTransition>
            <ProductPage />
          </PageTransition>
        } />
        <Route path="/brands" element={
          <PageTransition>
            <AllBrandsPage />
          </PageTransition>
        } />
        <Route path="/brands/:id" element={
          <PageTransition>
            <BrandPage />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
