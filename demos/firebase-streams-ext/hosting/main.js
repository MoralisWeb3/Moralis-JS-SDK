function listenNewDocuments(db, collectionName, handler) {
  let minUpdatedAt = firebase.firestore.Timestamp.now();
  let cancel;

  function listen() {
    cancel = db
      .collection(collectionName)
      .where('updatedAt', '>', minUpdatedAt)
      .orderBy('updatedAt', 'desc')
      .onSnapshot(handle);
  }

  async function handle(change) {
    if (change.size > 0) {
      minUpdatedAt = change.docs[0].data().updatedAt;

      handler(change);
      await cancel();
      listen();
    }
  }

  listen();
}

function dictToTable(dict) {
  if (dict.length === 0) {
    const noData = document.createElement('div');
    noData.innerText = 'No data';
    return noData;
  }

  const container = document.createElement('div');
  container.className = 'table';
  const table = document.createElement('table');
  const keys = Object.keys(dict[0]);
  const header = document.createElement('tr');
  for (const key of keys) {
    const th = document.createElement('th');
    th.innerText = key;
    header.appendChild(th);
  }
  table.appendChild(header);

  for (const item of dict) {
    const tr = document.createElement('tr');
    for (const key of keys) {
      const td = document.createElement('td');
      td.innerText = item[key];
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  container.appendChild(table);
  return container;
}

async function pageLoaded() {
  const transactions = document.getElementById('transactions');
  const erc20Transfers = document.getElementById('erc20Transfers');

  const functions = firebase.functions();
  const db = firebase.firestore();

  if (location.hostname === 'localhost') {
    functions.useFunctionsEmulator('http://localhost:5001');
    db.useEmulator('localhost', 8080);
  }

  listenNewDocuments(db, 'moralis/txs/Transaction', (change) => {
    transactions.innerHTML = '';
    transactions.appendChild(dictToTable(change.docs.map((d) => d.data())));
  });

  listenNewDocuments(db, 'moralis/events/Erc20Transfer', (change) => {
    erc20Transfers.innerHTML = '';
    erc20Transfers.appendChild(dictToTable(change.docs.map((d) => d.data())));
  });
}

window.addEventListener('load', pageLoaded);
