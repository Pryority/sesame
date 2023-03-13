import { ViewNames } from '@/pages';
import React from 'react';
import { chains } from '../hooks/use-network';
import { BalanceCard } from './cards/BalanceCard';

interface SendReceiveProps {
  setCurrentView: React.Dispatch<React.SetStateAction<ViewNames>>;
}

export const SendReceive: React.FunctionComponent<
  React.PropsWithChildren<SendReceiveProps>
> = (props) => {
  const { setCurrentView } = props;
  return (
    <section className="flex justify-center space-x-1">
      <button
        className={
          'min-w-[100px] h-[40px] bg-amber-300 border border-amber-200 hover:bg-amber-400 text-amber-900 transition-all ease-in-out duration-150 rounded-full'
        }
        onClick={() => setCurrentView('send')}
      >
        Send
      </button>
      <button
        className={
          'min-w-[100px] h-[40px] bg-lime-300 border border-lime-200 hover:bg-lime-400 text-lime-900 transition-all ease-in-out duration-150 rounded-full'
        }
        onClick={() => setCurrentView('receive')}
      >
        Receive
      </button>
    </section>
  );
};

interface OverviewProps {
  setCurrentView: React.Dispatch<React.SetStateAction<ViewNames>>;
}

export const Overview: React.FunctionComponent<
  React.PropsWithChildren<OverviewProps>
> = (props) => {
  const { setCurrentView } = props;
  return (
    <div>
      <SendReceive setCurrentView={setCurrentView} />
      {chains.map((chain) => {
        return (
          <BalanceCard
            key={chain.chain_id}
            data={{
              networkName: chain.name,
              currency_name: chain.symbol,
              currency_img_url: chain.logo_url,
              block_explorer: chain.block_explorer,
            }}
          />
        );
      })}
    </div>
  );
};
