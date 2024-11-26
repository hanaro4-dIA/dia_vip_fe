'use client';

import { Check, PhoneCall, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useEffect } from 'react';
import PBCard from '../assets/pb_card.png';
import Button from './Button';

interface ModalProps {
  onClose: () => void;
}

export default function Modal({ onClose }: ModalProps) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const onReserve = () => {
    router.push('/reserve');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div
        ref={modalRef}
        className='bg-sky-50 rounded-2xl p-6 max-w-2xl w-full shadow-inner'
      >
        <div className='flex flex-row justify-center pt-6 pb-4 gap-5 '>
          <Image
            src={PBCard}
            alt='PB card'
            className='object-cover w-48 h-56'
          />
          <div>
            <div className='flex gap-2'>
              <h2 className='text-slate-600 text-2xl font-bold'>안유진 PB</h2>
            </div>
            <div className='font-bold text-lg mb-1 mt-1'>
              &quot;고객님의 자산을 안전하게 책임지겠습니다.&quot;
            </div>
            <div className='mt-1 space-x-1'>
              <span className='px-2 py-1 bg-slate-500 rounded-sm text-xs text-white'>
                #펀드
              </span>
              <span className='px-2 py-1 bg-slate-500 rounded-sm text-xs text-white'>
                #채권
              </span>
            </div>
            <div className='space-y-2 text-sm mt-3 font-normal bg-[#D9D9D9] bg-opacity-40 p-3 rounded-xl'>
              <div className='flex items-center gap-2'>
                <PhoneCall className='w-4 h-4' />
                02-1234-1234
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='w-4 h-4' />
                강남파이낸스PB센터
              </div>
            </div>

            <div className='space-y-2 text-sm mt-2 font-semibold bg-[#D9D9D9] bg-opacity-40 p-3 rounded-xl'>
              <div className='flex items-center gap-2'>
                <Check className='w-4 h-4' />
                자산 관리 및 포트폴리오 설계
              </div>
              <div className='flex items-center gap-2'>
                <Check className='w-4 h-4' />
                투자 전략 분석 및 리스크 관리
              </div>
              <div className='flex items-center gap-2'>
                <Check className='w-4 h-4' />
                고액 자산가 및 VIP 고객 대응
              </div>
              <div className='flex items-center gap-2'>
                <Check className='w-4 h-4' />
                글로벌 투자 상품 및 시장 분석
              </div>
              <div className='flex items-center gap-2'>
                <Check className='w-4 h-4' />
                세금 계획 및 상속 전략 수립
              </div>
            </div>
          </div>
        </div>

        <div className='mt-4 text-right space-x-2'>
          <Button
            type='button'
            onClick={onReserve}
            className='h-10 px-4 py-2 bg-gray-300 hover:bg-gray-400'
            text='상담 예약'
          />
          <Button
            type='button'
            onClick={onClose}
            className='h-10 px-4 py-2 bg-slate-600 text-white hover:bg-slate-500 hover:text-white'
            text='메인으로'
          />
        </div>
      </div>
    </div>
  );
}
