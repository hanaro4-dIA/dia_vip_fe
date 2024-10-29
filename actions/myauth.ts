'use server';

import { AuthError } from 'next-auth';
import { auth, signIn, signOut } from '@/lib/auth';

export { signIn as mySignIn, signOut as mySignOut };

export async function getSession() {
  const session = await auth();
  return session;
}

export async function authenticate(formData: FormData) {
  const id = formData.get('id');
  const pw = formData.get('pw');

  if (!id) {
    return { error: '아이디를 입력해주세요.' };
  }
  if (!pw) {
    return { error: '비밀번호를 입력해주세요.' };
  }

  try {
    const result = await signIn('credentials', {
      redirect: false,
      id,
      pw,
    });

    if (!result || result.error) {
      return { error: 'Invalid credentials!' };
    }
    return { redirectUrl: '/' }; // 성공 시 리디렉션할 URL
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'EmailSignInError':
          return { error: error.message };
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }
    throw error;
  }
}
