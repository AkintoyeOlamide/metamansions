"use client";

export default function PaymentMethodsPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col px-12 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Payment methods</h1>
        <button className="px-6 py-2 bg-[#FFD700] text-black font-semibold rounded-lg hover:bg-[#FFD700]/90 transition-colors">
          Add payment method
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
        <div className="flex items-center justify-center h-32 text-zinc-500">
          No payment methods found
        </div>
      </div>
    </div>
  );
} 