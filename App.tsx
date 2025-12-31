import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Process from './pages/Process';
import About from './pages/About';
import Contact from './pages/Contact';
import AuthPage from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import VirtualShowroom from './pages/VirtualShowroom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <CartDrawer />
          <div className="flex flex-col min-h-screen bg-fde-black text-white font-sans selection:bg-fde-purple selection:text-white">
            <Routes>
               {/* Rota 3D sem Navbar/Footer padrão para imersão total */}
               <Route path="/3d-showroom" element={<VirtualShowroom />} />
               
               {/* Rotas Padrão */}
               <Route path="*" element={
                 <>
                   <Navbar />
                   <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/process" element={<Process />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/auth" element={<AuthPage />} />
                      <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                   </main>
                   <Footer />
                 </>
               } />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;