import { Moralis } from '@moralis/all';


export const Core1 = () => {

      const removeModule = (module: string) => {
        if(module === 'Evm')
          Moralis.Core.modules.remove('evm')
        if(module === 'Server')
          Moralis.Core.modules.remove('server')
        const list = Moralis.Core.modules.list()
        if(module === 'EmvApi')
          Moralis.Core.modules.remove('emvApi')
        console.log("after removing:",typeof(list))
      }

  return (
    <div>
      <h2>Core</h2>

    <button onClick= {() => removeModule('Evm')}>Remove evm module</button>
    <button onClick= {() => removeModule('EvmApi')}>Remove evmApi module</button>
    <button onClick= {() => removeModule('Server')}>Remove server module</button>

    </div>
  );
};
