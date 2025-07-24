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

import { getFinancialsData } from "@/services/services";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartTooltip,
    Legend,
    annotationPlugin
  );
  
  const FINANCIALS_TABS = [
    { label: "Cash Flow", value: "cashflow" },
    { label: "Crude Oil & NAT Gas Production", value: "production" },
  ];
  const FINANCIALS_RANGES = [
    { label: "ALL", value: 0 },
    { label: "1Y", value: 12 },
    { label: "3Y", value: 36 },
    { label: "5Y", value: 60 },
  ];

  const MONTHS_ALL = [
    "Jan 2023", "Sep 2023", "May 2024", "Jan 2025", "Mar 2025",
    "Apr 2025", "Jun 2025", "Sep 2025", "May 2026", "Jan 2027",
    "Sep 2027", "Jan 2028"
  ];
  const MONTHS_1Y = [
    "Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025", "Jun 2025", "Jul 2025", "Aug 2025", "Sep 2025", "Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026"
  ];
  const MONTHS_3Y = [
    "Jan 2024", "Jun 2024", "Nov 2024", "Mar 2025", "Apr 2025", "Jun 2025", "Sep 2025", "Feb 2026", "Jul 2026", "Dec 2026", "Jan 2027"
  ];
  const MONTHS_5Y = [
    "Jan 2023", "Sep 2023", "May 2024", "Jan 2025", "Mar 2025",
    "Apr 2025", "Jun 2025", "Sep 2025", "May 2026", "Jan 2027",
    "Sep 2027", "Jan 2028"
  ];
  
  function getMonths(range: number) {
    if (range === 12) return MONTHS_1Y;
    if (range === 36) return MONTHS_3Y;
    if (range === 60) return MONTHS_5Y;
    return MONTHS_ALL;
  }

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


  // Financials state
    const [financialTab, setFinancialTab] = useState<"cashflow" | "production">("cashflow");
    const [financialRange, setFinancialRange] = useState(0);
    const [financialsLoading, setFinancialsLoading] = useState(false);
    const [financialsData, setFinancialsData] = useState<any>(null);

    const member_id = 1615;
    const lease_number = "43735";
    const district_code = "08";
    const type = "Dashboard";

    useEffect(() => {
    setFinancialsLoading(true);
    setFinancialsData(null);
    getFinancialsData({
        member_id,
        duration_in_months: financialRange,
        lease_number,
        district_code,
        type,
    })
    .then(setFinancialsData)
    .catch(() => setFinancialsData(null))
    .finally(() => setFinancialsLoading(false));
    }, [financialRange, financialTab]);

    let chartContent = null;
    let leaseName = "";
    let legendContent = null;

    // Get correct months for the selected range
    const labels = getMonths(financialRange);
    const todayIndex = Math.floor(labels.length / 2);

    // Custom Y-axis ticks for production tab
    const oilTicks = [0, 60000, 120000, 180000, 240000];
    const gasTicks = [240000, 320000, 400000, 480000, 560000];

    if (
    financialsData &&
    financialsData.data &&
    Array.isArray(financialsData.data.horizontalResponse) &&
    financialsData.data.horizontalResponse.length > 0
    ) {
    leaseName = financialsData.data.lease_name || "";
    const dataArr = financialsData.data.horizontalResponse;

    if (financialTab === "cashflow") {
        const cashFlow = dataArr.map((item: any) => item.cash_flow ?? 0).slice(0, labels.length);
        const futureCashFlow = dataArr.map((item: any) => item.future_cash_flow ?? 0).slice(0, labels.length);

        legendContent = (
            <div className="flex justify-center gap-6 mt-2 mb-2">
            <div className="flex items-center gap-1">
                <span className="w-4 h-1 rounded bg-[#00cd95] inline-block" />
                <span className="text-xs text-black font-semibold">Cash Flow</span>
            </div>
            <div className="flex items-center gap-1">
                <span className="w-4 h-1 rounded border-b-2 border-dashed border-[#00cd95] inline-block" />
                <span className="text-xs text-black font-semibold">Future Cash Flow</span>
            </div>
            </div>
        );

        chartContent = (
        <>
            <Line
            height={255}
            data={{
                labels,
                datasets: [
                {
                    label: "Cash Flow",
                    data: cashFlow,
                    borderColor: "#00cd95",
                    backgroundColor: "rgba(0,205,149,0.1)",
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false,
                    borderDash: [],
                },
                {
                    label: "Future Cash Flow",
                    data: futureCashFlow,
                    borderColor: "#00cd95",
                    backgroundColor: "rgba(0,205,149,0.1)",
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false,
                    borderDash: [8, 4],
                },
                ],
            }}
            options={{
                responsive: true,
                plugins: {
                legend: { display: false },
                tooltip: { mode: "index", intersect: false },
                annotation: {
                    annotations: {
                    todayLine: {
                        type: "line",
                        xMin: todayIndex,
                        xMax: todayIndex,
                        borderColor: "#222",
                        borderWidth: 2,
                        borderDash: [6, 6],
                        label: { display: false },
                    },
                    },
                },
                },
                scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                    color: "#222",
                    maxRotation: 45,
                    minRotation: 45,
                    autoSkip: false,
                    callback: function (val, index) {
                        return labels[index];
                    },
                    },
                    title: {
                    display: true,
                    text: "Month",
                    color: "#222",
                    font: { weight: "bold" },
                    },
                },
                y: {
                    grid: { color: "#eee" },
                    ticks: { color: "#00cd95" },
                    title: {
                    display: true,
                    text: "Estimated Revenue($)",
                    color: "#00cd95",
                    font: { weight: "bold" },
                    },
                },
                },
                elements: {
                line: { borderWidth: 2 },
                },
            }}
            />
            {legendContent}
        </>
        );
    } else {
        // Crude Oil & NAT Gas Production
        const oilProduced = dataArr.map((item: any) => item.oil_produced ?? 0).slice(0, labels.length);
        const oilReserves = dataArr.map((item: any) => item.oil_reserves ?? 0).slice(0, labels.length);
        const gasProduced = dataArr.map((item: any) => item.gas_produced ?? 0).slice(0, labels.length);
        const gasReserves = dataArr.map((item: any) => item.gas_reserves ?? 0).slice(0, labels.length);

        legendContent = (
            <div className="flex justify-center gap-6 mt-2 mb-2">
            <div className="flex items-center gap-1">
                <span className="w-4 h-1 rounded bg-[#00cd95] inline-block" />
                <span className="text-xs text-black font-semibold">Oil Produced</span>
            </div>
            <div className="flex items-center gap-1">
                <span className="w-4 h-1 rounded border-b-2 border-dashed border-[#00cd95] inline-block" />
                <span className="text-xs text-black font-semibold">Oil Reserves</span>
            </div>
            <div className="flex items-center gap-1">
                <span className="w-4 h-1 rounded bg-[#ff0000] inline-block" />
                <span className="text-xs text-black font-semibold">Gas Produced</span>
            </div>
            <div className="flex items-center gap-1">
                <span className="w-4 h-1 rounded border-b-2 border-dashed border-[#ff0000] inline-block" />
                <span className="text-xs text-black font-semibold">Gas Reserves</span>
            </div>
            </div>
        );

        chartContent = (
        <>
            <Line
            height={255}
            data={{
                labels,
                datasets: [
                {
                    label: "Oil Produced",
                    data: oilProduced,
                    borderColor: "#00cd95",
                    backgroundColor: "rgba(0,205,149,0.1)",
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false,
                    borderDash: [],
                    yAxisID: "y1",
                },
                {
                    label: "Oil Reserves",
                    data: oilReserves,
                    borderColor: "#00cd95",
                    backgroundColor: "rgba(0,205,149,0.1)",
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false,
                    borderDash: [8, 4],
                    yAxisID: "y1",
                },
                {
                    label: "Gas Produced",
                    data: gasProduced,
                    borderColor: "#ff0000",
                    backgroundColor: "rgba(255,0,0,0.1)",
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false,
                    borderDash: [],
                    yAxisID: "y2",
                },
                {
                    label: "Gas Reserves",
                    data: gasReserves,
                    borderColor: "#ff0000",
                    backgroundColor: "rgba(255,0,0,0.1)",
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false,
                    borderDash: [8, 4],
                    yAxisID: "y2",
                },
                ],
            }}
            options={{
                responsive: true,
                plugins: {
                legend: { display: false },
                tooltip: { mode: "index", intersect: false },
                annotation: {
                    annotations: {
                    todayLine: {
                        type: "line",
                        xMin: todayIndex,
                        xMax: todayIndex,
                        borderColor: "#222",
                        borderWidth: 2,
                        borderDash: [6, 6],
                        label: { display: false },
                    },
                    },
                },
                },
                scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                    color: "#222",
                    maxRotation: 45,
                    minRotation: 45,
                    autoSkip: false,
                    callback: function (val, index) {
                        return labels[index];
                    },
                    },
                    title: {
                    display: true,
                    text: "Month",
                    color: "#222",
                    font: { weight: "bold" },
                    },
                },
                y1: {
                    type: "linear",
                    position: "left",
                    grid: { color: "#00cd95", borderDash: [2, 2] } as any,
                    ticks: {
                    color: "#00cd95",
                    callback: function (val) {
                        return oilTicks.includes(val as number) ? val : "";
                    },
                    stepSize: 60000,
                    },
                    title: {
                    display: true,
                    text: "Oil Produced (BBL)",
                    color: "#00cd95",
                    font: { weight: "bold" },
                    },
                    min: 0,
                    max: 240000,
                },
                y2: {
                    type: "linear",
                    position: "right",
                    grid: { drawOnChartArea: false },
                    ticks: {
                    color: "#ff0000",
                    callback: function (val) {
                        return gasTicks.includes(val as number) ? val : "";
                    },
                    stepSize: 80000,
                    },
                    title: {
                    display: true,
                    text: "Gas Produced (MCF)",
                    color: "#ff0000",
                    font: { weight: "bold" },
                    },
                    min: 240000,
                    max: 560000,
                },
                },
                elements: {
                line: { borderWidth: 2 },
                },
            }}
            />
            {legendContent}
        </>
        );
    }
    }

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
                            <Circle className="w-5 h-5 fill-gray-400 text-gray-400" />
                            <span className="absolute text-[11px] font-bold text-white" style={{ transform: 'translateY(1px)' }}>i</span>
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
                        {FINANCIALS_TABS.map((tab) => (
                        <Button
                            key={tab.value}
                            variant="ghost"
                            className={`px-3 py-1 h-auto font-semibold rounded-none ${
                            financialTab === tab.value
                                ? "text-[#00cd95] border-b-2 border-[#00cd95]"
                                : "text-gray-600 hover:text-[#00cd95]"
                            }`}
                            onClick={() => setFinancialTab(tab.value as any)}
                        >
                            {tab.label}
                        </Button>
                        ))}
                    </div>
                    {/* Divider Line with Badges */}
                    <div className="relative mb-1">
                        <div className="absolute right-0 -top-1 flex gap-2">
                        {FINANCIALS_RANGES.map((range) => (
                            <Badge
                            key={range.value}
                            variant="secondary"
                            className={`cursor-pointer font-semibold px-2 ${
                                financialRange === range.value
                                ? "bg-[#00cd95] text-white border-[#00cd95]"
                                : "bg-gray-800 text-[#00cd95] border-gray-200"
                            }`}
                            onClick={() => setFinancialRange(range.value)}
                            >
                            {range.label}
                            </Badge>
                        ))}
                        </div>
                    </div>
                    {/* Data/Chart or No Data */}
                    <div className="flex flex-col items-center justify-center text-center py-4 min-h-[220px]">
                        {financialsLoading ? (
                        <div className="text-gray-400">Loading...</div>
                        ) : !chartContent ? (
                        <>
                            <Image
                            src="https://res.cloudinary.com/bold-pm/image/upload/MView/icons/graph-no-data-found.jpg"
                            alt="No Data Found"
                            width={290}
                            height={190}
                            className="mb-3"
                            unoptimized
                            priority
                            />
                            <p className="text-md font-semibold text-black mb-2">
                            No Data Found
                            </p>
                            <p className="text-sm font-bold text-[#00cd95]">{leaseName}</p>
                        </>
                        ) : (
                        <>
                            <div className="w-full">{chartContent}</div>
                            <p className="text-sm font-semibold text-[#00cd95] mt-2 mb-[-30px]">
                            {leaseName}
                            </p>
                        </>
                        )}
                    </div>
                    </div>
                </CardContent>
                </Card>

                    <h2 className="text-xl font-bold text-black mt-3 mb-1">Sponsored</h2>{" "}
                    {/* Adjusted margin-top and margin-bottom */}
                    <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
                        <CardContent className="pt-0 px-4 pb-0 flex flex-col justify-center items-center">
                            <a
                                href="https://www.boldpreciousmetals.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex flex-col items-center no-underline hover:opacity-90"
                            >
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
                                    <h3 className="font-bold text-[#00cd95] text-base mb-1">BOLD Precious Metals</h3>
                                    <p className="text-sm text-gray-700 leading-snug">
                                        Bullion Dealer | Buy Silver, Gold, Platinum & Palladium | Always the lowest prices! Fast & secure shipping
                                    </p>
                                </div>
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}