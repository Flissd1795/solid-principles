# solid-principles

SOLID is a set of five design principles that help keep code clean, easy to understand, and easy to maintain.

This repository refactors `UserSystem` (`original.js`) into separate modules.

## S — Single Responsibility Principle (SRP)

A class or module should have one job and one reason to change.

**In this repo:** each file has a single focus.

| File | One job |
|------|---------|
| `user.js` | User data shape |
| `user-repsitory.js` | Storage (add / get / delete) |
| `user-service.js` | Create users + permission checks |
| `user-report.js` | Print / list users |

**Before:** `original.js` — one `UserSystem` class creates users, reads, updates, deletes, *and* owns the in-memory array.

---

## O — Open/Closed Principle (OCP)

Open for extension, closed for modification.

**In this repo:** `roles.js` add a new role by creating a class and registering it in `roleFrom`, without changing `UserService`.

```js
// roles.js
export function roleFrom(role) {
    if (role === "admin") return new AdminRole();
    if (role === "guest") return new GuestRole();
    return new UserRole();
}
```

Usage in `user-service.js` — no if/else on role strings:

```js
if (!caller.role.permissions().includes("create")) {
    throw new Error("No access");
}
```

To add `ManagerRole`: create the class, add one line to `roleFrom`. `UserService` stays unchanged.

---

## L — Liskov Substitution Principle (LSP)

A subtype must be usable anywhere its base type is expected, without breaking behaviour.

**In this repo:** `AdminRole` and `GuestRole` extend `UserRole`. Any code calling `role.permissions()` works the same regardless of which subclass is used.

```js
// roles.js
export class UserRole {
    permissions() { return []; }
}

export class AdminRole extends UserRole {
    permissions() { return ["create", "update", "delete"]; }
}
```

---

## I — Interface Segregation Principle (ISP)

Clients should not depend on methods they do not use.

**In this repo:** `UserRepository` has full CRUD, but consumers only receive what they need:

| Consumer | Receives | Methods |
|----------|----------|---------|
| `UserService` | `UserWriter` | `save`, `remove` |
| `UserReport` | `UserReader` | `findAll`, `findById` |

`UserService` never sees `getAll`. `UserReport` never sees `add` or `delete`.

---

## D — Dependency Inversion Principle (DIP)

Code that decides what to do (create a user, print a report) shouldn't be tied to where data lives (an in-memory array). It should receive a simple tool (UserWriter, UserReader) and use that instead.

**Before:** `original.js` — `UserSystem` owns `#users = []` directly.

**After:** `index.js` wires everything at the top:

```js
const repository = new UserRepository();
const reader = new UserReader(repository);
const writer = new UserWriter(repository);

const service = new UserService(writer);
const report = new UserReport(reader);
```

`UserService` and `UserReport` depend on `UserWriter` / `UserReader` contracts — not on the in-memory array inside `UserRepository`. Storage can be swapped (e.g. database) without changing the services.

---