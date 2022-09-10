import { ethers } from "ethers";
import { FILENAME_POS } from "./lib/constants";
import { signNFTPipeline, verifyNFTPipeline } from "./lib/pipelines";
import readlineSync from 'readline-sync'
import { showUsage } from "./lib/usage";

run().catch((e) => console.error(e));


async function run() {
  if (process.argv?.length > 2) {
    if (process.argv[2] === "verify") {
      const filename = process.argv[3];
      console.log(`Verifying: ${filename}\n`);
      await verifyNFTPipeline(filename);

      ///
    } else if (process.argv[2].endsWith(".png")) {
      const mnemonic = readlineSync.question("Mnemonic phrase (signer): ")
      const wallet = ethers.Wallet.fromMnemonic(mnemonic);
      const filename = process.argv[FILENAME_POS];
      console.log(`Signing: ${filename}`);
      await signNFTPipeline(wallet, filename);
    } else {
      showUsage();
    }
  } else {
    showUsage();
  }
}