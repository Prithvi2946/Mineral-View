"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  LayoutGrid, 
  MessageSquare, 
  Download,
  // Image as ImageIcon,
  UserRoundPlus,
  Circle
 } from "lucide-react"
 import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

import { useEffect, useState } from "react";
import { getMvestimateDashboard, MvestimateDashboard } from "@/services/services";
import { getOnWatchlist, LeaseItem } from "@/services/services";

export default function TopSection() {
  const [mvData, setMvData] = useState<MvestimateDashboard | null>(null);
  const [loading, setLoading] = useState(true);

  const [leases, setLeases] = useState<LeaseItem[]>([]);
  const [leasesLoading, setLeasesLoading] = useState(true);

  useEffect(() => {
    getMvestimateDashboard("1271")
      .then((data) => setMvData(data))
      .finally(() => setLoading(false));
  }, []);
  
  useEffect(() => {
    getOnWatchlist("1271")
      .then((data) => setLeases(data))
      .finally(() => setLeasesLoading(false));
  }, []);
  
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
            <CardContent className="pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 leading-none">
                    {loading || !mvData ? "--" : `$${Number(mvData.avg_mvestimate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  </p>
                  <p className="text-sm mt-1 text-gray-600 leading-none">Current Value</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 font-bold text-green-800 border-green-200">
                  {loading || !mvData ? "--" : `${mvData.change}%`}
                </Badge>
              </div>
            </CardContent>
          </Card>

        {/* MV Estimate Range Card */}
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
                  <span className="font-bold text-lg text-gray-900 leading-none">
                    {loading || !mvData
                      ? "--"
                      : `$${Number(mvData.min_mvestimate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} - $${Number(mvData.max_mvestimate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-emerald-400 h-1.5 rounded-full"
                    style={{
                      width:
                        loading || !mvData
                          ? "0%"
                          : `${Math.round(
                              ((Number(mvData.avg_mvestimate) - Number(mvData.min_mvestimate)) /
                                (Number(mvData.max_mvestimate) - Number(mvData.min_mvestimate))) *
                                100
                            )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Half - My Leases Section */}
        <div className="flex flex-col h-full">
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0 h-full min-h-[287px] flex flex-col justify-between">
          <CardHeader className="pb-0 pt-[-0.5px]">
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
            <CardContent className="pt-[-2px] px-2 pb-0 flex-1 flex flex-col">
              <div className="overflow-y-auto max-h-53 px-2 pt-[-2px] pb-0 py-0 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-[#00cd95] [&::-webkit-scrollbar-thumb]:rounded-full h-full">
                {leasesLoading ? (
                  <div className="flex items-center justify-center h-full text-center text-gray-400 py-4">Loading...</div>
                ) : leases.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-center text-gray-400 py-4">No leases found.</div>
                ) : (
                  leases.map((lease) => (
                        <div key={lease.lease_number} className="flex items-center gap-3 p-1 bg-gray-50 rounded-lg mb-[-1px]">
                        {/* Left section - Lease info */}
                        <div className="w-[200px]">
                            <p className="font-semibold text-gray-900 text-sm leading-tight">
                                {lease.lease_name} ({lease.lease_number})
                            </p>
                            <p className="text-sm font-bold text-black mt-2">
                                {lease.mvestimate && !isNaN(Number(lease.mvestimate))
                                ? `$${Number(lease.mvestimate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                : ""}
                            </p>
                        </div>
                        {/* Vertical divider */}
                        <div className="w-px h-8 bg-gray-300 ml-5"></div>
                        {/* Center section - LeaseMVestimate1 and percentage */}
                        <div className="text-center w-[120px] space-y-0.5">
                            <p className="font-bold text-emerald-600 text-sm leading-tight">
                            {lease.LeaseMVestimate1 && !isNaN(Number(lease.LeaseMVestimate1.replace(/,/g, "")))
                                ? `$${Number(lease.LeaseMVestimate1.replace(/,/g, "")).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                : "--"}
                            </p>
                            <p className={`text-xs mt-1 font-semibold ${
                            lease.m_percentage && Number(lease.m_percentage) >= 0 ? "text-emerald-600" : "text-red-500"
                            } leading-tight`}>
                            {lease.m_percentage && !isNaN(Number(lease.m_percentage))
                                ? `(${Number(lease.m_percentage).toFixed(2)}%)`
                                : "--"}
                            </p>
                        </div>
                        {/* Vertical divider */}
                        <div className="w-px h-8 bg-gray-300 mr-3"></div>
                        {/* Right section - Buttons */}
                        <div className="flex flex-col gap-0.5 min-w-[90px]">
                            <Button size="sm" variant="outline" className="text-xs px-2 py-0.5 h-5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700">Map</Button>
                            <Button size="sm" variant="outline" className="text-xs px-2 py-0.5 h-5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700">Lease-Report</Button>
                            <Button size="sm" variant="outline" className="text-xs px-2 py-0.5 h-5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700">Details</Button>
                        </div>
                        </div>
                    ))
                    )}
                </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Get started with Mineral View Section */}
      <div className="mt-4">
        <div className="bg-teal-500 rounded-lg py-5 px-4">
            <h2 className="text-white text-2xl font-bold text-center mb-4">Get started with Mineral View</h2>

            <div className="flex flex-wrap justify-center gap-10">
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
            {/* <Button className="bg-orange-300 hover:bg-orange-400 text-black font-semibold py-3 px-4 rounded-lg flex items-center gap-3 h-16 min-w-[160px] transition-all duration-200">
                <div className="transform scale-150">
                    <ImageIcon className="w-10 h-10 text-black" />
                </div>
                <span className="text-base font-bold leading-tight">Add Photos</span>
            </Button> */}
            </div>
        </div>
      </div>
    </div>
  )
}
