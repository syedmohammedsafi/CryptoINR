import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const USD_TO_INR = 83; // We'll use a fixed rate for now, but you should fetch this dynamically

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
}

export const fetchCryptoData = async (): Promise<CryptoData[]> => {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&sparkline=false&locale=en`
    );
    
    // Convert USD prices to INR
    return response.data.map((coin: any) => ({
      ...coin,
      current_price: coin.current_price * USD_TO_INR,
      market_cap: coin.market_cap * USD_TO_INR,
      total_volume: coin.total_volume * USD_TO_INR,
    }));
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw error;
  }
};