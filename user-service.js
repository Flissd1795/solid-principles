import { User } from "./user.js";

// S — Single Responsibility Principle (SRP)
// Creates users and checks permissions (doesn't read, report, or store directly)
//
// I — Interface Segregation Principle (ISP)
// Depends on UserWriter, not the full UserRepository
//
// D — Dependency Inversion Principle (DIP)
// Storage is injected via constructor

export class UserService {
    constructor(userWriter) {
        this.writer = userWriter;
    }

    createUser(caller, id, name, email, role = "user") {
        if (!caller.role.permissions().includes("create")) {
            throw new Error("No access");
        }
        const user = new User(id, name, email, role);
        this.writer.save(user);
        return user;
    }
}
