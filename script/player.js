
class Player
{
    constructor(name)
    {
        this.color = Color.UNDECIDED;
        this.name = name;
        this.lastPocketUsed = null;
    }

    getRemainingBalls()
    {

        if(this.color == Color.UNDECIDED)
            return;

        if(this.color == Color.BLUE)
        {
            let pocketcounter = 0;

            for(ball in GAME.balls)
            {
                if(ball.ballNr <= 8 || ball.ballNr == 0)
                {
                    continue;
                }

                if(ball.isInPocket == false)
                    pocketcounter++;
            }
            return pocketcounter;
        }
        else
        {
            let pocketcounter = 0;

            for(ball in GAME.balls)
            {
                if(ball.ballNr >= 8|| ball.ballNr == 0)
                {
                    continue;
                }

                if(ball.isInPocket == false)
                    pocketcounter++;
            }
            return pocketcounter;
        }
    }

}