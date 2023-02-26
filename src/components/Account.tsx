import styles from '@/styles/Home.module.css';
import Image from 'next/image';
import React from 'react';

interface AccountProps {
  account_details: { avatar: string; name: string };
}

export const Account: React.FunctionComponent<
  React.PropsWithChildren<AccountProps>
> = (props) => {
  const { account_details } = props;
  return (
    <div className={styles.account_header}>
      <Image src={account_details.avatar} width={30} height={30} alt="avatar" />
      <h2>{account_details.name}</h2>
      <div></div>
    </div>
  );
};
