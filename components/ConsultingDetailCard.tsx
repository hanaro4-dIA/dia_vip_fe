'use client';

import { FolderArrowDownIcon, HeartIcon } from '@heroicons/react/16/solid';
import 'react-loading-skeleton/dist/skeleton.css';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from './ConsultingDetailLoading';
import ConsultingScriptCard from './ConsultingScriptCard';

type item = {
  name: string;
  url: string;
};

type ConsultingDetail = {
  id: number;
  category: string;
  title: string;
  date: string;
  manager: string;
  status: string;
  content: string;
  items: item[];
};

export default function ConsultingDetailCard() {
  const { id } = useParams();
  const [consultingDetail, setConsultingDetail] =
    useState<ConsultingDetail | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchConsultingDetail() {
      const response = await fetch('/api/searchResults');
      const data = await response.json();
      const detail = data.searchResults.find(
        (item: ConsultingDetail) => item.id === Number(id)
      );

      if (detail) setConsultingDetail(detail);
    }

    fetchConsultingDetail();
  }, [id]);

  if (!consultingDetail) return <Loading />;

  const { category, title, date, manager } = consultingDetail;

  return (
    <div className='mt-10 w-full'>
      <div className='flex justify-end gap-2 items-center'>
        <button
          onClick={() => router.push('/reserve')}
          className='flex flex-row bg-[#3F6886] p-2 rounded-lg text-[#F2F9FF] hover:bg-[#2c4a5f]'
        >
          <HeartIcon className='h-6' />
          추가 상담
        </button>
        <button
          onClick={() => {}}
          className='flex flex-row bg-[#3F6886] p-2 rounded-lg text-[#F2F9FF] hover:bg-[#2c4a5f]'
        >
          <FolderArrowDownIcon className='h-6 w-6' />
          다운로드
        </button>
      </div>
      <div>
        <div className='mt-5 pt-5 shadow-[0_0px_6px_0px_rgba(0,0,0,0.1)] bg-[#F2F9FF] rounded-t-lg'>
          <div className='my-5 mx-24'>
            <div className='text-2xl font-bold'>
              [{category}] {title}
            </div>
            <div className='flex justify-between py-2'>
              <div className='flex flex-row gap-2'>
                <div className='font-bold'>PB명</div> {manager}
              </div>
              <div>{date}</div>
            </div>
          </div>

          <div className='bg-white w-full py-5 border-b'>
            <div className='text-xl font-bold mx-24'>상담 내용</div>
            <div className='mt-5 mx-24'>상세 상담 내용이 여기 표시됩니다.</div>
          </div>
          <div className='bg-white w-full py-5 border-b'>
            <div className='text-xl font-bold mb-5 mx-24'>추천 상품</div>
            {consultingDetail.items && consultingDetail.items.length > 0 ? (
              <ul className='list-disc pl-5 mx-24'>
                {consultingDetail.items.map((item, index) => (
                  <li key={index} className='my-2'>
                    <a href={item.url}>{item.name}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className='mx-24'> 추천된 상품이 없습니다. </div>
            )}
          </div>
          <div className='bg-white w-full py-5 border-b'>
            <div className='text-xl font-bold mx-24'>상담 주요 스크립트</div>
            <div className='mt-5 flex justify-center mx-24'>
              <ConsultingScriptCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
