const express = require('express');

const {Server: SocketServer} = require('socket.io');
const {Server : HttpServer} = require('http');

// Listado de productos

const Contenedor = require('./models/contenedor');
const productosEnContenedor = new Contenedor('/data/productos.json');

// Fin listado de productos

// Chat

const Messages = require('./models/messages');
const mensajesTotales = new Messages('/data/messages.json');

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use( express.static('public') );

app.set("views", "./views");
app.set('view engine', 'pug');

io.on('connection', async (socket) => {
    socket.on('new-product', async(producto) =>{
        await productosEnContenedor.save(producto);
        const productos = await productosEnContenedor.getAll();
        io.sockets.emit('productos', productos) ;
        console.log(`Un nuevo cliente ha indicado sesion ${socket.id}`)
    });

const messages = await mensajesTotales.getMessagess();
socket.emit('messages', messages);

socket.on('new-message', async data => {
    data.fechayHora = new Date().toLocaleString();
    await mensajesTotales.saveMessages(data);
    const messages = await mensajesTotales.getMessages();
    io.sockets.emit('messages', messages);
});
});
// Fin Chat

app.get('/form', async (req, res) =>{
    res.render('pages/form.pug',{
    })
});

app.post('/productos', async (req, res) =>{
    const newProducto = req.body; 
    console.log(newProducto)
    const idProductoNuevo = await productosEnContenedor.save(newProducto);
    res.redirect('/list-productos');
});

app.get('/list-productos', async (req, res) =>{
    const productos = await productosEnContenedor.getAll()
    res.render('pages/vista_productos.pug',{
        productos : productos,
    })
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`))