import { chains, useNetwork } from '@/hooks/use-network';
import { ViewNames } from '@/pages';
import styles from '@/styles/Home.module.css';
import { toBigInt, TransactionLike } from 'ethers';
import { useState } from 'react';
import { useFeeData } from '../hooks/use-fee-data';
import { useNonce } from '../hooks/use-nonce';
import { useSignedTxn } from '../hooks/use-signed-txn';
import { useWallet } from '../hooks/use-wallet';
import { BackTitle } from './Menu';

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
  const [ether, setEther] = useState<number>(0);
  const [showDropDown, setShowDropDown] = useState<boolean>();
  const { setCurrentView } = props;
  const { address, privateKey } = useWallet();
  const feeData = useFeeData();
  const { nonce, incrementNonce } = useNonce();
  const gasPrice = feeData.gasPrice ? toBigInt(feeData.gasPrice) : 1000000000;
  const gasLimit = feeData.maxFeePerGas
    ? toBigInt(feeData.maxFeePerGas)
    : 100000000;

  const signedTxn = useSignedTxn({
    nonce,
    to: toAddress,
    privateKey,
    chainId: chain.chain_id,
    value: ether,
    feeData,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = ether * 10 ** 18;
    console.log('\t', 'value:', value);
    const tx: TransactionLike = {
      to: toAddress,
      nonce: nonce,
      data: '0x01',
      value: value,
      gasLimit: gasLimit,
      gasPrice: gasPrice,
      chainId: toBigInt(chain.chain_id),
    };
    console.log('\t', '🧾 TRANSACTION:', tx);
    incrementNonce();
    console.log(signedTxn);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 10 }}>
      <BackTitle title={'Send'} onBack={() => setCurrentView('overview')} />
      <div style={{ height: 20 }} />
      <div className={styles.dropdown}>
        <button
          className={styles['dropdown-button']}
          onClick={() => setShowDropDown(!showDropDown)}
        >
          {chain.label}
        </button>
        {showDropDown && (
          <ul className={styles['dropdown-menu']}>
            {chains.map((x, i) => {
              return (
                <li key={'chain' + i}>
                  <button
                    className={styles.button_transparent}
                    type="button"
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
      <div style={{ padding: 10 }} />
      <div style={{ position: 'relative' }}>
        <p style={{ position: 'absolute', top: 25, left: 20, fontSize: 12 }}>
          Send to
        </p>
        <div style={{ padding: 5 }} />
        <input
          className={styles.input}
          value={toAddress}
          onChange={(e) => setToAddress(e.currentTarget.value)}
        />
      </div>
      <div style={{ padding: 10 }} />
      <div style={{ position: 'relative' }}>
        <p
          style={{
            position: 'absolute',
            top: 25,
            left: 20,
            fontSize: 12,
            color: 'black',
            zIndex: 5,
          }}
        >
          Amount
        </p>
        <div style={{ padding: 5 }} />
        <div className={styles['input-group']}>
          <input
            className={styles.input}
            value={ether}
            onChange={(e) => {
              const { value } = e.target;
              const newValue = value
                .replace(/[^\d.]/g, '')
                .replace(/^(\d*\.\d{0,2}|\d+)$/g, '$1');
              const newEther = newValue === '' ? 0 : parseFloat(newValue);
              console.log(newEther);
              setEther(newEther);
            }}
          />
          <div className={styles['input-group-addon']}>{chain.symbol}</div>
        </div>
      </div>
      <div style={{ padding: 20 }} />
      <div className={styles['center']}>
        <button
          className={styles.button_white}
          disabled={!toAddress || ether === null}
          onClick={() => handleSubmit}
        >
          Send
        </button>
      </div>
    </form>
  );
};
