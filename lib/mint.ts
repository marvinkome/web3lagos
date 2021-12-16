import _uniq from "lodash.uniq";
import Papa from "papaparse";
import nftABI from "abi/Web3Lagos.json";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useWeb3React } from "@web3-react/core";
import { utils, providers, constants, Contract } from "ethers";
import { useToast } from "@chakra-ui/toast";

const nftAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDR || "";

function PapaParse(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: function (results: any) {
        resolve(results);
      },
      error(err, file) {
        reject(err);
      },
    });
  });
}

export function useMint() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { library, account } = useWeb3React();
  const { acceptedFiles, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: false,
    accept: ".csv",
  });

  useEffect(() => {
    if (!acceptedFiles || acceptedFiles.length === 0) return;

    // parse file
    const file = acceptedFiles[0];
    setLoading(true);

    const fn = async () => {
      try {
        if (!account) {
          console.error(`No account connected'.`);
        }

        const { data } = await PapaParse(file);

        // mint nft for the addresses
        const addresses = _uniq(
          data
            .map((item: any) => item["Wallet address"])
            .filter((addr: string) => utils.isAddress(addr) && addr !== constants.AddressZero)
        );

        if (!utils.isAddress(nftAddress) || nftAddress === constants.AddressZero) {
          console.error(`Invalid contract address '${nftAddress}'.`);
          return null;
        }

        let provider: providers.Web3Provider | providers.JsonRpcSigner = library.getSigner(account).connectUnchecked();

        const nftContract = new Contract(nftAddress, nftABI, provider);
        const tx = await nftContract.mintMultiple(addresses);
        await tx.wait();

        toast({
          title: "You've made it rain",
          description: "All NFTs have been sent to the addresses provided",
          position: "top-right",
          status: "success",
        });
      } catch (err: any) {
        console.error(err.message);

        toast({
          title: "Error minting NFTs",
          position: "top-right",
          status: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fn();
  }, [account, library, acceptedFiles, toast]);

  return {
    loading,
    openFilePicker: open,
    inputProps: getInputProps(),
  };
}
