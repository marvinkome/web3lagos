import React from "react";
import type { NextPage } from "next";
import * as ethers from "ethers";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { Button, Container, Heading, Stack } from "@chakra-ui/react";
import { useConnectWallet, useEagerConnect, useInactiveListener } from "lib/wallet";
import { useMint } from "lib/mint";

function getLibrary(provider: any): ethers.providers.Web3Provider {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const Mint = () => {
  const { account } = useWeb3React();
  const { connect, pending } = useConnectWallet();
  const { loading, inputProps, openFilePicker } = useMint();

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager);

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) {
    return null;
  }

  return (
    <Container h="100vh" maxW="container.sm">
      <Stack h="100%" textAlign="center" align="center" justify="center" spacing={10}>
        <Heading
          fontWeight="900"
          bgGradient="linear-gradient(90.54deg, rgba(255, 204, 250, 0.98) -16.77%, #EBFDFF 43.34%, #B499FF 110.18%)"
          bgClip="text"
        >
          Web3 Lagos - Mint
        </Heading>

        {account ? (
          <Button isLoading={loading} onClick={openFilePicker}>
            Let it rain
          </Button>
        ) : (
          <Button isLoading={pending} onClick={connect}>
            Connect account
          </Button>
        )}

        <input {...inputProps} />
      </Stack>
    </Container>
  );
};

const PageWrapper: NextPage = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Mint />
    </Web3ReactProvider>
  );
};

export default PageWrapper;
