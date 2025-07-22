import axios from "axios";

export interface SpotPrice {
  name: string;
  value: string;
  changevalue: string;
  changepercentage: string;
}

export interface MvestimateDashboard {
    change: string;
    avg_mvestimate: string;
    max_mvestimate: string;
    min_mvestimate: string;
    oil_rate: string;
    gas_rate: string;
  }

  export interface LeaseItem {
    member_lease_id: number;
    district_code: string | null;
    lease_number: string;
    lease_name: string;
    operator_name: string | null;
    county: string | null;
    acres: string | null;
    decimal_interest: string | null;
    mvestimate: string;
    latest_activity: string | null;
    play_type: string | null;
    oil_reserves: string | null;
    gas_reserves: string | null;
    group_name: string | null;
    mvestimateupdatedatetime: string | null;
    onwatchlist: boolean;
    active_lease_wells: number | null;
    first_activity_date: string | null;
    gas_produced: string | null;
    oil_produced: string | null;
    leasesinfo: any; // Use a more specific type if known
    well_density: number | null;
    aging: number | null;
    productivity: number | null;
    new_well_probalility: number | null;
    LeaseMVestimate1: string | null;
    diffrencerange: number | null;
    m_percentage: string | null;
    longitude: number | null;
    latitude: number | null;
    lease_cash_flow?: string; // If present in some responses
    mvestimate_change?: string; // If present in some responses
    mvestimate_change_percentage?: string; // If present in some responses
  }

export async function getSpotPrices(): Promise<SpotPrice[]> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/myportfolio/getspotprices`
  );
  // If your API returns { data: [...] }
  return response.data.data;
}

export async function getMvestimateDashboard(userId: string): Promise<MvestimateDashboard> {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/myportfolio/get_mvestimate_dashboard/${userId}`
    );
    // Fix: return the first item in the data array
    return response.data.data[0];
  }

  export async function getOnWatchlist(userId: string): Promise<LeaseItem[]> {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/MyPortfolio/get_onwatchlist/${userId}`
    );
    // API returns { data: [...] }
    return response.data.data;
  }