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

function validateSingleInput<T extends { [key: string]: string }>(
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

function validateMultipleInputs<T extends { [key: string]: string }>(
    input: string,
    enumObject: T,
    errorMessage: string
): T[keyof T][] | null {
    const items = input
        .toLowerCase()
        .split(",")
        .map((item) => item.trim());

    if (!items.every((item) => isValidEnumValue(item, enumObject))) {
        alert(errorMessage);
        return null;
    }

    return items as T[keyof T][];
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
    validateSingleInput(input, Size, "Sorry, we don't have such cup size")
);

const toppingsInput = getInput(
    "What toppings should I add? Separate them by commas (available options: chocolate, caramel, berries):",
    (input) => {
        const validToppings = validateMultipleInputs(
            input,
            Topping,
            "Sorry, we don't have all these toppings right now. Please, choose available ones"
        );
        if (validToppings === null) return null;
        return validateNoDuplicates(
            validToppings,
            "Sorry, we don't currently provide double toppings"
        );
    }
);

const marshmallowInput = getInput(
    "Should I add marshmallow? (yes or no):",
    (input) =>
        validateSingleInput(input, YesNo, "Sorry, I didn't understand you")
);

const totalCost: number = calculateIceCreamCost(
    sizeInput,
    toppingsInput,
    marshmallowInput
);

alert(`The ice cream will cost you ${totalCost} hryvnias`);
