const blessed = require('blessed');
const contrib = require('blessed-contrib');

const screen = blessed.screen();

const grid = new contrib.grid({rows: 8, cols: 2, screen: screen});
let leftPosPower = grid.set(0,0,1,1, contrib.gauge, {
    label: 'Left Forward Power',
    percent: [0]
});

let leftNegPower = grid.set(1,0,1,1, contrib.gauge, {
    label: 'Left Reverse Power',
    percent: [0]
});

let rightPosPower = grid.set(0,1,1,1, contrib.gauge, {
    label: 'Right Forward Power',
    percent: [0]
});

let rightNegPower = grid.set(1,1,1,1, contrib.gauge, {
    label: 'Right Reverse Power',
    percent: [0]
});

let initialized = false;
module.exports = {
    /**
     *
     * @param {number} data.leftPower
     * @param {number} data.rightPower
     */
    refresh(data) {
        if (data.leftPower === 0 && data.rightPower === 0) {
            //return
        }

        if (data.leftPower > 0) {
            leftPosPower.setPercent(data.leftPower * 100);
            leftNegPower.setPercent(0);
        } else if (data.leftPower < 0) {
            leftNegPower.setPercent(-data.leftPower * 100);
            leftPosPower.setPercent(0);
        } else {
            leftNegPower.setPercent(0);
            leftPosPower.setPercent(0);
        }

        if (data.rightPower > 0) {
            rightPosPower.setPercent(data.rightPower * 100);
            rightNegPower.setPercent(0);
        } else if (data.rightPower < 0) {
            rightNegPower.setPercent(-data.rightPower * 100);
            rightPosPower.setPercent(0);
        } else {
            rightNegPower.setPercent(0);
            rightPosPower.setPercent(0);
        }

        // leftGauge.setPercent(xPad.lt * 100);
        // rightGauge.setPercent(power.rightPower);
        screen.render();
    }
}