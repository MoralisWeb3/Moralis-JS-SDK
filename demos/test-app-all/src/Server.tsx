import { Moralis } from 'moralis';
import { AuthMethod } from '@moralisweb3/server/lib/AuthMethods/types';

export const Server = () => {
  return (
    <div>
      <h2>Server</h2>
      <button onClick={() => Moralis.Server.authenticate(AuthMethod.EVM, { connector: 'metamask', silent: false })}>
        Authenticate via EVM metamask
      </button>

      <button onClick={() => {}}>Logout</button>

      <button onClick={() => {
        Moralis.Server.fetchIPFS('QmUfpsyqc4hwozotRo4woyi5fJqvfcej5GcFvKiWoY6xr6')
      }}>savefile</button>

      {/* <button onClick={async () => {
        const parts = [
          new Blob(["you construct a file..."], { type: "text/plain" }),
          " Same way as you do with blob",
          new Uint16Array([33]),
        ];
        const data = new File(parts, "fileName.txt");
        const file = new Moralis.Server.File("name.txt", data);
        const saved = await file.saveIPFS();
        console.log(saved)
      }}>File</button> */}
    </div>
  );
};
