class Utils
{
    static calculatePositionDifference(posA, posB) {

        let clone = posA.clone();
        return clone.sub(posB);
    }

    static reduceByCubeRadius(value, radius) {
        if(value < 0) return value + radius;
        return value - radius;
    }

    // Error to freeze the game for debugging
    static crash() {
        console.log("Freezing.");
        //noinspection JSUnresolvedVariable,BadExpressionStatementJS
        das.f;
    }

    static ballNumberToColor(number) {
        if(number === 0) return "white";
        if(number === 8) return "black";
        if(number < 8) return "red";
        else return "blue";
    }
}