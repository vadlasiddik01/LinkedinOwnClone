'use client'
import { useState, useContext } from 'react'
import { CheckIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { ThemeContext } from '@/components/layout/MainLayout'

const avatars = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/men/33.jpg',
  'https://randomuser.me/api/portraits/women/34.jpg',
  'https://randomuser.me/api/portraits/men/35.jpg'
]

const user = {
  name: 'Siddik Vadla',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  badge: true
}

export default function PremiumPage() {
  const { theme } = useContext(ThemeContext)
  const [checked, setChecked] = useState([false, false])
  const [showChat, setShowChat] = useState(true)
  const [showContinue, setShowContinue] = useState(false)

  // Show Continue button if any goal is checked
  const anyChecked = checked[0] || checked[1]

  const handleCheck = idx => {
    const newChecked = [...checked]
    newChecked[idx] = !newChecked[idx]
    setChecked(newChecked)
  }

  return (
    <div className="min-h-screen bg-[#fafaf7] dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-8 pt-8 pb-2">
        <img src="/images/company-logos/image.png" alt="LinkedIn" className="h-10 w-10" />
        <a href="/" className="text-gray-500 dark:text-gray-300 hover:underline text-base">Back to LinkedIn.com</a>
      </div>
      {/* Main Offer */}
      <div className="max-w-7xl mx-auto px-8 pt-2 pb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left */}
          <div className="flex-1">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-snug">The average career is 42 years. Invest in your long-term growth with Premium.</div>
            <div className="flex items-center gap-2 mb-2">
              {avatars.map((a, i) => (
                <img key={i} src={a} alt="avatar" className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 -ml-2 first:ml-0" />
              ))}
              <span className="text-gray-700 dark:text-gray-300 text-base ml-2">Moulinadh and millions of other members use Premium</span>
            </div>
            <div className="text-gray-700 dark:text-gray-300 text-base mb-2">Accept 1 month of Premium for free. Cancel anytime. We'll remind you 7 days before your trial ends.</div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full my-4 relative">
              <div className="absolute left-0 top-0 h-2 bg-[#d1e7dd] dark:bg-green-900 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>Share your goals</span>
              <span>0%</span>
            </div>
          </div>
          {/* Right: Testimonial */}
          <div className="w-full md:w-[400px] flex-shrink-0 flex items-start justify-end">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm w-full">
              <div className="text-lg text-gray-700 dark:text-gray-200 font-medium mb-4">"With Premium, I grew my followers to 14,000, landed two jobs, and made hundreds of connections."</div>
              <div className="flex items-center gap-3 mt-2">
                <img src="https://randomuser.me/api/portraits/men/36.jpg" alt="Vugar Rustamli" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1">Vugar Rustamli <img src="/images/company-logos/image.png" alt="in" className="h-4 w-4 inline-block" /></div>
                  <div className="text-sm text-[#b4862b] font-medium">Program Consultant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Goals Card */}
      <div className="bg-[#f5f3ef] dark:bg-gray-900 py-16">
        <div className="max-w-xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700 p-8 flex flex-col items-center">
            <div className="-mt-16 mb-4">
              <div className="relative">
                <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover" />
                {user.badge && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#27ae60] text-white text-xs font-bold px-3 py-0.5 rounded-full border-2 border-white dark:border-gray-800 shadow">#OPENTOWORK</span>
                )}
              </div>
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2 text-center">Siddik, which of these best describes your primary goal for using Premium?</div>
            <div className="text-gray-600 dark:text-gray-300 text-base mb-6 text-center">We'll recommend the right plan for you.</div>
            <div className="w-full flex flex-col gap-4">
              <label className={`flex items-center gap-3 cursor-pointer text-lg text-gray-800 dark:text-gray-100 bg-[#fafaf7] dark:bg-gray-900 rounded-lg px-4 py-3 border ${checked[0] ? 'border-[#0a66c2] ring-2 ring-[#0a66c2]' : 'border-gray-200 dark:border-gray-700 hover:border-[#0a66c2] dark:hover:border-[#0a66c2]'}`}>
                <input type="checkbox" checked={checked[0]} onChange={() => handleCheck(0)} className="h-5 w-5 rounded border-gray-300 dark:border-gray-700 text-[#0a66c2] focus:ring-[#0a66c2]" />
                I'd use Premium for my personal goals
              </label>
              <label className={`flex items-center gap-3 cursor-pointer text-lg text-gray-800 dark:text-gray-100 bg-[#fafaf7] dark:bg-gray-900 rounded-lg px-4 py-3 border ${checked[1] ? 'border-[#0a66c2] ring-2 ring-[#0a66c2]' : 'border-gray-200 dark:border-gray-700 hover:border-[#0a66c2] dark:hover:border-[#0a66c2]'}`}>
                <input type="checkbox" checked={checked[1]} onChange={() => handleCheck(1)} className="h-5 w-5 rounded border-gray-300 dark:border-gray-700 text-[#0a66c2] focus:ring-[#0a66c2]" />
                I'd use Premium as part of my job
              </label>
            </div>
            {anyChecked && (
              <button className="mt-8 w-full px-4 py-2 bg-[#0a66c2] text-white rounded-full text-lg font-semibold hover:bg-[#004182] transition-colors duration-200">Continue</button>
            )}
          </div>
        </div>
      </div>
      {/* Floating Chat Bubble */}
      {showChat && (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 px-4 py-2 mb-2 flex items-center gap-2">
            <span className="text-gray-800 dark:text-gray-100">Questions? <span className="font-medium">Chat with a specialist</span></span>
            <button onClick={() => setShowChat(false)} className="ml-2 p-1 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100"><XMarkIcon className="h-5 w-5" /></button>
          </div>
          <button className="bg-[#0a66c2] hover:bg-[#004182] text-white rounded-full p-3 shadow-lg flex items-center justify-center">
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  )
} 