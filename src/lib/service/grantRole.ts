import { getWalletClient } from "@wagmi/core";
import { encodeFunctionData, type TransactionReceipt } from "viem";
import {
  sendTransaction,
  estimateGas,
  waitForTransactionReceipt,
} from "viem/actions";

import { wagmiConfig } from "@/wagmi";

import { RESOLVER_CONTRACT_SEPOLIA } from "../client/constants";
import { publicClient } from "../wallet/client";

export async function grantRole({
  from,
  role,
  account,
  msgValue,
}: {
  from: `0x${string}`;
  role: `0x${string}`;
  account: `0x${string}`;
  msgValue: bigint;
}): Promise<TransactionReceipt | Error> {
  const walletClient = await getWalletClient(wagmiConfig);
  let gasLimit;

  const data = encodeFunctionData({
    abi: [
      {
        inputs: [
          { internalType: "bytes32", name: "role", type: "bytes32" },
          { internalType: "address", name: "account", type: "address" },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    args: [role, account],
  });

  try {
    gasLimit = estimateGas(publicClient, {
      account: from as `0x${string}`,
      to: RESOLVER_CONTRACT_SEPOLIA as `0x${string}`,
      data: data,
      value: msgValue,
    });
  } catch (error) {
    return Error("Error estimating gas.");
  }

  try {
    const transactionHash = await sendTransaction(walletClient, {
      account: from as `0x${string}`,
      to: RESOLVER_CONTRACT_SEPOLIA as `0x${string}`,
      gasLimit: gasLimit,
      data: data,
      value: msgValue,
      chain: walletClient.chain,
    });

    const transactionReceipt: TransactionReceipt =
      await waitForTransactionReceipt(publicClient, {
        hash: transactionHash,
      });

    return transactionReceipt;
  } catch (error) {
    return Error("Error sending transaction.");
  }
}
