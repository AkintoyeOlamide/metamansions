"use client";

import { useState } from 'react';
import { FaInstagram, FaTiktok, FaYoutube, FaTrophy } from 'react-icons/fa';

const livestreams = [
  {
    title: 'Weekend BTC',
    streamer: 'Gold Pips',
    live: true,
    viewers: 16,
    time: '23:59:44',
    img: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: '[XRP|USD] LIVE CRYPTO WEEKEND',
    streamer: 'Royalty FX Insights',
    live: true,
    viewers: 3,
    time: '30:56:45',
    img: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: 'Live Forex Trading Session, XAUUSD Results!',
    streamer: 'FREE US30, XAU...',
    live: true,
    viewers: 1,
    time: '24:37:04',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: 'CRYPTO WEEKEND',
    streamer: 'Trade Cafe free',
    live: true,
    viewers: 1,
    time: '11:38:31',
    img: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: 'chill guy just working',
    streamer: 'The Archive Files',
    live: true,
    viewers: 1,
    time: '02:39:54',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60',
  },
];

const rewards = [
  {
    title: 'CPI Clipping',
    payout: 17556.2,
    total: 101197.43,
    percent: 17,
    type: 'Clipping',
    platforms: [<FaInstagram className="text-pink-500" />, <FaYoutube className="text-red-500" />],
    views: 4077722,
    rate: '$3.00 / 1K',
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: 'Roobet Creator Program',
    payout: 2898.62,
    total: 48046.84,
    percent: 6,
    type: 'UGC',
    platforms: [<FaInstagram className="text-pink-500" />, <FaTiktok className="text-black bg-white rounded" />, <FaYoutube className="text-red-500" />],
    views: 398954,
    rate: '$2.00 / 1K',
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: 'dub',
    payout: 107.08,
    total: 30926.48,
    percent: 0,
    type: 'Clipping',
    platforms: [<FaInstagram className="text-pink-500" />, <FaTiktok className="text-black bg-white rounded" />, <FaYoutube className="text-red-500" />],
    views: 53926,
    rate: '$1.50 / 1K',
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60',
  },
  {
    title: 'SNOW Content Creators',
    payout: 0,
    total: 29926.28,
    percent: 0,
    type: 'UGC',
    platforms: [<FaInstagram className="text-pink-500" />, <FaTiktok className="text-black bg-white rounded" />, <FaYoutube className="text-red-500" />],
    views: 0,
    rate: '$2.50 / 1K',
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60',
  },
];

const events = [
  {
    title: 'MasterMind 2nd Edition',
    location: 'London South-Bank Center',
    date: 'Jun 5th 7:00 am',
    attendees: 10,
    link: 'https://maps.app.goo.gl/D8XJe9CLj8d5Xctx7',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'All BTB Members: The Pinnicle Gala',
    location: 'Scotland, UK',
    date: 'Jun 7th 5:00 am',
    attendees: 7,
    link: '',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Riley Picks Las Vegas Trip',
    location: 'Las Vegas Nevada',
    date: 'Jun 6th 5:00 pm',
    attendees: 5,
    link: '',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Trading With Twezo - Stream',
    location: 'Online',
    date: 'Jun 2nd 10:30 am',
    attendees: 3,
    link: 'https://us06web.zoom.us/j/81855698878',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
  },
];

