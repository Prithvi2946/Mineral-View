"use client"

import { 
  Grid3X3, 
  Briefcase, 
  Files, // Change from FileText
  Users, 
  MapPin, 
  BarChart3, 
  MessageSquare, // No change needed
  CloudDownload, // Change from Cloud
  UserPlus, 
  Headphones, 
  BookOpen, // Change from Book
  PhoneCall, // Add this import for Contact Us
  Menu, 
  X 
} from 'lucide-react'
import { useState } from "react"
import Link from "next/link"

const navigationItems = [
  {
    title: "Dashboard",
    icon: Grid3X3,
    href: "/dashboard",
    isActive: true,
  },
  {
    title: "My Portfolio",
    icon: Briefcase,
    href: "/portfolio",
  },
  {
    title: "Field Reports",
    icon: Files,
    href: "/field-reports",
  },
  {
    title: "Community",
    icon: Users,
    href: "/community",
  },
  {
    title: "Maps",
    icon: MapPin,
    href: "/maps",
  },
  {
    title: "Activity",
    icon: BarChart3,
    href: "/activity",
  },
  {
    title: "Feedback",
    icon: MessageSquare,
    href: "/feedback",
  },
  {
    title: "Purchase Data",
    icon: CloudDownload,
    href: "/purchase-data",
  },
  {
    title: "Referral",
    icon: UserPlus,
    href: "/referral",
  },
  {
    title: "FAQ",
    icon: Headphones,
    href: "/faq",
  },
  {
    title: "Knowledge Center",
    icon: BookOpen,
    href: "/knowledge-center",
  },
  {
    title: "Contact Us",
    icon: PhoneCall,
    href: "/contact",
  },
]

export default function SideNavPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="fixed inset-y-0 left-0 max-w-[224px]"> {/* Added max-width constraint */}
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-black text-teal-400 rounded-md lg:hidden hover:bg-gray-900 transition-colors"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Overlay */}
      {/* {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )} */}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-56 max-w-[224px] min-w-[200px] bg-black transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-teal-400 lg:hidden transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

       {/* Logo Section */}
       {/* <div className="flex items-center justify-center px-4 py-2 border-b border-gray-800"> */}
       <div className="flex items-center justify-start px-0 py-1 border-b border-gray-800">
          <Link href="/" className="block w-full max-w-[210px]"> {/* Added max-width */}
            <div className="relative h-12.5">
              <img
                src="https://res.cloudinary.com/mineralview/image/upload/Mview-logo-Beta.webp"
                alt="MView Logo"
                className="w-full h-full object-contain object-center"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`
                  group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    item.isActive
                      ? "bg-teal-500/10 text-teal-400"
                      : "text-gray-300 hover:text-teal-400 hover:bg-gray-900/50"
                  }
                `}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon
                  className={`h-4 w-4 flex-shrink-0 transition-colors ${
                    item.isActive
                      ? "text-teal-400 fill-current"
                      : "text-gray-400 group-hover:text-teal-400 fill-current"
                  }`}
                  fill="currentColor"
                />
                <span className="truncate text-[15px]">{item.title}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom User Section */}
        {/* <div className="px-3 py-3 border-t border-gray-800">
          <div className="flex items-center justify-center">
            <div className="w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
              <span className="text-xs font-medium text-gray-300">N</span>
            </div>
          </div>
        </div> */}
      </aside>
    </div>
  )
}