// app/login/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FormInput from '@/components/ui/Input';
import { useSession } from "next-auth/react";
import { openAuthPopup } from "@/lib/auth-popup";
import { signOut } from "next-auth/react";


export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // xử lý đăng nhập ở đây
    // console.log({ email, password });
    // const res = await signIn('credentials', {
    //   redirect: false,
    //   email,
    //   password,
    // });
    // console.log(res)

    // if (res?.ok) {
    //   router.push('/dashboard');
    // } else {
    //   alert('Login failed');
    // }

    // ví dụ: chuyển đến trang dashboard
    // router.push('/dashboard');
  };
  const handleLoginByProvider = async (provider: "google" | "facebook") => {
    try {
      await openAuthPopup(provider);
      window.location.reload(); // refresh để cập nhật session
    } catch (e) {
      console.warn("User cancelled login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex items-stretch">
        <div className='w-[320px]'>
          <div className="p-4 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleLogin} className="space-y-4 w-full">
                <FormInput label="Email" value={email} onChange={setEmail} placeholder="Email" />
                <FormInput label="Password" value={password} onChange={setPassword} placeholder="Email" />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                  Submit
                </button>
            </form>
            
            <p className="text-right text-sm mt-4">
                Don’t have an account?{' '}
                
                <button
                    type="button"
                    onClick={() => router.push('/register')}
                    className="text-blue-600 hover:underline font-medium"
                >
                    Register
                </button>
            </p>
          </div>
        </div>
        <div className="bg-white rounded shadow flex flex-col items-center justify-center w-[320px] p-4">
          <button onClick={() => handleLoginByProvider("google")} className="mt-2 w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Login with Google</button>
          <button onClick={() => handleLoginByProvider("facebook")} className="mt-2 w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Login with Facebook</button>
        </div>
      </div>
    </div>
  );
}
