const fs = require('fs');

class Contenedor {

    //contructor del objeto
    constructor(archivo) {
        this.archivo=archivo;
        this.id = 0;
        this.data =[];
    }

    //metodo para guardar el objeto dentro del archivo
    async save(objeto) {
        await this.getAll();
        this.id++;
        this.data.push({
            id:this.id,
            product: objeto
        })
        await fs.promises.writeFile(`../src/resultado/${this.archivo}`,JSON.stringify(this.data, null, 2));
        return this.id;
    }

    //metodo para cosultar por id
    async getById(id) {
        await this.getAll();
        return this.data.find((producto) => producto.id === id)
    }

    //metodo para devolver todo en el archivo 
    async getAll() {
        try {
            const data = await fs.promises.readFile(`../src/resultado/${this.archivo}`, 'utf-8')
            if (data) {
                this.data = JSON.parse(data);
                this.data.map((producto) => {
                    if (this.id < producto.id) {
                        this.id = producto.id
                    }
                })
                return this.data;
            }
        } catch (error) {
            return 
        }
    }

    //metodo para borrar por id
    async deleteById(id) {
        await this.getAll();
        await fs.promises.unlink(`../src/resultado/${this.archivo}`);
        const data = this.data.filter((producto) => producto.id !== id);
        await fs.promises.writeFile(`../src/resultado/${this.archivo}`,JSON.stringify(data, null, 2));
    }

    // metodo para borrar todo 
    async deleteAll() {
        await fs.promises.unlink(`../src/resultado/${this.archivo}`);
        this.id = 0;
        this.data =[];
    }

}

const resultado = new Contenedor('product.txt');
const func = async () => {
    await resultado.save({
        title:"cosa1",
        price:111,
        thumbnail:'www.page.com/foto1'
    });
    await resultado.save({
        title:"cosa2",
        price:222,
        thumbnail:'www.page.com/foto2'
    });
    await resultado.save({
        title:"cosa3",
        price:333,
        thumbnail:'www.page.com/foto3'
    });
    const data = await resultado.getAll();
    console.log('getAll()',data);

    const data1 = await resultado.getById(2);
    console.log('getById(2)',data1);

    await resultado.deleteById(2);

    const data4 = await resultado.getAll();
    console.log('getAll() after deleteById(2)',data4);

    //resultado.deleteAll();
}
func();
