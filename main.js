
class Articulo{
    constructor(id, producto, modelo, precio){
        this.id = id,
        this.producto = producto,
        this.modelo = modelo,
        this.precio = precio
    }
    mostrarInfoProducto(){
        console.log(`Se creo con el id ${this.id} el producto ${this.producto} ${this.modelo}, y su precio es $${this.precio}`)
    }
}

const producto1 = new Articulo(1, "Caminadora", "ARG-490", 75000)
const producto2 = new Articulo(2, "XBOX", "One S", 150000)
const producto3 = new Articulo(3, "Pochoclera", "Yelmo PO3700", 4000)
const producto4 = new Articulo(4, "Cinturones", "Nike", 1000)
const producto5 = new Articulo(5, "Zapatillas", "Adidas", 7000)
const producto6 = new Articulo(6, "Notebook", "Compaq", 70000)

const garage = []
    garage.push(producto1, producto2, producto3, producto4, producto5, producto6)
// console.log(garage)


function mostrarCatalogo(array){
    console.log("Este es nuestro catalogo:")
    for(let elemento of array){
    console.log(`ID# ${elemento.id}: ${elemento.producto} ${elemento.modelo}. Precio $${elemento.precio}`)
    }
}


function buscarArticulo(array){
    let articuloIngresado = prompt("Ingrese el articulo que desea buscar:")
    let articuloEncontrado = array.find(
        (art)=>art.producto.toLowerCase() === articuloIngresado.toLowerCase())
    if(articuloEncontrado == undefined){
        console.log(`El producto "${articuloIngresado}" no se encuentra dentro del catalogo`)
    }else{
        console.log(articuloEncontrado)
    }
    console.log(`Resultado de busqueda:
    Se ha encontrado el articulo ${articuloEncontrado.producto} ${articuloEncontrado.modelo} cuyo precio es $${articuloEncontrado.precio} y su ID#${articuloEncontrado.id}`)
}


function ordenAscendente(array){
    const ascedente = [].concat(array)
    ascedente.sort((a,b)=> a.precio - b.precio)
    mostrarCatalogo(ascedente)
}
function ordenDescendiente(array){
    const descendiente = [].concat(array)
    descendiente.sort((a,b)=> b.precio - a.precio)
    mostrarCatalogo(descendiente)
}
function ordenarPorPrecio(array){
    let ordenIngresado= parseInt(prompt(`Ingrese la opcion por la cual desea ordenar los productos:
    1-Ordenar de menor a mayor precio
    2-Ordenar de mayor a menor precio
    `))
    switch(ordenIngresado){
        case 1:
            ordenAscendente(array)
        break
        case 2:
            ordenDescendiente(array)
        break
        default:
            console.log(`La opcion ${ordenIngresado} ingresada NO ES VALIDA`)
        break
    }
}


function agregarProducto(array){
    let productoIngresado = prompt("Ingresar producto")
    let modeloIngresado = prompt("Ingresa modelo del producto")
    let precioIngresado = parseInt(prompt("Ingresar precio del producto"))

    const nuevoProducto = new Articulo(array.length+1, productoIngresado, modeloIngresado, precioIngresado)
    console.log(nuevoProducto)

    array.push(nuevoProducto)
    console.log(array)
}

// do{
//     let idComprar = parseInt(prompt(`Ingrese el ID del producto que desea comprar.
//     (en caso que no quiera comprar mas presione ESC)`))
//     if(idComprar == garage.producto.id){
//         console.log(`Usted ha ingresado el ${idComprar}.`)
//     }
//     else{
//         console.log("Ingrese una opcion valida")
//     }
// }while(idComprar != "ESC")

// const arrayPrecios = garage.map((art => art.precio))
// console.log(arrayPrecios)
// const total = garage.reduce((subtotal, elemento) => subtotal + elemento.precio, 0)
// console.log(total)

