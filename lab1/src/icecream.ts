type Size = "small" | "large";
type Topping = "chocolate" | "caramel" | "berries";
type YesNo = "yes" | "no";

function calculateIceCreamCost(size: Size, toppings: Topping[], addMarshmallow: YesNo): number {
    let cost = 0;

    if (size === "small") {
        cost += 10;
    } else if (size === "large") {
        cost += 25;
    }

    toppings.forEach((topping) => {
        switch (topping) {
            case "chocolate":
                cost += 5;
                break;
            case "caramel":
                cost += 6;
                break;
            case "berries":
                cost += 10;
                break;
        }
    });

    if (addMarshmallow === "yes") {
        cost += 5;
    }

    return cost;
}

function isSize(input: string): input is Size {
    return input === "small" || input === "large";
}

function isTopping(input: string): input is Topping {
    return input === "chocolate" || input === "caramel" || input === "berries";
}

function isYesNo(input: string): input is YesNo {
    return input === "yes" || input === "no";
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

    sizeInput = sizeInput.toLowerCase()
    if (!isSize(sizeInput)) {
        alert("Sorry, we don't have such cup size");
        continue;
    }

    break;
}

while (true) {
    toppingsInput = prompt("What toppings should I add? Separate them by commas (available options: chocolate, caramel, berries):");
    if (!toppingsInput) {
        alert("You need to choose at least one available topping");
        continue;
    }

    toppingsArray = toppingsInput.toLowerCase().split(', ')
    if (!toppingsArray.every(isTopping)) {
        alert("Sorry, we don't have all this toppings right now. Please, choose available ones");
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

    marshmallowInput = marshmallowInput.toLowerCase();
    if (!isYesNo(marshmallowInput)) {
        alert("Sorry, I didn't understand you");
        continue;
    }

    break;
}

const totalCost: number = calculateIceCreamCost(sizeInput, toppingsArray, marshmallowInput);

alert(`The ice cream will cost you ${totalCost} hryvnias`);