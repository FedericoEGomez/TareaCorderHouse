class Usuario {

    //constructor del objeto 
    constructor(nombre, apellido,libros, mascotas){

        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    //Devuelve el nombre completo
    getFullName(){ return `mi nombre es ${this.nombre} ${this.apellido}`}

    //Agrega una mascota al Array
    addMascotas(mascota){ this.mascotas.push(mascota) }

    //Ceunta la cantidad de mascotas en el Array
    countMascotas(){ return this.mascotas.length }
    
    //Agrega un libro al Objeto de libros
    addBook(libro){ this.libros.push(libro) }

    //Muestra solamente los nombres de los libros en un Array 
    getBooksName(){
        let arrayNombresDeLibros = []

        for(let nombresLibro of this.libros){

            let nombres = nombresLibro.nombre
            arrayNombresDeLibros.push(nombres)
        }

        return arrayNombresDeLibros
    }
}


const persona = new Usuario ('Federico', 'Gomez', [{nombre:'El Ruso',autor:'Una persona'}],['nero'])
console.log('Nombre completo')
console.log(persona.getFullName())

console.log('Cantidad de mascotas inicial')
console.log(persona.countMascotas())
persona.addMascotas('canario')

console.log('Cantidad de mascotas final')
console.log(persona.countMascotas())

console.log('Nombres de libros inical')
console.log(persona.getBooksName())
persona.addBook({nombre:'El autor',autor:'Desconocido'})

console.log('Nombres de libros final')
console.log(persona.getBooksName())