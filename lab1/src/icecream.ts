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

let sizeInput: string | null;
let toppingsInput: string | null;
let toppingsArray: string[];
let marshmallowInput: string | null;

while (true) {
    sizeInput = prompt("Choose a cup size (small or large):");

    if (!sizeInput) {
        alert("Please, say something, I can't read your mind");
        continue;
    }
    sizeInput = sizeInput.toLowerCase().trim();
    if (!isValidEnumValue(sizeInput, Size)) {
        alert("Sorry, we don't have such cup size");
        continue;
    }

    break;
}

while (true) {
    toppingsInput = prompt(
        "What toppings should I add? Separate them by commas (available options: chocolate, caramel, berries):"
    );
    if (!toppingsInput) {
        alert("You need to choose at least one available topping");
        continue;
    }

    toppingsArray = toppingsInput
        .toLowerCase()
        .split(",")
        .map((topping) => topping.trim());
    if (!toppingsArray.every((topping) => isValidEnumValue(topping, Topping))) {
        alert(
            "Sorry, we don't have all this toppings right now. Please, choose available ones"
        );
        continue;
    }

    let toppingsSet = new Set(toppingsArray);
    if (toppingsSet.size !== toppingsArray.length) {
        alert("Sorry, we don't currently provide double toppings");
        continue;
    }

    break;
}

while (true) {
    marshmallowInput = prompt("Should I add marshmallow? (yes or no):");
    if (!marshmallowInput) {
        alert("Please, say something, I can't read your mind");
        continue;
    }

    marshmallowInput = marshmallowInput.toLowerCase().trim();
    if (!isValidEnumValue(marshmallowInput, YesNo)) {
        alert("Sorry, I didn't understand you");
        continue;
    }

    break;
}

const totalCost: number = calculateIceCreamCost(
    sizeInput as Size,
    toppingsArray as Topping[],
    marshmallowInput as YesNo
);

alert(`The ice cream will cost you ${totalCost} hryvnias`);
