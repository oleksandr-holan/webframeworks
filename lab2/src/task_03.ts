abstract class Car {
    protected constructor(
        protected make: string,
        protected model: string,
        protected year: number
    ) {}

    abstract displayInfo(): void;
}

class Tesla extends Car {
    #batteryCapacity;
    constructor(
        model: string,
        year: number,
        batteryCapacity: number
    ) {
        super("Tesla", model, year);
        this.#batteryCapacity = batteryCapacity;
    }

    displayInfo(): void {
        console.log(`Make: ${this.make}, Model: ${this.model}, Year: ${this.year}, Battery Capacity: ${this.#batteryCapacity} kWh`);
    }
}

class BMW extends Car {
    constructor(
        model: string,
        year: number,
        private fuelType: string
    ) {
        super("BMW", model, year);
    }

    displayInfo(): void {
        console.log(`Make: ${this.make}, Model: ${this.model}, Year: ${this.year}, Fuel Type: ${this.fuelType}`);
    }
}

class Audi extends Car {
    constructor(
        model: string,
        year: number,
        private allWheelDrive: boolean
    ) {
        super("Audi", model, year);
    }

    displayInfo(): void {
        console.log(`Make: ${this.make}, Model: ${this.model}, Year: ${this.year}, All Wheel Drive: ${this.allWheelDrive}`);
    }
}

const teslaModelS = new Tesla("Model S", 2022, 100);
const teslaModel3 = new Tesla("Model 3", 2021, 75);

const bmwX5 = new BMW("X5", 2023, "Diesel");
const bmwM3 = new BMW("M3", 2022, "Petrol");

const audiA6 = new Audi("A6", 2023, true);
const audiQ7 = new Audi("Q7", 2021, false);

const cars: Car[] = [teslaModelS, teslaModel3, bmwX5, bmwM3, audiA6, audiQ7];

cars.forEach(car => car.displayInfo());