/**
 * Global variables
 */
var map,
    layer = [],
    socket,
    player,
    gui = {},
    tools = [],
    style = {
        font: "12px Arial",
        fill: "#ffffff",
        align: "center"
    };


/**
 * Play state.
 */
function Play() {
    Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Play.prototype = proto;

Play.prototype.init = function() {

};

Play.prototype.create = function () {

    this.physics.startSystem(Phaser.Physics.ARCADE);
    socket = io.connect();
    tools = this.cache.getJSON('tools');

    this.createMap();
    this.createPlayer();
    this.createTileMarker();
    this.createMenuGroup();
    this.createInputEvents();
    this.setEventHandler();
};

Play.prototype.setEventHandler = function(){
    socket.on('connect', this.onSocketConnected);
    socket.on('disconnect', this.onSocketDisconnect);
    socket.on('new player', this.onNewPlayer);
    socket.on('move player', this.onMovePlayer);
    socket.on('remove player', this.onRemovePlayer);
};

Play.prototype.onSocketConnected = function(data) {
    console.log('onSocketConnected' + data);
};

Play.prototype.onSocketDisconnect = function(data) {
    console.log('onSocketDisconnect' + data);
};

Play.prototype.onNewPlayer = function(data) {
    console.log('onNewPlayer' + data);
};

Play.prototype.onMovePlayer = function(data) {
    console.log('onMovePlayer' + data);
};

Play.prototype.onRemovePlayer = function(data) {
    console.log('onRemovePlayer' + data);
};

Play.prototype.update = function() {

    this.physics.arcade.collide(player, layer[1]);

    this.updatePlayerMovements();

};

Play.prototype.render = function () {

};

Play.prototype.createMap = function() {

    map = this.add.tilemap('map');
    map.addTilesetImage('tiles', 'tiles');
    map.addTilesetImage('crack', 'crack');

    layer[0] = map.createLayer('Tile Layer 1');
    layer[1] = map.createLayer('Tile Layer 2');
    map.setCollisionBetween(1, 10000, true, layer[1]);
    layer[2] = map.createLayer('Tile Layer 3');

    layer[0].resizeWorld();

};

Play.prototype.createPlayer = function() {

    player = this.add.sprite(50, 50, 'player');
    this.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.setSize(30, 46, 3, 5);
    player.anchor.setTo(0.5, 0.5);
    player.body.gravity.y = 550;
    player.body.gravity.x = 20;
    player.body.velocity.x = 100;
    player.useQuickBarItem = null;
    player.toolSprite = this.make.sprite(0,10,null);
    player.toolSprite.anchor.setTo(0, 1);
    this.physics.arcade.enable(player.toolSprite);
    player.addChild(player.toolSprite);
    player.equipment = {
        head:{},
        body:{},
        foot:{},
        acc1:{},
        acc2:{},
        tool:{
            NAME:null,
            DMG:null,
            SPD:null,
            STR:null,
            RNG:null,
            sprite:null
        }
    };
    player.inventory = [];
    for (var i = 0; i < 40; i++) {
        player.inventory[i] = {
            tileIndex: -1,
            tileQuantity: 0,
            tileProperties: {}
        }
    }
    player.facing = 'left';
    player.marker = this.add.graphics();

    player.animations.add('left', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 20, true);
    player.animations.add('turn', [14], 20, true);
    player.animations.play(player.facing);

    this.camera.follow(player);

};

Play.prototype.createTileMarker = function() {

    player.marker.lineStyle(2, 0x000000, 1);
    player.marker.drawRect(0, 0, 32, 32);

};

Play.prototype.updateMarker = function() {

    player.marker.x = layer[1].getTileX(this.input.activePointer.worldX) * 32;
    player.marker.y = layer[1].getTileY(this.input.activePointer.worldY) * 32;

};

Play.prototype.createMenuGroup = function() {

    gui.inventory = this.add.group();

    var inventoryBackground = this.make.graphics();
    inventoryBackground.beginFill(0x000000, 0.6);
    inventoryBackground.drawRoundedRect(16, 72, 444, 180, 10);
    inventoryBackground.endFill();

    gui.inventory.add(inventoryBackground);

    gui.inventory.socket = [];

    var i;
    var x = 20;
    var y = 76;

    for (i = 0; i < 40; i++) {
        gui.inventory.socket[i] = {};
        gui.inventory.socket[i].background = this.make.graphics();
        gui.inventory.socket[i].background.beginFill(0x666666, 0.7);
        gui.inventory.socket[i].background.drawRoundedRect(x, y, 40, 40, 5);
        gui.inventory.socket[i].background.endFill();
        gui.inventory.add(gui.inventory.socket[i].background);
        x += 44;
        if (x > 444) {
            x = 20;
            y += 44;
        }
    }

    gui.inventory.fixedToCamera = true;
    gui.inventory.alpha = 0;

    gui.quickBar = this.add.group();

    var quickBarBackground = this.make.graphics();
    quickBarBackground.beginFill(0x000000, 0.6);
    quickBarBackground.drawRoundedRect(16, 16, 444, 48, 10);
    quickBarBackground.endFill();

    gui.quickBar.add(quickBarBackground);

    gui.quickBar.socket = [];

    x = 20;
    y = 20;

    for (i = 0; i < 10; i++) {
        gui.quickBar.socket[i] = {
            selectedMarker: this.make.sprite(x,y,'selector'),
            background: this.make.graphics(),
            itemSprite: this.make.sprite(x+4,y+4,null)
        };
        gui.quickBar.socket[i].background.beginFill(0x666666, 0.7);
        gui.quickBar.socket[i].background.drawRoundedRect(x, y, 40, 40, 5);
        gui.quickBar.socket[i].background.endFill();
        gui.quickBar.socket[i].selectedMarker.alpha = 0;
        gui.quickBar.add(gui.quickBar.socket[i].background);
        gui.quickBar.add(gui.quickBar.socket[i].selectedMarker);
        gui.quickBar.add(gui.quickBar.socket[i].itemSprite);
        x += 44;
    }

    gui.quickBar.fixedToCamera = true;
    gui.quickBar.alpha = 1;

    gui.quickBar.socket[0].item = tools[0];
    gui.quickBar.socket[0].itemSprite.loadTexture(gui.quickBar.socket[0].item.sprite);

};

Play.prototype.createInputEvents = function() { //function createInputEvents() {

    this.game.input.addMoveCallback(this.updateMarker, this);

    this.game.input.mouse.mouseWheelCallback = this.mouseWheel;
    this.game.input.keyboard.addKey(Phaser.Keyboard.I).onDown.add(this.showInventoryMenu, this);

};

Play.prototype.showInventoryMenu = function() { //function showInventoryMenu() {

    gui.inventory.alpha = !gui.inventory.alpha;
    this.buildInventoryMenu();

};

Play.prototype.buildInventoryMenu = function() { //function buildInventoryMenu() {

    for (var i = 0; i < 40; i++) {
        if (player.inventory[i].tileIndex != -1) {
            var sprite = this.game.make.sprite(4, 4, 'tilesSprite', player.inventory[i].tileIndex - 1);
            var text = '';
            text += player.inventory[i].tileQuantity;
            var textSprite;
            if (player.inventory[i].tileQuantity < 10) {
                textSprite = this.game.add.text(22, 16, text, style);
            } else {
                textSprite = this.game.add.text(15, 16, text, style);
            }
            sprite.addChild(textSprite);
            gui.inventory.socket[i].background.addChild(sprite);
        }
    }

};

Play.prototype.updatePlayerMovements = function() { //function updatePlayerMovements() {

    player.body.velocity.x = 0;

    if (this.game.input.keyboard.addKey(Phaser.Keyboard.A).isDown) {
        player.scale.x = 1;
        player.body.velocity.x = -150;
        if (player.facing != 'left') {
            player.animations.play('left');
            player.facing = 'left';
        }
    } else if (this.game.input.keyboard.addKey(Phaser.Keyboard.D).isDown) {
        player.scale.x = -1;
        player.body.velocity.x = 150;
        if (player.facing != 'right') {
            player.animations.play('left');
            player.facing = 'right';
        }
    } else {
        if (player.facing != 'idle') {
            player.animations.stop();
            if (player.facing == 'left') {
                player.scale.x = 1;
            } else {
                player.scale.x = -1;
            }
            player.frame = 14;
            player.facing = 'idle';
        }
    }

    if (this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown && player.body.blocked.down) {
        player.body.velocity.y = -350;
    }

    for (var i = 48; i < 58; i++) {
        var num = i - 49;
        if (num == -1) num = 9;
        if (this.game.input.keyboard.addKey(i).isDown) this.useItemNumber(num);
    }
};

Play.prototype.mouseWheel = function() { //function mouseWheel() {

    console.log(this.game.input.mouse.wheelDelta);

};

Play.prototype.useItemNumber = function(num) { //function useItemNumber(num) {

    if (player.useQuickBarItem != num) {
        if (player.useQuickBarItem != null) {
            var oldSelection = player.useQuickBarItem;
            gui.quickBar.socket[oldSelection].selectedMarker.loadTexture(null);
        }
        player.useQuickBarItem = num;
        gui.quickBar.socket[num].selectedMarker.loadTexture('selector');
        player.removeChild(player.toolSprite);
        player.toolSprite.loadTexture(null);
        player.equipment.tool = {};
        if (gui.quickBar.socket[num].item != null) {
            player.equipment.tool = gui.quickBar.socket[num].item;
            player.toolSprite.loadTexture(player.equipment.tool.sprite);
            this.physics.arcade.enable(player.toolSprite);
            player.addChild(player.toolSprite);
            player.toolSprite.angle = -20;
        }
    }

};

Play.prototype.hitTile = function(tile) { //function isTileDestroy(tile) {

    var distance = Math.sqrt((Math.pow(player.position.x - tile.worldX,2)+Math.pow(player.position.y - tile.worldY,2)));

    if (player.toolSprite.angle >= 60) {
        player.toolSprite.angle = -20;
        if (tile.index != -1 && distance < player.equipment.tool.RNG && tile.properties.minForce <= player.equipment.tool.STR) {
            tile.properties.currentHp -= player.equipment.tool.DMG;
            if (tile.properties.currentHp <= 0) {
                this.sendToInventory(tile);
                map.putTile(-1, layer[1].getTileX(player.marker.x), layer[1].getTileY(player.marker.y), layer[1]);
                map.putTile(-1, layer[2].getTileX(player.marker.x), layer[2].getTileY(player.marker.y), layer[2]);
            } else {
                var crackLength = tile.properties.currentHp / tile.properties.maxHp;
                var crackTile = 153;
                for (var a = 0; a < 5; a++) {
                    if (crackLength > 0) crackTile--;
                    crackLength -= 0.2;
                }
                map.putTile(crackTile, layer[2].getTileX(player.marker.x), layer[2].getTileY(player.marker.y), layer[2]);
            }
        }
    }

};

Play.prototype.sendToInventory = function(tile) { //function sendToInventory(tile) {

    var tileFound = false;
    var emptySlotId = -1;

    for (var i = 0; i < 40; i++) {
        if (player.inventory[i].tileIndex == tile.index) {
            player.inventory[i].tileQuantity++;
            tileFound = true;
            break;
        } else if (player.inventory[i].tileIndex == -1) {
            emptySlotId = i;
            break;
        }
    }

    if (!tileFound && emptySlotId != -1) {
        player.inventory[emptySlotId].tileIndex = tile.index;
        player.inventory[emptySlotId].tileQuantity = 1;
        player.inventory[emptySlotId].tileProperties = tile.properties;
    }

    this.buildInventoryMenu();

};