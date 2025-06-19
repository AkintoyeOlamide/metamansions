"use client";

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FiCopy, FiShare2 } from 'react-icons/fi';

export default function GetFirstUserModal({ isOpen, onClose }) {
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
                <div className="flex flex-col items-center text-center gap-2">
                  <Dialog.Title as="h3" className="text-xl font-semibold text-white mb-1">
                    Get your first user
                  </Dialog.Title>
                  <div className="text-gray-400 text-sm mb-4">
                    People will be able to join your Meta Mansion when you send them your link.
                  </div>
                  <div className="w-full text-left mb-4">
                    <div className="font-semibold text-white mb-2">Best way to launch on Meta Mansions</div>
                    <ol className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FFD700] text-black font-bold text-sm">1</span>
                        <span className="text-gray-200 text-sm">Share your free link (we've set it up for you)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FFD700] text-black font-bold text-sm">2</span>
                        <span className="text-gray-200 text-sm">Get members in, collect feedback, and build community</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FFD700] text-black font-bold text-sm">3</span>
                        <span className="text-gray-200 text-sm">Then, drop your paid offer when you're ready</span>
                      </li>
                    </ol>
                  </div>
                  <div className="flex w-full justify-center gap-8 mt-2 mb-1">
                    <button className="flex flex-col items-center group" onClick={() => {navigator.clipboard.writeText('https://your-link.com')}}>
                      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 group-hover:bg-zinc-700 transition mb-1">
                        <FiCopy className="text-2xl text-gray-200" />
                      </span>
                      <span className="text-xs text-gray-300">Copy link</span>
                    </button>
                    <button className="flex flex-col items-center group" onClick={onClose}>
                      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 group-hover:bg-zinc-700 transition mb-1">
                        <span className="text-2xl text-gray-200 font-bold">×</span>
                      </span>
                      <span className="text-xs text-gray-300">X</span>
                    </button>
                    <button className="flex flex-col items-center group">
                      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 group-hover:bg-zinc-700 transition mb-1">
                        <FiShare2 className="text-2xl text-gray-200" />
                      </span>
                      <span className="text-xs text-gray-300">Share</span>
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 