// S — Single Responsibility Principle (SRP)
// Reporting only — just lists users
//
// I — Interface Segregation Principle (ISP)
// Depends on UserReader (findAll / findById), not write methods it never uses
//
// D — Dependency Inversion Principle (DIP)
// UserReader is injected (class does not know how or where users are stored)

export class UserReport {
    constructor(userReader) {
        this.reader = userReader;
    }

    printAll() {
        return this.reader.findAll();
    }

    printById(id) {
        return this.reader.findById(id);
    }
}
