import type { TransactionRequest } from '@ethersproject/abstract-provider';
import { BigNumberish, getNumber, TransactionLike, Wallet } from 'ethers';

export const formatUSD = (dollarValue: number) => {
  return dollarValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatAddress = (address: string, length: number) => {
  const lengthToTrim = length || 4;
  return `${address.substring(0, lengthToTrim)}...${address.substring(
    address.length - lengthToTrim,
    address.length,
  )}`;
};

export interface SignTransactionArgs {
  to: string;
  privateKey: string;
  chainId: number;
  value: BigNumberish;
  nonce: number;
  feeData: Partial<{
    maxPriorityFeePerGas: BigNumberish;
    maxFeePerGas: BigNumberish;
  }>;
}
const phoneNumber = '+14072144335';
type Transaction = TransactionRequest & {
  chainId: number;
};
export const signTransaction = async (
  args: SignTransactionArgs,
): Promise<string> => {
  const { privateKey, chainId, value, to, nonce, feeData } = args;
  console.log('\t', '📝 Arguments:', args);
  const wallet = new Wallet(privateKey);
  console.log('\t', '💳 Wallet:', wallet);
  let maxPriorityFeePerGas = feeData['maxPriorityFeePerGas']; // Recommended maxPriorityFeePerGas
  let maxFeePerGas = feeData['maxFeePerGas']; // Recommended maxFeePerGas
  console.log('\t', '⛽️ maxPriorityFeePerGas:', maxPriorityFeePerGas);
  console.log('\t', '⛽️ maxFeePerGas:', maxFeePerGas);

  if (!maxFeePerGas || !maxPriorityFeePerGas) {
    alert('gas estimate data missing');
    return '';
  }

  if (typeof maxPriorityFeePerGas === 'object') {
    try {
      console.log(maxPriorityFeePerGas);
      maxPriorityFeePerGas = maxPriorityFeePerGas + 10000;
      maxFeePerGas = getNumber(maxFeePerGas) + 10_000;
    } catch {
      console.log({ maxPriorityFeePerGas, maxFeePerGas });
      return '';
    }
  }
  const tx: TransactionLike = {
    nonce,
    to,
    type: 2 /** EIP-1559 */,
    maxPriorityFeePerGas, // Recommended maxPriorityFeePerGas
    maxFeePerGas, // Recommended maxFeePerGas
    gasLimit: 21_000,
    value,
    chainId,
  };

  const signedTxn = await wallet.signTransaction(tx);
  console.log('\t', '🔐 Signed Tx:', signedTxn);
  const textBody = encodeURIComponent(`${chainId},${signedTxn}`);
  console.log('\t', '📳 Text Body:', textBody);
  const isMac: boolean = navigator.userAgent.includes('AppleWebKit');
  const isIphone: boolean = navigator.userAgent.includes('iPhone');
  if (isMac || isIphone) {
    return 'sms://' + phoneNumber + `/&body=${textBody}`;
  }
  if (navigator.userAgent.match(/Android/i)) {
    alert(`${navigator.userAgent} not supported`);
    return '';
  }
  return '';
};
