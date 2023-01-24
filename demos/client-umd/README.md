# Client (UMD)

This is a simple client-side implementation using the UMD build of the library, which is imported via a `<script>` tag.

To get started:
- Replace the value of `MORALIS_API_KEY` to your own API key
- Run index.html in your browser using localhost (Live Server extension for VSCode, or any alternative, is recommended)

Notes:
- Make sure `ethers` is imported when you use any EVM functionality
- Make sure `solana/web3.js` is imported when you use any Solana functionality
- **When you go to production, make sure to fix the imported script from moralis to a specific version (via `@2.1.0` for example). This prevents unexpected updates when Moralis releases a new version**