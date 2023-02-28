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

let garage = []

const cargarGarage = async()=>{
    const respuesta = await fetch("dataBaseProductos.json")
    const datos = await respuesta.json()
    for(let producto of datos){
        let nvoProducto = new Articulo(producto.id, producto.producto, producto.modelo, producto.descripcion, producto.precio, producto.imagen)
        garage.push(nvoProducto)
    }
    localStorage.setItem("garage", JSON.stringify(garage))
}

if(localStorage.getItem("garage")){
    for(let producto of JSON.parse(localStorage.getItem("garage"))){
        let prodStorage = new Articulo(producto.id, producto.producto, producto.modelo, producto.descripcion, producto.precio, producto.imagen)
        garage.push(prodStorage)
    }

}else{
    console.log("Se configura el storage por primera vez")
    cargarGarage()
}