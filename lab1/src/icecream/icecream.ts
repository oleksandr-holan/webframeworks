// Instead of this structure

enum Size {
    Small = "small",
    Large = "large",
}

enum Topping {
    Chocolate = "chocolate",
    Caramel = "caramel",
    Berries = "berries",
}

enum YesNo {
    Yes = "yes",
    No = "no",
}

const SizeCosts = {
    [Size.Small]: 10,
    [Size.Large]: 25,
};

const ToppingCosts = {
    [Topping.Chocolate]: 5,
    [Topping.Caramel]: 6,
    [Topping.Berries]: 10,
};

const MarshmallowCost = 5;

// Make the code to work with structure

interface Product {
    readonly name: string;
    readonly price: number;
}

const toppings: Product[] = [
    { name: "chocolate", price: 5 },
    { name: "caramel", price: 6 },
    { name: "berries", price: 10 },
];

const sizes: Product[] = [
    { name: "small", price: 10 },
    { name: "large", price: 25 },
];

const supplements: Product[] = [{ name: "marshmallow", price: 5 }];

///////////////////////////////////////////////////////////////////

function calculateIceCreamCost(
    size: Size,
    toppings: Topping[],
    addMarshmallow: YesNo
): number {
    let cost = SizeCosts[size];

    toppings.forEach((topping) => {
        cost += ToppingCosts[topping];
    });

    if (addMarshmallow === YesNo.Yes) {
        cost += MarshmallowCost;
    }

    return cost;
}

function isValidEnumValue<T extends { [key: string]: string }>(
    input: string,
    enumObject: T
): input is T[keyof T] {
    return Object.values(enumObject).includes(input as T[keyof T]);
}

function validateEnumValue<T extends { [key: string]: string }>(
    input: string,
    enumObject: T,
    errorMessage: string
): T[keyof T] | null {
    const trimmedInput = input.toLowerCase().trim();
    if (!isValidEnumValue(trimmedInput, enumObject)) {
        alert(errorMessage);
        return null;
    }
    return trimmedInput as T[keyof T];
}

function validateEnumArray<T extends { [key: string]: string }>(
    items: string[],
    enumObject: T,
    errorMessage: string
): T[keyof T][] | null {
    if (!items.every((item) => isValidEnumValue(item, enumObject))) {
        alert(errorMessage);
        return null;
    }

    return items as T[keyof T][];
}

function parseArrayFromString(input: string): string[] {
    return input
        .toLowerCase()
        .split(",")
        .map((item) => item.trim());
}

function validateNoDuplicates<T>(items: T[], errorMessage: string): T[] | null {
    const uniqueItems = new Set(items);
    if (uniqueItems.size !== items.length) {
        alert(errorMessage);
        return null;
    }
    return items;
}

function getInput<T>(
    promptMessage: string,
    validator: (input: string) => T | null,
    errorMessage: string = "Please, say something, I can't read your mind"
): T {
    while (true) {
        const input = prompt(promptMessage);
        if (!input) {
            alert(errorMessage);
            continue;
        }
        const validatedInput = validator(input);
        if (validatedInput !== null) {
            return validatedInput;
        }
    }
}

const sizeInput = getInput("Choose a cup size (small or large):", (input) =>
    validateEnumValue(input, Size, "Sorry, we don't have such cup size")
);

const toppingsInput = getInput(
    "What toppings should I add? Separate them by commas (available options: chocolate, caramel, berries):",
    (input) => {
        const toppingsArray = parseArrayFromString(input);
        const toppingsEnumArray = validateEnumArray(
            toppingsArray,
            Topping,
            "Sorry, we don't have all these toppings right now. Please, choose available ones"
        );
        if (toppingsEnumArray === null) return null;
        return validateNoDuplicates(
            toppingsEnumArray,
            "Sorry, we don't currently provide double toppings"
        );
    }
);

const marshmallowInput = getInput(
    "Should I add marshmallow? (yes or no):",
    (input) => validateEnumValue(input, YesNo, "Sorry, I didn't understand you")
);

const totalCost: number = calculateIceCreamCost(
    sizeInput,
    toppingsInput,
    marshmallowInput
);

alert(`The ice cream will cost you ${totalCost} hryvnias`);
