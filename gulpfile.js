


const { src , dest, watch, parallel } = require("gulp");

//Dependencias SASS y CSS
const  sass  = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

//Iamgenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const avif = require("gulp-avif");

//Javascript

const terser = require("gulp-terser-js")


function css (done){

    src("src/scss/**/*.scss") // Identificamos todos los archivos de scss que estén en la carpeta de scss --src
        .pipe(sourcemaps.init() ) //Inicializa los mapas de fuentes
        .pipe( plumber()) // Con Plumber no detiene el script cuando tengamos algún error
        .pipe( sass() ) // Compilamos el archivo de SASS --sass
        .pipe(postcss( [ autoprefixer(), cssnano()] )) // Le damos formato a nuestro CSS y lo optimizamos
        .pipe(sourcemaps.write('.')) // Escribimos los mapas de fuente en la carpeta actual
        .pipe( dest("build/css")); //Guardamos en el disco duro --dest

    done(); //Callback que avisa a gulp cuando llegamos al final de la función
}

async function versionWebp( done ){

    const webp = await import("gulp-webp")// Manda a traer la dependencia instalada con "npm install --save-dev gulp-webp" desde la terminal"

    const opciones ={
        quality :50// Esto define que tanta calidad se le bajarán a las imágenes
    }

    src("src/img/**/*.{jpg,png,JPG,PNG}") //Identificamos todas las imagenes que haya en el source de imagenes con el formato jpg y png
        .pipe(webp.default(opciones))
        .pipe( dest("build/img") )

    done();
}

function versionAvif( done ) {

    const opciones ={
        quality :50// Esto define que tanta calidad se le bajarán a las imágenes
    }

    src("src/img/**/*.{jpg,png,JPG,PNG}") //Identificamos todas las imagenes que haya en el source de imagenes con el formato jpg y png
    .pipe(avif(opciones))
    .pipe( dest("build/img") )

    done();
}

function imagenes( done ){

    const opciones = {
        optimizationLevel: 3
    }

    src( "src/img/**/*.{jpg,png,JPG,PNG}" )
        .pipe( cache (imagemin(opciones) ) ) 
        .pipe( dest("build/img") )

    done();
}

function javascript(done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init() ) // Iniciamos los sourcemaps para generar el mapa de archivos originales
        .pipe(terser()) // Comprimir el archivo js
        .pipe(sourcemaps.write('.') ) // Escribimos los sourcemaps en la carpeta actual
        .pipe(dest('build/js'));


    done();
}

function dev (done){
    watch("src/scss/**/*.scss", css);// Escuchamos los cambios en todos los archivos de la carpeta scss que acaben con la extensión .scss
    watch("src/js/**/*.js", javascript);// Escuchamos los cambios en todos los archivos de la carpeta scss que acaben con la extensión .scss

    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel (imagenes,versionWebp, versionAvif, javascript, dev);
