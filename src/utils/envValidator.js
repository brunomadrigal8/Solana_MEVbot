/**
 * Validates environment configuration and returns the status
 */
export const validateEnvironment = () => {
  const infraId = process.env.REACT_APP_INFURA_ID;
  const walletKey = process.env.REACT_APP_WALLET_PRIVATEKEY;

  return {
    hasInfuraId: !!infraId && infraId.trim() !== '',
    hasWalletKey: !!walletKey && walletKey.trim() !== '',
    infraId,
  };
};

/**
 * Checks if wallet private key is configured
 */
export const isWalletConfigured = () => {
  const walletKey = process.env.REACT_APP_WALLET_PRIVATEKEY;
  return !!walletKey && walletKey.trim() !== '';
};
