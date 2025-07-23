"use client";

import React from 'react';
import { 
    Share2, 
    ChevronRight, 
    FileText, 
    Paperclip, 
    Info, 
    MessageCircle, 
    Eye, 
    Send,
    Circle, 
} from 'lucide-react';
import { 
    Card, 
    CardContent
} from "@/components/ui/card";
import { 
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { getActivityNews, ActivityNewsItem } from "@/services/services";

export default function Activity() {
  const [activities, setActivities] = useState<ActivityNewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const payload = {
      operators: [],
      playTypes: [],
      countys: [],
      CategoryIds: [{ value: "1" }],
      searchString: "",
      page: 1,
      pageSize: 10,
      data_type: "activity",
      _email_id: "tinker2024bell@gmail.com", // replace with actual user email if needed
    };
    getActivityNews(payload)
      .then(setActivities)
      .finally(() => setLoading(false));
  }, []);

    return (  
        <div className="px-5 mb-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Activity Section (Col-7) */}
                <div className="lg:col-span-7 flex flex-col gap-2">
                    {/* Activity Title and Tabs */}
                    <div className="flex items-center gap-5">
                        <h2 className="text-2xl font-bold text-black">Activity</h2>
                        <div className="flex gap-0.5 text-sm font-bold text-gray-600">
                            <Button
                                variant="ghost"
                                className="px-2 py-1 h-auto font-bold text-[#00cd95] border-b-2 border-[#00cd95] rounded-none"
                            >
                                DRILLING PERMITS
                            </Button>
                            <Button variant="ghost" className="px-3 py-1 h-auto font-bold hover:text-emerald-600">
                                COMPLETIONS
                            </Button>
                            <Button variant="ghost" className="px-3 py-1 h-auto font-bold hover:text-emerald-600">
                                ALL
                            </Button>
                        </div>
                    </div>

                    {/* Activity Cards Container with Scrollable Area */}
                    <div className="overflow-y-auto max-h-[calc(100vh-1px)] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-[#00cd95] [&::-webkit-scrollbar-thumb]:rounded-full pr-0.5">
                        {loading ? (
                            <div className="text-center text-gray-400 py-4">Loading...</div>
                        ) : activities.length === 0 ? (
                            <div className="text-center text-gray-400 py-4">No activity found.</div>
                        ) : (
                            activities.map((item) => (
                            <Card key={item._id} className="mb-4 shadow-sm hover:shadow-md transition-shadow bg-white">
                                <CardContent className="px-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-gray-900 text-base" dangerouslySetInnerHTML={{ __html: item.Title }} />
                                    <Share2 className="w-4 h-4 text-gray-500 cursor-pointer" />
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#00cd95] font-medium mb-3">
                                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-600 border-emerald-200">
                                    {item.Status}
                                    </Badge>
                                    <span>{new Date(item.CreateTS).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                                </div>
                                <p className="text-sm text-gray-500 font-semibold mb-3">Here are the key details:</p>
                                <ul className="text-sm text-gray-700 space-y-1 mb-4">
                                    {item.DetailedInformation?.filter(d => d.value).map((d, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <ChevronRight className="w-5 h-5 text-red-500" /> {d.key}: {d.value}
                                    </li>
                                    ))}
                                </ul>
                                <div className="flex items-center gap-4 mb-4">
                                    <Button
                                    variant="outline"
                                    className="flex items-center gap-2 text-sm font-bold text-[#00cd95] border-[#00cd95] bg-transparent"
                                    asChild
                                    >
                                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                                        <FileText className="w-6 h-6" /> Access RRC Report
                                    </a>
                                    </Button>
                                    <div className="w-px h-6 bg-gray-400"></div>
                                    <Button
                                    variant="outline"
                                    className="flex items-center gap-2 text-sm font-bold text-[#00cd95] border-[#00cd95] bg-transparent"
                                    >
                                    <Paperclip className="w-6 h-6" /> Attachments
                                    </Button>
                                </div>
                                <div className="text-sm text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: item.Description }} />
                                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                    <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <Info className="w-5 h-5" /> {item.Likes?.length || 0} Likes
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageCircle className="w-5 h-5" /> {item.Comments?.length || 0} Comments
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Eye className="w-5 h-5" /> {item.Views?.length || 0} Views
                                    </div>
                                    </div>
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#00cd95] font-semibold">
                                    View detailed <ChevronRight className="w-5 h-5" />
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                    type="text"
                                    placeholder="Write your comment here..."
                                    className="flex-1 p-2 border border-[#00cd95] rounded-full text-sm focus:outline-none focus:ring-1 bg-gray-200 placeholder-gray-500"
                                    />
                                    <Button className="bg-[#00cd95] text-white p-2 rounded-full">
                                    <Send className="w-5 h-5" />
                                    </Button>
                                </div>
                                </CardContent>
                            </Card>
                            ))
                        )}
                    </div>
                </div>

                {/* Financials Section (Col-5) */}
                <div className="lg:col-span-5 flex flex-col gap-2">
                    {/* Financials Title */}
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl font-bold text-black">Financials</h2>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="relative inline-flex items-center justify-center cursor-help">
                                        <Circle className="w-5 h-5 fill-gray-400 text-gray-400" /> {/* Increased from w-4 h-4 to w-5 h-5 */}
                                        <span className="absolute text-[11px] font-bold text-white" style={{ transform: 'translateY(1px)' }}>i</span> {/* Added transform and increased font size */}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent 
                                    className="bg-white p-1 text-xs text-gray-800 shadow-lg rounded-md border border-gray-400"
                                    side="right"
                                >
                                    <p className="mb-0.5"><span className="font-semibold">Cash Flow:</span> Monitor financial liquidity.</p>
                                    <p><span className="font-semibold">Production:</span> Track output efficiency.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    {/* Financials Card */}
                    <Card className="bg-white shadow-lg border-0">
                        <CardContent className="pt-0 px-3">
                            {/* Tabs Section */}
                            <div className="flex flex-col">
                                <div className="flex flex-wrap gap-2 mb-2">
                                    <Button
                                        variant="ghost"
                                        className="px-3 py-1 h-auto text-[#00cd95] border-b-2 border-[#00cd95] rounded-none font-semibold"
                                    >
                                        Cash Flow
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        className="px-3 py-1 h-auto text-gray-600 hover:text-[#00cd95] font-semibold whitespace-normal text-left"
                                    >
                                        Crude Oil & NAT Gas Production
                                    </Button>
                                </div>

                                {/* Divider Line with Badges */}
                                <div className="relative mb-1">
                                    <div className="absolute right-0 -top-1 flex gap-2">
                                        <Badge
                                            variant="secondary"
                                            className="bg-[#00cd95] text-white border-[#00cd95] cursor-pointer font-semibold px-2"
                                        >
                                            ALL
                                        </Badge>
                                        <Badge
                                            variant="secondary"
                                            className="bg-gray-800 text-[#00cd95] border-gray-200 cursor-pointer font-semibold px-2"
                                        >
                                            1Y
                                        </Badge>
                                        <Badge
                                            variant="secondary"
                                            className="bg-gray-800 text-[#00cd95] border-gray-200 cursor-pointer font-semibold px-2"
                                        >
                                            3Y
                                        </Badge>
                                        <Badge
                                            variant="secondary"
                                            className="bg-gray-800 text-[#00cd95] border-gray-200 cursor-pointer font-semibold px-2"
                                        >
                                            5Y
                                        </Badge>
                                    </div>
                                </div>

                                {/* No Data Content */}
                                <div className="flex flex-col items-center justify-center text-center py-4">
                                    <Image
                                        src="https://res.cloudinary.com/bold-pm/image/upload/MView/icons/graph-no-data-found.jpg"
                                        alt="No Data Found"
                                        width={290}
                                        height={190}
                                        className="mb-3"
                                        unoptimized
                                        priority
                                    />
                                    <p className="text-md font-semibold text-black mb-2">No Data Found</p>
                                    <p className="text-sm font-bold text-[#00cd95]">BASS, M. F. -A- W#B</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <h2 className="text-xl font-bold text-black mt-3 mb-1">Sponsored</h2>{" "}
                    {/* Adjusted margin-top and margin-bottom */}
                    <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
                        {" "}
                        {/* Added mb-6 for bottom space */}
                        <CardContent className="pt-0 px-4 pb-0 flex flex-col justify-center items-center">
                        {" "}
                        {/* Added padding to CardContent */}
                        <Image
                            src="https://res.cloudinary.com/mineralview/image/upload/Images/bold-Branding.webp"
                            alt="BOLD Precious Metals"
                            width={450}
                            height={300}
                            className="object-cover mb-4"
                            unoptimized
                            priority
                        />
                        <div>
                            <h3 className="font-bold text-[#00cd95] text-base mb-1">BOLD Precious Metals</h3>{" "}
                            {/* Changed text color to blue */}
                            <p className="text-sm text-gray-700 leading-snug">
                            {" "}
                            {/* Added leading-snug for line height */}
                            Bullion Dealer | Buy Silver, Gold, Platinum & Palladium | Always the lowest prices! Fast & secure
                            shipping
                            </p>
                        </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Feedback Button */}
            {/* <Button className="fixed bottom-4 right-6 bg-[#00cd95] hover:bg-emerald-600 text-white text-md py-3 px-4 rounded-md shadow-lg flex items-center gap-4">
                Feedback <ArrowUp className="w-5 h-5" />
            </Button> */}
      
        </div>
      
    )
}