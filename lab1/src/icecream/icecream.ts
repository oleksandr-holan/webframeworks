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

function getValidatedInput<T extends { [key: string]: string }>(
    promptMessage: string,
    enumObject: T,
    errorMessage: string,
    additionalValidation?: (input: string) => boolean,
    additionalErrorMessage?: string
): T[keyof T] {
    while (true) {
        const input = prompt(promptMessage);
        if (!input) {
            alert("Please, say something, I can't read your mind");
            continue;
        }

        const trimmedInput = input.toLowerCase().trim();
        if (!isValidEnumValue(trimmedInput, enumObject)) {
            alert(errorMessage);
            continue;
        }

        if (additionalValidation && !additionalValidation(trimmedInput)) {
            alert(additionalErrorMessage || "Invalid input");
            continue;
        }

        return trimmedInput as T[keyof T];
    }
}

const sizeInput = getValidatedInput(
    "Choose a cup size (small or large):",
    Size,
    "Sorry, we don't have such cup size"
);

const toppingsInput = getValidatedInput(
    "What toppings should I add? Separate them by commas (available options: chocolate, caramel, berries):",
    Topping,
    "Sorry, we don't have all these toppings right now. Please, choose available ones",
    (input) => {
        const toppings = input.split(",").map((t) => t.trim());
        const uniqueToppings = new Set(toppings);
        return uniqueToppings.size === toppings.length;
    },
    "Sorry, we don't currently provide double toppings"
);

const marshmallowInput = getValidatedInput(
    "Should I add marshmallow? (yes or no):",
    YesNo,
    "Sorry, I didn't understand you"
);

const toppingsArray = toppingsInput
    .split(",")
    .map((t) => t.trim()) as Topping[];

const totalCost: number = calculateIceCreamCost(
    sizeInput as Size,
    toppingsArray,
    marshmallowInput as YesNo
);

alert(`The ice cream will cost you ${totalCost} hryvnias`);
