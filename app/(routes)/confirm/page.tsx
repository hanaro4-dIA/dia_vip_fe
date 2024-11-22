'use client';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { type reserve } from '../reserve/page';

export default function Confirm() {
  const router = useRouter();
  const [data, setData] = useState<reserve | null>(null);
  useEffect(() => {
    const localReserveData = localStorage.getItem('reserveData');
    if (!localReserveData) return;
    const reserveData = JSON.parse(localReserveData) as reserve;
    setData(reserveData);
  }, []);
  const cancel = () => {
    setData(null);
    router.push('/');
    alert('취소되었습니다.');
  };

  return (
    <div className='mx-32 mt-10'>
      <div className='text-4xl font-bold'>상담 예약 확인</div>
      <div className='my-1 text-gray-600'>
        하나은행만의 전문 PB와 1대 1 상담을 언제든 신청할 수 있습니다.
      </div>
      {data ? (
        <div className='bg-[#D6E8F6] rounded-lg drop-shadow-md px-24 py-16 mt-10'>
          <div className='flex justify-between items-center my-2'>
            <div className='flex gap-2 items-center ml-3'>
              <p className='font-semibold'>카테고리</p>
              <p className='border bg-white rounded-lg p-1 border-black w-80'>
                {data.category}
              </p>
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
              <p className='font-semibold'>희망일시</p>
              <p className='border bg-white rounded-lg p-1 border-black w-80'>
                {`${data.date.slice(0, 4)}.${data.date.slice(4, 6)}.${data.date.slice(6, 8)} ${data.time}`}
              </p>
            </div>
            <div className='flex gap-2 items-center'>
              <p className='font-semibold'>고객명</p>
              <p className='border bg-white border-black rounded-lg px-8 py-1'>
                김현수
              </p>
            </div>
          </div>
          <div className='flex gap-3 items-center w-full my-2'>
            <p className='w-20 text-right font-semibold'>제목</p>
            <div className='border bg-white rounded-lg p-1 border-black w-full'>
              {data.title}
            </div>
          </div>
          <div className='flex gap-3 items-center w-full my-2'>
            <label className='w-20 text-right font-semibold'>내용</label>
            <div className='border bg-white rounded-lg p-1 border-black w-full min-h-96 overflow-y-auto'>
              {data.detail}
            </div>
          </div>
          <div className='flex justify-end gap-2'>
            <button
              onClick={cancel}
              className='border border-black bg-gray-300 p-2 rounded-lg'
            >
              신청 취소
            </button>
            <form action='/consultingList' className='text-white'>
              <Button type='submit' text='목록으로' bg='bg-[#3F6886]' />
            </form>
          </div>
        </div>
      ) : (
        <div>잘못된 접근입니다. </div>
      )}
    </div>
  );
}
