import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import example from '../assets/recommend.jpeg';

export default function RecommendCard() {
  const slides = [
    {
      id: 1,
      image: example,
      description: '하나은행 청년을 위한 새로운 대출...',
    },
    {
      id: 2,
      image: example,
      description: '하나은행 청년을 위한 새로운 대출...',
    },
    {
      id: 3,
      image: example,
      description: '하나은행 청년을 위한 새로운 대출...',
    },
    {
      id: 4,
      image: example,
      description: '하나은행 청년을 위한 새로운 대출...',
    },
    {
      id: 5,
      image: example,
      description: '하나은행 청년을 위한 새로운 대출...',
    },
  ];

  return (
    <div className='bg-white shadow-lg rounded-lg'>
      <div className='border-b border-opacity-55 px-6 py-4'>
        <div className='text-slate-600 text-2xl font-semibold'>맞춤 콘텐츠</div>
      </div>
      <div className='p-2'>
        <Swiper
          modules={[Navigation]}
          spaceBetween={5}
          slidesPerView={3}
          navigation
          loop={true}
          className='flex items-center'
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className='p-4 bg-white'>
              <Image
                src={slide.image}
                alt={slide.description}
                className='mb-2'
              />
              <p className='text-sm text-gray-500'>{slide.description}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
