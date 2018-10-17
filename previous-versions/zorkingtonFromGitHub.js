let rooms = {
    startRoom: {
        description: "182 Main St.\nYou are standing on Main Street between Church and South Winooski.\nThere is a door here. A keypad sits on the handle.\nTaped to the inside of the door is a handwritten sign.\nWhat do you want to do?",
        canChangeTo: ["foyer"],
        actions: {
            readSign: {
                inputs: ["read sign", "read sign!", "read sign.", "read", "read!", "read."],
                result: "The sign says \"Welcome to Burlington Code Academy! Come on up to the second floor. If the door is locked, use the code \'12345\'.\""
            },
            openDoor: {
                inputs: ["open door", "open door!", "open door.", "open", "open!", "open."],
                result: "The door is locked. There is a keypad on the door handle."
            },
            takeSign: {
                inputs:["take sign", "take sign!", "take sign.", "take"],
                result: "That would be selfish. How will other students find their way?"
            },
            exitFunction: {
                inputs: ["exit", "end game", "end", "STOP THE MADNESS"],
                result: "Awww, we're sorry to see you go. Come back soon!"
            },
            lickDoor: {
                inputs: ["lick door", "lick", "be disgusting"],
                result: "You lick the door. Nothing happens. You give up and return home... only to find days later that you have a high fever. You start convulsing, and are taken to the hospital. You spend twenty days there, racking up medical bills beyond the value of your house. You die.\nDo you want to try again?"
            }, 
            codeRegEx: /12345/,
            numRegEx: /\d/g 
        }
    },
    foyer: {
        description: "You are in a foyer. Or maybe it's an antechamber. Or a vestibule. Or an entryway. Or an atrium. Or a narthex. But let's forget all that fancy flatlander vocabulary, and just call it a foyer. In Vermont, this is pronounced \"FO-ee-yurr\".\nA copy of Seven Days lies in a corner.\nWhat do you want to do?",
        canChangeTo: ["startRoom"],
        actions: {
            takePaper: {
                inputs: ["take paper", "take seven days", "open seven days", "seven days"],
                result: "You pick up the paper and leaf through it looking for comics and ignoring the articles, just like everybody else does.\nYou have now added Seven Days to your inventory. Type 'inventory' at any time to see what items are in your inventory."
            },
            goBack: {
                inputs: ["go back", "turn around", "leave", "leave room"]
            }
        },
        inventory: ["Seven Days"]
    }
};

let currentInput;

let currentRoom = "startRoom";

let inventory = {
    "Seven Days": {
        location: "foyer",
        //inputs: ["take paper", "take seven days", "open seven days", "seven days"],
        result: "You pick up the paper and leaf through it looking for comics and ignoring the articles, just like everybody else does.\nYou have now added Seven Days to your inventory. Type 'inventory' at any time to see what items are in your inventory."
    }
}

let userInventory = {
    inputs: ["check inventory", "inventory", "log inventory", "i"],
    inventory: []
};

function changeRoom(nextRoom) {
    let validTransitions = rooms[currentRoom].canChangeTo;
    if (validTransitions.includes(nextRoom)) {
        currentRoom = nextRoom;
        console.log("room has been changed to " + currentRoom);
        console.log(rooms[currentRoom].description);
    } else { 
        console.log("You cannot go to " + nextRoom + " from " + currentRoom + ".");
    }
};

function takeItem(item) {
    inventory[item] = "with user";
    userInventory.inventory.push(item);
}

function playGame() {
    console.log(rooms[currentRoom].description);
    process.stdin.on('data', (chunk) => {
        console.log("inside playGame, at the start of process.stdin.on(). current room: " + currentRoom);
        let userInput = chunk.toString().trim().toLowerCase();
        currentInput = userInput;
        if () {
            function takeItem(item) {
                inventory[item] = "with user";
                userInventory.inventory.push(item);
            }
        }
        if (userInventory.inputs.includes(currentInput)) {
            console.log(userInventory.inventory);
        } else if (currentRoom === "startRoom") {
            console.log("inside playGame, about to call startRoom()");
            startRoom();
        } else if (currentRoom === "foyer") {
            console.log("inside playGame, about to call foyer()");
            foyer();
        }
    });
}

function startRoom() {
    let startRoomActions = rooms.startRoom.actions;
    let numArray = currentInput.match(startRoomActions.numRegEx);
    let numBer;
    if (numArray) {
        numBer = Number(numArray.join(""));
    }
    if (startRoomActions.readSign.inputs.includes(currentInput)) {
        console.log(startRoomActions.readSign.result);
    } else if (startRoomActions.openDoor.inputs.includes(currentInput)) { 
        console.log(startRoomActions.openDoor.result);
    } else if (startRoomActions.takeSign.inputs.includes(currentInput)) {
        console.log(startRoomActions.takeSign.result);
    } else if (startRoomActions.lickDoor.inputs.includes(currentInput)) {
        console.log(startRoomActions.lickDoor.result);
        process.exit();
    } else if (typeof numBer === "number" && numBer !== 12345) { 
        console.log("Bzzzzt! The door is still locked.");
    } else if (currentInput.match(startRoomActions.codeRegEx)) {
        console.log("Success! The door opens. You enter the foyer and the door shuts behind you.");
        changeRoom("foyer");
    } else if (startRoomActions.exitFunction.inputs.includes(currentInput)) {
        console.log(startRoomActions.exitFunction.result);
        process.exit();
    } else {
        console.log("Sorry, I don't know how to " + currentInput + ".");
    }
}

function foyer() {
    let foyerActions = rooms.foyer.actions;
    if (foyerActions.takePaper.inputs.includes(currentInput)) {
        takeItem("Seven Days");
        console.log(foyerActions.takePaper.result);
    } else if (foyerActions.goBack.inputs.includes(currentInput)) {
        changeRoom("startRoom");
    } else {
        console.log("Sorry, I don't know how to " + currentInput + ".");
    }

}

playGame();