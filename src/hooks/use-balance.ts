import { useIsOnline } from '@/hooks/use-is-online';
import { useWallet } from '@/hooks/use-wallet';
import { formatEther, JsonRpcProvider } from 'ethers';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useEffect } from 'react';
import { ChainId, ChainName, chains } from './use-network';

const initialBalances = chains.reduce<Record<ChainName, number>>(
  (acc, chain) => {
    acc[chain.name] = 0;
    return acc;
  },
  {} as Record<ChainName, number>,
);
const balancesAtom = atomWithStorage<{ [network: string]: number }>(
  'wallet-balances',
  initialBalances,
);

export const providersByChainId = chains.reduce<
  Record<ChainId, JsonRpcProvider>
>((acc, chain) => {
  acc[chain.chain_id] = new JsonRpcProvider(chain.rpcUrls[0]);
  return acc;
}, {} as Record<ChainId, JsonRpcProvider>);
export const providersByChainName = chains.reduce<
  Record<ChainName, JsonRpcProvider>
>((acc, chain) => {
  acc[chain.name] = new JsonRpcProvider(chain.rpcUrls[0]);
  return acc;
}, {} as Record<ChainName, JsonRpcProvider>);

export const useBalance = (network: ChainName): number => {
  const [balance, setBalance] = useAtom(balancesAtom);
  const wallet = useWallet();
  const isOnline = useIsOnline();
  const { address } = wallet;
  const fetchBalance = () => {
    return providersByChainName[network].getBalance(address).then((bal) => {
      setBalance((oldBalance) => ({
        ...oldBalance,
        [network]: Number(formatEther(bal)),
      }));
    });
  };
  useEffect(() => {
    if (!address || !isOnline) return;
    const intervalId = setInterval(async () => {
      fetchBalance();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [address, isOnline]);
  return balance[network];
};
