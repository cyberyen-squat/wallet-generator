import { useState, useEffect } from 'react';
import { generateSeedPhrase, getWalletFromSeed } from '../utils/wallet';

export default function Home() {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [wallet, setWallet] = useState<any>(null);
  const [cooldown, setCooldown] = useState<number | null>(null); // Cooldown timer (in seconds)

  // Countdown effect for the cooldown
  useEffect(() => {
    if (cooldown !== null && cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer); // Clear timeout on component unmount
    }
  }, [cooldown]);

  const handleGenerateWallet = async () => {
    if (cooldown !== null && cooldown > 0) return; // Prevent generation during cooldown

    // Generate seed phrase and wallet
    const seed = generateSeedPhrase();
    setSeedPhrase(seed);
    const walletData = await getWalletFromSeed(seed);
    setWallet(walletData);

    // Start the 60-second cooldown
    setCooldown(60);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="bg-grey-dark p-10 rounded-lg shadow-lg">
	<h1 className="text-3xl font-bold mb-5">Cyberyen Wallet Generator</h1>

	{/* Disable button if cooldown is active */}
	<button
	  className={`px-5 py-2 rounded-lg mb-5 font-semibold ${
	    cooldown === null || cooldown === 0
	      ? 'bg-white text-black' // Active state
	      : 'bg-grey text-grey-light cursor-not-allowed' // Cooldown state
	  }`}
	  onClick={handleGenerateWallet}
	  disabled={cooldown !== null && cooldown > 0} // Disable during cooldown
	>
	  {cooldown !== null && cooldown > 0 ? `Wait ${cooldown} seconds` : 'Generate Wallet'}
	</button>

	{seedPhrase && (
	  <div className="text-grey-light">
	    <h2 className="text-xl font-bold mb-3">Seed Phrase</h2>
	    <p className="mb-5">{seedPhrase}</p>
	  </div>
	)}

	{wallet && (
	  <div className="text-grey-light">
	    <h2 className="text-xl font-bold mb-3">Wallet Details</h2>
	    <p>
	      <strong>Legacy Address:</strong> {wallet.legacyAddress}
	    </p>
	    <p>
	      <strong>Native SegWit Address:</strong> {wallet.nativeSegWitAddress}
	    </p>
	    <p>
	      <strong>Private Key:</strong> {wallet.privateKey}
	    </p>
	    <p>
	      <strong>Public Key:</strong> {wallet.publicKey}
	    </p>
	  </div>
	)}
      </div>
    </div>
  );
}
