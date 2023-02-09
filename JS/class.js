class Articulo{
    constructor(id, producto, modelo, descripcion, precio, imagen){
        this.id = id,
        this.producto = producto,
        this.modelo = modelo,
        this.descripcion = descripcion,
        this.precio = precio,
        this.imagen = imagen
    }
    mostrarInfoProducto(){
        console.log(`Se creo con el id ${this.id} el producto ${this.producto} ${this.modelo}, y su precio es $${this.precio}`)
    }
}

const producto1 = new Articulo(1, "Caminadora", "Randers ARG490", "Buen estado. Sin mucho uso😂", 75000, "caminadora2.jpg")
const producto2 = new Articulo(2, "XBOX", "One S", "Se vende con 3 juegos, un control, Kinect y trafo", 150000, "combo xbox1.jpg")
const producto3 = new Articulo(3, "Pochoclera", "Yelmo PO3700", "De aire caliente. Un solo uso.", 4000, "pochoclera.jpg")
const producto4 = new Articulo(4, "Cinturones", "Nike", "Pack x3 con hebilla intercambiable", 1000, "Cinturones.jpg")
const producto5 = new Articulo(5, "Juego", "El Cinefilo", "Juego de Maldon. Casi nuevos. Solo una jugada😱.", 4000, "cinefilo.jpg")
const producto6 = new Articulo(6, "Notebook", "Compaq", "14in 4GB RAM 256GB SSD", 70000, "notebook.jpg")

let garage = []
if(localStorage.getItem("garage")){
    // garage = JSON.parse(localStorage.getItem("garage"))
    for(let producto of JSON.parse(localStorage.getItem("garage"))){
        let storageProducto = new Articulo(producto.id, producto.producto, producto.modelo, producto.descripcion, producto.precio, producto.imagen)
        // console.log(storageProducto)
        garage.push(storageProducto)
    }
}else{
    // console.log("Seteamos por primera vez. Entra solo en la primera vez que se ejecuta")
    garage.push(producto1, producto2, producto3, producto4, producto5, producto6)
    localStorage.setItem("garage", JSON.stringify(garage))
}
// console.log(garage)