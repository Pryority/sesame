import styles from '@/styles/Home.module.css';
import React from 'react';
import { ExitXButton } from './misc/ExitXButton';
import { HamburgerMenuButton } from './misc/HamburgerMenuButton';
import { SesameLogo } from './misc/SesameLogo';
import { SesameTitle } from './misc/SesameTitle';

export type AccountDetails = {
  avatar: string;
  name: string;
  balance?: number;
};

interface AccountProps {
  account_details: AccountDetails;
  setShowMenu: (show: boolean) => void;
  showMenu: boolean;
}

export const Account: React.FunctionComponent<
  React.PropsWithChildren<AccountProps>
> = (props) => {
  const { setShowMenu, showMenu } = props;

  return (
    <div>
      <div className={styles.account_header}>
        <button
          className={styles.button_transparent}
          style={{
            padding: 10,
          }}
          onClick={() => (showMenu ? setShowMenu(false) : setShowMenu(true))}
        >
          {showMenu ? <ExitXButton /> : <HamburgerMenuButton />}
        </button>
        <div style={{ marginTop: 10 }}>{SesameLogo()}</div>
        <div>{SesameTitle()}</div>
      </div>
    </div>
  );
};
