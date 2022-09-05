const formatCapitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);
const getTargetMethod = (path) => path[path.length - 1];
const getHookHame = (path, removeFromHookName) => {
  let hookName = `use${path[0]}${formatCapitalize(getTargetMethod(path))}`;
  removeFromHookName.forEach((wordToRemove) => {
    hookName = hookName.replace(wordToRemove, '');
  });
  console.log('hookName: ', hookName);
  return hookName;
};
const getDomainFolderNames = (path) => path.slice(0, -1).join('/');
const getSDKCall = (path) => `Moralis.${path.join('.')}`;
const geAPIEndpoint = (path) => `/moralis/${path.join('/')}`;

const getHookDescription = ({ name }) => `
### \`${name}()\` 

Gets all token balances of a current user or specified address. 

**Options**:
- \`chain\` (optional): The blockchain to get data from. Valid values are listed on the intro page in the Transactions and Balances section. Default value: current chain.
- \`address\` (optional): A user address (i.e. 0x1a2b3x...). If specified, the user attached to the query is ignored and the address will be used instead.
- \`to_block\` (optional): The block number on which the balances should be checked

**Example**
\`\`\`jsx
import { useERC20Balances } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useERC20Balances();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

\`\`\`

**Example return** (Object)
\`\`\`json
{
  "total": 1,
  "page": 0,
  "page_size": 500,
  "result": [
    {
      "token_address": "0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09",
      "name": "Kylin Network",
      "symbol": "KYL",
      "logo": "https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png",
      "thumbnail": "https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c_thumb.png",
      "decimals": "18",
      "balance": "123456789"
    }
  ]
}
\`\`\`
`;

module.exports = {
  getHookHame,
  getDomainFolderNames,
  getTargetMethod,
  getSDKCall,
  formatCapitalize,
  geAPIEndpoint,
  getHookDescription,
};
