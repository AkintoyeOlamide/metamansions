"use client";

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BsShieldCheck } from 'react-icons/bs';

export default function PaymentSetupModal({ isOpen, onClose, onStart }) {
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
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 bg-[#FFD700]/10 p-4 rounded-full">
                    <BsShieldCheck className="w-8 h-8 text-[#FFD700]" />
                  </div>
                  <Dialog.Title as="h3" className="text-2xl font-semibold text-white mb-2">
                    Set up Meta Mansion Payments
                  </Dialog.Title>
                  <p className="text-gray-400 mb-6">
                    Whether you're selling a product or creating a Content Reward, we need you to set up Meta Mansion Payments 🏦
                  </p>
                  <button
                    onClick={onStart ? onStart : onClose}
                    className="w-full bg-[#FFD700] text-black py-3 px-4 rounded-lg font-medium hover:bg-[#FFD700]/90 transition-colors"
                  >
                    Start
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