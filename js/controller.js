class Controller {
    constructor(game) {
        this.game = game;
        document.addEventListener('keydown', this.onKeyDown.bind(this), false);
    }

    onKeyDown(event) {
        if(event.keyCode == 32) {
            this.game.step();
        }
    }
}