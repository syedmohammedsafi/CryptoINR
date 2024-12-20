import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { countries } from 'countries-list';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import toast from 'react-hot-toast';
import { SignUpData } from '../../types/auth';

export function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpData>({
    name: '',
    email: '',
    password: '',
    whatsapp: '',
    country: '',
    tranactions: []
  });

  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: code,
    label: country.name,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        country: formData.country,
        createdAt: new Date(),
        transactions: []
      });

      toast.success('Account created successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-200">Name</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-lg bg-gray-700 border-gray-600 text-white py-2 px-3 text-lg"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">Email</label>
        <input
          type="email"
          required
          className="mt-1 block w-full rounded-lg bg-gray-700 border-gray-600 text-white py-2 px-3 text-lg"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">Password</label>
        <input
          type="password"
          required
          className="mt-1 block w-full rounded-lg bg-gray-700 border-gray-600 text-white py-2 px-3 text-lg"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">WhatsApp Number</label>
        <PhoneInput
          country={'in'}
          value={formData.whatsapp}
          onChange={(phone) => setFormData({ ...formData, whatsapp: phone })}
          containerClass="!w-full"
          inputClass="!w-full !bg-gray-700 !text-white text-lg"
          buttonClass="!bg-gray-700 py-3 px-4 text-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">Country</label>
        <Select
          options={countryOptions}
          onChange={(option) => setFormData({ ...formData, country: option?.value || '' })}
          className="text-black"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Sign Up
      </button>
    </form>
  );
}