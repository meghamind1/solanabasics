// Import Solana web3 functionalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
  } = require("@solana/web3.js");
  
  // Import user input functionality
  const prompt = require('prompt-sync')();
  
  // Connect to the Devnet
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  
  // Get the wallet balance from a given public key
  const getWalletBalance = async (publicKey) => {
    try {
      // Get balance of the user provided wallet address
      const walletBalance = await connection.getBalance(new PublicKey(publicKey));
      console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
      console.log(err);
    }
  };
  
  const airDropSol = async (publicKey) => {
    try {
      // Request airdrop of 2 SOL to the user provided wallet
      console.log("Airdropping some SOL to the wallet!");
      const fromAirDropSignature = await connection.requestAirdrop(
        new PublicKey(publicKey),
        2 * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
      console.log(err);
    }
  };
  
  // Show the wallet balance before and after airdropping SOL
  const mainFunction = async () => {
    const userPublicKey = prompt("Enter your wallet address: ");
    await getWalletBalance(userPublicKey);
    await airDropSol(userPublicKey);
    await getWalletBalance(userPublicKey);
  };
  
  mainFunction();
