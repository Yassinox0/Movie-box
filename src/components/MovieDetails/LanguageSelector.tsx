import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { GlobeAltIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface LanguageSelectorProps {
  languages: string[];
  subtitles: string[];
}

export default function LanguageSelector({ languages, subtitles }: LanguageSelectorProps) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full hover:bg-gray-700/50 transition-colors">
        <GlobeAltIcon className="h-4 w-4 text-gray-400" />
        <span>Languages</span>
        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
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
        <Menu.Items className="absolute left-0 mt-2 w-56 rounded-lg bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="p-2">
            <div className="px-3 py-2">
              <h3 className="text-sm font-semibold text-gray-400">Audio</h3>
              {languages.map((language) => (
                <Menu.Item key={language}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-700' : ''
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-white`}
                    >
                      {language}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>

            <div className="border-t border-gray-700 my-2" />

            <div className="px-3 py-2">
              <h3 className="text-sm font-semibold text-gray-400">Subtitles</h3>
              {subtitles.map((subtitle) => (
                <Menu.Item key={subtitle}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-700' : ''
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-white`}
                    >
                      {subtitle}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}