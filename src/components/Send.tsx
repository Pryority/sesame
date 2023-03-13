import { chains, useNetwork } from '@/hooks/use-network';
import { ViewNames } from '@/pages';
// import styles from '@/styles/Home.module.css';
import { trimSmsLink } from '@/utils/helpers';
import { parseEther, toBigInt, TransactionLike } from 'ethers';
import { useState } from 'react';
import { useFeeData } from '../hooks/use-fee-data';
import { useNonce } from '../hooks/use-nonce';
import { useSignedTxn } from '../hooks/use-signed-txn';
import { useWallet } from '../hooks/use-wallet';
import { BackBtn } from './BackBtn';
import { Card } from './cards/Card';

interface SendProps {
  setCurrentView: React.Dispatch<React.SetStateAction<ViewNames>>;
}

export const Send: React.FunctionComponent<
  React.PropsWithChildren<SendProps>
> = (props) => {
  const { chain, setChain } = useNetwork();
  const [toAddress, setToAddress] = useState<string>(
    '0x0000000000000000000000000000000000000000',
  );
  const [ether, setEther] = useState<string>('0.');
  const [showDropDown, setShowDropDown] = useState<boolean>();
  const { setCurrentView } = props;
  const { address, privateKey } = useWallet();
  const feeData = useFeeData();
  const { nonce, incrementNonce } = useNonce();
  const gasPrice = feeData.gasPrice ? toBigInt(feeData.gasPrice) : 1000000000;
  const gasLimit = feeData.maxFeePerGas
    ? toBigInt(feeData.maxFeePerGas)
    : 100000000;

  // const signedTxn = useSignedTxn({
  //   nonce,
  //   to: toAddress,
  //   privateKey,
  //   chainId: chain.chain_id,
  //   value: ether !== '' ? ether : null,
  //   feeData,
  // });
  const signedTx = useSignedTxn({
    to: toAddress,
    nonce: nonce,
    value: parseEther(ether.toString()),
    feeData: {
      maxFeePerGas: gasPrice,
      maxPriorityFeePerGas: gasPrice,
    },
    chainId: chain.chain_id,
    privateKey:
      'd19dcae65fe8c0a8c59af30accd6fd0abb9d258571f328b0c643fccfbc6f7717',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Sending ${ether} ETH`);
    const tx: TransactionLike = {
      to: toAddress,
      nonce: nonce,
      data: '0x01',
      value: parseEther(ether.toString()),
      gasLimit: gasLimit,
      gasPrice: gasPrice,
      chainId: toBigInt(chain.chain_id),
    };

    console.log('🧾 TX:', tx);
    console.log('🧾 SIGNED TX:', tx);
    incrementNonce();
    console.log(signedTx);
  };

  return (
    <form onSubmit={handleSubmit} className="p-[10px] relative">
      <BackBtn title={'Send'} onBack={() => setCurrentView('overview')} />
      <div className="flex flex-col space-y-[16px] absolute top-0 left-0">
        <button
          className={
            'className="inline-flex text-left justify-start items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" '
          }
          onClick={() => setShowDropDown(!showDropDown)}
        >
          {chain.label}
        </button>
        {showDropDown && (
          <ul className={'inline-block space-y-1'}>
            {chains.map((x, i) => {
              return (
                <li key={'chain' + i}>
                  <button
                    type="button"
                    className="inline-flex justify-start items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => {
                      setChain(x.name);
                      setShowDropDown(false);
                    }}
                  >
                    {x.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <section>
        <div className="flex flex-col space-y-2">
          <p className="">Send to</p>
          <input
            className={`
            p-2 rounded-[8px] text-[14px] outline-2 outline-pink-400 bg-slate-800 focus:bg-slate-900
          text-pink-100 focus:ring-pink-300 focus:ring-1 border-2 border-pink-500`}
            value={toAddress}
            onChange={(e) => setToAddress(e.currentTarget.value)}
          />
        </div>
        {/* <div style={{ padding: 10 }} /> */}
        <div className="flex flex-col space-y-4">
          <p className="absolute top-5 left-4 text-[12px] text-black z-10">
            Amount
          </p>
          {/* <div style={{ padding: 5 }} /> */}
          <div className={'flex justify-between w-full'}>
            <input
              className={''}
              placeholder={'0.'}
              type={'number'}
              step="any"
              onChange={(e) => {
                const { value } = e.target;
                const newValue = value.replace(/[^0-9.]/g, ''); // Allow only numbers and decimals
                if (newValue === '') {
                  e.preventDefault(); // prevent backspace
                } else {
                  console.log(`Sending ${newValue} ETH`);
                  setEther(newValue);
                }
              }}
            />
            <div className={'text-[12px] font-bold capitalize'}>
              {chain.symbol}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="flex w-full relative justify-center items-center">
          <button
            className={'absolute flex p-4 rounded-lg bg-pink-500'}
            disabled={!toAddress || ether === null}
            onClick={() => handleSubmit}
          >
            Send
          </button>
        </div>
        <div className="p-[10px]">
          {signedTx ? (
            <>
              <Card
                title={'Your Signed Transaction'}
                message={`${trimSmsLink(signedTx)}`}
              />
            </>
          ) : (
            <>
              <p>Your signed transaction will appear here</p>
            </>
          )}
        </div>
      </section>
    </form>
  );
};
