/* 
Tratamiento para POO
Agradecimientos a todos de @betogasca sobre el Codigo fuente:@freddier y en la correccion de codigo:@masegosax
PASO 02.
- Aniado variables globales para que esten accesibles desde
cualquier funcion
- Agrupo los constructores de cada objeto
*/
/* Variables globales */
var direccion, canvas, contexto, suelo, personaje, tifis, teclas, fresa;
var moverFresa=0;
/* Fondo */
var Fondo = function(){
    //Hago una copia de this, que se llama self
    var self = this;
    this.imagenURL ="fondo.png";
    this.imagenOK = false;                      //valor incial
    this.imagen = new Image();
    this.imagen.src = this.imagenURL;
    this.imagen.onload = function(){            //preCarga
        //Aqui dentro this NO hace referencia a Fondo,
        //sino a la funcion onload. Por eso hay que usar
        //self, una copia de this
        self.imagenOK = true;                   //ya cargo y vale true
        dibujar();
    };
}
/* fresa */
var Fresa = function(){
    var self = this;
    this.imagenURL = "fresa.png";
    this.iamgenOK= false;
    this.imagen = new Image();
    this.imagen.src = this.imagenURL;
    this.imagen.onload = function(){
        self.imagenOK = true
        dibujar();
    }
    this.aH=Math.ceil(pasito(0,40))*10;
    this.aV=Math.ceil(pasito(0,40))*10;
}
/* Tifis */
var Tifis = function(){
    var self = this;
    /* Frente */
    this.frenteURL = "diana-frente.png";
    this.frenteOK = false;
    this.imagenFrente = new Image();
    this.imagenFrente.src = this.frenteURL;
    this.imagenFrente.onload = function(){
        self.frenteOK = true;
        dibujar();
    };
    /* Atras */
    this.atrasURL =  "diana-atras.png";
    this.atrasOK = false;
    this.imagenAtras = new Image();
    this.imagenAtras.src = this.atrasURL;
    this.imagenAtras.onload = function(){
        self.atrasOK = true;
        dibujar();
    };
    /* Derecha */
    this.derURL = "diana-der.png";
    this.derOK = false;
    this.imagenDer = new Image();
    this.imagenDer.src = this.derURL;
    this.imagenDer.onload = function(){
        self.derOK = true;
        dibujar();
    };
    /* Izquierda */
    this.izqURL = "diana-izq.png";
    this.izqOK = false;
    this.imagenIzq = new Image();
    this.imagenIzq.src = this.izqURL;
    this.imagenIzq.onload = function(){
        self.izqOK = true;
        dibujar();
    };
    /* Otros */
    this.x = 100;
    this.y = 100;
    this.velocidad = 50;
}
/* Liz */
var Liz = function(){
    var self = this;
    this.frenteURL = "liz-frente.png";
    this.frenteOK = false;
    this.imagenFrente = new Image();
    this.imagenFrente.src = this.frenteURL;
    this.imagenFrente.onload = function(){
        self.frenteOK = true;
        dibujar();
    };   
    this.x = 350;
    this.y = 250;
    this.velocidad = 50;
}
/* Teclas */
var Teclas = function(){
    this.UP = 38;
    this.DOWN = 40;
    this.LEFT = 37;
    this.RIGHT = 39;
}
function iniciar(){
    //Canvas
    canvas = document.getElementById("c");
    //crea el ancho alto del canvas
    canvas.width = 500;
    canvas.height = 500;
    //dibujar a traves del contexto
    contexto = canvas.getContext("2d");
    //la var conetexto se la pasa el parametro al constructor para iniciar a dibujar
    //pre-carga de imagenes
    suelo = new Fondo();
    personaje = new Liz();
    tifis = new Tifis();
    teclas = new Teclas();
    fresa = new Fresa();
    //re-dibuja
    dibujar();
    document.addEventListener("keydown", teclado);
}
function dibujar(){
    var tifiDibujo;
    tifiDibujo = tifis.imagenFrente;
    if(suelo.imagenOK){
        contexto.drawImage(suelo.imagen,0,0);
    };
    if(fresa.imagenOK){
        if(moverFresa>4){
            moverFresa=0;
            fresa.aH=Math.ceil(pasito(0,40))*10;
            fresa.aV=Math.ceil(pasito(0,40))*10;
        }
        contexto.drawImage(fresa.imagen,fresa.aH,fresa.aV);   
    }
    if(personaje.frenteOK){
        contexto.drawImage(personaje.imagenFrente,personaje.x,personaje.y);   
    }
    if(tifis.frenteOK && tifis.atrasOK && tifis.derOK && tifis.izqOK){
        if(direccion == teclas.UP ){
            tifiDibujo = tifis.imagenAtras;
        }
        if(direccion == teclas.DOWN){
            tifiDibujo = tifis.imagenFrente;
        }
        if(direccion == teclas.LEFT){
            tifiDibujo = tifis.imagenIzq;
        }
        if(direccion == teclas.RIGHT){
            tifiDibujo = tifis.imagenDer;
        }
        contexto.drawImage(tifiDibujo,tifis.x,tifis.y);                    
    }
}
function teclado(datos){
    //console.log(datos);
    var codigo = datos.keyCode;
    //tifis
    if(codigo == teclas.UP && (tifis.y > 0)){
        if((tifis.y == 250 && tifis.x < 150) || (tifis.y == 250 && tifis.x == 200) || (tifis.y == 400 && tifis.x > 100)){
            pared = true;
        }else{
            tifis.y -= tifis.velocidad;
        }
    }
    if(codigo == teclas.DOWN && (tifis.y < 450)){
        if((tifis.y == 150 && tifis.x < 150) || (tifis.y == 300 && tifis.x > 100)){
            pared = true;
        }else{
            tifis.y += tifis.velocidad;
        }
    }
    if(codigo == teclas.LEFT && (tifis.x > 0)){
        if((tifis.y == 200 && tifis.x < 200) || (tifis.y <250 && tifis.x == 250)){
            pared = true;
        }else{
            tifis.x -= tifis.velocidad;
        }
    }
    if(codigo == teclas.RIGHT && (tifis.x < 450)){
        if((tifis.y < 250 && tifis.x == 150) || (tifis.y == 350 && tifis.x == 100)){
            pared = true;
        }else{
            tifis.x += tifis.velocidad;
        }
    }
    //It is alive!!! drireccion: aleatora n,s,e,w; colisiona t: solicita direccion 
    var p = pasito(0,3);
    if(p == 0){
        if(personaje.y > 0){
            if((personaje.y == 250 && personaje.x < 150) || (personaje.y == 250 && personaje.x == 200) || (personaje.y == 400 && personaje.x > 100)){
                pared = true;
            }else{
                personaje.y -= personaje.velocidad;
            }
        }
    }
    if(p == 1){
        if(personaje.x < 450){
            if((personaje.y < 250 && personaje.x == 150) || (personaje.y == 350 && personaje.x == 100)){
                pared = true;
            }else{
                personaje.x += personaje.velocidad;
            }
        }
    }
    if(p == 2){
        if(personaje.y < 450){
            if((personaje.y == 150 && personaje.x < 150) || (personaje.y == 300 && personaje.x > 100)){
                pared = true;
            }else{
                personaje.y += personaje.velocidad;
            }
        }
    }
    if(p == 3){
        if(personaje.x > 0){
            if((personaje.y == 200 && personaje.x < 200) || (personaje.y <250 && personaje.x == 250)){
                pared = true;
            }else{
                personaje.x -= personaje.velocidad;
            }
        }
    }
    moverFresa += 1;
    direccion = codigo;
    dibujar();    
}
function generarCaminata(){
    var a=Math.ceil(pasito(0,40))*10;
    alert(a);
    }   
//crea aleatorios
function pasito(minimo, maximo){
    var numero = Math.floor(Math.random() * (maximo - minimo + 1) + minimo );
    return numero;
}