export default function DiscoverPage() {
  const [tab, setTab] = useState('Explore');
  return (
    <div className="min-h-screen w-full bg-black text-white px-0 pb-8">
      <div className="max-w-7xl mx-auto pt-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button className={`px-6 py-2 rounded-t-lg font-bold text-lg focus:outline-none transition-colors cursor-pointer ${tab === 'Explore' ? 'bg-zinc-900 text-white' : 'bg-zinc-800 text-zinc-400'}`} onClick={() => setTab('Explore')}>Explore</button>
          <button className={`px-6 py-2 rounded-t-lg font-bold text-lg focus:outline-none transition-colors cursor-pointer ${tab === 'Leaderboards' ? 'bg-zinc-900 text-white' : 'bg-zinc-800 text-zinc-400'}`} onClick={() => setTab('Leaderboards')}>Leaderboards <FaTrophy className="inline ml-2 text-yellow-400" /></button>
        </div>
        {/* Tab Content */}
        {tab === 'Explore' && (
          <>
            {/* Livestreams */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🎬</span>
                <span className="font-bold text-2xl text-red-400">Livestreams</span>
              </div>
              <div className="text-zinc-300 mb-4">Watch livestreams from some of the best creators.</div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {livestreams.map((s, i) => (
                  <div key={i} className="bg-zinc-900 rounded-xl shadow border border-zinc-800 min-w-[320px] max-w-[320px] flex-shrink-0">
                    <div className="flex items-center gap-2 px-4 pt-3">
                      <span className="font-bold text-white text-sm">{s.streamer}</span>
                      {s.live && <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold ml-2">LIVE</span>}
                    </div>
                    <img src={s.img} alt={s.title} className="w-full h-36 object-cover rounded-xl mt-2" />
                    <div className="flex items-center justify-between px-4 py-2">
                      <span className="text-white text-sm font-semibold">{s.title}</span>
                      <span className="bg-zinc-800 text-green-400 text-xs px-2 py-0.5 rounded-full ml-2">{s.viewers} in stream</span>
                    </div>
                    <div className="px-4 pb-3 text-xs text-zinc-400">{s.time}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-2">
                <a href="#" className="text-blue-400 hover:underline text-sm cursor-pointer">See all livestreams &rarr;</a>
              </div>
            </div>
            {/* Content Rewards */}
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">💸</span>
                <span className="font-bold text-2xl text-yellow-300">Content rewards</span>
              </div>
              <div className="text-zinc-300 mb-4">Post content on social media and get paid for the views you generate.</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {rewards.map((r, i) => (
                  <div key={i} className="bg-zinc-900 rounded-xl p-4 shadow border border-zinc-800 flex flex-col gap-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-7 h-7 rounded bg-black flex items-center justify-center">
                        <img src={r.img} alt={r.title} className="w-7 h-7 object-cover rounded" />
                      </span>
                      <span className="text-white font-semibold text-base">{r.title}</span>
                      <span className="ml-auto bg-blue-900 text-blue-300 text-xs px-2 py-0.5 rounded-full font-bold">{r.rate}</span>
                    </div>
                    <div className="text-zinc-400 text-xs mb-1">{r.title}</div>
                    <div className="text-yellow-400 text-xs font-bold mb-1">${r.payout.toLocaleString()} of ${r.total.toLocaleString()} paid out</div>
                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-2">
                      <div className="h-2 bg-yellow-400 rounded-full" style={{ width: `${r.percent}%` }} />
                    </div>
                    <div className="flex gap-4 text-xs mb-2">
                      <div>
                        <div className="text-zinc-400">Type</div>
                        <div className="text-white">{r.type}</div>
                      </div>
                      <div>
                        <div className="text-zinc-400">Platforms</div>
                        <div className="flex gap-2 items-center">{r.platforms}</div>
                      </div>
                      <div>
                        <div className="text-zinc-400">Views</div>
                        <div className="text-blue-400 font-semibold">{r.views.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Events Happening Soon */}
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🎉</span>
                <span className="font-bold text-2xl text-orange-300">Events happening soon</span>
              </div>
              <div className="text-zinc-300 mb-4">Join the top events happening soon.</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {events.map((event, i) => (
                  <div key={i} className="bg-zinc-900 rounded-xl shadow border border-zinc-800 flex flex-col overflow-hidden">
                    <img src={event.img} alt={event.title} className="w-full h-32 object-cover" />
                    <div className="p-4 flex flex-col gap-2 flex-1">
                      <div className="text-white font-semibold text-lg">{event.title}</div>
                      <div className="text-zinc-400 text-sm">{event.location}</div>
                      <div className="text-zinc-400 text-xs">{event.date}</div>
                      <div className="text-zinc-400 text-xs">{event.attendees} people are attending</div>
                      {event.link && <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-xs mt-1">Event Link</a>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {tab === 'Leaderboards' && (
          <div className="mt-8">
            {/* Info Cards Row */}
            <div className="flex gap-4 mb-6 overflow-x-auto">
              <div className="min-w-[340px] bg-zinc-900 rounded-2xl p-6 flex flex-col justify-between border border-zinc-800">
                <span className="text-green-400 text-xs font-semibold mb-2">Top sports picks groups</span>
                <div className="text-white text-lg font-bold mb-4">We curated the best sports picks communities on Meta Mansions. Find out what made the cut.</div>
                <button className="bg-lime-400 text-black font-semibold px-4 py-2 rounded-lg w-fit">See the list</button>
              </div>
              <div className="min-w-[340px] bg-orange-500 rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-yellow-100 text-xs font-semibold mb-2">Get paid to clip content</span>
                <div className="text-white text-lg font-bold mb-4">Clip content from your favorite creator and get paid for the views you generate.</div>
                <button className="bg-yellow-300 text-black font-semibold px-4 py-2 rounded-lg w-fit">Start earning</button>
              </div>
              <div className="min-w-[340px] bg-blue-500 rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-yellow-100 text-xs font-semibold mb-2">Introducing Content Rewards</span>
                <div className="text-white text-lg font-bold mb-4">Pay your users to post content about your brand. Only pay for the views they generate.</div>
                <button className="bg-yellow-300 text-black font-semibold px-4 py-2 rounded-lg w-fit">Learn more</button>
              </div>
              <div className="min-w-[340px] bg-yellow-300 rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-black text-xs font-semibold mb-2">Discover home page</span>
                <div className="text-black text-lg font-bold mb-4">Want to get on the front of Discover? Learn how.</div>
                <button className="bg-black text-yellow-300 font-semibold px-4 py-2 rounded-lg w-fit">Read now</button>
              </div>
            </div>
            {/* Category Bar */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {['All','Business','Fitness','Careers','Social Media','Game Show','Travel','Miscellaneous','Real Estate','Gaming','Spirituality','Trading','AI','Newsletters','Personal Development'].map((cat, i) => (
                <button key={cat} className={`px-4 py-1.5 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${i === 0 ? 'bg-blue-900 text-white' : 'bg-zinc-800 text-zinc-300'}`}>{cat}</button>
              ))}
            </div>
            {/* Filter Buttons */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {['Most addicting','Newest','Most reviews','Monetise mansions','Hottest affiliate offers','Bounties available','Most money made'].map((filter, i) => (
                <button key={filter} className={`px-4 py-1.5 rounded-full font-semibold text-xs whitespace-nowrap transition-colors ${i === 0 ? 'bg-zinc-900 text-white border border-zinc-700' : 'bg-zinc-800 text-zinc-300'}`}>{filter}</button>
              ))}
            </div>
            {/* Leaderboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Example Card 1 */}
              <div className="bg-zinc-900 rounded-2xl p-6 flex flex-col border border-zinc-800 shadow">
                <div className="flex items-center gap-3 mb-2">
                  <img src="/gold-logo.PNG" alt="TMS+" className="w-10 h-10 rounded-full bg-black" />
                  <span className="font-bold text-white text-base">TMS+ (Heavy Hitters)</span>
                  <span className="ml-auto bg-blue-900 text-blue-300 text-xs px-2 py-0.5 rounded-full font-bold">$29.99 / week</span>
                </div>
                <div className="text-white text-sm mb-2">Flash Sale ONLY $9.99 for FIRST WEEK - use code NewClient</div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                  <span>59,397 minutes</span>
                  <span>·</span>
                  <span>Dec 4, 2024</span>
                  <span>·</span>
                  <span>8,726 joined</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-400 font-bold text-xs">★ 802</span>
                  <span className="text-zinc-400 text-xs">1d</span>
                </div>
              </div>
              {/* Example Card 2 */}
              <div className="bg-zinc-900 rounded-2xl p-6 flex flex-col border border-zinc-800 shadow">
                <div className="flex items-center gap-3 mb-2">
                  <img src="/gold-logo.PNG" alt="Gold Pips" className="w-10 h-10 rounded-full bg-black" />
                  <span className="font-bold text-white text-base">Gold Pips</span>
                  <span className="ml-auto bg-blue-900 text-blue-300 text-xs px-2 py-0.5 rounded-full font-bold">Free</span>
                </div>
                <div className="text-white text-sm mb-2">Turn Pips into Gold – Join the #1 XAU/USD Signals Group!</div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                  <span>45,765 minutes</span>
                  <span>·</span>
                  <span>Apr 8, 2025</span>
                  <span>·</span>
                  <span>21,095 joined</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-400 font-bold text-xs">★ 8</span>
                  <span className="text-zinc-400 text-xs">2d</span>
                </div>
              </div>
              {/* Example Card 3 */}
              <div className="bg-zinc-900 rounded-2xl p-6 flex flex-col border border-zinc-800 shadow">
                <div className="flex items-center gap-3 mb-2">
                  <img src="/gold-logo.PNG" alt="TMS FREE PLAYS" className="w-10 h-10 rounded-full bg-black" />
                  <span className="font-bold text-white text-base">TMS FREE PLAYS</span>
                  <span className="ml-auto bg-blue-900 text-blue-300 text-xs px-2 py-0.5 rounded-full font-bold">Free</span>
                </div>
                <div className="text-white text-sm mb-2">FREE $5,000 SLIPS DAILY FROM LAS VEGAS (JOIN FREE)</div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                  <span>40,173 minutes</span>
                  <span>·</span>
                  <span>Jan 20, 2024</span>
                  <span>·</span>
                  <span>91,984 joined</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-400 font-bold text-xs">★ 802</span>
                  <span className="text-zinc-400 text-xs">1d</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 