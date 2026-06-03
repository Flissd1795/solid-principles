// I — Interface Segregation Principle (ISP)
// Write-only (save / remove). No read methods exposed
//
// D — Dependency Inversion Principle (DIP)
// UserService depends on this, not on the array inside the repo.

export class UserWriter {
    constructor(repository) {
        this.save = (user) => repository.add(user);
        this.remove = (id) => repository.delete(id);
    }
}
