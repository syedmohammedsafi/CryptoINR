import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AuthButton } from './AuthButton';
import { Menu, X } from 'lucide-react';
import  logo  from '../../public/logo.png';

export function Navbar() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-1">
            <img src={logo} alt="CryptoINR Logo" className="h-8 w-8" />
            <span className="text-2xl font-bold text-white">CryptoINR</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition">
              Home
            </Link>
            {user?.email === 'safi22052004@gmail.com' && (
              <Link to="/admin" className="text-gray-300 hover:text-white transition">
                Admin
              </Link>
            )}
            <AuthButton />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/"
              className="block text-gray-300 hover:text-white transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {user?.email === 'safi22052004@gmail.com' && (
              <Link
                to="/admin"
                className="block text-gray-300 hover:text-white transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            <div className="pt-2">
              <AuthButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
