"use client"

import { UserPlusIcon, Bell, CircleUserRound } from 'lucide-react'
// import { bell as BellFill } from '@heroicons/react/24/solid'
import { ShieldCheckIcon } from '@heroicons/react/24/solid';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const commodityPrices = [
  {
    name: "Natural Gas",
    price: 33.44,
    change: 0.28,
  },
  {
    name: "Brent Crude",
    price: 69.06,
    change: 0.12,
  },
  {
    name: "WTI Crude",
    price: 66.77,
    change: 0.44,
  }
]

export default function Header() {
  return (
    <header className="fixed top-0 right-0 h-14.5 bg-white border-b border-gray-300 w-[calc(100%-224px)] z-50">
    <div className="flex items-stretch h-full">
      {/* Commodity Prices */}
      <div className="hidden lg:flex items-stretch divide-x-2 divide-gray-200">
        {commodityPrices.map((commodity) => (
          <div key={commodity.name} className="flex flex-col justify-center px-6 first:pl-6 border-r-2 border-gray-300 h-full">
            <span className="text-gray-500 text-[14px] font-bold tracking-wide">
              {commodity.name}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-black text-[14px] font-bold">
                ${commodity.price.toFixed(2)}
              </span>
              <span className={`text-[12.3px] font-bold ${commodity.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {commodity.change.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>

        {/* Right Side Icons */}
        <TooltipProvider>
          <div className="flex items-stretch ml-auto">
            {/* User Request */}
            <div className="flex items-center px-6 h-full">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-gray-500 hover:text-gray-900 transition-colors">
                    <UserPlusIcon className="h-6 w-6 fill-current" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-gray-900 text-white px-1.5 py-0.5 text-sm rounded">
                  User Request
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Notification */}
            <div className="flex items-center px-6 border-l-2 border-gray-200 h-full">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="relative text-gray-500 hover:text-gray-900 transition-colors">
                    <Bell className="h-6 w-6 fill-current" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-gray-900 text-white px-1.5 py-0.5 text-sm rounded">
                  Notification
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Tinker Bell Section */}
            <div className="flex items-center gap-2.5 px-6 border-l-2 border-gray-200 h-full">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <CircleUserRound className="h-7 w-7 text-gray-500" />
              </div>
              <span className="text-gray-500 text-[15px] font-medium">
                Tinker Bell
              </span>
              <ShieldCheckIcon className="w-4.5 h-4.5 text-teal-500" />
            </div>
          </div>
        </TooltipProvider>
      </div>
    </header>
  )
}