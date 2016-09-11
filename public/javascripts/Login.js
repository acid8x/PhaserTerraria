/**
 * Login state.
 */
function Login() {
    Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Login.prototype = proto;

Login.prototype.preload = function() {
    
};

Login.prototype.create = function() {
    console.log('Login State');
    this.game.state.start("CharacterCreation");
};

var characterSelect = function(name, hp, maxhp, lvl, xp, atk, def) {
    this.name = name;
    this.hp = hp;
    this.maxhp = maxhp;
    this.lvl = lvl;
    this.xp = xp;
    this.atk = atk;
    this.def = def;
}

/*
var base1 = new characterSelect('Base1', 100, 100, 1, 0, 10, 10);
var base2 = new characterSelect('Base2', 100, 100, 1, 45, 20, 20);
var base3 = new characterSelect('Base3', 120, 120, 10, 390978, 10, 30);
var base4 = new characterSelect('Base4', 200, 200, 50, 466, 60, 10);
var base5 = new characterSelect('Base5', 200, 400, 100, 4466743, 60, 80);

var selectCharacter;

var socket = io();

function login() {
    var loginform = document.getElementById('id01');
    var gameHolder = document.getElementById('game');
    var createGame = document.createElement('script');
    var characterSelect = document.forms["characterform"]["selectcharacter"].value;
    if(characterSelect == 'Base1') selectCharacter = base1;
    if(characterSelect == 'Base2') selectCharacter = base2;
    if(characterSelect == 'Base3') selectCharacter = base3;
    if(characterSelect == 'Base4') selectCharacter = base4;
    if(characterSelect == 'Base5') selectCharacter = base5;

    createGame.src = 'javascripts/Main.js';

    console.log(createGame);

    socket.emit('selectedCharacter', selectCharacter);

    loginform.remove();
    gameHolder.appendChild(createGame);
}*/