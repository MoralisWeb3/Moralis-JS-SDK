/* global document, window, axios*/
const STREAM_API_URL = 'http://localhost:3000/stream';
const HOOK_API_URL = 'http://localhost:3000/hooks';

const elError = document.getElementById('error');
const elResult = document.getElementById('result');
const elBtnAdd = document.getElementById('add-stream');
const elBtnUpdate = document.getElementById('update-stream');
const elBtnGet = document.getElementById('get-stream');
const elBtnDelete = document.getElementById('delete-stream');

const handleApiRequest = async (method, endpoint, data, params) => {
  const result = await axios({
    url: `${STREAM_API_URL}/${endpoint}`,
    method,
    headers: {
      'content-type': 'application/json',
    },
    data,
    params,
  });

  return result.data;
};

const handleEventsRequest = async (method, endpoint, data, params) => {
  const result = await axios({
    url: `${HOOK_API_URL}/${endpoint}`,
    method,
    headers: {
      'content-type': 'application/json',
    },
    data,
    params,
  });

  return result.data;
};

const addStream = async (webhookUrl) => {
  const result = await handleApiRequest('post', 'create', { webhookUrl });
  renderResult(result);
};
const updateStream = async (webhookUrl, id) => {
  const result = await handleApiRequest('patch', `update/${id}`, { webhookUrl });
  renderResult(result);
};
const getStreams = async () => {
  const result = await handleApiRequest('get', 'getAll');
  renderResult(result);
};
const deleteStreams = async (id) => {
  const result = await handleApiRequest('delete', `delete/${id}`);
  renderResult(result);
};

const getEvents = async () => {
  setInterval(async () => {
    const result = await handleEventsRequest('get', `get`);
    document.getElementById('events').innerHTML = JSON.stringify(result, undefined, 4);
  }, 5000);
};

const renderResult = async (result) => {
  elResult.innerHTML = result ? JSON.stringify(result, null, 2) : '';
};

const renderError = async (error) => {
  elError.innerHTML = error ? JSON.stringify(error.message, null, 2) : '';
};

function init() {
  elBtnAdd.addEventListener('click', async () => {
    const url = document.getElementById('url').value;
    addStream(url).catch((error) => renderError(error));
  });
  elBtnUpdate.addEventListener('click', async () => {
    const url = document.getElementById('url').value;
    const id = document.getElementById('id').value;
    updateStream(url, id).catch((error) => renderError(error));
  });
  elBtnGet.addEventListener('click', async () => {
    getStreams().catch((error) => renderError(error));
  });
  elBtnDelete.addEventListener('click', async () => {
    const id = document.getElementById('id').value;
    deleteStreams(id).catch((error) => renderError(error));
  });
}

window.addEventListener('load', () => {
  init();
  getEvents();
});
