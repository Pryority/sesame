import { chains, useNetwork } from '@/hooks/use-network';
import { ViewNames } from '@/pages';
import styles from '@/styles/Home.module.css';
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
  const [toAddress, setToAddress] = useState<string>('');
  const [ether, setEther] = useState<number>(0);
  const [showDropDown, setShowDropDown] = useState<boolean>();
  const { setCurrentView } = props;
  const { address, privateKey } = useWallet();
  const feeData = useFeeData();
  const { nonce, incrementNonce } = useNonce();
  const signedTxn = useSignedTxn({
    nonce,
    to: toAddress,
    privateKey,
    chainId: chain.chain_id,
    value: ether,
    feeData,
  });

  return (
    <div style={{ padding: 10 }}>
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
        {/* <div style={{
          position: 'absolute', 
          bottom: 12, left: 15, right: 15, zIndex: 100, height: 1, backgroundColor: 'lightgrey'}}/> */}
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
        {/* <div style={{
          position: 'absolute', 
          bottom: 12, left: 15, right: 15, zIndex: 100, height: 1, backgroundColor: 'lightgrey'}}/> */}
        <div style={{ padding: 5 }} />
        <div className={styles['input-group']}>
          <input
            className={styles.input}
            // type="number"3
            value={ether}
            onChange={(e) => {
              const { value } = e.target;
              const newValue = value
                .replace(/[^\d.]/g, '')
                .replace(/^(\d*\.\d{0,1}|\d+)$/g, '$1');
              const newEther = newValue === '' ? 0 : parseFloat(newValue);
              setEther(newEther);
              console.log(signedTxn);
            }}
          />
          <div className={styles['input-group-addon']}>{chain.symbol}</div>
        </div>
      </div>
      <div style={{ padding: 20 }} />
      <a href={signedTxn} className={styles['flex-end']}>
        <button
          className={styles.button_white}
          disabled={!toAddress || ether === null}
          onClick={incrementNonce}
        >
          Send
        </button>
      </a>
    </div>
  );
};
