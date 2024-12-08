import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FilterBarProps {
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  selectedProvider: string;
  setSelectedProvider: (provider: string) => void;
}

const genres = [
  { id: '', name: 'All Genres' },
  { id: '28', name: 'Action' },
  { id: '12', name: 'Adventure' },
  { id: '16', name: 'Animation' },
  { id: '35', name: 'Comedy' },
  { id: '80', name: 'Crime' },
  { id: '99', name: 'Documentary' },
  { id: '18', name: 'Drama' },
  { id: '10751', name: 'Family' },
  { id: '14', name: 'Fantasy' },
  { id: '27', name: 'Horror' },
  { id: '10402', name: 'Music' },
  { id: '9648', name: 'Mystery' },
  { id: '10749', name: 'Romance' },
  { id: '878', name: 'Science Fiction' },
  { id: '53', name: 'Thriller' },
  { id: '10752', name: 'War' },
  { id: '37', name: 'Western' }
];

const providers = [
  { id: '', name: 'All Providers' },
  { id: '8', name: 'Netflix' },
  { id: '9', name: 'Amazon Prime Video' },
  { id: '283', name: 'Crunchyroll' },
  { id: '337', name: 'Disney Plus' },
  { id: '384', name: 'HBO Max' },
  { id: '387', name: 'Peacock' },
  { id: '350', name: 'Apple TV+' }
];

export default function FilterBar({ selectedGenre, setSelectedGenre, selectedProvider, setSelectedProvider }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg text-white hover:bg-gray-700">
          {genres.find(g => g.id === selectedGenre)?.name || 'Genre'}
          <ChevronDownIcon className="h-5 w-5" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 mt-2 w-56 origin-top-left rounded-lg bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {genres.map((genre) => (
                <Menu.Item key={genre.id}>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedGenre(genre.id)}
                      className={`${
                        active ? 'bg-gray-700' : ''
                      } block px-4 py-2 text-sm text-white w-full text-left`}
                    >
                      {genre.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg text-white hover:bg-gray-700">
          {providers.find(p => p.id === selectedProvider)?.name || 'Streaming Service'}
          <ChevronDownIcon className="h-5 w-5" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 mt-2 w-56 origin-top-left rounded-lg bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {providers.map((provider) => (
                <Menu.Item key={provider.id}>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedProvider(provider.id)}
                      className={`${
                        active ? 'bg-gray-700' : ''
                      } block px-4 py-2 text-sm text-white w-full text-left`}
                    >
                      {provider.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}