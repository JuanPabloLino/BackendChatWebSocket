const socket = io.connect();

const chatForm = document.getElementById('form');

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const thumbnail = document.getElementById('thumbnail').value;
  
  socket.emit('new-product', {name, price, thumbnail});
});

socket.on('productos', (productos) => {
    
  console.log(productos);
    
  const productList = productos.map((product) => `
  <tr>
    <td>
      ${product.name}
    </td>
    <td>
      ${product.price}
    </td>
    <td>
      <img src="${product.thumbnail}" alt="" width="50" height="50">
    </td>
  </tr>
  `).join(' ');
  console.log(productList)
  const list = document.getElementById('real-time-products');

  list.innerHTML = productList;
})

const form = document.getElementById('chat_form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('username').value;
  const text = document.getElementById('text').value;
  
  socket.emit('new-message', {email, text});
});

socket.on('messages', (messages) => {
  
  const mensajeList = messages.map((message) =>`
        <div>
            <strong style="color:blue">${message.email}</strong> <em style="color:brown">[${message.fechaHora}]</em>:
            <em style="color:green">${message.text}</em> 
        </div>
        `).join(' ');
  const renderMensajes = document.getElementById('lista_mensaje_final');

  renderMensajes.innerHTML = mensajeList;
})