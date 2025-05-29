"use client";
import { useState } from 'react';

const COMPONENTS = ["ART", "FURNITURE", "GAMING ITEMS", "FASHION ITEMS"];
const MATERIALS = ["Luxury Materials", "Standard Materials", "Eco Materials"];

export default function BuildPage() {
  const [slider, setSlider] = useState(50);
  const [material, setMaterial] = useState(MATERIALS[0]);
  const [aiInput, setAiInput] = useState("");

  return (
    <div className="min-h-screen bg-black text-gray-200 px-0 md:px-8 py-0 md:py-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Title and Subtitle */}
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2 mt-8">Build my Meta Mansion</h1>
        <p className="text-lg text-gray-300 mb-8">Construct your interior with our tools</p>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Components */}
          <div className="border border-yellow-600 rounded-2xl bg-[#111112] p-6 flex flex-col min-h-[400px]">
            <div className="font-bold text-white text-lg mb-6">Components</div>
            <div className="flex flex-col gap-4">
              {COMPONENTS.map((comp) => (
                <button
                  key={comp}
                  className="w-full border border-yellow-600 rounded-md py-2 px-4 text-yellow-400 font-semibold text-left hover:bg-yellow-900/10 transition-all"
                >
                  {comp}
                </button>
              ))}
            </div>
          </div>

          {/* Configuration */}
          <div className="border border-yellow-600 rounded-2xl bg-[#111112] p-6 flex flex-col min-h-[400px]">
            <div className="font-bold text-white text-lg mb-6">Configuration</div>
            <div className="mb-6">
              <div className="mb-2 text-sm font-semibold">Interior Space</div>
              <input
                type="range"
                min={0}
                max={100}
                value={slider}
                onChange={e => setSlider(Number(e.target.value))}
                className="w-full accent-yellow-500"
              />
              <div className="text-yellow-400 text-sm mt-2">{slider}% of maximum size</div>
            </div>
            <div className="mb-8">
              <div className="mb-2 text-sm font-semibold">Materials</div>
              <select
                value={material}
                onChange={e => setMaterial(e.target.value)}
                className="w-full border border-yellow-600 rounded-md bg-black text-yellow-400 px-3 py-2 focus:outline-none"
              >
                {MATERIALS.map((mat) => (
                  <option key={mat} value={mat}>{mat}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <div className="font-bold text-white text-lg mb-2">AI Builder</div>
              <div className="text-gray-400 text-sm mb-2">Describe your dream Meta Mansion and let our AI create it for you based on our available designs</div>
              <textarea
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
                className="w-full border border-yellow-600 rounded-md bg-black text-gray-200 px-3 py-2 min-h-[80px] focus:outline-none mb-4"
                placeholder="Describe your dream Meta Mansion... (e.g., 'A modern beachfront mansion with floor-to-ceiling windows, infinity pool, and smart home technology')"
              />
              <button className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg text-lg transition-colors">BUILD WITH AI</button>
            </div>
          </div>

          {/* Preview */}
          <div className="border border-yellow-600 rounded-2xl bg-[#111112] p-6 flex flex-col min-h-[400px] items-center justify-center">
            <div className="border-2 border-dashed border-yellow-600 rounded-xl w-full h-full flex flex-col items-center justify-center min-h-[200px]">
              <div className="text-yellow-400 font-bold text-lg mb-2">Preview Area</div>
              <div className="text-gray-400 text-sm text-center">Your mansion preview will appear here</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 