PixiGame.GameScene = function() {
    PIXI.Graphics.call(this);
    this._interactive = true;
    this._scale = 0.3;
    this.setup();
};
PixiGame.GameScene._position = 0;
PixiGame.GameScene.constructor = PixiGame.GameScene;
PixiGame.GameScene.prototype = Object.create(PIXI.Graphics.prototype);
PixiGame.GameScene.prototype.setup = function() {
	PIXI.loader
    .add('pixie', 'images/game/Pixie.json')
    .add('link','images/game/link.png')
    .load(function(loader,res){
    	PixiGame.GameScene._background = PIXI.Sprite.fromImage('images/game/iP4_BGtile.jpg');
	    PixiGame.GameScene._background2 = PIXI.Sprite.fromImage('images/game/iP4_BGtile.jpg');
	    PixiGame.stage.addChild(PixiGame.GameScene._background);
	    PixiGame.stage.addChild(PixiGame.GameScene._background2);

	    PixiGame.GameScene._foreground = PIXI.Sprite.fromImage('images/game/iP4_ground.png');
	    PixiGame.GameScene._foreground2 = PIXI.Sprite.fromImage('images/game/iP4_ground.png');
	    PixiGame.stage.addChild(PixiGame.GameScene._foreground);
	    PixiGame.stage.addChild(PixiGame.GameScene._foreground2);
	    PixiGame.GameScene._foreground.position.y = PixiGame.GameScene._foreground2.position.y = 640 - PixiGame.GameScene._foreground2.height;

        var linkBase = res.link.texture;
        var t0 = new PIXI.Texture(linkBase.baseTexture);
        t0.frame = new PIXI. Rectangle(0,90,90,90);
        var t1 = new PIXI.Texture(linkBase.baseTexture);
        t1.frame = new PIXI. Rectangle(90,90,90,90);
        var t2 = new PIXI.Texture(linkBase.baseTexture);
        t2.frame = new PIXI. Rectangle(180,90,90,90);
        PixiGame.GameScene._character = new PIXI.extras.AnimatedSprite([t0,t1,t2,t1]);//[t0,t1,t2,t1]
	    //PixiGame.GameScene._character.textures = { walk : [t0,t1,t2,t1], jump : [t0,t2] };


        PixiGame.GameScene._character.position.set(90,600);
        PixiGame.GameScene._character.animationSpeed = .15;

        /*var frames = PixiGame._Utils.filmstrip('images/game/link.png',90,90);
        PixiGame.GameScene._character = PixiGame._Utils.sprite(frames);
        PixiGame.GameScene._character.fps = 12;
        PixiGame.GameScene._character.position.set(90,600);
        PixiGame.GameScene._character.states = {
            walk : [5,6,7,6]
            ,jump : [5,5,5,6]
        };*/

        PixiGame.stage.addChild(PixiGame.GameScene._character);
    });
}
PixiGame.GameScene.prototype.animateBG = function(){
    PixiGame.GameScene._position += 5;
    PixiGame.GameScene._background.position.x = -(PixiGame.GameScene._position * 0.6);
    PixiGame.GameScene._background.position.x %= 1286 * 2;
    if(PixiGame.GameScene._background.position.x < 0){
        PixiGame.GameScene._background.position.x += 1286 * 2;
    }
    PixiGame.GameScene._background.position.x -= 1286;
    PixiGame.GameScene._background2.position.x = -(PixiGame.GameScene._position * 0.6) + 1286;
    PixiGame.GameScene._background2.position.x %= 1286 * 2;
    if(PixiGame.GameScene._background2.position.x < 0){
        PixiGame.GameScene._background2.position.x += 1286 * 2;
    }
    PixiGame.GameScene._background2.position.x -= 1286;
    PixiGame.GameScene._foreground.position.x = -PixiGame.GameScene._position;
    PixiGame.GameScene._foreground.position.x %= 1286 * 2;
    if(PixiGame.GameScene._foreground.position.x < 0){
        PixiGame.GameScene._foreground.position.x += 1286 * 2;
    }
    PixiGame.GameScene._foreground.position.x -= 1286;
    PixiGame.GameScene._foreground2.position.x = -PixiGame.GameScene._position + 1286;
    PixiGame.GameScene._foreground2.position.x %= 1286 * 2;
    if(PixiGame.GameScene._foreground2.position.x < 0){
        PixiGame.GameScene._foreground2.position.x += 1286 * 2;
    }
    PixiGame.GameScene._foreground2.position.x -= 1286;
}
PixiGame.GameScene.prototype.animateCharacter = function(){
	PixiGame.GameScene._character.play();
}
PixiGame.GameScene.prototype.update = function() {
	this.animateBG();
	this.animateCharacter();
}
PixiGame.GameScene.prototype.destroy = function() {
	this.removeChildren();
}
