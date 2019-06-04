var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

// Variable para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de colores.
var colorPersonalizado = document.getElementById('color-personalizado');

//Selecciono elementos del DOM
var paleta = document.getElementById("paleta");
var grilla = document.getElementById("grilla-pixeles");
var color = document.getElementById('indicador-de-color');//variable que tiene el color al hacer click en la paleta
var estadoDelMouse;
var pixeles = grilla.childNodes;//guardo todos los divs (pixeles) de la grilla en una variable


// Genera paleta de colores en pantalla
function paletaDeColores()
{
  for (let i = 0; i < nombreColores.length; i++) 
  {
    var div = document.createElement("div");
    div.style.backgroundColor = nombreColores[i];
    div.className = "color-paleta";
    paleta.appendChild(div);
  }  
}

// Creo la grilla de pixeles
function grillaDePixeles()
{
  for (let i = 0; i < 1749; i++) //da 1749 (33*53)
  {
    var pixel = document.createElement("div");
    grilla.appendChild(pixel);
  }  
}

// Selecciono un color de la paleta y lo muestro en el indicador de color
function indicadorDeColor()
{
  paleta.addEventListener("click", modificarColorIndicador);
}

function modificarColorIndicador(e) //utilizo event target
{ 
  color.style.backgroundColor = e.target.style.backgroundColor;
}

// Pinto un pixel de la grilla
function pintarPixelDeLaGrilla()
{
  grilla.addEventListener("click", pintarPixel);
}
function pintarPixel(e)
{
  e.target.style.backgroundColor = color.style.backgroundColor;
}

// Funcionalidad de Rueda de Colores
colorPersonalizado.addEventListener('change', 
  (function() {
    // Se guarda el color de la rueda en colorActual
    colorActual = colorPersonalizado.value;
    // Completar para que cambie el indicador-de-color al colorActual
    color.style.backgroundColor = colorActual;
  })
);

// Detecto si el Mouse está apretado o no
function apretoMouse()
{
  grilla.addEventListener("mousedown", 
  function()
  {
    estadoDelMouse = true;
  }
  );
}

function sueltoMouse()
{
  grilla.addEventListener("mouseup", 
  function()
  {
    estadoDelMouse = false;
  }
  );
}

// Pintar en Movimiento
function pintarEnMovimiento()
{
  //ejecuto las funciones del mouse para saber si apreto y mantengo apretado el mouse
  // y la de pintarPixeDeLaGrilla,la cual me pinta el pixel donde hago click y ya obtengo el color en la variable "color"
  apretoMouse();
  sueltoMouse();
  pintarPixelDeLaGrilla();
  //con el evento "mouseover" para saber por donde pasa el puntero, cubre el elemento
  grilla.addEventListener("mouseover", 
  function (e)
  {
    if(estadoDelMouse)//si es true (Se ejecuta la funcion apretoMouse() y la variable es TRUE), pinta los pixeles. Si lo suelto, no pinta
    {
      e.target.style.backgroundColor = color.style.backgroundColor;
    }
  }
  );  
}

// Borro al hacer click en el boton "borrar todo"
function borrarTodo()
{
  $("#borrar").click( //capturo el evento "click" con jQuery y luego recorro los divs de la grilla (pixeles)
    function()
    { 
      for (let index = 0; index < pixeles.length; index++) {
        $(pixeles[index]).animate({"background-color": "white"}, 1200);//aplico la animacion a cada uno
      }     
    }
    );
}

// Cargo a los superhéroes en forma de píxeles
function mostrarSuperheroe()
{
    $("#batman").click( 
      function()
      {
        cargarSuperheroe(batman);
      }
    );
    $("#wonder").click( 
      function()
      {
        cargarSuperheroe(wonder);
      }
    );
    $("#flash").click( 
      function()
      {
        cargarSuperheroe(flash);
      }
    );
    $("#invisible").click( 
      function()
      {
        cargarSuperheroe(invisible);
      }
    );
}

// Guardar Imagenes
function guardarImagen()
{
  $("#guardar").click( function(){
    guardarPixelArt();
  });
}


// Contiene todas las funciones que fui desarrollando
function iniciar() 
{
  paletaDeColores();
  grillaDePixeles();
  indicadorDeColor();
  pintarEnMovimiento();
  borrarTodo();
  mostrarSuperheroe();
  guardarImagen();
}
// Ejecuto la función iniciar y esta ejecuta todas las funciones
iniciar();