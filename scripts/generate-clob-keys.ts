import { ClobClient } from "@polymarket/clob-client-v2";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

async function main() {
  const privateKey = process.env.WALLET_PRIVATE_KEY;
  if (!privateKey) {
    console.error("❌ WALLET_PRIVATE_KEY is missing from .env.local");
    console.error("Please add it as: WALLET_PRIVATE_KEY=0xYourPrivateKey");
    process.exit(1);
  }

  console.log("Deriving Polymarket CLOB credentials from your private key...\n");

  const formattedKey = privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`;
  const account = privateKeyToAccount(formattedKey as `0x${string}`);
  const signer = createWalletClient({
    account,
    transport: http("https://polygon-rpc.com"),
  });

  // Create a temporary client just to derive the API keys
  const tempClient = new ClobClient({
    host: "https://clob.polymarket.com",
    chain: 137, // Polygon Mainnet
    signer,
  });

  try {
    // This will prompt a signature internally and derive the L2 credentials
    const creds = await tempClient.createOrDeriveApiKey();

    console.log("✅ Successfully derived API Credentials!\n");
    console.log("Add the following to your .env.local file:\n");
    console.log("──────────────────────────────────────────────");
    console.log(`POLYMARKET_API_KEY=${creds.key}`);
    console.log(`POLYMARKET_API_SECRET=${creds.secret}`);
    console.log(`POLYMARKET_PASSPHRASE=${creds.passphrase}`);
    console.log("──────────────────────────────────────────────\n");
    console.log("Keep these secret! Do not commit them to version control.");
  } catch (error) {
    console.error("❌ Failed to derive credentials:", error);
  }
}

main();
