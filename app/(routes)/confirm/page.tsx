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
    <div className='flex justify-center items-center mb-10 mt-5'>
      <div className='mx-32 mt-10 w-3/5'>
        <div className='text-4xl font-bold'>상담 예약 확인</div>
        <div className='my-1 text-gray-600'>
          하나은행만의 전문 PB와 1대 1 상담을 언제든 신청할 수 있습니다.
        </div>
        {data ? (
          <div className='bg-[#D6E8F6] rounded-lg shadow-[0_4px_6px_0px_rgba(0,0,0,0.1)] px-24 py-16 mt-10'>
            <div className='flex justify-between items-center my-2'>
              <div className='flex gap-2 items-center ml-3'>
                <p className='font-semibold'>카테고리</p>
                <p className='bg-white rounded-lg p-1.5 w-72'>
                  {data.category}
                </p>
              </div>
              <div className='flex gap-2 items-center'>
                <p className='font-semibold'>PB명</p>
                <p className='bg-white rounded-lg px-8 py-1.5'>안유진</p>
              </div>
            </div>
            <div className='flex justify-between items-center my-2'>
              <div className='flex gap-2 items-center ml-3'>
                <p className='font-semibold'>희망일시</p>
                <p className='bg-white rounded-lg p-1.5 w-72'>
                  {`${data.date.slice(0, 4)}.${data.date.slice(4, 6)}.${data.date.slice(6, 8)} ${data.time}`}
                </p>
              </div>
              <div className='flex gap-2 items-center'>
                <p className='font-semibold'>고객명</p>
                <p className='bg-white rounded-lg px-8 py-1.5'>김현수</p>
              </div>
            </div>
            <div className='flex gap-3 items-center w-full my-2'>
              <p className='w-20 text-right font-semibold'>제목</p>
              <div className='bg-white rounded-lg p-1.5 w-full'>
                {data.title}
              </div>
            </div>
            <div className='flex gap-3 items-center w-full my-2'>
              <label className='w-20 text-right font-semibold'>내용</label>
              <div className='bg-white rounded-lg p-1.5 w-full min-h-96 overflow-y-auto'>
                {data.detail}
              </div>
            </div>
            <div className='flex justify-end gap-2'>
              <Button
                onClick={cancel}
                className='bg-gray-300 hover:bg-gray-400 hover:text-white'
                text='신청 취소'
                type='button'
              />
              <form action='/consultingList' className='text-white'>
                <Button
                  type='submit'
                  text='목록으로'
                  className='bg-[#3F6886] hover:bg-[#2c4a5f] hover:text-white'
                />
              </form>
            </div>
          </div>
        ) : (
          <div>잘못된 접근입니다. </div>
        )}
      </div>
    </div>
  );
}
