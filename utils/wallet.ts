import { payments } from 'bitcoinjs-lib';
import BIP32Factory from 'bip32';
import * as bip39 from 'bip39';
import * as ecc from 'tiny-secp256k1';

// You must wrap a tiny-secp256k1 compatible implementation
const bip32 = BIP32Factory(ecc);

export function generateSeedPhrase(): string {
  // Generate a random mnemonic (BIP39)
  return bip39.generateMnemonic();
}

export interface WalletInfo {
  address: string;
  publicKey: string;
  privateKey: string;
}

export async function getWalletFromSeed(seedPhrase: string) {
  // Validate the seed phrase
  if (!bip39.validateMnemonic(seedPhrase)) {
    throw new Error('Invalid seed phrase');
  }

  // Generate seed from mnemonic
  const seed = await bip39.mnemonicToSeed(seedPhrase);

  // Generate root key from seed (BIP32)
  const root = bip32.fromSeed(seed);

  // Derive the first account (BIP44 standard derivation path for Cyberyen)
  const account = root.derivePath("m/44'/802'/0'/0/0");

  // Generate legacy P2PKH (Pay-to-PubKey-Hash) address
  const legacyAddress = payments.p2pkh({
    pubkey: account.publicKey,
    network: {
      bech32: 'cy',
      bip32: { public: 0x0188b21e, private: 0x0188ade4 },
      pubKeyHash: 0x1c,
      scriptHash: 0x16,
      wif: 0x9c,
    },
  }).address;

  // Generate native SegWit P2WPKH (Pay-to-Witness-PubKey-Hash) address
  const nativeSegWitAddress = payments.p2wpkh({
    pubkey: account.publicKey,
    network: {
      bech32: 'cy',
      bip32: { public: 0x0188b21e, private: 0x0188ade4 },
      pubKeyHash: 0x1c,
      scriptHash: 0x16,
      wif: 0x9c,
    },
  }).address;

  return {
    legacyAddress,
    nativeSegWitAddress,
    privateKey: account.toWIF(),
    publicKey: account.publicKey.toString('hex'),
  };
}
