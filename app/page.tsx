'use client'

import { TitleBar } from '@/components/TitleBar'

export default function Home() {
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION

  return (
    <div className={`min-h-screen p-5 flex flex-col items-center bg-white}`}>
      <div className="md:mb-20 mb-10 fixed bottom-0">
        <button className="p-5 border-2 border-slate-300 bg-slate-200 rounded-full w-40 h-20 hover:border-3 hover:border-slate-400 hover:bg-slate-300">
          <span className="text-2xl font-bold text-slate-700">Go</span>
        </button>
      </div>
      <div
        id="app-version-number"
        className="md:my-2 my-2 mx-2 flex flex-col items-end fixed bottom-0 right-0"
      >
        <span className="md:text-sm text-xs text-slate-400">
          version {appVersion}
        </span>
      </div>
    </div>
  )
}
