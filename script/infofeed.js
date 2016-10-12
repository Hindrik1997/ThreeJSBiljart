/**
 * Created by jornv on 10/11/2016.
 */
class InfoFeed {
    constructor() {
        this.isShowing = false;
        this.infoFeed = $("#infoFeed");
    }

    write(string) {
        if(!this.isShowing) {
            this.infoFeed.css("display", "block");
            this.isShowing = true;
        }

        this.infoFeed.prepend(`<p>${string}</p>`);
    }

    writeBallPocketed(ball) {
        this.write(`pocketed a ${ Utils.ballNumberToColor(ball.ballNr)} ball`);
    }
}