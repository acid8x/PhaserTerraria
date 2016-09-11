/**
 * Preload state.
 */
function Preload() {
    Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Preload.prototype = proto;

Preload.prototype.preload = function() {
    
    // Here we load the rest of the assets our game needs.
    this.load.tilemap('map', '../images/tiles.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', '../images/tiles.png');
    this.load.image('crack', '../images/crack.png');
    this.load.image('pickAxe', '../images/pickAxe.png');
    this.load.image('selector', '../images/quickBarSelector.png');
    this.load.spritesheet('player', '../images/player.png', 36, 56);
    this.load.spritesheet('tilesSprite', '../images/tiles.png', 32, 32);
    this.load.json('tools', '../json/tools.json');
    
    // Here the assets for character creation
    //Load in all of the generic buttons.
    this.load.spritesheet('cameraBtn', '../images/buttons/cameraBtn.png', 100, 100);
    this.load.spritesheet('randomBtn', '../images/buttons/randomBtn.png', 100, 100);
    this.load.spritesheet('resetBtn', '../images/buttons/resetBtn.png', 100, 100);

    this.load.spritesheet('nextBtn', '../images/buttons/nextBtn.png', 63, 63);
    this.load.spritesheet('prevBtn', '../images/buttons/prevBtn.png', 63, 63);

    this.load.spritesheet('backBtn', '../images/buttons/backBtn.png', 100, 100);
    this.load.spritesheet('printBtn', '../images/buttons/printBtn.png', 100, 100);
    this.load.spritesheet('saveBtn', '../images/buttons/saveBtn.png', 100, 100);

    //Load in the 'spinner' assets, which are displayed whilst loading is happening on the Play State.
    this.load.image('spinnerBackground', '../images/spinner/spinnerSquare.png');
    this.load.image('spinner', '../images/spinner/spinner.png');
};

Preload.prototype.create = function() {

    console.log('Preload State');
    
    this.game.state.start("Login");
};