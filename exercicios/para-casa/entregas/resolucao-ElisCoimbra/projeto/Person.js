class Person{
    name;
    #cpf;
    constructor(name, cpf){
        this.name = name;
        this.#cpf = cpf;
    }
}

module.exports ={ Person }