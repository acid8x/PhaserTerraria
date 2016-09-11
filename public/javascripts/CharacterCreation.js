/**
 * CharacterCreation state.
 */
function CharacterCreation() {
    Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
CharacterCreation.prototype = proto;

var nextBtn, prevBtn, guiElements;
var bodyPart;

var Option = function(sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
}

CharacterCreation.prototype.preload = function() {

    this.load.spritesheet('head', 'images/character/head.png', 150, 116);
    this.load.spritesheet('chest', 'images/character/chest.png', 150, 116);
    this.load.spritesheet('arms', 'images/character/arms.png', 150, 116);
    this.load.spritesheet('legs', 'images/character/legs.png', 150, 116);

    this.load.spritesheet('nextBtn', 'images/buttons/NextBtn.png', 63, 63);
    this.load.spritesheet('prevBtn', 'images/buttons/PrevBtn.png', 63, 63);

    this.load.spritesheet('randomBtn', 'images/buttons/RandomBtn.png', 100, 100);
    this.load.spritesheet('resetBtn', 'images/buttons/ResetBtn.png', 100, 100);
};


CharacterCreation.prototype.create = function() {
    console.log('Character Creation State');

    //Create the dressup elements
    this.createDressup();

    //Create the buttons to deal with game options
    this.createCustomButtons();
    //this.createSaveButtons();
    //
};


CharacterCreation.prototype.createDressup = function() {

    this.dressUpElements = [];

    this.dressUpElements.push(new Option('legs', 100, 80));
    this.dressUpElements.push(new Option('chest', 100, 80));
    this.dressUpElements.push(new Option('arms', 100, 80));
    this.dressUpElements.push(new Option('head', 100, 80));

    guiElements = this.add.group();
    guiElements.x = 450;
    guiElements.y = 175;

    var btnBotY = (this.dressUpElements.length - 1) * 70;

    //Now we loop through the dress up parts and create buttons for each, and add them
    for(var i = 0; i < this.dressUpElements.length; i++) {

        nextBtn = this.make.button(273, btnBotY - 70 * i, 'nextBtn', this.buttonChoice, this, 2, 1, 0);
        nextBtn.id = i;
        guiElements.add(nextBtn);

        var item = this.dressUpElements[i];
        bodyPart = this.add.sprite(item.x, item.y, item.sprite);
        bodyPart.id = i;
        guiElements.add(bodyPart);

        prevBtn = this.make.button(0, btnBotY - 70 * i, 'prevBtn', this.buttonChoice, this, 2, 1, 0);
        prevBtn.id = i;
        guiElements.add(prevBtn);
    }
};

CharacterCreation.prototype.buttonChoice = function(sender) {

    var part, side;
    //  Manually changing the frames of the button, i.e, how it will look when you play with it
    //item.frame += 1;
    for(var i = 0; i < guiElements.children.length; i++){
        if(sender.id == guiElements.children[i].id && guiElements.children[i].key != 'bodyparts'){
            if(sender.key == 'nextBtn'){
                guiElements.children[i + 1].frame += 1;
            }
            if(sender.key == 'prevBtn'){
                guiElements.children[i - 1].frame -= 1;
            }
        }
    }

};

CharacterCreation.prototype.prevChoice = function(sender) {

    //  Manually changing the frames of the button, i.e, how it will look when you play with it
    console.log(sender.id);
};

//Holds the code for generating buttons which deal with the customisation of the character.
CharacterCreation.prototype.createCustomButtons = function() {

    //Create the 'random' button with an event listener for when it is clicked
    randomButton = this.make.button(0, 289, 'randomBtn', this.randomizeCharacter, this, 2, 1, 0);
    guiElements.add(randomButton);

    //Create the 'reset' button with an event listener for when it is clicked
    resetButton = this.make.button(118, 289, 'resetBtn', this.resetCharacter, this, 2, 1, 0);
    guiElements.add(resetButton);

};

//Randomize character based on the amount of frames each dress up element has.
CharacterCreation.prototype.randomizeCharacter = function () {

    //Loop through the dressup elements and call the randomise method
    //for(var i = 0; i < this.dressUpElements.length; i++) {
    //this.dressUpElements[i].randomize();
    //}
    this.game.state.start("Play");

}



//Set all dress up element animations to their first frame (which is the default).
CharacterCreation.prototype.resetCharacter = function () {

    //Loop through the dressup elements and call the randomise method
    for(var i = 0; i < this.dressUpElements.length; i++) {
        this.dressUpElements[i].reset();
    }

}




