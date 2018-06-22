let message = document.getElementById('message');

export let rooms = {
    mainStreet182: {
        description: "182 Main St.\nYou are standing on Main Street between Church and South Winooski.\nThere is a door here. A keypad sits on the handle.\nTaped to the the door is a handwritten sign.\nWhat do you want to do?",
        canChangeTo: ["foyer"],
        actions: {
            readSign: {
                inputs: ["read sign", "read sign!", "read sign.", "read", "read!", "read.", "view sign", "view sign"],
                result: "The sign says \"Welcome to Burlington Code Academy! Come on up to the second floor. If the door is locked, use the code \'12345\'.\""
            },
            openDoor: {
                inputs: ["open door", "open door!", "open door.", "open", "open!", "open."],
                result: "The door is locked. There is a keypad on the door handle."
            },
            takeSign: {
                inputs:["take sign", "take sign!", "take sign."],
                result: "That would be selfish. How will other students find their way?"
            },
            exitFunction: {
                inputs: ["exit", "exit game", "end game", "end", "stop the madness"],
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
        description: "You are in a foyer. Or maybe it's an antechamber. Or a vestibule. Or an entryway. Or an atrium. Or a narthex. But let's forget all that fancy flatlander vocabulary, and just call it a foyer. In Vermont, this is pronounced \"FO-ee-yurr\".\nA copy of Seven Days lies in a corner.\nA set of stairs leads upward.\nWhat do you want to do?",
        canChangeTo: ["mainStreet182", "secondFloor"],
        actions: {
            goBack: {
                inputs: ["go back", "turn around", "leave", "leave room"]
            },
            goUp: {
                inputs: ["climb stairs", "go up stairs", "go upstairs", "stairs", "go up"]
            }
        }
    },
    secondFloor: {
        description: "You are now on the second floor. Some stairs lead down to the foyer, and more stairs lead up to the next level.\nYou catch a faint whiff of maple oat granola.\nA door to your right says 'Green Mountain Semiproductive.'",
        canChangeTo: ["foyer", "greenMountainSemiproductive", "thirdFloor"],
        actions: {
            goBack: {
                inputs: ["go back", "turn around", "leave", "leave room", "go down", "go down stairs", "go downstairs"]
            },
            greenMountain: {
                inputs: ["open door", "green mountain semiproductive", "go to green mountain semiproductive", "go into green mountain semiproductive", "enter room"]
            },
            goUp: {
                inputs: ["climb stairs", "go up stairs", "go upstairs", "stairs", "go up"]
            }
        }
    },
    greenMountainSemiproductive: {
        description: "You open the door to Green Mountain Semiproductive. There are furnished but unoccupied cubicles all around the walls. In the center of the room is a giant barrel, around which many people in suits are gathered. They lean over the barrel and munch on its contents. You step closer to the barrel and see that it is filled with granola. It smells delicious. Resting against the barrel is an abandoned ladle. One of the suited granola eaters stops chewing long enough to turn to you and say, 'Hello.'",
        canChangeTo: ["secondFloor"],
        actions: {
            goBack: {
                inputs: ["go back", "turn around", "leave", "leave room"]
            },
            hello: {
                inputs: ["greet", "hello", "say hello", 'say "hello"', "say 'hello'", "say hello back", "say 'hello' back", 'say "hello" back'],
                result: "You say 'hello' back to the friendly businessperson, who then says, 'Welcome. Won't you join our morning feast?'"
            },
            eatGranola: {
                inputs: ["eat granola", "eat", "join", "join feast", "join the feast", "join the morning feast", "join morning feast"],
                result: "You step up to the barrel and plunge your head into the granola, scooping it out with your teeth. As you chew, a mystical peace comes over you."
            },
            takeGranola: {
                inputs: ["take granola", "scoop granola", "ladle granola"],
                result: "Good idea. You ladle yourself some granola for the road."
            }
        }
    },
    thirdFloor: {
        description: "Welcome to the third floor.",
        canChangeTo: ["secondFloor"],
        actions: {
            goBack: {
                inputs: ["go back", "turn around", "leave", "leave room"]
            }
        }
    }
};

export let roomInventory = {
    lowerCaseItemsList: ["seven days", "ladle", "granola", "canadian quarter"],
    properlyCapitalizedItemsList: ["Seven Days", "a ladle", "a scoop of granola", "Canadian quarter"],
    lowerCaseRoomsList: ["mainStreet182", "foyer", "secondFloor", "greenMountainSemiproductive", "thirdFloor"],
    properlyCapitalizedRoomsList: ["182 Main Street", "the foyer", "the second floor", "Green Mountain Semiproductive", "the third floor"],
    mainStreet182: [],
    foyer: ["seven days"],
    secondFloor: [],
    greenMountainSemiproductive: ["ladle", "scoop of granola", "scoop of granola", "scoop of granola", "scoop of granola", "scoop of granola"],
    thirdFloor: [],
    mainStreetSidewalk: ["Canadian quarter"]
};

export let currentInventory = {
    inventory: [],
    lowerCaseInventory: []
}

export let userInventory = {
    checkInventoryInputs: ["check inventory", "inventory", "log inventory", "i"],
    takeItemInputs: ["take", "take item", "pick up"],
    dropItemInputs: ["drop", "drop item"],
};

export let itemTakeMessages = {
    "seven days": "You pick up the paper and leaf through it looking for comics and ignoring the articles, just like everybody else does.",
    "ladle": "You pick up the ladle."
}

export function changeRoom(nextRoom) {
    let validTransitions = rooms[currentRoom].canChangeTo;
    if (validTransitions.includes(nextRoom)) {
        currentRoom = nextRoom;
        message.textContent = rooms[currentRoom].description;
    } else { 
        let lowerCaseCurrentRoomIndex = roomInventory.lowerCaseRoomsList.indexOf(currentRoom);
        let properlyCapitalizedCurrentRoom = roomInventory.properlyCapitalizedRoomsList[lowerCaseCurrentRoomIndex];
        let lowerCaseNextRoomIndex = roomInventory.lowerCaseRoomsList.indexOf(nextRoom);
        let properlyCapitalizedNextRoom = roomInventory.properlyCapitalizedRoomsList[lowerCaseNextRoomIndex];
        message.textContent = "You cannot go to " + properlyCapitalizedNextRoom + " from " + properlyCapitalizedCurrentRoom + ".";
    }
};

export function mainStreet182() {
    let mainStreet182Actions = rooms.mainStreet182.actions;
    let numArray = currentInput.match(mainStreet182Actions.numRegEx);
    let numBer;
    if (numArray) {
        numBer = Number(numArray.join(""));
    }
    if (mainStreet182Actions.readSign.inputs.includes(currentInput)) {
        message.textContent = mainStreet182Actions.readSign.result;
    } else if (mainStreet182Actions.openDoor.inputs.includes(currentInput)) { 
        message.textContent = mainStreet182Actions.openDoor.result;
    } else if (mainStreet182Actions.takeSign.inputs.includes(currentInput)) {
        message.textContent = mainStreet182Actions.takeSign.result;
    } else if (mainStreet182Actions.lickDoor.inputs.includes(currentInput)) {
        message.textContent = mainStreet182Actions.lickDoor.result;
        process.exit();
    } else if (typeof numBer === "number" && numBer !== 12345) { 
        message.textContent = "Bzzzzt! The door is still locked.";
    } else if (currentInput.match(mainStreet182Actions.codeRegEx)) {
        message.textContent = "Success! The door opens. You enter the foyer and the door shuts behind you.";
        changeRoom("foyer");
    } else if (mainStreet182Actions.exitFunction.inputs.includes(currentInput)) {
        message.textContent = mainStreet182Actions.exitFunction.result;
        process.exit();
    } else {
        message.textContent = "Sorry, I don't understand " + currentInput + ".";
    }
}

export function foyer() {
    let foyerActions = rooms.foyer.actions;
    if (foyerActions.goBack.inputs.includes(currentInput)) {
        changeRoom("mainStreet182");
    } else if (foyerActions.goUp.inputs.includes(currentInput)) {
        changeRoom("secondFloor");
    } else {
        console.log("Sorry, I don't understand " + currentInput + ".");
    }
}

export function secondFloor() {
    let secondFloorActions = rooms.secondFloor.actions;
    if (secondFloorActions.goBack.inputs.includes(currentInput)) {
        changeRoom("foyer");
    } else if (secondFloorActions.greenMountain.inputs.includes(currentInput)) {
        changeRoom("greenMountainSemiproductive");
    } else if (secondFloorActions.goUp.inputs.includes(currentInput)) {
        changeRoom("thirdFloor");
    } else {
        console.log("Sorry, I don't understand " + currentInput + ".");
    }
}

export function greenMountainSemiproductive() {
    let greenMountainActions = rooms.greenMountainSemiproductive.actions;
    if (greenMountainActions.goBack.inputs.includes(currentInput)) {
        changeRoom("secondFloor");
    } else if (greenMountainActions.hello.inputs.includes(currentInput)) {
        console.log(greenMountainActions.hello.result);
    } else if (greenMountainActions.eatGranola.inputs.includes(currentInput)) {
        console.log(greenMountainActions.eatGranola.result);
    } else if (greenMountainActions.takeGranola.inputs.includes(currentInput)) {
        if (currentInventory.inventory.includes("a ladle")) {
            if (roomInventory.greenMountainSemiproductive.length > 0) {
                roomInventory.greenMountainSemiproductive.pop();
                currentInventory.inventory.push("a scoop of granola");
                console.log(greenMountainActions.takeGranola.result);
                console.log("\nYou have now added a scoop of granola to your inventory. Type 'inventory' at any time to see what items are in your inventory.");
            } else {
                console.log("Sorry, but you have already taken your fair share of granola. The glares of those around you convince you to put down your ladle.")
            }
        } else {
            console.log("You need a tool to scoop out the granola.");
        }
    } else {
        console.log("Sorry, I don't understand " + currentInput + ".");
    }
}

export function thirdFloor() {
    let thirdFloorActions = rooms.thirdFloor.actions;
    if (thirdFloorActions.goBack.inputs.includes(currentInput)) {
        changeRoom("secondFloor");
    } else {
        console.log("Sorry, I don't understand " + currentInput + ".");
    }
}