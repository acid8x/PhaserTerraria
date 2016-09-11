/**
 * CharacterCreation state.
 */
function CharacterCreation() {
    Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
CharacterCreation.prototype = proto;

CharacterCreation.prototype.preload = function() {
    /*
    this.load.spritesheet('head', 'assets/img/character/head.png', 150, 117, false);
    this.load.spritesheet('chest', 'assets/img/character/chest.png', 150, 117, false);
    this.load.spritesheet('arms', 'assets/img/character/arms.png', 150, 117, false);
    this.load.spritesheet('legs', 'assets/img/character/legs.png', 150, 117, false);
*/
};

CharacterCreation.prototype.create = function() {
    console.log('Character Creation State');


    this.game.state.start("Play");
};