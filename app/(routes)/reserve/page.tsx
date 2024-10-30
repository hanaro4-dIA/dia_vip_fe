'use client';

import Button from '@/components/Button';
import CalendarPopup from '@/components/CalendarPopup';
import { formatDate } from '@/utils/date';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const times = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
];

export type reserve = {
  title: string;
  category: string;
  date: string;
  time: string;
  detail: string;
};

export default function Reserve() {
  const [categories, setCategories] = useState<string[]>([]);
  const [childDate, setchildDate] = useState<Date | null>(new Date());
  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const timeRef = useRef<HTMLSelectElement>(null);
  const detailRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const minDate = new Date();
  const maxDate = new Date(minDate);
  maxDate.setDate(maxDate.getDate() + 30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dateString = childDate;
    if (!dateString) return;
    const dateObject = new Date(dateString);
    const date = formatDate(dateObject);
    const reserveData = {
      title: titleRef.current?.value || '',
      category: categoryRef.current?.value || '',
      date: date,
      time: timeRef.current?.value || '',
      detail: detailRef.current?.value || '',
    };

    localStorage.setItem('reserveData', JSON.stringify(reserveData));

    router.push('/confirm');
  };

  const handleDateSet = (value: Date | null) => {
    setchildDate(value);
  };

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data.categories);
    }

    fetchCategories();
  }, []);
  return (
    <div className='mx-32 mt-10'>
      <div className='text-4xl font-bold'>상담 예약</div>
      <div className='my-1 text-gray-600'>
        하나은행만의 전문 PB와 1대 1 상담을 언제든 신청할 수 있습니다.
      </div>
      <div className='bg-[#F2F9FF] rounded-lg drop-shadow-md px-24 py-16'>
        <form onSubmit={handleSubmit}>
          <div className='flex justify-between items-center my-2'>
            <div className='flex gap-2 items-center ml-3'>
              <label className='font-semibold'>카테고리</label>
              <select
                ref={categoryRef}
                defaultValue=''
                className='border bg-white rounded-lg p-1 border-black w-80'
              >
                <option value='' disabled>
                  카테고리를 선택하세요.
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex gap-2 items-center'>
              <p className='font-semibold'>PB</p>
              <p className='border bg-white border-black rounded-lg px-8 py-1'>
                안유진
              </p>
            </div>
          </div>
          <div className='flex justify-between items-center my-2'>
            <div className='flex gap-2 items-center ml-3'>
              <label className='font-semibold'>희망일시</label>
              <CalendarPopup
                dateSet={handleDateSet}
                minDate={minDate}
                maxDate={maxDate}
              />
              <select
                ref={timeRef}
                defaultValue=''
                className='flex justify-center gap-1 items-center border bg-white border-black rounded-lg p-1.5 pr-2 ml-2 w-36 text-center'
              >
                <option value='' disabled>
                  -- : --
                </option>
                {times.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex gap-2 items-center'>
              <p className='font-semibold'>고객명</p>
              <p className='border bg-white border-black rounded-lg px-8 py-1'>
                김현수
              </p>
            </div>
          </div>
          <div className='flex gap-3 items-center w-full my-2'>
            <label className='w-20 text-right font-semibold'>제목</label>
            <input
              ref={titleRef}
              type='text'
              className='border bg-white rounded-lg p-1 border-black w-full'
            />
          </div>
          <div className='flex gap-3 items-center w-full my-2'>
            <label className='w-20 text-right font-semibold'>내용</label>
            <textarea
              ref={detailRef}
              rows={20}
              className='border bg-white rounded-lg p-1 border-black w-full overflow-y-auto'
            />
          </div>
          <div className='flex gap-3 items-center w-full my-2'>
            <label className='w-20 text-right font-semibold'>첨부파일</label>
            <input
              type='file'
              className='border bg-white rounded-lg p-1 border-black w-full'
              multiple
            />
          </div>
          <div className='flex justify-end'>
            <Button type='submit' text='예약하기' bg='bg-slate-300' />
          </div>
        </form>
      </div>
    </div>
  );
}
