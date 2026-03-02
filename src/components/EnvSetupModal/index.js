import React, { useState } from 'react';
import './envSetupModal.css';

const EnvSetupModal = ({ isOpen, onComplete }) => {
  const [walletKey, setWalletKey] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!walletKey.trim()) {
      setError('Wallet private key cannot be empty');
      return;
    }

    // Validate that it looks like a valid hex private key (64 hex characters with optional 0x prefix)
    const cleanKey = walletKey.trim().replace(/^0x/, '');
    if (!/^[a-fA-F0-9]{64}$/.test(cleanKey)) {
      setError('Invalid private key format. Must be 64 hex characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to localStorage as a temporary measure
      localStorage.setItem('TEMP_WALLET_KEY', walletKey.trim());
      onComplete(walletKey.trim());
    } catch (err) {
      setError('Failed to save wallet key: ' + err.message);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="env-setup-overlay">
      <div className="env-setup-modal">
        <div className="env-setup-header">
          <h2>⚙️ Configuration Required</h2>
        </div>

        <div className="env-setup-content">
          <p className="setup-message">
            Please configure your wallet private key. This is required to run the MEV bot.
          </p>

          <div className="setup-instructions">
            <h3>Instructions:</h3>
            <ol>
              <li>Open your <code>.env</code> file in the project root</li>
              <li>Find the line: <code>REACT_APP_WALLET_PRIVATEKEY=""</code></li>
              <li>Add your Ethereum wallet private key (provide it below or update the .env file)</li>
              <li>Save the file and refresh the page</li>
            </ol>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="walletKey">Wallet Private Key:</label>
              <input
                id="walletKey"
                type="password"
                placeholder="0x... or paste your private key"
                value={walletKey}
                onChange={(e) => {
                  setWalletKey(e.target.value);
                  setError('');
                }}
                disabled={isSubmitting}
              />
              <small className="help-text">
                Your private key is stored locally and never sent to any server.
              </small>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting || !walletKey.trim()}
            >
              {isSubmitting ? 'Saving...' : 'Continue'}
            </button>
          </form>

          <p className="security-note">
            ⚠️ <strong>Security Warning:</strong> Never share your private key. Only run this app on a secure, trusted machine.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnvSetupModal;
