
const gamePad = require("gamepad");
const dId = 0; // Assumed for now.

class XboxPad {
    constructor() {
        this.ls = {x: 0, y: 0};
        this.rs = {x: 0, y: 0};

        this.x = false;
        this.y = false;
        this.a = false;
        this.b = false;

        this.back = false;
        this.start = false;

        this.dUp = false;
        this.dDown = false;
        this.dLeft = false;
        this.dRight = false;

        this.lb = false;
        this.rb = false;

        this.lsClick = false;
        this.rsClick = false;

        this.lt = 0;
        this.rt = 0;
    }
}


// Initialize the library
gamePad.init();

// Create a game loop and poll for events
setInterval(gamePad.processEvents, 20); // 20 ms... like the robot!


const xboxPad = new XboxPad();

gamePad.on("move", (id, axis, value) => {
    if (id !== dId) {
        return;
    }

    switch (axis) {
        case 0:
            xboxPad.ls.x = value;
            break;

        case 1:
            xboxPad.ls.y = value;
            break;

        case 2:
            xboxPad.rs.x = value;
            break;

        case 3:
            xboxPad.rs.y = value;
            break;

        case 4:
            xboxPad.lt = (value + 1) / 2;
            break;

        case 5:
            xboxPad.rt = (value + 1) / 2;
            break;

        case 6:
        case 7:
            // TODO: Figure out how to decode strange dpad reporting!
    }

});

function setButtonState(button, state) {
    const buttonMap = {
        7: "lb",
        8: "rb",

        16: "back",
        12: "start",

        14: "lsClick",
        15: "rsClick",

        1: "a",
        2: "b",
        4: "x",
        5: "y",
    };

    xboxPad[buttonMap[button]] = state;
}

gamePad.on("up", (id, button) => {
    if (id !== dId) {
        return;
    }

    setButtonState(button, false);
});


gamePad.on("down", (id, button) => {
    if (id !== dId) {
        return;
    }

    setButtonState(button, true);
});

module.exports = xboxPad;