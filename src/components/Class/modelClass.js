
class Usuario {

    id;
    name;
    age;
    status;
    type;

    constructor(id, name, age) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.status = 'inactive';
        this.type = '';
    }

    changeStatus() {
        if (this.status === 'inactive') {
            this.status = 'active';
        } else {
            this.status = 'inactive';
        }
    }

    resumen() {
        throw new Error("resumen no implantado");
    }

}

export class Cliente extends Usuario {      // herencia

    #saldo;
    accountType;
    constructor(id, name, age, status, accountType, saldo = 0, type) {
        super(id, name, age, status, type)
        this.accountType = accountType;         // Ahorros, corriente    
        this.#saldo = saldo;                    // Default 0
    }

    resumen() {
        return `Tipo usuario:  ${this.type} \n Id: ${this.id} \n name: ${this.name}  \n status: ${this.status} \n saldo es: ${this.#saldo}`;
    }

    mostrarSaldo() {
        return this.#saldo;
    }

    agregarSaldo(deposit) {
        this.#saldo = this.#saldo + parseInt(deposit);
        return true;
    }

    sacarSaldo(withdrawMoney) {
        if (this.#saldo >= parseInt(withdrawMoney)) {
            this.#saldo = this.#saldo - parseInt(withdrawMoney);
            return true;
        } else {
            return false;
        }
    }

}

/* 1 test */
// let cliente1  = new Cliente(3, "Margarita", 75, "Ahorror");
// console.log(cliente1.resumen());
// console.log('-----------------------------------');

/* 2 test */
// let cliente2  = new Cliente(3, "Maritza", 80, "Corriente");
// console.log(cliente2.resumen());
// console.log('-----------------------------------');

