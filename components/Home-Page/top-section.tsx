"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  LayoutGrid, 
  MessageSquare, 
  Download,
  Image as ImageIcon,
  UserRoundPlus,
  Circle
 } from "lucide-react"
 import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

export default function TopSection() {
  return (
    <div
      className="p-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4.5">
        {/* Left Half - MV Estimate Cards */}
        <div className="flex flex-col gap-3">
        {/* MVestimate Card */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
            <CardHeader className="pt-0">
            <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-800">
            MVestimate
            <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                    <div className="relative inline-flex items-center justify-center cursor-help">
                    <Circle className="w-5 h-5 fill-gray-400 text-gray-400" />
                    <span className="absolute text-[11px] font-bold text-white" style={{ transform: 'translateY(1px)' }}>i</span>
                    </div>
                </TooltipTrigger>
                <TooltipContent
                    side="top"
                    className="bg-gray-900 text-white px-2 py-1 text-xs rounded whitespace-normal max-w-[180px]"
                    >
                    Your instant snapshot of the total claimed revenue!
                </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            </CardTitle>
            </CardHeader>
            <CardContent className="pb-0"> {/* Reduced padding to match second card */}
            <div className="flex items-center justify-between">
                <div className=""> {/* Added space between price and label */}
                <p className="text-2xl font-bold text-gray-900 leading-none">$1,322.13</p>
                <p className="text-sm mt-1 text-gray-600 leading-none">Current Value</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 font-bold text-green-800 border-green-200">
                +7.35%
                </Badge>
            </div>
            </CardContent>
        </Card>

        {/* MV Estimate Range Card - Keep as is since it's the correct height */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
            <CardHeader className="pb-0 pt-0">
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-800">
                    MVestimate Range
                    <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <div className="relative inline-flex items-center justify-center cursor-help">
                            <Circle className="w-5 h-5 fill-gray-400 text-gray-400" />
                            <span className="absolute text-[11px] font-bold text-white" style={{ transform: 'translateY(1px)' }}>i</span>
                        </div>
                        </TooltipTrigger>
                        <TooltipContent
                        side="top"
                        className="bg-gray-900 text-white px-2 py-1 text-xs rounded whitespace-normal max-w-[180px]"
                        >
                        Your instant snapshot of the total claimed revenue!
                        </TooltipContent>
                    </Tooltip>
                    </TooltipProvider>
                </CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
            <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 leading-none">Range</span>
                <span className="font-bold text-lg text-gray-900 leading-none">$1,189.91 - $1,454.34</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                    className="bg-gradient-to-r from-blue-400 to-emerald-400 h-1.5 rounded-full"
                    style={{ width: "65%" }}
                ></div>
                </div>
            </div>
            </CardContent>
        </Card>
        </div>

        {/* Right Half - My Leases Section */}
        <div className="flex flex-col">
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
            <CardHeader className="pb-0 pt-0"> {/* Reduced padding */}
            <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-800 leading-none mb-0">
                My Leases
                <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <div className="relative inline-flex items-center justify-center cursor-help">
                        <Circle className="w-5 h-5 fill-gray-400 text-gray-400" />
                        <span className="absolute text-[11px] font-bold text-white" style={{ transform: 'translateY(1px)' }}>i</span>
                    </div>
                    </TooltipTrigger>
                    <TooltipContent
                        side="top"
                        className="bg-gray-900 text-white px-1.5 py-0.5 text-xs rounded whitespace-normal max-w-xs"
                        >
                        <span>
                            <span className="font-bold text-[#00cd95]">High MVestimates</span>: Highlighting leases with high investment potential in My Leases.
                        </span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-2 pb-0"> {/* Added minimal top padding */}              
            <div
                className="overflow-y-auto max-h-53 px-2 pt-0 pb-0 py-0 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-[#00cd95] [&::-webkit-scrollbar-thumb]:rounded-full"
            >
            {/* Lease Item 1 */}
            <div className="flex items-center gap-3 p-0 bg-gray-50 rounded-lg">
                {/* Left section - Lease info */}
                <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm leading-tight">BASS, M. F. -A- W#8 (04361)</p>
                    <p className="text-xs font-bold mt-1 text-black leading-tight">$1296.12</p>
                </div>

                {/* Vertical divider */}
                <div className="w-px h-8 bg-gray-300"></div>

                {/* Center section - Amount and percentage with conditional color */}
                <div className="text-center w-[120px] space-y-0.5">
                <p className="font-bold text-emerald-600 text-sm leading-tight">$109,487.99</p>
                <p className="text-xs mt-1 font-semibold text-red-500 leading-tight">(-4.40%)</p>
                </div>

                 {/* Vertical divider */}
                <div className="w-px h-8 bg-gray-300"></div>

                {/* Right section - Buttons */}
                <div className="flex flex-col gap-0.5 min-w-[90px]">
                <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs px-2 py-0.5 h-5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                >
                    Map
                </Button>
                <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs px-2 py-0.5 h-5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                >
                    Lease-Report
                </Button>
                <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs px-2 py-0.5 h-5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                >
                    Details
                </Button>
                </div>
              </div>

              {/* Lease Item 2 */}
              <div className="flex items-center gap-3 p-1 bg-gray-50 rounded-lg">
                {/* Left section - Lease info */}
                <div className="flex-1 min-w-[180px]">
                    <p className="font-semibold text-gray-900 text-sm leading-tight">JOHNSON A W (09948)</p>
                    <p className="text-xs font-bold mt-1 text-black leading-tight">$11.69</p>
                </div>

                {/* Vertical divider */}
                <div className="w-px h-8 bg-gray-300"></div>

                {/* Center section - Amount and percentage */}
                {/* For positive percentages */}
                <div className="text-center w-[120px] space-y-0.5">
                <p className="font-bold text-emerald-600 text-sm leading-tight">$559.76</p>
                <p className="text-xs mt-1 font-semibold text-emerald-600 leading-tight">(100.00%)</p>
                </div>

                {/* Vertical divider */}
                <div className="w-px h-8 bg-gray-300"></div>

                {/* Right section - Buttons */}
                <div className="flex flex-col gap-0.5 min-w-[90px]">
                    <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs px-2 py-0.5 h-5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                    >
                        Map
                    </Button>
                    <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs px-2 py-0.5 h-5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                    >
                        Lease-Report
                    </Button>
                    <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs px-2 py-0.5 h-5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                    >
                        Details
                    </Button>
                </div>
            </div>

              {/* Lease Item 3 */}
              <div className="flex items-center gap-3 p-1 bg-gray-50 rounded-lg">
                {/* Left section - Lease info */}
                <div className="flex-1 min-w-[180px]">
                    <p className="font-semibold text-gray-900 text-sm leading-tight">JOHNSON C (00865)</p>
                    <p className="text-xs font-bold mt-1 text-black leading-tight">$9.12</p>
                </div>

                 {/* Vertical divider */}
                <div className="w-px h-8 bg-gray-300"></div>

                {/* Center section - Amount and percentage */}
                {/* For positive percentages */}
                <div className="text-center w-[120px] space-y-0.5">
                <p className="font-bold text-emerald-600 text-sm leading-tight">$77,985.39</p>
                <p className="text-xs mt-1 font-semibold text-emerald-600 leading-tight">(16.31%)</p>
                </div>

                {/* Vertical divider */}
                <div className="w-px h-8 bg-gray-300"></div>

                {/* Right section - Buttons */}
                <div className="flex flex-col gap-0.5 min-w-[90px]">
                    <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs px-2 py-0.5 h-5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                    >
                        Map
                    </Button>
                    <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs px-2 py-0.5 h-5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                    >
                        Lease-Report
                    </Button>
                    <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs px-2 py-0.5 h-5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                    >
                        Details
                    </Button>
                 </div>
              </div>

              {/* Lease Item 4 */}
              <div className="flex items-center gap-3 p-1 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-[180px]">
                    <p className="font-semibold text-gray-900 text-sm leading-tight">CKODRE A (10267)</p>
                    <p className="text-xs font-bold mt-1 text-black leading-tight">$4.87</p>
                </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center w-[120px] space-y-0.5">
                <p className="font-bold text-emerald-600 text-sm leading-tight">$411.56</p>
                <p className="text-xs mt-1 font-semibold text-emerald-600 leading-tight">(100.00%)</p>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
                <div className="flex flex-col gap-0.5 min-w-[90px]">
                    <Button size="sm" variant="outline" className="text-xs px-2 py-0.5 h-5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700">Map</Button>
                    <Button size="sm" variant="outline" className="text-xs px-2 py-0.5 h-5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700">Lease-Report</Button>
                    <Button size="sm" variant="outline" className="text-xs px-2 py-0.5 h-5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700">Details</Button>
                </div>
              </div>

              {/* Lease Item 5 (dummy) */}
              <div className="flex items-center gap-3 p-1 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-[180px]">
                    <p className="font-semibold text-gray-900 text-sm leading-tight">DOE LEASE (67890)</p>
                    <p className="text-xs font-bold mt-1 text-black leading-tight">$987.65</p>
                </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center w-[120px] space-y-0.5">
                <p className="font-bold text-emerald-600 text-sm leading-tight">$8,765.43</p>
                <p className="text-xs mt-1 font-semibold text-red-500 leading-tight">(-2.10%)</p>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
                <div className="flex flex-col gap-0.5 min-w-[90px]">
                    <Button size="sm" variant="outline" className="text-xs px-2 py-0.5 h-5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700">Map</Button>
                    <Button size="sm" variant="outline" className="text-xs px-2 py-0.5 h-5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700">Lease-Report</Button>
                    <Button size="sm" variant="outline" className="text-xs px-2 py-0.5 h-5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700">Details</Button>
                </div>
              </div>
            </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Get started with Mineral View Section */}
      <div className="mt-4">
        <div className="bg-teal-500 rounded-lg py-5 px-4">
            <h2 className="text-white text-2xl font-bold text-center mb-4">Get started with Mineral View</h2>

            <div className="flex flex-wrap justify-center gap-6">
            {/* Add Lease Button */}
            <Button className="bg-orange-300 hover:bg-orange-400 text-black font-semibold py-3 px-4 rounded-lg flex items-center gap-3 h-16 min-w-[160px] transition-all duration-200">
                <div className="transform scale-150">
                    <LayoutGrid className="w-10 h-10 text-black" />
                </div>
                <span className="text-base font-bold leading-tight">Add Lease</span>
            </Button>

            {/* Post a Question Button */}
            <Button className="bg-blue-300 hover:bg-blue-400 text-black font-semibold py-3 px-4 rounded-lg flex items-center gap-3 h-16 min-w-[160px] transition-all duration-200">
                <div className="transform scale-150">
                    <MessageSquare className="w-10 h-10 text-black" />
                </div>
                <span className="text-base font-bold leading-tight">Post a Question</span>
            </Button>

            {/* Purchase Data Button */}
            <Button className="bg-red-300 hover:bg-red-400 text-black font-semibold py-3 px-4 rounded-lg flex items-center gap-3 h-16 min-w-[160px] transition-all duration-200">
                <div className="transform scale-150">
                    <Download className="w-10 h-10 text-black" />
                </div>
                <span className="text-base font-bold leading-tight">Purchase Data</span>
            </Button>

            {/* Add Neighbors Button */}
            <Button className="bg-purple-300 hover:bg-purple-400 text-black font-semibold py-3 px-4 rounded-lg flex items-center gap-3 h-16 min-w-[160px] transition-all duration-200">
                <div className="transform scale-150">
                    <UserRoundPlus className="w-10 h-10 text-black" />
                </div>
                <span className="text-base font-bold leading-tight">Add Neighbors</span>
            </Button>

            {/* Add Photos Button */}
            <Button className="bg-orange-300 hover:bg-orange-400 text-black font-semibold py-3 px-4 rounded-lg flex items-center gap-3 h-16 min-w-[160px] transition-all duration-200">
                <div className="transform scale-150">
                    <ImageIcon className="w-10 h-10 text-black" />
                </div>
                <span className="text-base font-bold leading-tight">Add Photos</span>
            </Button>
            </div>
        </div>
      </div>
    </div>
  )
}