function carritoCompra(array){
    mostrarCatalogo(array)
    let idComprar = parseInt(prompt("Ingrese el ID del producto que desea comprar"))
    const idEncontrado = array.find((art)=>art.id === idComprar)
    console.log(`Ha comprado el produto ${idEncontrado.producto} ${idEncontrado.modelo} por un valor de $${idEncontrado.precio}`)
}


function borrarArticulos(array){
    mostrarCatalogo(array)
    let articuloBorrar = parseInt(prompt("Ingrese el ID del articulo que sea borrar"))
    let idsArray = array.map((art)=>art.id) 
    let indexArray = idsArray.indexOf(articuloBorrar)
    array.splice(indexArray,1)
    mostrarCatalogo(array)
}


function desplegarMenu (){
    let salirMenu = false
    do{
        salirMenu = menuOpciones(salirMenu)
    }while(!salirMenu)
}

//////////////////////////////////////////////////////
///////////////////CARRITO DE COMPRAS/////////////////
//////////////////////////////////////////////////////

function menuOpciones(salir){
    let ingresarOpcion = prompt(`Ingrese la opcion deseada:
    1-Mostrar catalogo en pantalla
    2-Busqueda de articulo
    3-Ordenar productos por precio
    4-Comprar articulos por id
    5-Ingresar nuevo articulo (opcion para propietario)
    6-Borrar articulo (opcion para propietario)
    0-Salir del Menu`) 
    switch(ingresarOpcion){
        case "1":
            mostrarCatalogo(garage)
        break
        case "2":
            buscarArticulo(garage)
        break
        case "3":
            ordenarPorPrecio(garage)
        break
        case "4":
            carritoCompra(garage)
        break
        case "5":
            agregarProducto(garage) 
        break
        case "6":
            borrarArticulos(garage)
        break
        case "0":
            alert("Gracias por su compra!")
            salir = true
            return salir
        break
        default:
            console.log("Opcion No Válida")
        break
    }
}
desplegarMenu()



// CALCULADOR COMPRA SUPERMERCADO
    //Detallar producto y precio
    //Calcular el total de la compra
    //Aplicar descuento de 5% en compras superiores a $3.000
    //Aplicar descuento de 10% en compras superiores a $10.000
    //Aplicar descuento de 20% en compreas superiores a $30.000

    // let compraProducto = parseInt(prompt("Ingrese el ID del producto a comprar"))
    // console.log(compraProducto)
    // let total = 0
    // for(let i = 0; i < cantProductos; i++){
    //     let precio = parseInt(prompt(`Ingrese el precio del producto n° ${i}`))
    //     total = total + precio
    //     console.log(`Total acumulado es: ${total}`)
    // }
    // console.log(`El total de la compra es: ${total}`)
    
    
    // function evaluarDescuento(total){  
    //     if(total <= 3000){
    //         alert(`El total de su compra es $${total} y por el monto no tiene descuentos`);
    //     }
    //     else if(total <= 10000){
    //         descuento = total * 0.05;
    //         totalDesc = total - descuento;
    //         alert(`El total de su compra asciende a $${total}, por ende tiene un descuento del 5% cuyo monto es $${descuento}, y por lo tanto el total de su compra es $${totalDesc}`)
    //     }
    //     else if(total <= 30000){
    //         descuento = total * 0.1;
    //         totalDesc = total - descuento;
    //         alert(`El total de su compra asciende a $${total}, por ende tiene un descuento del 10% cuyo monto es $${descuento}, y por lo tanto el total de su compra es $${totalDesc}`)
    //     }
    //     else{
    //         descuento = total * 0.2;
    //         totalDesc = total - descuento;
    //         alert(`El total de su compra asciende a $${total}, por ende tiene un descuento del 20% cuyo monto es $${descuento}, y por lo tanto el total de su compra es $${totalDesc}`)
    //     }
    // }
    
    // function salir(){
    //     respSalida = prompt("Si no desea cargar mas productos escriba ESC para salir")
    // }
    
    // let respSalida
    // do{
    //     ingresarInf()
    //     evaluarDescuento()
    //     salir()
// }while(respSalida.toUpperCase() != "ESC")