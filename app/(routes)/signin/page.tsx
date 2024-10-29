'use client';

import { authenticate } from '@/actions/myauth';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function SigninCard() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const result = await authenticate(formData);

    if (result.error) {
      setErrorMsg(result.error);
      setIsLoading(false);
    } else if (result.redirectUrl) {
      router.replace(result.redirectUrl);
    }
  };

  return (
    <div className='flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-10/12 md:w-8/12 lg:w-2/5 items-center'>
      <div className='flex flex-col p-10'>
        <div className='border-b border-gray-400 mb-8 w-full pb-8'>
          <h1 className='text-3xl font-extrabold mb-3'>로그인</h1>
          <p className='text-lg font-medium'>
            로그인을 통해 VIP만을 위한 간편한 비대면 PB 상담을 경험해 보세요!
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-row items-center w-full mb-5 border border-gray-400 rounded-lg focus-within:bg-[#F2F9FF] focus-within:ring-2 focus-within:ring-[#F2F9FF]'>
            <UserIcon className='pl-3 h-8' />
            <input
              name='id'
              placeholder='아이디를 입력하세요.'
              className='w-full h-16 p-3 text-lg font-medium focus:outline-none'
            />
          </div>

          <div className='flex flex-row items-center w-full mb-5 border border-gray-400 rounded-lg focus-within:bg-[#F2F9FF] focus-within:ring-2 focus-within:ring-[#F2F9FF]'>
            <LockClosedIcon className='pl-3 h-8' />
            <input
              type='password'
              placeholder='비밀번호를 입력하세요.'
              name='pw'
              className='w-full h-16 p-3 text-lg font-medium focus:outline-none'
            />
          </div>
          {errorMsg && <div className='text-red-600 mb-3'>{errorMsg}</div>}
          <LoginButton isLoading={isLoading} />
        </form>

        <Link href='/signup'>
          <div className='flex justify-end w-full'>
            <p className='text-lg font-medium underline cursor-pointer'>
              회원가입
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

function LoginButton({ isLoading }: { isLoading: boolean }) {
  return (
    <button
      type='submit'
      className='bg-[#F2F9FF] w-full h-16 rounded-lg text-lg font-medium hover:opacity-80 mb-5 border border-[#B4B4B4] shadow-[2px_2px_0px_rgba(0,0,0,0.25)]'
      disabled={isLoading}
    >
      {isLoading ? '로그인 중...' : '로그인'}
    </button>
  );
}

export default SigninCard;
