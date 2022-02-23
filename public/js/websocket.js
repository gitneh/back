const socket = io();
const list = document.querySelector('#product-list')

socket.on('product', product => {
  console.log(product)
  const liElement = document.createElement('li')
  liElement.innerHTML = product.name
  liElement.classList.add('animate__animated')
  liElement.classList.add('animate__shakeX')
  list.appendChild(liElement)
})

const button = document.getElementById('button');

button.addEventListener('click', (e) => {
  e.preventDefault();
  console.log("click")
  socket.emit('more', null)
})