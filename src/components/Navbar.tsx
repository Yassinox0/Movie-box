import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from './SearchBar';
import AuthModal from './AuthModal';
import {
  HomeIcon,
  FilmIcon,
  TvIcon,
  BookmarkIcon,
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  FilmIcon as FilmIconSolid,
  TvIcon as TvIconSolid,
  BookmarkIcon as BookmarkIconSolid
} from '@heroicons/react/24/solid';

export default function Navbar() {
  const { currentUser, signOut } = useAuth();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      path: '/',
      label: 'Home',
      icon: isActive('/') ? <HomeIconSolid className="w-6 h-6" /> : <HomeIcon className="w-6 h-6" />
    },
    {
      path: '/movies',
      label: 'Movies',
      icon: isActive('/movies') ? <FilmIconSolid className="w-6 h-6" /> : <FilmIcon className="w-6 h-6" />
    },
    {
      path: '/tv-shows',
      label: 'TV Shows',
      icon: isActive('/tv-shows') ? <TvIconSolid className="w-6 h-6" /> : <TvIcon className="w-6 h-6" />
    },
    {
      path: '/watchlist',
      label: 'My Watchlist',
      icon: isActive('/watchlist') ? <BookmarkIconSolid className="w-6 h-6" /> : <BookmarkIcon className="w-6 h-6" />
    }
  ];

  return (
    <>
      <nav 
        className={`fixed h-screen bg-gray-900 text-white border-r border-gray-800 flex flex-col transition-all duration-300 ease-in-out z-50 ${
          isExpanded ? 'w-64' : 'w-20'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className={`p-4 ${isExpanded ? 'px-4' : 'px-2'}`}>
          <Link to="/" className={`font-bold block transition-all duration-300 ${
            isExpanded ? 'text-2xl' : 'text-xl text-center'
          }`}>
            {isExpanded ? 'MovieFlix' : 'M'}
          </Link>
        </div>

        <div className={`px-4 mb-6 transition-opacity duration-300 ${
          isExpanded ? 'opacity-100' : 'opacity-0 hidden'
        }`}>
          <SearchBar />
        </div>

        {!isExpanded && (
          <button className="mx-auto p-3 text-gray-400 hover:text-white">
            <MagnifyingGlassIcon className="w-6 h-6" />
          </button>
        )}

        <div className="flex-1">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-800 text-gray-300 hover:text-white'
                  }`}
                  title={!isExpanded ? item.label : undefined}
                >
                  {item.icon}
                  <span className={`transition-all duration-300 ${
                    isExpanded ? 'opacity-100' : 'opacity-0 w-0 hidden'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 border-t border-gray-800">
          {currentUser ? (
            <button
              onClick={() => signOut()}
              className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-gray-800 transition-colors`}
              title={!isExpanded ? 'Sign Out' : undefined}
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
              <span className={`transition-all duration-300 ${
                isExpanded ? 'opacity-100' : 'opacity-0 w-0 hidden'
              }`}>
                Sign Out
              </span>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg text-blue-400 hover:bg-gray-800 transition-colors`}
              title={!isExpanded ? 'Sign In' : undefined}
            >
              <UserIcon className="w-6 h-6" />
              <span className={`transition-all duration-300 ${
                isExpanded ? 'opacity-100' : 'opacity-0 w-0 hidden'
              }`}>
                Sign In
              </span>
            </button>
          )}
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}