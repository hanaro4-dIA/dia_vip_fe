'use client';

import Image from 'next/image';
import main from '../assets/main.gif';
import mainText from '../assets/mainText.png';
import Button from './Button';

export default function NotLogined() {
  return (
    <div className='relative h-screen w-full'>
      <Image
        src={main}
        alt='Background'
        fill
        style={{ objectFit: 'cover' }}
        quality={100}
        className='-z-10' // 뒤에 배치
      />
      <div className='z-10 flex flex-col items-center justify-center'>
        <Image
          className='p-24 pb-11'
          src={mainText}
          alt={
            '하나금융그룹의 VIP 손님을 위한 180°달라질 PB (Private Banker) 상담 서비스'
          }
        />
        <div className='flex flex-row pb-24'>
          <a href='/signin'>
            <Button
              text='로그인'
              className='text-xl font-semibold h-14 w-40 mx-2 bg-inherit border border-[#3F6886] hover:bg-[#3F6886] hover:text-white'
              type='button'
            />
          </a>
          <a href='/signup'>
            <Button
              text='회원가입'
              className='text-xl font-semibold h-14 w-40 mx-2 bg-inherit border border-[#3F6886] hover:bg-[#3F6886] hover:text-white'
              type='button'
            />
          </a>
        </div>
      </div>
    </div>
  );
}
