import { FolderArrowDownIcon, HeartIcon } from '@heroicons/react/16/solid';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useRouter } from 'next/navigation';

export default function ConsultingDetailLoading() {
  const router = useRouter();
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

      <div className='mt-5 pt-5 shadow-[0_0px_6px_0px_rgba(0,0,0,0.1)] bg-[#F2F9FF] rounded-t-lg'>
        <div className='my-5 mx-24'>
          <div className='text-2xl font-bold'>
            <Skeleton />
          </div>
          <div className='flex justify-between py-2'>
            <Skeleton width={100} />
            <Skeleton width={100} />
          </div>
        </div>
        <div className='bg-white w-full py-5 border-b'>
          <div className='text-xl font-bold mx-24'>상담 내용</div>
          <div className='mt-5 mx-24'>
            <Skeleton height={100} />
          </div>
        </div>
        <div className='bg-white w-full py-5 border-b'>
          <div className='text-xl font-bold mb-5 mx-24'>추천 상품</div>
          <div className='mt-5 mx-24'>
            <Skeleton height={100} />
          </div>
        </div>
        <div className='bg-white w-full py-5 border-b'>
          <div className='text-xl font-bold mx-24'>상담 주요 스크립트</div>
          <div className='mt-5 mx-24'>
            <Skeleton height={200} />
          </div>
        </div>
      </div>
    </div>
  );
}
