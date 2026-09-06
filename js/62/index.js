let counter = 1;
document.querySelector('#main').addEventListener('click', createButton);

function createButton() {
  const myNewButton = document.createElement('button');
  myNewButton.textContent = ++counter;
  myNewButton.addEventListener('click', createButton);
  document.body.appendChild(myNewButton);
}