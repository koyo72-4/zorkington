let rooms = {
    "startRoom": {
        canChangeTo: ["foyer"]
    },
    "foyer": {
        canChangeTo: ["startRoom"], 
        inventory: ["sevenDays"]
    }
}

function changeRoom() {

}

let inventory = {
    sevenDays: {location: "foyer"},
    user: ["sevenDays"]
}

function logInventory(x) {
    if (x === "check inventory") {
        console.log(inventory.user)
    }
}

let readSign = ["read sign", "read sign!", "read sign.", "read", "read!", "read."]
let openDoor = ["open door", "open door!", "open door.", "open", "open!", "open."]
let takeSign = ["take sign", "take sign!", "take sign.", "take"]
//let enterCode = ["12345", "enter 12345", "key in 12345", "enter code 12345"]
let exitFunction = ["exit", "end game", "end", "STOP THE MADNESS"]
let lickDoor = ["lick door", "lick", "be disgusting"]
let codeRegEx = /12345/;
let numRegEx = /\d/g;

function startRoom() {
    console.log("182 Main St.\nYou are standing on Main Street between Church and South Winooski.\nThere is a door here. A keypad sits on the handle.\nOn the door is a handwritten sign.\nWhat do you want to do?");
    process.stdin.on('data', (chunk) => {
    let userInput = chunk.toString().trim().toLowerCase();
    //logInventory(userInput);
    let numArray = userInput.match(numRegEx);
    //console.log(numArray);
    let numBer;
    if (numArray) {
        numBer = Number(numArray.join(""));
        //console.log(numBer);
    }
    if (readSign.includes(userInput)) {
        console.log("The sign says \"Welcome to Burlington Code Academy! Come on up to the second floor. If the door is locked, use the code \'12345\'.\"");
    } else if (openDoor.includes(userInput)) { 
        console.log("The door is locked. There is a keypad on the door handle.");
    } else if (takeSign.includes(userInput)) {
        console.log("That would be selfish. How will other students find their way?");
    } else if (lickDoor.includes(userInput)) {
        console.log("You lick the door. Nothing happens. You give up and return home... only to find days later that you have a high fever. You start convulsing, and are taken to the hospital. You spend twenty days there, racking up medical bills beyond the value of your house. You die.\nDo you want to try again?");
        process.exit();
    //} else if (enterCode.includes(userInput)) {
    } else if (typeof numBer === "number" && numBer !== 12345) { 
        console.log("Bzzzzt! The door is still locked.");
    } else if (userInput.match(codeRegEx)) {
        console.log("Success! The door opens. You enter the foyer and the door shuts behind you.");
        foyer();
    } else if (exitFunction.includes(userInput)) {
        console.log("Awww, we're sorry to see you go. Come back soon!");
        process.exit();
    } else {
        console.log("Sorry, I don't know how to " + userInput + ".");
    }
    // process.exit()
})
}

startRoom()

function foyer() {
    console.log("You are in a foyer. Or maybe it's an antechamber. Or a vestibule. Or an entryway. Or an atrium. Or a narthex. But let's forget all that fancy flatlander vocabulary, and just call it a foyer. In Vermont, this is pronounced \"FO-ee-yurr\".\nA copy of Seven Days lies in a corner.")
    // process.stdin.once('data', (chunk) => {
    // let userInput = chunk.toString().trim().toLowerCase();
    // console.log("zeep zorp") })
}