const {xPad, dashboard} = require('../src/index');

function driveLogic() {

    function applyDeadband(value) {
        return (Math.abs(value) < .10) ? 0 : value;
    }

    return {
        leftPower: applyDeadband(-xPad.ls.y),
        rightPower: applyDeadband(-xPad.rs.y)
    }
}

setInterval(() => {
    dashboard.refresh(driveLogic());
}, 20);

