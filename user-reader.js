// I — Interface Segregation Principle (ISP)
// Read-only contract — findAll / findById only. Consumers that read never see write methods.
//
// D — Dependency Inversion Principle (DIP)
// UserReport depends on this, not the storage (array/db)

export class UserReader {
    constructor(repository) {
        // Delegate to the real storage, but only expose read operations
        this.findById = (id) => repository.getById(id);
        this.findAll = () => repository.getAll();
    }
}
