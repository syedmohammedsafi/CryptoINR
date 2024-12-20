import { useQuery } from 'react-query';
import { fetchCryptoData, CryptoData } from '../services/api';

export function useCryptoData() {
  return useQuery<CryptoData[], Error>('cryptoData', fetchCryptoData, {
    refetchInterval: 30000, // Refresh every 30 seconds
    retry: 3,
  });
}