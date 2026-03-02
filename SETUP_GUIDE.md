# MEV Bot - Environment Configuration Guide

## Overview

The MEV bot now includes automatic environment validation on startup. If your wallet private key is not configured, you'll be prompted to enter it before the application loads.

## How It Works

1. **On Application Start**: The app checks if `REACT_APP_WALLET_PRIVATEKEY` is configured
2. **If Missing**: A modal dialog appears prompting you to enter your wallet private key
3. **Validation**: The private key is validated as a 64-character hex string
4. **Storage**: The key is stored in browser localStorage for the current session

## Setting Up Your Wallet

### Option 1: Configure via .env File (Recommended)

1. Open the `.env` file in your project root
2. Find this line: `REACT_APP_WALLET_PRIVATEKEY=""`
3. Add your Ethereum wallet private key:
   ```env
   REACT_APP_WALLET_PRIVATEKEY="your_private_key_here"
   ```
   
4. **Important**: Your private key should be:
   - 64 hexadecimal characters
   - Can optionally start with `0x`
   - Example: `REACT_APP_WALLET_PRIVATEKEY="1a2b3c4d5e6f7g8h9i0j..."`

5. Save the file
6. If the app is running, you need to stop and restart it (press Ctrl+C and run `npm start` again)

### Option 2: Enter via Startup Modal

If the `.env` file is not configured:

1. Start the application with `npm start`
2. A modal dialog will appear titled "⚙️ Configuration Required"
3. Enter your private key in the text field
4. Click "Continue"
5. The key will be saved temporarily in your browser

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `REACT_APP_INFURA_ID` | Yes | Infura API key for Ethereum node access |
| `REACT_APP_WALLET_PRIVATEKEY` | Yes | Your Ethereum wallet's private key |

## Security Considerations

⚠️ **Important Security Notices:**

1. **Never commit private keys to version control** - The `.env` file should not be uploaded to Git
2. **Local Use Only** - Only use this app on secure, trusted machines
3. **Private Key Safety** - Your private key is stored locally in your browser and is never sent to any external server
4. **Check .gitignore** - Ensure `.env` is in your `.gitignore` file to prevent accidental commits

### .gitignore Configuration

Make sure your `.gitignore` file includes:
```
.env
.env.local
.env.*.local
```

## Files Modified

The following files were added/modified to support environment validation:

### New Files Created:
- `src/utils/envValidator.js` - Utility functions for checking environment configuration
- `src/components/EnvSetupModal/index.js` - Modal component for prompting user input
- `src/components/EnvSetupModal/envSetupModal.css` - Styling for the modal

### Files Updated:
- `src/App.js` - Added environment check and modal integration
- `.env` - Updated variable naming to follow React conventions
- `env.example` - Updated with proper formatting and comments

## Troubleshooting

### "Invalid private key format" Error

Your private key must be exactly 64 hexadecimal characters:
- ✅ Correct: `1a2b3c4d5e6f7g8h...` (64 chars)
- ✅ Correct: `0x1a2b3c4d5e6f7g8h...` (with 0x prefix)
- ❌ Wrong: `1a2b3c` (too short)

### Modal Keeps Appearing

1. Check that your private key was saved correctly
2. If using .env file, ensure you've restarted the dev server
3. Clear browser localStorage if issues persist (Settings → Clear browsing data)

### Private Key Not Being Detected

1. Verify the `.env` file has the correct variable name: `REACT_APP_WALLET_PRIVATEKEY`
2. Make sure there are no extra spaces: `REACT_APP_WALLET_PRIVATEKEY="key_here"`
3. Restart the development server after editing `.env`

## Getting Your Private Key

⚠️ **Be extremely careful when handling private keys!**

- **MetaMask**: Account Details → Show Private Key
- **Hardware Wallet**: Use your wallet's export function
- **Never share** your private key with anyone or paste it in untrusted tools

## Next Steps

1. Configure your `REACT_APP_WALLET_PRIVATEKEY` in the `.env` file
2. Ensure `REACT_APP_INFURA_ID` is also set (for Ethereum node access)
3. Run `npm start` to launch the bot
4. The validation modal will not appear if both variables are configured

For more information, see [React Environment Variables Documentation](https://create-react-app.dev/docs/adding-custom-environment-variables/).
