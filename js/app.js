let pagina=1; //esta linea de codigo nos dice que nos vamos a encontrar en la pagina 1 es decir la incial
const btnAnterior= document.getElementById('btnAnterior');  //creamos unas constantes que nos ayudaran a los botones uno de anterior y siguiente
const btnSiguiente= document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {  //al evento de siguiente tendra un evento que al darle clic nos ejecute una funcion flecha que nos cambie de pagina
   if(pagina <1000){ //decimos que si pagina es menor a mil entonces se ejecuta el codigo y llegando al 1000 no cargara mas
   pagina +=1; // a la pagina que tenemos le sume una unidad
   caragarpeliculas(); //ejecutamos la funcion de caragarpeliculas
   }
});

btnAnterior.addEventListener('click', () => {  //al evento de anterior tendra un evento que al darle clic nos ejecute una funcion flecha que nos retroseda de pagina
   if(pagina >1){ //decimos que si pagina es mayor a uno
   pagina -=1;  //decimos que a la pagina que tenemos le restaremos una unidad
   caragarpeliculas(); //y volvemos a cargar peliculas
   }
});

const caragarpeliculas = async () => {  //creamos una funcion de tipo flecha, ademas para utilizar await, pondremos async dando a enteder que es una funcion asincrona
   try{  //utilizamos try catch por que estamos con funciones asyncronas y decimos que dentro de try ejecute la funcion de respuesta 
   const respuesta= await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7b2391b2c5f87aeaaf419e73e298fbde&languague=es=MX&page=${pagina}`); //creamos una funcion y dentro de esta diremos que nos vamos a conectar a la pagina con un fetch dentro de este la url de la pagina
   //con esta direccion diremos que queremos acceder a la pagiga de movie en la seccion de popular....   utilizamos await cuando decimos que cuando acabe la respuesta siga a la sigueinte linea
   console.log(respuesta); //mandamos a llamar la funcion creada antes

   if(respuesta.status===200) {  //con el if vamos a comprobar que si nuestro status de la consola sea 200 que es el staus correcto entonces 
   const datos=await respuesta.json(); //creamos una variable llamada datos esta la utilizaremos mas que nada para guardar la respuesta ya que esta es una funcion asincrona
       let peliculas = ''; //agregamos una variable de nombre peliculas con cadena vacia
         datos.results.forEach(pelicula => { //para que nosotros accedamos a los datos de cada pelicula, esta tambien con funcion flecha
   //vamos acceder a la variable peliculas y detro de esta haremos un codigo html
   //esta forma es una mas cortas ya que decimos que a peliculas le sumemos y sea igual a este codigo html 
   //en este tenemos contenedor, con una clase
   //despues tenemosuna imagen con una clase y detro de esta seria con poster_path donde este seria la direccion de la imagen que tiene la pelicula
   //y en el src pondremos el vinculo donde accederemos a peliculas con el posther_path y el h3 que sera el titulo lo pondremos con la clase titulo
            peliculas += ` 
         <div class="pelicula">
         <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
         <h3 class="titulo">${pelicula.title}</h3>
         </div>
         `;
       });  

       document.getElementById('contenedor').innerHTML= peliculas; //con esta fraccion de codigo diremos que vamos a acceder al contenedor que en este caso sera nuestro ID, solamente vamos acceder a el elemento solo el que esta en el HTML
       //donde este va a seer igual a la variable peliculas 
   }else if(respuesta.status === 401){  //con el else if comprobaremos el error 401 y si este se muestra, entonces nos mandara un mensaje de que la llave no esta correcta
      console.log("la llave no es la correcta verifica la URL"); //este mensaje nos mandará si el error 401 se hace presente
   }else if(respuesta.status===404){  //comprobaremos el error 404 y si este es correcto entonces
      console.log("la pelicula no existe"); //mostraremos un mensaje de que la direccion no es correcta y por lo tanto la pelicula no existe
   }else{  //si si no nos aparecen estos errores 
      console.log("error, motivo desconocido"); //mostaremos un mensaje de que no sabemos el motivo del error
   }
   
}catch(error) {  // si en dado caso tenemos un error lo atraparemos esto con la catch
   console.log(error); //y accedemos a el con un console.log
}
}
caragarpeliculas();  //se ejecuta la funcion que creamos