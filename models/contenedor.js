const fs = require('fs')
class Contenedor {

    constructor (nombreArchivo){
        this.nombreArchivo = nombreArchivo
    };

        async save(newProduct){
            try{
                const contenido = await fs.promises.readFile(`./${this.nombreArchivo}`,'utf-8')
                let productos = [];

                if (contenido === ''){
                    newProduct.id = 1;
                    productos.push(newProduct);
                } else { 
                    const listaDeProductos = JSON.parse(contenido);
                    newProduct.id = listaDeProductos[listaDeProductos.length -1].id + 1;
                    listaDeProductos.push(newProduct);
                    productos = listaDeProductos
                }
                const productoString = JSON.stringify(productos, null, 2)
                await fs.promises.writeFile(`./${this.nombreArchivo}`, productoString);
                console.log('Se guardó de forma correcta el producto')

                return newProduct.id;

            } catch(error) {
                console.error('Error: ', error)
            }
        };

    async getById(number){
        try{
            const contenido = await fs.promises.readFile(`./${this.nombreArchivo}`,'utf-8');
            const listaDeProductos = JSON.parse(contenido)
            const resultadoId = listaDeProductos.find(numero => numero.id === number)
            if (resultadoId === undefined){
                return null
            } else{
                return resultadoId
            }
        } catch (error){
            console.error('Error',error)
        }
        
    };

    async getAll(){
        try {
            const contenido = await fs.promises.readFile(`./${this.nombreArchivo}`,'utf-8');
            const listaDeProductos = JSON.parse(contenido);
            return listaDeProductos;
        }
        catch (error){
            console.error('Error',error)
        }
    };

    async deleteById(numero){
        try{
            const contenido = await fs.promises.readFile(`./${this.nombreArchivo}`,'utf-8');
            const listaDeProductos = JSON.parse(contenido)

            const resultadoId = listaDeProductos.find(number => number.id === numero)
            if (!resultadoId){
                return null
            } else{
                const index = listaDeProductos.indexOf(resultadoId);
                listaDeProductos.splice(index, 1);
                const listaNew = JSON.stringify(listaDeProductos);    
                await fs.promises.writeFile(`./${this.nombreArchivo}`,listaNew);
                console.log('El producto fue eliminado');
            }
        } catch (error){
            console.error('Error de lectura',error)
        }
    };

    async deleteAll(){
        try {
            const contenido = await fs.promises.writeFile(`./${this.nombreArchivo}`,'');
            console.log('Todos los productos han sido eliminados')
        }
        catch (error){
            console.error('Error',error)
        }
    };

    async update(id, producto){
        try {
            const list = await this.getAll();
            const productoSaved = list.find((item) => item.id === parseInt(id))
            const indexProductoSaved = list.findIndex((item) => item.id === parseInt(id))
    
            if (!productoSaved){
                console.log(`Error de Id: ${id}`)
                return null
            }
    
            const productoUpdate = {
                ...productoSaved,
                ...producto 
            };
            list[indexProductoSaved] = productoUpdate
    
            console.log(list[indexProductoSaved])
    
            const elementString = JSON.stringify(list, null, 2)
            await fs.promises.writeFile(`./${this.nombreArchivo}`, elementString);
    
            return productoUpdate
        }
        catch (error){
            console.error('Error',error)
        }
    };
};

module.exports = Contenedor;

