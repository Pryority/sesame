import { useBalance } from '@/hooks/use-balance';
import { ChainName } from '@/hooks/use-network';
import Image from 'next/image';
import Link from 'next/link';

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
    <article className="py-1">
      <div
        className={
          'px-4 py-2 min-h-[50px] flex items-center w-full justify-between bg-pink-50 rounded-[4px] shadow-sm'
        }
      >
        <div className={'overflow-clip rounded-full'}>
          <Link href={data.block_explorer} target="_blank">
            {data.currency_img_url ? (
              <Image
                src={data.currency_img_url}
                width={40}
                height={40}
                alt={data.currency_name + 'img'}
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
          <p className="text-xs">{data.currency_name}</p>
        </div>
      </div>
    </article>
  );
};
