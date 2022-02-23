const fs = require ('fs');

class Messages{

    constructor (historialConversacion){
        this.historialConversacion = historialConversacion;
    }

    async nuevoComentario(nuevoMensaje){
        const mensajeNuevo = await fs.promises.readFile(`./${this.historialConversacion}`,`utf8`);
        let mensajesTotales = [];
        const listaMensajes = JSON.parse(mensajeNuevo);

        listaMensajes.push(nuevoMensaje);
        mensajesTotales = listaMensajes;
        const edicionMensaje = JSON.stringify(mensajesTotales, null , 2);
        await fs.promises.writeFile(`./${this.historialConversacion}`, edicionMensaje);
    } 
    async getMessagess (){
        const mensajeNuevo = await fs.promises.readFile(`./${this.historialConversacion}`,'utf-8');
        const mensajesTotales = JSON.parse(mensajeNuevo);
        return mensajesTotales;
    };
}
    
module.exports = Messages;