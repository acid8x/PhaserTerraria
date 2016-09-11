/**
 * Boot state.
 */
function Boot() {
    Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Boot.prototype = proto;

Boot.prototype.init = function() {
    // Unless you specifically know your game needs to support multi-touch I
    // would recommend setting this to 1
    this.input.maxPointers = 1;

    // Setup the scale strategy
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
};

Boot.prototype.preload = function() {
    
};

Boot.prototype.create = function() {

    console.log('Boot State');
    
    // By this point the preloader assets have loaded to the cache, we've
    // set the game settings, so now let's start the real preloader going
    this.game.state.start("Preload");
};
