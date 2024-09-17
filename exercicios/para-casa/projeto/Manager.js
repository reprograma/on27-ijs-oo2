const {Person} = require('./Person');

class Manager extends Person {
    #salary;
    clients = [];

    constructor(name, cpf, salary) {
        super(name, cpf);
        this.#salary = salary;
    }

    addClient(client) {
        this.clients.push(client);
    }

    get salary() {
        return this.#salary;
    }

    set salary(newSalary) {
        this.#salary = newSalary;
    }
}

module.exports = {Manager};