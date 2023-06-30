import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { bsc } from 'wagmi/chains';

import { usdtAbi, usdtToken } from 'constants/wallet';

export const useUsdtTransfer = ({ recipientAddress, amount }) => {
  const { config } = usePrepareContractWrite({
    abi: usdtAbi,
    address: usdtToken,
    chainId: bsc.id,
    functionName: 'transfer(address,uint256)',
    args: [recipientAddress, amount],
    // onError(error) {
    //   console.log({ error })
    //   if (
    //     error.reason ===
    //     "execution reverted: BEP20: transfer amount exceeds balance"
    //   ) {
    //     onAmountExceedsBalance()
    //   }
    // },
  });

  const data = useContractWrite(config);
  return [data, config];
};
