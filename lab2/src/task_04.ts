abstract class Employee {
    constructor(
        protected name: string,
        protected age: number,
        protected salary: number
    ) {}

    abstract getAnnualBonus(): number;
}

interface Payable {
    pay(): void;
}

class Developer extends Employee implements Payable {
    getAnnualBonus(): number {
        return this.salary * 0.1;
    }

    pay(): void {
        console.log(`Paying salary to Developer: ${this.name}`);
    }
}

class Manager extends Employee implements Payable {
    getAnnualBonus(): number {
        return this.salary * 0.2;
    }

    pay(): void {
        console.log(`Paying salary to Manager: ${this.name}`);
    }
}

const employees: Employee[] = [
    new Developer("Alice", 30, 80000),
    new Developer("Bob", 25, 70000),
    new Manager("Charlie", 40, 100000),
    new Manager("Diana", 35, 95000)
];

let totalAnnualBonus = 0;

employees.forEach(employee => {
    totalAnnualBonus += employee.getAnnualBonus();
    (employee as Payable).pay();
});

console.log(`Total Annual Bonus: ${totalAnnualBonus}`);