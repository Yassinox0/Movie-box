import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      onClose();
    } catch (error) {
      setError('Failed to authenticate');
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <Dialog.Title className="text-xl font-semibold text-white mb-4">
              {isLogin ? 'Login' : 'Sign Up'}
            </Dialog.Title>
            
            {error && (
              <div className="bg-red-500 text-white p-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-gray-700 text-white rounded px-4 py-2"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-gray-700 text-white rounded px-4 py-2"
                required
              />
              
              {isLogin && (
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    onClick={onClose}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Forgot Password?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>

              {!isLogin && (
                <Link
                  to="/phone-verification"
                  onClick={onClose}
                  className="block text-center text-blue-400 hover:text-blue-300"
                >
                  Verify with Phone Number
                </Link>
              )}
            </form>
            
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="mt-4 text-blue-400 hover:text-blue-300"
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}