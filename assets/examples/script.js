const examplesDiv = document.getElementById('examples');

function appendExample(exampleData) {
  const el = document.createElement('div');
  el.innerHTML = `
<h3>${exampleData.name}</h3>
Source code: <a href="${exampleData.github}" target="_blank">${exampleData.github}</a></br>
<a href="${exampleData.download}">Download</a>
`;
  examplesDiv.append(el);
}

function renderExamples(data) {
  data.examples.forEach(appendExample);
}

function main() {
  fetch('./info.json')
    .then((response) => response.json())
    .then((json) => renderExamples(json));
}

main();
