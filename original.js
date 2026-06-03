// BEFORE SOLID — reference only
// One class does everything: create, read, update, delete, and owns storage (#users)
// Violates SRP (too many jobs), DIP (tightly coupled to in-memory array), ISP (one interface)

class UserSystem {
    #users = [];

    // Create user (admin or normal)
    createUser(id, name, email, role = "user") {
        const user = {
            id, 
            name, 
            email, 
            role
        }

    this.#users.push(user);
    return user;
    }

    // Fetch user or all users
    getAllUsers() {
        return this.#users;
    }

    // Fetch single user 
    getUserById(id) {
        return this.#users.find(user => user.id === id);
    }

    // Update user details
    updateUser(id, newData) {
        const user = this.getUserById(id);

        if (newData.name) {
            user.name = newData.name;
        }

        if (newData.email) {
            user.email = newData.email;
        }

        if (newData.role) {
            user.role = newData.role;
        }

        return user;
    }

    // Delete user 
    deleteUser(id) {
        // Find index where user id matches
        const index = this.#users.findIndex(user => user.id === id);

       // JS returns -1 if nothing found 
        if (index === -1) {
            return "User not found";
        }

        // Remove 1 item from index (user)
        const deleted = this.#users.splice(index, 1);
        return deleted[0];
    }
}

// Create object from class
const system = new UserSystem();

// Create users 
console.log("CREATE USERS");
system.createUser(1, "John", "john@email.com");
system.createUser(2, "Sarah", "sarah@email.com", "admin");
system.createUser(3, "Mike", "mike@email.com");

// Fetch all users
console.log("ALL USERS");
console.log(system.getAllUsers());


// Fetch single user
console.log("GET USER BY ID");
console.log(system.getUserById(2));

// Update user
console.log("UPDATE USER");
console.log(
    system.updateUser(1, {
        name: "Johnny",
        email: "johnny@email.com"
    })
);

// Delete user 
console.log("DELETE USER");
console.log(system.deleteUser(3));

// Final user list
console.log("FINAL USERS");
console.log(system.getAllUsers());