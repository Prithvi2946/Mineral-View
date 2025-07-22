import axios from "axios";

export interface SpotPrice {
  name: string;
  value: string;
  changevalue: string;
  changepercentage: string;
}

export async function getSpotPrices(): Promise<SpotPrice[]> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/myportfolio/getspotprices`
  );
  // If your API returns { data: [...] }
  return response.data.data;
}