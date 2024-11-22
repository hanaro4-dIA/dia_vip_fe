'use client';

import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { searchResult } from './SearchResult';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [searchResults, setSearchResults] = useState<searchResult[]>([]);
  const router = useRouter();

  const handleNavigation = (id: number) => {
    router.push(`/consultingList/${id}`);
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    async function fetchSearchResults() {
      const response = await fetch('/api/searchResults');
      const data = await response.json();
      setSearchResults(data.searchResults);
    }

    fetchSearchResults();
  }, []);

  return (
    <div
      className={`flex flex-col bg-gray-100 transition-width duration-300 ${isOpen ? 'w-80' : 'w-16'}`}
    >
      <button onClick={toggleSidebar} className='p-4 focus:outline-none'>
        <Menu />
      </button>
      <nav className=''>
        {searchResults
          .filter((item) => item.status === '열람 가능') // "열람 가능"인 항목만 필터링
          .map((item) => (
            <div
              key={item.id}
              className='flex items-center space-x-2 cursor-pointer'
              onClick={() => handleNavigation(item.id)}
            >
              {isOpen && (
                <div className='flex items-center justify-between w-full p-3 border hover:shadow-md'>
                  <div className='flex items-center'>
                    <ChatBubbleLeftRightIcon className='w-6 h-6 text-gray-500 mr-3' />
                    <div>
                      <p className='text-sm font-semibold text-gray-700 truncate max-w-48'>
                        {item.title}
                      </p>
                      <p className='text-xs text-gray-500'>{item.date}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </nav>
    </div>
  );
}
