# Wallet Generator

A minimalist Cyberyen wallet generator built with **Next.js**, **TypeScript**, **Tailwind CSS**, and the [**bitcoinjs-lib**](https://github.com/bitcoinjs/bitcoinjs-lib) library. It allows users to generate Cyberyen wallets, including **Legacy**, **Native SegWit (P2WPKH)** addresses, and randomly generated **Secure Seed Phrase (BIP39)**. A 60-second cooldown is implemented to prevent spam wallet generation.

## Features

- **Cyberyen Wallet Generation**:
  - Supports **Legacy P2PKH** addresses.
  - Supports **Native SegWit (P2WPKH)** addresses.
- **Secure Seed Phrase Generation** using BIP39 mnemonic standard.
- **Cooldown Mechanism**: Prevents wallet spam by disabling the "Generate Wallet" button for 60 seconds after a wallet is generated.

## Getting Started

### Prerequisites

Make sure you have **Node.js** installed. You can download it from [here](https://nodejs.org/).

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/cyberyen-squat/wallet-generator.git
   ```

2. Navigate to the project folder:

   ```bash
   cd wallet-generator
   ```

3. Install the required dependencies:

   ```bash
   pnpm install
   ```

### Running the Application

To run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Using the Application

1. Once the app is running, visit `http://localhost:3000` in your browser.
2. Click the **Generate Wallet** button to generate a new Cyberyen wallet.
3. The application will display:
   - A randomly generated **seed phrase**.
   - A **Legacy P2PKH** address.
   - A **P2WPKH (Native SegWit)** address.
   - The **private key** and **public key** associated with the wallet.
4. After generating a wallet, the button will be disabled for **60 seconds** to prevent spam.

## Cooldown Feature

After generating a wallet, you will need to wait 60 seconds before generating another wallet. The countdown is displayed on the "Generate Wallet" button. Once the cooldown period ends, you can generate another wallet.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs, features, or improvements you would like to see.

---

**Disclaimer**: This project is for educational purposes. It is strongly recommended to use official wallets and services for real transactions.
