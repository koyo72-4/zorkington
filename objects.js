export let rooms = {
    mainStreet182: {
        description: "You are standing on Main Street between Church and South Winooski.\nThere is a door here. A keypad sits on the handle.\nTaped to the the door is a handwritten sign.\nWhat do you want to do?",
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