import useFetch from '@/hooks/useFetch';
import { formatDate } from '@/utils/date';
import { type Reservation } from '@/utils/type';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { CalendarClock } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ScheduleItem = ({ id, title, date, time }: Reservation) => {
  return (
    <Link href={`/confirm/${id}`}>
      <div className='flex items-center justify-between p-3 border-b border-gray-200 overflow-hidden hover:bg-gray-100'>
        <div className='flex items-center w-full'>
          <CalendarClock className='w-6 h-6 text-gray-500 mr-3' />
          <div className='flex-1 overflow-hidden mr-2'>
            <p className='text-sm font-semibold text-gray-700 truncate'>
              {title}
            </p>
            <p className='text-xs text-gray-500 truncate'>
              {formatDate(date)} {time}
            </p>
          </div>
          <ChevronRightIcon className='w-5 h-5' />
        </div>
      </div>
    </Link>
  );
};

export default function ScheduleCard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const { data, error } = useFetch<Reservation[]>('/vip/reserves');

  useEffect(() => {
    if (data) {
      setReservations(data);
    }
    if (error) {
      console.error('Error fetching reservations:', error);
    }
  }, [data, error]);

  return (
    <div className='bg-white shadow-lg rounded-lg'>
      <div className='border-b border-opacity-55 px-6 py-4'>
        <div className='text-slate-600 text-2xl font-semibold'>상담 일정</div>
      </div>

      <div className='h-72 overflow-y-scroll'>
        {reservations.map((schedule) => (
          <ScheduleItem
            key={schedule.id}
            id={schedule.id}
            title={schedule.title}
            date={schedule.date}
            time={schedule.time}
          />
        ))}
      </div>
    </div>
  );
}
