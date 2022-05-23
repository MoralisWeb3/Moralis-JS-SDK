// Import all Moralis modules
import Server from '@moralis/server';
import EvmApi from '@moralis/evm-api';
import Evm from '@moralis/evm';

// Import all other functions
import Core from '@moralis/core';

// register all Moralis modules to MoralisCore
Core.registerModules([Evm, Server, EvmApi]);

const start = Core.start;

const Moralis = { Core, Server, Evm, EvmApi, start };

export { Moralis };
export default Moralis;
