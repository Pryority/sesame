import { isAddress } from 'ethers';
import { useEffect, useState } from 'react';
import { SignTransactionArgs } from '../utils/helpers';
import { signTransaction } from './../utils/helpers';

export const useSignedTxn = (args: SignTransactionArgs): string => {
  const [signedTxn, setSignedTxn] = useState('');
  useEffect(() => {
    if (
      !isAddress(args.to) ||
      !args.feeData?.['maxPriorityFeePerGas'] ||
      args.value === 0
    ) {
      return;
    }
    signTransaction(args).then(setSignedTxn);
  }, Object.values(args));
  return signedTxn;
};
