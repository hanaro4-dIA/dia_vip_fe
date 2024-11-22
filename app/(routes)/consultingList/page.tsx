'use client';

import CalendarPopup from '@/components/CalendarPopup';
import SearchResult from '@/components/SearchResult';
import { RotateCcw, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ConsultingList() {
  const [categories, setCategories] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [filters, setFilters] = useState<{
    category: string;
    startDate: Date | null;
    endDate: Date | null;
    keyword: string;
  }>({
    category: '전체',
    startDate: new Date(),
    endDate: new Date(),
    keyword: '',
  });

  const [applyFilters, setApplyFilters] = useState<boolean>(false); // 필터 적용 여부

  const minDate = new Date(2000, 1, 1);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data.categories);
    }

    fetchCategories();
  }, []);

  const handleStartDateSet = (value: Date | null) => {
    setStartDate(value);
  };

  const handleEndDateSet = (value: Date | null) => {
    setEndDate(value);
  };

  const handleReset = () => {
    setSearchKeyword('');
    setStartDate(new Date());
    setEndDate(new Date());
    setSelectedCategory('전체');
    setFilters({
      category: '전체',
      startDate: new Date(),
      endDate: new Date(),
      keyword: '',
    });
    setApplyFilters(false); // 필터 해제
  };

  const handleSearch = () => {
    setFilters({
      category: selectedCategory,
      startDate: startDate,
      endDate: endDate,
      keyword: searchKeyword,
    });
    setApplyFilters(true); // 필터 적용
  };

  return (
    <div className='flex justify-center items-center mb-10 mt-5'>
      <div className='mt-10 w-3/5'>
        <div className='text-4xl font-bold'>상담 내역 리스트</div>
        <div className='my-1 text-gray-600'>
          하나은행만의 전문 PB와 상담한 내역을 확인하실 수 있습니다.
        </div>
        <div className='bg-[#D6E8F6] rounded-lg drop-shadow-md px-16 py-16 mt-10'>
          <div className='flex flex-row items-center my-2 gap-2'>
            <label className='w-24 font-semibold text-right'>검색</label>
            <div className='w-full flex items-center'>
              <input
                type='text'
                className='bg-white rounded-lg p-1.5 w-full'
                placeholder='검색 키워드를 입력해주세요.'
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button
                className='p-1.5 rounded-lg bg-gray-300 hover:bg-gray-400 hover:text-white ml-2'
                onClick={handleSearch}
              >
                <Search />
              </button>
            </div>
          </div>
          <div className='flex justify-between my-2'>
            <div className='flex flex-wrap gap-2'>
              <label className='w-[85px] text-right font-semibold'>
                카테고리
              </label>
              <select
                className='bg-white rounded-lg p-1.5'
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value='전체'>전체</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex flex-wrap items-center gap-2'>
              <label className='text-center font-semibold'>시작일</label>
              <CalendarPopup
                dateSet={handleStartDateSet}
                minDate={minDate}
                maxDate={endDate ? endDate : new Date()}
                selectedDate={startDate}
              />
              <label className='text-center font-semibold'>종료일</label>
              <CalendarPopup
                dateSet={handleEndDateSet}
                minDate={startDate ? startDate : minDate}
                maxDate={new Date()}
                selectedDate={endDate}
              />
              <button
                className='p-1.5 rounded-lg bg-gray-300 hover:bg-gray-400 hover:text-white'
                onClick={handleReset}
              >
                <RotateCcw />
              </button>
            </div>
          </div>
          <SearchResult filters={filters} applyFilters={applyFilters} />
        </div>
      </div>
    </div>
  );
}
