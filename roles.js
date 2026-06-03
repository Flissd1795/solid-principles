// L — Liskov Substitution Principle (LSP)
// AdminRole and GuestRole can replace UserRole anywhere. Same permissions() contract, nothing breaks.
export class UserRole {
    permissions() {
        return [];
    }
}

export class AdminRole extends UserRole {
    permissions() {
        return ["create", "update", "delete"];
    }
}

export class GuestRole extends UserRole {
    permissions() {
        return [];
    }
}

// O — Open/Closed Principle (OCP)
// Add a new role by creating a new class and one line in roleFrom — no changes to UserService
export function roleFrom(role) {
    if (role === "admin") return new AdminRole();
    if (role === "guest") return new GuestRole();
    return new UserRole();
}
