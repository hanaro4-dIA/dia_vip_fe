import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import logo from '../assets/logo.png';
import SignInOut from './SignInOut';

async function isLogin() {
  'use server';
  const session = await auth();
  return session?.user?.email || '';
}
export default function Nav() {
  return (
    <div className='flex justify-between items-center w-full shadow-[0_4px_6px_0px_rgba(0,0,0,0.1)]'>
      <Link href='/'>
        <Image src={logo} alt='nav_logo' className='mx-5 w-1/5' />
      </Link>
      <SignInOut isLogin={isLogin} />
    </div>
  );
}
