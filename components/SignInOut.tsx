'use client';

import { getSession, mySignOut } from '@/actions/myauth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from './Button';
import Notification from './Notification';

export default function SignInOut({
  isLogin,
}: {
  isLogin: () => Promise<string>;
}) {
  const [id, setId] = useState('');

  const router = useRouter();
  useEffect(() => {
    (async function () {
      const ss = await getSession();
      setId(ss?.user?.email || '');
    })();
  }, [isLogin]);

  if (id)
    return (
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row font-bold gap-5 items-center'>
          <Link href='/reserve' className='hover:text-[#3F6886] '>
            상담 예약
          </Link>
          <Link href='/consultingList' className='hover:text-[#3F6886] '>
            상담 내역
          </Link>
          <Notification />
        </div>
        <Button
          onClick={async () => {
            localStorage.removeItem('dIA_VIP');
            await mySignOut();
            router.refresh();
          }}
          className='h-10 px-4 py-2 my-4 mx-7 bg-gray-300 hover:bg-gray-400 hover:text-white'
          text='로그아웃'
          type='button'
        />
      </div>
    );

  return (
    <Link href='/signin'>
      <button className='text-center text-[#525463] border h-10 bg-[#858899]/20 px-4 py-2 my-4 mx-7 rounded-lg'>
        로그인
      </button>
    </Link>
  );
}
