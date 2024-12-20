import React from 'react';
import { useAuthContext } from './auth/AuthProvider';
import { LogIn, LogOut, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AuthButton() {
  const { user, loading, signOut } = useAuthContext();

  if (loading) {
    return (
      <button className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg opacity-50 cursor-not-allowed">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Loading...</span>
      </button>
    );
  }

  if (user) {
    return (
      <button
        onClick={signOut}
        className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span>Sign Out</span>
      </button>
    );
  }

  return (
    <Link
      to="/auth"
      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
    >
      <LogIn className="w-5 h-5" />
      <span>Sign In</span>
    </Link>
  );
}