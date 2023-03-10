//Varaibles
const cartContainer = document.getElementById('cart-container');
const featured = document.getElementById('featured__container');
const newContainer = document.querySelector('.new__container');
const productContainer = document.querySelector('#products-container');

let articulosCarrito = [];


const cargarEventListeners = () => {
    featured.addEventListener('click', agregarProducto)
    newContainer.addEventListener('click',agregarProducto);
    productContainer.addEventListener('click',agregarProducto);


    //Elimina productos del carrito
    cartContainer.addEventListener('click', eliminarProducto);

}

const agregarProducto = (e) => {
    e.preventDefault();
    if(e.target.classList.contains('button')){
        const productoSeleccionado = e.target.parentElement;
        leerDatosProducto(productoSeleccionado);

        // Libreria Sweet Alert
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'You add an Item',
            showConfirmButton: false,
            timer: 1500,
            width:'25em',
            iconColor:"#fff",
            background: "hsl(31,100%,70%)",
            color:'#fff'
          })
    }

}

//Eliminar productos del carrito
const eliminarProducto = (e) => {
    if(e.target.classList.contains('delete')){
        const productoId = e.target.getAttribute('data-id');

        //Eliminar del arreglo de articulosCarrito
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId )

        carritoHTML();
    }
    totalesCarrito(articulosCarrito);
    guardarProducto(articulosCarrito);
};

// Lee el contenido del HTML al que le dimos click y extrae la informacion del producto
const leerDatosProducto = (producto) => {
    // console.log(producto)

    //Crear un objeto con las caracteristicas del producto
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.price').textContent,
        id: producto.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito 
    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
    if(existe){
        //Actualizamos la cantidad
        const producto = articulosCarrito.map(producto => {
            if(producto.id === infoProducto.id){
                producto.cantidad++;
                return producto; //Retorna el objeto actualizado
            }else{
                return producto; //Retorna los objetos que no son duplicados
            }
        });

        articulosCarrito = [...producto];
    }else{
        //Agregamos elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoProducto];
    }   

    // console.log(articulosCarrito);

    carritoHTML();
    
   
    
    guardarProducto(articulosCarrito);

    
}

// Muestra el Carrito de compras en HTML
const carritoHTML = () => {

    // Limpiar el HTML
    limpiarHTML();

    articulosCarrito.forEach(producto => {
        const {imagen, titulo, precio,id,cantidad} = producto;
        const article = document.createElement('article');
        article.classList.add('cart__card');
        article.innerHTML = `
            <div class="cart__box">
                <img src="${imagen}" alt="" class="cart__img">
            </div>

            <div class="cart__details">
                <h3 class="cart__title">${titulo}</h3>
                <span class="cart__price">${precio}</span>

                <div class="cart__amount">
                    <div class="cart__amount-content">
                        <p>Cantidad:</p>
                        <span class="cart__amount-number">${cantidad}</span>
                    </div>

                        <i class="bx bx-trash-alt cart__amount-trash delete"data-id="${id}"></i> 
                </div>

            </div>
        `
        cartContainer.appendChild(article);
    });

    totalesCarrito(articulosCarrito);

}

const limpiarHTML = () => {
    while(cartContainer.firstChild){
        cartContainer.removeChild(cartContainer.firstChild);
    }
}

// Muestra las cantidades y Precios Totales del Carrito de compras

const totalesCarrito = (articulosCarrito) => {
    const totalCantidad = articulosCarrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCompra = articulosCarrito.reduce((acc,item) => acc + (Number(item.precio) * item.cantidad),0);

    totalCarrito(totalCantidad,totalCompra);

    //Cambiando el numero de productos del carrito visible para el usuario
    document.querySelector('.numberProducts').textContent = totalCantidad;
    
};

const totalCarrito = (cantidadTotal, precioTotal) => {
    const cantidad = document.querySelector('.cart__prices-item');
    const precio = document.querySelector('.cart__prices-total');


    cantidad.textContent = `Total Items: ${cantidadTotal}`;
    precio.textContent = `$${precioTotal}`
};

// Guardando y Obteniendo el carrito del LocalStorage

const guardarProducto = (articulosCarrito) => {
    localStorage.setItem('productos', JSON.stringify(articulosCarrito))
};

const obtenerProductosStorage = () => {
    const productoStorage = JSON.parse(localStorage.getItem('productos'))
    return productoStorage;
}

const obtenerProductos = () => {
    if(localStorage.getItem('productos')){
        articulosCarrito = obtenerProductosStorage();
        carritoHTML(articulosCarrito);
    }
}

obtenerProductos();
cargarEventListeners();


/*  ========= FRASES API =========  */

const quote = document.querySelector('.story__description');
let apiQuotes = [];

//Show new Quote
function newQuote(){
    //Escoger una frase alazar del array apiQuotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    return quote.text;
}

//Obtener frases de la API
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json()
        // console.log(apiQuotes[1].text)
        quote.textContent = newQuote();
        
    }catch(error){
        //Catch Error 
    }
}

getQuotes();


/* ========= VALIDAR EMAIL ========= */
//Seleccionar el input
const emailInput = document.getElementById('email');
const btnFormulario = document.querySelector('.newsletter__subscribe button[type="submit"]');
const formulario = document.querySelector('.newsletter__subscribe');
//Asignar evento
emailInput.addEventListener('blur', validar);

function validar(e){
    if(e.target.value.trim() === ""){
        mostrarAlerta('error','Oopps..','You didnt write anything');
        return;
    }

    if(!validarEmail(e.target.value)){
        mostrarAlerta('error','Oopps..','The email is Wrong');
        return;
    }
    //Comprobar el objeto emial
    comprobarEmail();

    btnFormulario.addEventListener('click', (e) => {
    e.preventDefault()
    //Mostrar alerta al mandar el correo
    mostrarAlerta('success','Congratulations','We will send you our NewsLetter')
    //Resetear el Formulario
    formulario.reset();
});
    
}



function mostrarAlerta(icon,title,text){
    //Generar alerta en HTML
    Swal.fire({
        icon: icon,
        title: title,
        text: text
      })

}

function validarEmail(email){
    //Expresion regular
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
    const resultado = regex.test(email);
    return resultado;
};

function comprobarEmail(){
      btnFormulario.disabled = false;
      btnFormulario.classList.remove('button-form');  

}
