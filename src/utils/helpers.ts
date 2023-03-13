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

export const trimSmsLink = (input: string) => {
  const regex = /0x.*/;
  const match = input.match(regex);
  const result = match && match.length > 0 ? match[0] : '';

  if (result) {
    // const prefix = match[1];
    // const result = input.substring(input.indexOf(prefix) + prefix.length);
    console.log(result);
    return result;
  } else {
    console.log(input); // no prefix found, return the original string
  }
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
  console.log('📝 Tx inputs/arguments to be signed:', args);
  const wallet = new Wallet(privateKey);
  console.log('💳 Wallet:', wallet);
  let maxPriorityFeePerGas = feeData['maxPriorityFeePerGas']; // Recommended maxPriorityFeePerGas
  let maxFeePerGas = feeData['maxFeePerGas']; // Recommended maxFeePerGas
  console.log('⛽️ maxPriorityFeePerGas:', maxPriorityFeePerGas);
  console.log('⛽️ maxFeePerGas:', maxFeePerGas);

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
    type: 2, // EIP-1559
    nonce, // e.g. 1, 2, 3 ... n
    to, // 0xAF976G9C9811892B750c27F366cc3EN4e17fBwp7
    maxPriorityFeePerGas, // Recommended maxPriorityFeePerGas 21616972697n
    maxFeePerGas, // Recommended maxFeePerGas 21616972697n
    gasLimit: 21_000, // 21000
    value, // 100000000000000000000 wei
    chainId, // 1
  };

  const signedTxn = await wallet.signTransaction(tx);
  console.log('🔐 Signed Tx:', signedTxn);
  const textBody = encodeURIComponent(`${chainId},${signedTxn}`);
  console.log('📳 Text Body:', textBody);
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
