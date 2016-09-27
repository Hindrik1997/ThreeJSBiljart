class Utils
{
    static calculatePositionDifference(posA, posB) {

        let clone = posA.clone();
        let sub = clone.sub(posB);
        return sub;
    }

    static reduceByCubeRadius(value, radius) {
        if(value < 0) return value + radius;
        return value - radius;
    }
}