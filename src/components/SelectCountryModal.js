"use client";

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IoClose } from 'react-icons/io5';

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'India',
  'Nigeria',
  'South Africa',
  'Brazil',
  // Add more as needed
];

export default function SelectCountryModal({ isOpen, onClose }) {
  const [selectedCountry, setSelectedCountry] = useState('United States');

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between mb-2">
                    <Dialog.Title as="h3" className="text-lg font-semibold text-white">
                      Select your country
                    </Dialog.Title>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
                      <IoClose />
                    </button>
                  </div>
                  <div className="text-gray-400 text-sm mb-2">Select your country to create a new account.</div>
                  <select
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-[#FFD700]"
                    value={selectedCountry}
                    onChange={e => setSelectedCountry(e.target.value)}
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  <button
                    className="self-end mt-4 bg-[#FFD700] text-black font-medium px-6 py-2 rounded-lg hover:bg-[#FFD700]/90 transition-colors"
                    onClick={onClose}
                  >
                    Next
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 