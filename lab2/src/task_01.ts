interface Animal {
    name: string;
    age: number;
    habitat: string;
    move(): void;
    sound?: string;
}

class Cat implements Animal {
    name: string;
    age: number;
    habitat: string;
    sound?: string;

    constructor(name: string, age: number, habitat: string, sound?: string) {
        this.name = name;
        this.age = age;
        this.habitat = habitat;
        this.sound = sound;
    }

    move(): void {
        console.log(`${this.name} is walking on paws.`);
    }
}

class Bird implements Animal {
    name: string;
    age: number;
    habitat: string;
    sound?: string;

    constructor(name: string, age: number, habitat: string, sound?: string) {
        this.name = name;
        this.age = age;
        this.habitat = habitat;
        this.sound = sound;
    }

    move(): void {
        console.log(`${this.name} is flying.`);
    }
}

class Fish implements Animal {
    name: string;
    age: number;
    habitat: string;

    constructor(name: string, age: number, habitat: string) {
        this.name = name;
        this.age = age;
        this.habitat = habitat;
    }

    move(): void {
        console.log(`${this.name} is swimming.`);
    }
}

const cat = new Cat("Whiskers", 2, "Home", "Meow");
cat.move();

const bird = new Bird("Tweety", 1, "Forest", "Tweet");
bird.move();

const fish = new Fish("Nemo", 3, "Ocean");
fish.move();
