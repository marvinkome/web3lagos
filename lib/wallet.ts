import React from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [137, 80001],
});

async function switchNetwork() {
  const { ethereum } = global as any;
  if (!ethereum) {
    console.log("MetaMask extension not available");
    return;
  }

  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${Number(137).toString(16)}` }],
    });
  } catch (error: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    alert("Please add the network to metamask");
  }
}

export function useConnectWallet() {
  const { activate } = useWeb3React();
  const [pending, setPending] = React.useState(false);

  const connect = async () => {
    setPending(true);

    try {
      await activate(injected, undefined, true);

      console.log(`[ConnectModal] Account activated`, injected);
    } catch (error) {
      if (error instanceof UnsupportedChainIdError) {
        switchNetwork()
          .then(() => {
            activate(injected, undefined, true);
          })
          .catch((error) => {
            console.warn("[ConnectModal] Error activating account", error);
          });
      } else {
        console.warn("[ConnectModal] Error activating account", error);
      }
    } finally {
      setPending(false);
    }
  };

  return { pending, connect };
}
