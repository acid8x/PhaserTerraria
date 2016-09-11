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
    
};

CharacterCreation.prototype.create = function() {
    console.log('Character Creation State');
    this.game.state.start("Play");
};