circle('wheel');
circle('wheel2');

function circle(id) {

    var elInteraction = document.getElementById(id);
    var elDisplay = elInteraction.getElementsByClassName('wheelImage')[0];
    console.log(elDisplay);

    var offsetRad = null;
    var targetRad = 0;
    var previousRad;


    try {
        elInteraction.addEventListener('mousedown', down);
        elInteraction.addEventListener('pointerdown', down);
    }
    catch (err) {
        console.log("Interaction not found");
    }

    function down(event) {
        offsetRad = getRotation(event);
        previousRad = offsetRad;
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', up);
        window.addEventListener('touchstart', move);
        window.addEventListener('pointerup', up);
    }

    function move(event) {

        var newRad = getRotation(event);
        targetRad += (newRad - previousRad);
        previousRad = newRad;
        elDisplay.style.transform = 'rotate(' + (targetRad / Math.PI * 180) + 'deg)';
    }

    function up() {
        window.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', up);
        window.removeEventListener('touchstart', move);
        window.removeEventListener('pointerup', up);
    }

    function getRotation(event) {
        var pos = mousePos(event, elInteraction);
        var x = pos.x - elInteraction.clientWidth * .5;
        var y = pos.y - elInteraction.clientHeight * .5;
        return Math.atan2(y, x);
    }

    function mousePos(event, currentElement) {
        var totalOffsetX = 0;
        var totalOffsetY = 0;
        var canvasX = 0;
        var canvasY = 0;

        do {
            totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
            totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
        }
        while (currentElement = currentElement.offsetParent)

        canvasX = event.pageX - totalOffsetX;
        canvasY = event.pageY - totalOffsetY;

        return {
            x: canvasX,
            y: canvasY
        };
    }
}
