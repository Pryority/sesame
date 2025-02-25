import { ViewNames } from '@/pages';
import styles from '@/styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useBalance } from '../hooks/use-balance';
import { ChainName, chains } from '../hooks/use-network';

interface SendReceiveProps {
  setCurrentView: React.Dispatch<React.SetStateAction<ViewNames>>;
}

export const SendReceive: React.FunctionComponent<
  React.PropsWithChildren<SendReceiveProps>
> = (props) => {
  const { setCurrentView } = props;
  return (
    <div className={styles.align_center}>
      <button className={styles.button} onClick={() => setCurrentView('send')}>
        Send
      </button>
      <div style={{ paddingLeft: 40 }} />
      <button
        className={styles.button}
        onClick={() => setCurrentView('receive')}
      >
        Receive
      </button>
    </div>
  );
};

interface BalanceCardProps {
  data: {
    networkName: ChainName;
    currency_name: string;
    currency_img_url: string;
    block_explorer: string;
  };
}

export const BalanceCard: React.FunctionComponent<
  React.PropsWithChildren<BalanceCardProps>
> = (props) => {
  const { data } = props;
  const balance = useBalance(data.networkName);
  return (
    <div className={styles.balance_card}>
      <div className={styles.align_center}>
        <Link href={data.block_explorer} target="_blank">
          {data.currency_img_url ? (
            <Image
              src={data.currency_img_url}
              width={40}
              height={40}
              alt={data.currency_name + 'img'}
              className={styles.avatar}
            />
          ) : null}
        </Link>
      </div>
      <div style={{ paddingLeft: 10, textAlign: 'right' }}>
        <h2>
          {typeof balance === 'number'
            ? Math.floor(balance * 10 ** 12) / 10 ** 12
            : 'Loading...'}
        </h2>
        <p>{data.currency_name}</p>
      </div>
    </div>
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
    <div style={{ paddingTop: 10 }}>
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
