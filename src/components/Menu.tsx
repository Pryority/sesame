import { useWallet } from '@/hooks/use-wallet';
// import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import { BackBtn } from './BackBtn';
import { RevealCard, RevealOptions } from './cards/RevealCard';
import { CopySVG } from './misc/CopySVG';
import { Copy } from './Receive';

interface RevealProps {
  revealViewOption: RevealOptions;
  setRevealViewOption: (option: RevealOptions) => void;
}

export const Reveal: React.FunctionComponent<
  React.PropsWithChildren<RevealProps>
> = (props) => {
  const { revealViewOption, setRevealViewOption } = props;
  const { privateKey } = useWallet();
  console.log({ privateKey, revealViewOption });

  return (
    <>
      <BackBtn title={'Hide'} onBack={() => setRevealViewOption('overview')} />
      <div style={{ height: 15 }} />
      <div className={''}>
        <Copy
          copyText={privateKey}
          copyButtonStyles={`bg-white p-2 justify-center items-center rounded-sm flex`}
        >
          <div
            className={`flex break-all`}
            style={{ width: '100%', alignItems: 'flex-start' }}
          >
            <>
              <div style={{ width: '92%' }}>
                <p style={{ textAlign: 'start' }}>{privateKey}</p>
              </div>
              <div style={{ width: 10 }} />
            </>
            <div style={{ width: 5 }} />
            <CopySVG />
          </div>
        </Copy>
      </div>
    </>
  );
};

interface MenProps {
  setShowMenu: (show: boolean) => void;
}

export const Menu: React.FunctionComponent<
  React.PropsWithChildren<MenProps>
> = (props) => {
  const { setShowMenu } = props;
  const [revealViewOption, setRevealViewOption] =
    useState<RevealOptions>('overview');

  return (
    <div className="p-[10px]">
      {revealViewOption === 'overview' ? (
        <>
          <RevealCard
            revealViewOption={'privateKey'}
            setRevealViewOption={setRevealViewOption}
            title={'Show Private Keys'}
            message={
              'Warning: Never disclose this key. Anyone with your private keys can steal any assets held in your account.'
            }
          />
        </>
      ) : (
        <>
          <Reveal
            revealViewOption={revealViewOption}
            setRevealViewOption={setRevealViewOption}
          />
        </>
      )}
    </div>
  );
};
