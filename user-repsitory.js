// S — Single Responsibility Principle (SRP)
// Storage only (add, get, delete). No business rules/reporting
//
// D — Dependency Inversion Principle (DIP)
// Business logic never imports this directly
// index.js wires UserReader / UserWriter wrappers on top
// Data currently stored in array, could be changed to db easily 

export class UserRepository {
    #users = [];

    add(user) {
        this.#users.push(user);
    }

    getAll() {
        return [...this.#users];
    }

    getById(id) {
        return this.#users.find((user) => user.id === id);
    }

    delete(id) {
        const index = this.#users.findIndex((u) => u.id === id);

        if (index === -1) {
            return null;
        }

        return this.#users.splice(index, 1)[0];
    }
}
