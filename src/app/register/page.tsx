'use client';
import React, { useState } from 'react';
import SelectLocation from '@/components/SelectLocation';
import FormInput from '@/components/ui/Input';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const [locationInfo, setLocationInfo] = useState({
    province: '',
    district: '',
    ward: '',
  });
  const [address, setAddress] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name, email, password, locationInfo, address
    }
    alert(`Bạn đã chọn: ${JSON.stringify(data)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md p-4"
      >
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <FormInput label="Name" value={name} onChange={setName} placeholder="Name" />
        <FormInput label="Email" type="email" value={email} onChange={setEmail} placeholder="Email" />
        <FormInput label="Password" type="password" value={password} onChange={setPassword} placeholder="Password" />
        <FormInput label="Password Confirmation" type="password" value={passwordConfirmation} onChange={setPasswordConfirmation} placeholder="Password Confirmation" />
        <SelectLocation value={locationInfo} onChange={setLocationInfo} />
        <FormInput label="Address" value={address} onChange={setAddress} placeholder="Address" disabled={!locationInfo.ward}/>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white mt-5 px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
        <div className="text-right mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
