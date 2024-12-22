import useFetch from '@/hooks/useFetch';
import { Recommendation } from '@/utils/type';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RecommendCard() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const { data, error } = useFetch<Recommendation[]>(
    '/vip/journals/recommendations'
  );

  useEffect(() => {
    if (data) {
      setRecommendations(data);
    }
    if (error) {
      console.error('Error fetching recommendations:', error);
    }
  }, [data, error]);

  return (
    <div className='bg-white shadow-lg rounded-lg'>
      <div className='border-b border-opacity-55 px-6 py-4'>
        <div className='text-slate-600 text-2xl font-semibold'>맞춤 콘텐츠</div>
      </div>
      <div className='p-2 rounded-b-lg'>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={5}
          slidesPerView={3}
          navigation
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className='flex items-center'
        >
          {recommendations.map((slide) => (
            <SwiperSlide key={slide.id} className='p-4 bg-white'>
              <Link
                href={slide.url}
                target='_blank'
                rel='noopener noreferrer'
                className='block text-center'
              >
                <Image
                  src={slide.imgUrl}
                  alt={slide.description}
                  width={300}
                  height={200}
                  className='mb-2 object-cover'
                />
                <p className='text-sm text-gray-500'>{slide.description}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
