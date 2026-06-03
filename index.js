import { UserRepository } from "./user-repsitory.js";
import { UserReader } from "./user-reader.js";
import { UserWriter } from "./user-writer.js";
import { UserService } from "./user-service.js";
import { UserReport } from "./user-report.js";
import { User } from "./user.js";

const repository = new UserRepository();
const reader = new UserReader(repository);
const writer = new UserWriter(repository);

const service = new UserService(writer);
const report = new UserReport(reader);

const admin = new User(1, "Sarah", "sarah@email.com", "admin");
const guest = new User(2, "Guest", "guest@email.com", "guest");

console.log("Admin permissions:", admin.role.permissions());
console.log("Guest permissions:", guest.role.permissions());

service.createUser(admin, 3, "John", "john@email.com");

try {
    service.createUser(guest, 4, "Mike", "mike@email.com");
} catch (err) {
    console.log("Guest blocked:", err.message);
}

console.log("All users (via report):", report.printAll());
console.log("User by id (via report):", report.printById(3));
