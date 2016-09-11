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
};

Preload.prototype.create = function() {

    console.log('Preload State');
    
    this.game.state.start("Login");
};