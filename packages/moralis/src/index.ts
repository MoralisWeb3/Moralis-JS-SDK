// Import all Moralis modules
import Server from '@moralisweb3/server';
import EvmApi from '@moralisweb3/evm-api';
import Evm from '@moralisweb3/evm';

// Import all other functions
import Core from '@moralisweb3/core';

// register all Moralis modules to MoralisCore
Core.registerModules([Evm, Server, EvmApi]);

const start = Core.start;

const Moralis = { Core, Server, Evm, EvmApi, start };

export default Moralis;
