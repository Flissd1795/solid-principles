import { roleFrom } from "./roles.js";

// S — Single Responsibility Principle (SRP)
// User holds user data shape only. Role behaviour lives in roles.js. Storage in user-repsitory.js.
export class User {
    constructor(id, name, email, role = "user") {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = roleFrom(role);
    }
}
