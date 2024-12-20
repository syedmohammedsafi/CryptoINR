import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const blockchainData = [
  { name: 'Ethereum', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
  { name: 'Binance Smart Chain', logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png' },
  { name: 'Polygon', logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png' },
  { name: 'Solana', logo: 'https://cryptologos.cc/logos/solana-sol-logo.png' },
  { name: 'Avalanche', logo: 'https://cryptologos.cc/logos/avalanche-avax-logo.png' },
  { name: 'Cardano', logo: 'https://cryptologos.cc/logos/cardano-ada-logo.png' },
  { name: 'Polkadot', logo: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png' },
  { name: 'Cosmos', logo: 'https://cryptologos.cc/logos/cosmos-atom-logo.png' },
  { name: 'Algorand', logo: 'https://cryptologos.cc/logos/algorand-algo-logo.png' },
  { name: 'Tron', logo: 'https://cryptologos.cc/logos/tron-trx-logo.png' },
  { name: 'Near Protocol', logo: 'https://cryptologos.cc/logos/near-protocol-near-logo.png' },
  { name: 'Fantom', logo: 'https://cryptologos.cc/logos/fantom-ftm-logo.png' },
  { name: 'Harmony', logo: 'https://cryptologos.cc/logos/harmony-one-logo.png' },
  { name: 'Arbitrum', logo: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png' },
  { name: 'Optimism', logo: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png' },
  { name: 'TON', logo: 'https://cryptologos.cc/logos/toncoin-ton-logo.png' },
  { name: 'EOS', logo: 'https://cryptologos.cc/logos/eos-eos-logo.png' },
  { name: 'IOTA', logo: 'https://cryptologos.cc/logos/iota-iota-logo.png' },
  { name: 'Hedera Hashgraph', logo: 'https://cryptologos.cc/logos/hedera-hbar-logo.png' },
  { name: 'Zilliqa', logo: 'https://cryptologos.cc/logos/zilliqa-zil-logo.png' },
];

const exchangeData = [
  { name: 'Binance', logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png' },
  { name: 'Huobi', logo: 'https://cryptologos.cc/logos/huobi-token-ht-logo.png' },
  { name: 'KuCoin', logo: 'https://cryptologos.cc/logos/kucoin-token-kcs-logo.png' },
  { name: 'PancakeSwap', logo: 'https://cryptologos.cc/logos/pancakeswap-cake-logo.png' },
  { name: 'Uniswap', logo: 'https://cryptologos.cc/logos/uniswap-uni-logo.png' },
  { name: 'SushiSwap', logo: 'https://cryptologos.cc/logos/sushiswap-sushi-logo.png' },
  { name: '1inch', logo: 'https://cryptologos.cc/logos/1inch-1inch-logo.png' },
  { name: 'Balancer', logo: 'https://cryptologos.cc/logos/balancer-bal-logo.png' },
  { name: 'Synthetix', logo: 'https://cryptologos.cc/logos/synthetix-snx-logo.png' },
];

export function PartnershipBanner() {
  const [blockchains, setBlockchains] = useState(blockchainData);
  const [exchanges, setExchanges] = useState(exchangeData);

  useEffect(() => {
    const savedBlockchains = localStorage.getItem('blockchains');
    const savedExchanges = localStorage.getItem('exchanges');

    if (savedBlockchains) {
      setBlockchains(JSON.parse(savedBlockchains));
    } else {
      localStorage.setItem('blockchains', JSON.stringify(blockchainData));
    }

    if (savedExchanges) {
      setExchanges(JSON.parse(savedExchanges));
    } else {
      localStorage.setItem('exchanges', JSON.stringify(exchangeData));
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Supported Blockchains
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-6 md:gap-8">
            {blockchains.map((blockchain, index) => (
              <motion.div
                key={blockchain.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center group"
              >
                <div className="relative w-12 h-12 md:w-14 md:h-14 bg-gray-800 rounded-full p-2 transition-transform group-hover:scale-110">
                  <img
                    src={blockchain.logo}
                    alt={blockchain.name}
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                <p className="mt-2 text-gray-400 text-xs md:text-sm text-center group-hover:text-white transition-colors">
                  {blockchain.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Our Exchange Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {exchanges.map((exchange, index) => (
              <motion.div
                key={exchange.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center group"
              >
                <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gray-800 rounded-full p-3 transition-transform group-hover:scale-110">
                  <img
                    src={exchange.logo}
                    alt={exchange.name}
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 text-gray-400 text-sm md:text-base font-medium group-hover:text-white transition-colors">
                  {exchange.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
