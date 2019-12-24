const app = new PIXI.Application();

let appSize = [800, 600];
let appRatio = appSize[0] / appSize[1];
let renderer = PIXI.autoDetectRenderer(appSize[0], appSize[1], null);

document.body.appendChild(renderer.view);
//let container = new PIXI.Container();

resize();

function resize() {
	if (window.innerWidth / window.innerHeight >= appRatio) {
		var w = window.innerHeight * appRatio;
		var h = window.innerHeight;
	} else {
		var w = window.innerWidth;
		var h = window.innerWidth / appRatio;
	}
	renderer.view.style.width = w + 'px';
	renderer.view.style.height = h + 'px';
	renderer.view.style.position = 'absolute';
	renderer.view.style.left = ((window.innerWidth - w﻿) >> 1) + 'px';
	renderer.view.style.top = ((window.innerHeight - h﻿) >> 1) + 'px';
}
window.onresize = function(event) {
	resize();
};






PIXI.loader.add('images/wall.png');
PIXI.loader.add('images/brick_1.png');
PIXI.loader.add('images/brick_2.png');
PIXI.loader.add('images/brick_3.png');
PIXI.loader.add('images/back.png');
PIXI.loader.add('images/fire_1.png');
PIXI.loader.add('images/fire_2.png');
PIXI.loader.add('images/fire_3.png');
PIXI.loader.add('images/fire_4.png');
PIXI.loader.add('images/bullet.png');
PIXI.loader.add('images/bonus_ammo.png');
PIXI.loader.add('images/bonus_key.png');
PIXI.loader.add('images/door_close.png');
PIXI.loader.add('images/door_open.png');
PIXI.loader.add('images/menu_ammo.png');
PIXI.loader.add('images/menu_key_true.png');
PIXI.loader.add('images/menu_key_false.png');
PIXI.loader.add('images/explosion_1.png');
PIXI.loader.add('images/explosion_2.png');
PIXI.loader.add('images/explosion_3.png');
PIXI.loader.add('images/explosion_4.png');
PIXI.loader.add('images/explosion_5.png');
PIXI.loader.add('images/explosion_6.png');
PIXI.loader.add('images/explosion_7.png');
PIXI.loader.add('images/PlayerRunAnim/Run_0.png');
PIXI.loader.add('images/PlayerRunAnim/Run_1.png');
PIXI.loader.add('images/PlayerRunAnim/Run_2.png');
PIXI.loader.add('images/PlayerRunAnim/Run_3.png');
PIXI.loader.add('images/PlayerRunAnim/Run_4.png');
PIXI.loader.add('images/PlayerRunAnim/Run_5.png');
PIXI.loader.add('images/PlayerRunAnim/Run_6.png');
PIXI.loader.add('images/PlayerRunAnim/Run_7.png');
PIXI.loader.add('images/PlayerRunAnim/Run_8.png');
PIXI.loader.add('images/PlayerRunAnim/Run_9.png');
PIXI.loader.add('images/PlayerRunAnim/Run_10.png');
PIXI.loader.add('images/PlayerRunAnim/Run_11.png');
PIXI.loader.add('images/PlayerRunAnim/Run_12.png');
PIXI.loader.add('images/PlayerRunAnim/Run_13.png');
PIXI.loader.add('images/PlayerRunAnim/Run_14.png');
PIXI.loader.add('images/PlayerRunAnim/Run_15.png');
//PIXI.loader.add('images/player_run_2.png');
//PIXI.loader.add('images/player_run_3.png');
//PIXI.loader.add('images/player_run_4.png');

PIXI.loader.load(setup);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//let music = new Audio('https://raw.githubusercontent.com/MikeFlexor/game/master/sounds/music.mp3');
//music.autoplay = true;


app.ticker.add(delta => gameUpdate(delta));
app.ticker.stop();

let player = {
	sprite: 0,
	x: 0,
	y: 0,
	w: 40,
	h: 64,
	scale: 0,
	dX: 0,
	dY: 0,
	nextX: 0,
	nextY: 0,
	moveLeft: false,
	moveRight: false,
	onGround: false,
	jump: false,
	directionLeft: false,
	ammoCount: 0,
	canShoot: true,
	hasKey: false,
	alive: true
}

let offsetX = 0;
let offsetY = 0;

let tilingSprite;
let tiles = new PIXI.Container();
let tilesSprites = [];
let tileSize = 32;

let tileCountX;
let tileCountY;

let tileMap = [];

let bullets = [];

let explosionTextures = [];
let explosions = [];

let menuAmmo;
let menuAmmoCountText;
let menuKey;

let bonuses = [];

let doors = [];

let fireTextures = [];

let playerRunTextures = [];

let textStyle1 = new PIXI.TextStyle({
	fontFamily: 'Tahoma',
	fontSize: 20,
	fontWeight: 'bolder',
	align: 'center',
	fill: ['#FFFF88'],
	stroke: '#404040',
	strokeThickness: 4,
	lineJoin: 'round'
});

let textStyle2 = new PIXI.TextStyle({
	fontFamily: 'Tahoma',
	fontSize: 50,
	fontWeight: 'bolder',
	align: 'center',
	fill: ['#FFFFFF'],
	stroke: '#CC0000',
	strokeThickness: 10,
	lineJoin: 'round'
});

let textStyle3 = new PIXI.TextStyle({
	fontFamily: 'Tahoma',
	fontSize: 20,
	fontWeight: 'bolder',
	align: 'left',
	fill: ['#5599FF'],
	stroke: '#202020',
	strokeThickness: 6,
	lineJoin: 'round'
});

let gameOverCount = 0;
let gameOverRect = new PIXI.Graphics();

let gameOverText;

let messageLabel = {
	text: 0,
	count: 0
}


////////// НАЧАЛЬНЫЕ УСТАНОВКИ /////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function setup() {
	tileCountX = tilesCount[gameLevel * 2 - 2];
	tileCountY = tilesCount[gameLevel * 2 - 1];

	for (let i = 0; i < tileCountY; i++) {
		tileMap[i] = [];
	}

	for (let i = 0; i < tileCountY; i++) {
		for (let j = 0; j < tileCountX; j++) {
			tileMap[i][j] = tileMaps[gameLevel - 1][i][j];
		}
	}
	
	player.sprite = 0;
	player.x = playerPositions[gameLevel * 2 - 2];
	player.y = playerPositions[gameLevel * 2 - 1];;
	player.w = 30;
	player.h = 48;
	player.dX = 0;
	player.dY = 0;
	player.nextX = player.x;
	player.nextY = player.y;
	player.moveLeft = false;
	player.moveRight = false;
	player.onGround = false;
	player.jump = false;
	player.directionLeft = false;
	player.ammoCount = 0;
	player.canShoot = true;
	player.hasKey = false;
	player.alive = true;
	
	offsetX = 0;
	offsetY = 0;
	ChangeOffset();
	
	for (let i = 0; i < 4; i++) {
		let fire = PIXI.loader.resources['images/fire_' + (i + 1) + '.png'].texture;
		//let fire = PIXI.Texture.fromFrame('fire_' + (i + 1) + '.png');
		fireTextures.push(fire);
	}
	
	for (let i = 0; i < 7; i++) {
		let explosion = PIXI.loader.resources['images/explosion_' + (i + 1) + '.png'].texture;
		//let fire = PIXI.Texture.fromFrame('fire_' + (i + 1) + '.png');
		explosionTextures.push(explosion);
	}
	
	for (let i = 0; i < 16; i++) {
		let playerRun = PIXI.loader.resources['images/PlayerRunAnim/Run_' + (i) + '.png'].texture;
		//playerRun.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
		playerRunTextures.push(playerRun);
	}
	
	// ЗАГРУЗКА КАРТЫ ТАЙЛОВ
	for (let i = 0; i < tileCountY; i++) {
		tilesSprites[i] = [];
		for (let j = 0; j < tileCountX; j++) {
			let tile;
			if (tileMap[i][j] == 0) {
				tile = new PIXI.Sprite();
			}
			if (tileMap[i][j] == 1) {
				tile = new PIXI.Sprite(PIXI.loader.resources["images/wall.png"].texture);
				//tile = new PIXI.Sprite(PIXI.Texture.fromFrame('wall.png'));
			}
			if (tileMap[i][j] == 2) {
				tile = new PIXI.Sprite();
				tileMap[i - 1][j] = 2;
				tileMap[i - 2][j] = 2;
				let door = {
					sprite: 0,
					opened: false,
					x: 0,
					y: 0,
					w: 32,
					h: 96,
					bottomTileX: 0,
					bottomTileY: 0
				}
				door.bottomTileX = j;
				door.bottomTileY = i;
				door.x = j * tileSize;
				door.y = (i - 2) * tileSize;
				door.sprite = new PIXI.Sprite(PIXI.loader.resources["images/door_close.png"].texture);
				//door.sprite = new PIXI.Sprite(PIXI.Texture.fromFrame('door_close.png'));
				door.sprite.x = door.x;
				door.sprite.y = door.y;
				doors.push(door);
			}
			if (tileMap[i][j] == 3 || tileMap[i][j] == 4) {
				tile = new PIXI.Sprite();
				let bonus = {
					type: tileMap[i][j] - 2,
					sprite: 0,
					x: 0,
					y: 0,
					w: 32,
					h: 32,
					cooldown: 0,
					sway: 0,
					dy: 0
				}
				bonus.x = j * tileSize;
				bonus.y = i * tileSize;
				bonus.sway = Math.random() * 61;
				if (bonus.type == 1) {
					bonus.sprite = new PIXI.Sprite(PIXI.loader.resources["images/bonus_ammo.png"].texture);
					//bonus.sprite = new PIXI.Sprite(PIXI.Texture.fromFrame('bonus_ammo.png'));
				} else if (bonus.type == 2) {
					bonus.sprite = new PIXI.Sprite(PIXI.loader.resources["images/bonus_key.png"].texture);
					//bonus.sprite = new PIXI.Sprite(PIXI.Texture.fromFrame('bonus_key.png'));
				}
				bonus.sprite.x = bonus.x;
				bonus.sprite.y = bonus.y;
				bonuses.push(bonus);
				tileMap[i][j] = 0;
			}
			if (tileMap[i][j] == 5) {
				tile = new PIXI.Sprite(PIXI.loader.resources["images/brick_1.png"].texture);
				//tile = new PIXI.Sprite(PIXI.Texture.fromFrame('brick_1.png'));
			}
			if (tileMap[i][j] == 8) {
				tile = new PIXI.extras.AnimatedSprite(fireTextures);
				tile.animationSpeed = 0.15;
				tile.gotoAndPlay(Math.random() * 3);
			}
			if (tileMap[i][j] == 9) {
				tile = new PIXI.Sprite();
			}
			tile.x = j * tileSize;
			tile.y = i * tileSize;
			tile.width = tileSize;
			tile.height = tileSize;
			tilesSprites[i].push(tile);
			tiles.addChild(tile);
		}
	}
	
	// ЗАГРУЗКА ТАЙЛОВОГО ФОНА
	tilingSprite = new PIXI.extras.TilingSprite(
		PIXI.loader.resources["images/back.png"].texture,
		//PIXI.Texture.fromFrame('back.png'),
		tiles.width,
		tiles.height,
	);
	app.stage.addChild(tilingSprite);
	
	app.stage.addChild(tiles);
	
	for (let i = 0; i < doors.length; i++) {
		app.stage.addChild(doors[i].sprite);
	}
	
	for (let i = 0; i < bonuses.length; i++) {
		app.stage.addChild(bonuses[i].sprite);
	}

	// ЗАГРУЗКА ИГРОКА
	player.sprite = new PIXI.extras.AnimatedSprite(playerRunTextures);
	player.sprite.animationSpeed = 0.6;
	player.sprite.anchor.x = 0.5;
	//player.sprite.anchor.y = 0.5;
	player.sprite.x = player.x;
	player.sprite.y = player.y;
	player.sprite.width = 46;
	player.sprite.height = 48;
	player.scale = 1;
	app.stage.addChild(player.sprite);
	
	menuAmmo = new PIXI.Sprite(PIXI.loader.resources["images/menu_ammo.png"].texture);
	//menuAmmo = new PIXI.Sprite(PIXI.Texture.fromFrame('menu_ammo.png'));
	menuAmmo.x = 10;
	menuAmmo.y = 10;
	app.stage.addChild(menuAmmo);
	
	menuKey = new PIXI.Sprite(PIXI.loader.resources["images/menu_key_false.png"].texture);
	//menuKey = new PIXI.Sprite(PIXI.Texture.fromFrame('menu_key_false.png'));
	menuKey.x = 84;
	menuKey.y = 10;
	app.stage.addChild(menuKey);
	
	// ЗАГРУЗКА ТЕКСТА КОЛИЧЕСТВА ПАТРОНОВ
	menuAmmoCountText = new PIXI.Text(player.ammoCount, textStyle1);
	menuAmmoCountText.x = menuAmmo.x + menuAmmo.width - menuAmmoCountText.width - 5;
	menuAmmoCountText.y = 10;
	app.stage.addChild(menuAmmoCountText);
	
	gameOverCount = 0;
	app.stage.addChild(gameOverRect);
	gameOverRect.clear();
	
	gameOverText = new PIXI.Text('Вы погибли!', textStyle2);
	gameOverText.x = (app.screen.width - gameOverText.width) / 2;
	gameOverText.visible = false;
	app.stage.addChild(gameOverText);

	messageLabel.text = new PIXI.Text('', textStyle3);
	//messageLabel.text.x = messageLabel.x;
	//messageLabel.text.y = messageLabel.y;
	app.stage.addChild(messageLabel.text);
	
	ShowMessage(levelMessages[gameLevel - 1]);

	app.ticker.start();
}






////////// ПОКАЗ НОВОГО СООБЩЕНИЯ //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function ShowMessage(setText) {
	messageLabel.text.text = setText;
	messageLabel.count = 400;
	messageLabel.text.alpha = 0;
}




////////// РЕСТАРТ УРОВНЯ //////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function restart() {
	app.ticker.stop();
	for (let i = app.stage.children.length - 1; i >= 0; i--) {
		app.stage.removeChild(app.stage.children[i]);
	}
	
	tiles.removeChildren();
	
	bullets = [];
	bonuses = [];
	doors = [];
	
	setup();
}



////////// ИЗМЕНЕНИЕ СМЕЩЕНИЯ ФОНА /////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function ChangeOffset() {
	if ((player.x > app.screen.width / 2 - player.w / 2) && (player.x < tiles.width - app.screen.width / 2 - player.w / 2)) {
		offsetX = Math.floor(player.x - app.screen.width / 2 + player.w / 2);
	} else {
		if (player.x < app.screen.width / 2 - player.w / 2) {
			offsetX = 0;
		}
		if (player.x > tiles.width - app.screen.width / 2 - player.w / 2) {
			offsetX = tiles.width - app.screen.width;
		}
	}
	if ((player.y > app.screen.height / 2 - player.h / 2) && (player.y < tiles.height - app.screen.height / 2 - player.h / 2)) {
		offsetY = Math.floor(player.y - app.screen.height / 2 + player.h / 2);
	} else {
		if (player.y < app.screen.height / 2 - player.h / 2) {
			offsetY = 0;
		}
		if (player.y > tiles.height - app.screen.height / 2 - player.h / 2) {
			offsetY = tiles.height - app.screen.height;
		}
	}
}



////////// НАЖАТИЕ КЛАВИШИ /////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function keyDownHandler(e) {
	if (e.keyCode == 39) {
		player.moveRight = true;
		player.moveLeft = false;
		player.directionLeft = false;
	}
	else if (e.keyCode == 37) {
		player.moveLeft = true;
		player.moveRight = false;
		player.directionLeft = true;
	}
	if (e.keyCode == 38) {
		if (player.onGround) {
			player.jump = true;
			player.onGround = false;
			player.sprite.stop();
		}
	}
	if (e.keyCode == 32 && player.ammoCount > 0 && player.canShoot) {
		bulletAdd();
		player.canShoot = false;
	}
	if (!player.alive) {
		restart();
	}
}


////////// ОТЖАТИЕ КЛАВИШИ /////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function keyUpHandler(e) {
	if(e.keyCode == 39) {
		player.moveRight = false;
	}
	else if(e.keyCode == 37) {
		player.moveLeft = false;
	}
	if (e.keyCode == 32 && !player.canShoot) {
		player.canShoot = true;
	}
}


////////// ОБНОВЛЕНИЕ ДАННЫХ ПО ТИКУ ТАЙМЕРА ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function gameUpdate(delta){
	playerMove(delta);
	if (player.alive) {
		bulletMove(delta);
		bonusesUpdate(delta);
	}
	ChangeMessage(delta);
	renderer.render(app.stage);
}



////////// ИЗМЕНЕНИЕ ОТОБРАЖЕНИЯ СООБЩЕНИЯ /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function ChangeMessage(delta) {
	if (player.alive) {
		messageLabel.text.x = 20;
		messageLabel.text.y = 50;
	} else {
		messageLabel.text.x = (app.screen.width - messageLabel.text.width) / 2;
		messageLabel.text.y = 500;
	}

	if (messageLabel.count > 0) {
		messageLabel.count -= delta;
		if (messageLabel.count > 350) {
			messageLabel.text.alpha = (400 - messageLabel.count) / 50;
		} else if (messageLabel.count > 50) {
			messageLabel.text.alpha = 1;
		} else {
			messageLabel.text.alpha = 1 - (50 - messageLabel.count) / 50;;
		}
	} else {
		messageLabel.text.alpha = 0;
	}
}



////////// ПЕРЕМЕЩЕНИЕ ИГРОКА //////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function playerMove(delta) {

	function winLevel() {
		
		if (gameLevel < gameMaxLevel) {
			gameLevel++;
		} else {
			alert('Вы выиграли!');
			gameLevel = 1;
		}
		restart();
	}

	if (!player.alive) {
		gameOver(delta);
		if (messageLabel.count <= 0) {
			ShowMessage('Для рестарта нажмите любую клавишу!');
		}
		return;
	}
	
	if (player.moveLeft) {
		player.dX = -5
		if (player.onGround) {
			player.sprite.play();
		} else {
			player.sprite.gotoAndStop(0);
		}
	} else if (player.moveRight) {
		player.dX = 5;
		if (player.onGround) {
			player.sprite.play();
		} else {
			player.sprite.gotoAndStop(0);
		}
	} else {
		player.dX = 0;
		player.sprite.gotoAndStop(0);
	}
	
	player.nextX = player.x + player.dX * delta;
		
	let col = false;
	for (let j = Math.floor((player.x - player.w / 2) / tileSize); j <= Math.floor((player.x + player.w / 2) / tileSize); j++) {
		if ((tileMap[Math.floor((player.y + player.h) / tileSize) + 1][j] != 0)) {
			col = true;
		}
	}
	if (!col) {
		player.onGround = false;
	}
				
	if (player.jump) {
		player.dY = -9.8;
		player.jump = false;
	}
	
	if (!player.onGround) {
		if (player.dY < tileSize / delta - 0.3 * delta) {
			player.dY += 0.3 * delta;
		} else {
			player.dY = tileSize / delta - 0.01;
		}
	}
	
	player.nextY = player.y + player.dY * delta;
	
	if (player.dX < 0) {
		let col = false;
		for (let i = Math.floor((player.y + 0.01) / tileSize); i <= Math.floor((player.y + player.h) / tileSize); i++) {
			if (tileMap[i][Math.floor((player.nextX - player.w / 2) / tileSize)] != 0) {
				col = true;
			}
			if (tileMap[i][Math.floor((player.nextX - player.w / 2) / tileSize)] == 2) {
				for (let i = 0; i < doors.length; i++) {
					if (player.hasKey && checkCollision(player.nextX - player.w / 2, player.y, player.w, player.h, doors[i].x, doors[i].y, doors[i].w, doors[i].h) && !doors[i].opened) {
						doors[i].sprite.texture = PIXI.loader.resources["images/door_open.png"].texture;
						//doors[i].sprite.texture = PIXI.Texture.fromFrame('door_open.png');
						doors[i].opened = true;
						tileMap[doors[i].bottomTileY][doors[i].bottomTileX] = 0;
						tileMap[doors[i].bottomTileY - 1][doors[i].bottomTileX] = 0;
						tileMap[doors[i].bottomTileY - 2][doors[i].bottomTileX] = 0;
						player.hasKey = false;
						menuKey.texture = PIXI.loader.resources["images/menu_key_false.png"].texture;
						//menuKey.texture = PIXI.Texture.fromFrame('menu_key_false.png');
					}
				}
			}
			if (tileMap[i][Math.floor((player.nextX - player.w / 2) / tileSize)] == 8) {
				player.alive = false;
				ShowMessage('Для рестарта нажмите любую клавишу!');
			}
			if (tileMap[i][Math.floor((player.nextX - player.w / 2) / tileSize)] == 9) {
				winLevel();
			}
		}
		if (col) {
			player.nextX = Math.floor((player.x - player.w / 2)/ tileSize) * tileSize + player.w / 2;
		}
	} else if (player.dX > 0) {
		let col = false;
		for (let i = Math.floor((player.y + 0.01) / tileSize); i <= Math.floor((player.y + player.h) / tileSize); i++) {
			if (tileMap[i][Math.floor((player.nextX + player.w / 2) / tileSize)] != 0) {
				col = true;
			}
			if (tileMap[i][Math.floor((player.nextX + player.w / 2) / tileSize)] == 2) {
				for (let i = 0; i < doors.length; i++) {
					if (player.hasKey && checkCollision(player.nextX - player.w / 2, player.y, player.w, player.h, doors[i].x, doors[i].y, doors[i].w, doors[i].h) && !doors[i].opened) {
						doors[i].sprite.texture = PIXI.loader.resources["images/door_open.png"].texture;
						//doors[i].sprite.texture = PIXI.Texture.fromFrame('door_open.png');
						doors[i].opened = true;
						tileMap[doors[i].bottomTileY][doors[i].bottomTileX] = 0;
						tileMap[doors[i].bottomTileY - 1][doors[i].bottomTileX] = 0;
						tileMap[doors[i].bottomTileY - 2][doors[i].bottomTileX] = 0;
						player.hasKey = false;
						menuKey.texture = PIXI.loader.resources["images/menu_key_false.png"].texture;
						//menuKey.texture = PIXI.Texture.fromFrame('menu_key_false.png');
					}
				}
			} 
			if (tileMap[i][Math.floor((player.nextX + player.w / 2) / tileSize)] == 8) {
				player.alive = false;
				ShowMessage('Для рестарта нажмите любую клавишу!');
			}
			if (tileMap[i][Math.floor((player.nextX + player.w / 2) / tileSize)] == 9) {
				winLevel();
			}
		}
		if (col) {
			player.nextX = Math.floor((player.nextX + player.w / 2) / tileSize) * tileSize - player.w / 2 - 0.01;
		}
	}
	
	player.x = player.nextX;
	
	if (player.dY < 0) {
		let col = false;
		for (let j = Math.floor((player.x - player.w / 2) / tileSize); j <= Math.floor((player.x + player.w / 2) / tileSize); j++) {
			if (tileMap[Math.floor(player.nextY / tileSize)][j] != 0) {
				col = true;
			}
			if (tileMap[Math.floor(player.nextY / tileSize)][j] == 8) {
				player.alive = false;
				ShowMessage('Для рестарта нажмите любую клавишу!');
			}
			if (tileMap[Math.floor(player.nextY / tileSize)][j] == 9) {
				winLevel();
			}
		}
		if (col) {
			player.nextY = Math.floor(player.nextY / tileSize) * tileSize + tileSize;
			player.dY = 0;
		}
	} else if (player.dY > 0) {
		let col = false;
		for (let j = Math.floor((player.x - player.w / 2) / tileSize); j <= Math.floor((player.x + player.w / 2) / tileSize); j++) {
			if (tileMap[Math.floor((player.nextY + player.h) / tileSize)][j] != 0) {
				col = true;
			}
			if (tileMap[Math.floor((player.nextY + player.h) / tileSize)][j] == 8) {
				player.alive = false;
				ShowMessage('Для рестарта нажмите любую клавишу!');
			}
			if (tileMap[Math.floor((player.nextY + player.h) / tileSize)][j] == 9) {
				winLevel();
			}
		}
		if (col) {
			player.nextY = Math.floor((player.nextY + player.h) / tileSize) * tileSize - player.h - 0.01;
			player.dY = 0;
			player.onGround = true;
		}
	}
	
	player.y = player.nextY;

	ChangeOffset();
	
	tiles.x = -offsetX;
	tiles.y = -offsetY;
	tilingSprite.x = -offsetX;
	tilingSprite.y = -offsetY;
	for (let i = 0; i < doors.length; i++) {
		doors[i].sprite.x = doors[i].x - offsetX;
		doors[i].sprite.y = doors[i].y - offsetY;
	}
	for (let i = 0; i < explosions.length; i++) {
		explosions[i].sprite.x = explosions[i].x;
		explosions[i].sprite.y = explosions[i].y;
	}	
	
	if (player.directionLeft) {
		player.sprite.scale.x = -player.scale;
	} else {
		player.sprite.scale.x = player.scale;
	}
	
	player.sprite.x = player.x - offsetX;
	player.sprite.y = player.y - offsetY;
}


////////// СОЗДАНИЕ НОВОЙ ПУЛИ /////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function bulletAdd() {
	let bullet = {
		sprite: new PIXI.Sprite(PIXI.loader.resources["images/bullet.png"].texture),
		//sprite: new PIXI.Sprite(PIXI.Texture.fromFrame('bullet.png')),
		x: 0,
		y: player.y + player.h / 1.5,
		w: 8,
		h: 8,
		dX: 0,
		dY: 0
	}
	if (player.directionLeft) {
		bullet.x = player.x - player.w / 2;
	} else {
		bullet.x = player.x + player.w / 2;
	}
	bullet.sprite.anchor.x = 0.5;
	bullet.sprite.anchor.y = 0.5;
	bullet.sprite.x = bullet.x;
	bullet.sprite.y = bullet.y;
	if (player.directionLeft) {
		bullet.dX = -10;
	} else {
		bullet.dX = 10;
	}
	tiles.addChild(bullet.sprite);
	bullets.push(bullet);
	player.ammoCount--;
	menuAmmoCountText.text = player.ammoCount;
	menuAmmoCountText.x = menuAmmo.x + menuAmmo.width - menuAmmoCountText.width - 5;
}


////////// СОЗДАНИЕ НОВОГО ВЗРЫВА /////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function explosionAdd(setX, setY) {
	let explosion = {
		sprite: new PIXI.extras.AnimatedSprite(explosionTextures),
		x: setX,
		y: setY
	}
	explosion.sprite.animationSpeed = 0.8;
	explosion.sprite.loop = false;
	explosion.sprite.onComplete = function() {
		explosion.sprite.parent.removeChild(explosion.sprite);
		explosions.splice(explosions.indexOf(explosion), 1);
	};
	explosion.sprite.anchor.x = 0.5;
	explosion.sprite.anchor.y = 0.5;
	explosion.sprite.x = explosion.x;
	explosion.sprite.y = explosion.y;
	explosion.sprite.play();
	tiles.addChild(explosion.sprite);
	explosions.push(explosion);
}


////////// ПЕРЕМЕЩЕНИЕ ПУЛИ ////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function bulletMove(delta) {
	for (let i = 0; i < bullets.length; i++) {
		bullets[i].x += bullets[i].dX * delta;
		bullets[i].sprite.x = bullets[i].x;
		bullets[i].sprite.y = bullets[i].y;
		
		//Попадание в бетон
		if (tileMap[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)] == 1) {
			/*if (bullets[i].dX > 0) {
				explosionAdd(Math.floor(bullets[i].x / tileSize) * tileSize, bullets[i].y);
			} else {
				explosionAdd(Math.floor(bullets[i].x / tileSize) * tileSize + tileSize, bullets[i].y);
			}*/
			explosionAdd(bullets[i].x, bullets[i].y);
			bullets[i].sprite.parent.removeChild(bullets[i].sprite);
			bullets.splice(i, 1);
		} else 
		//Попадание в дверь
		if (tileMap[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)] > 1 && tileMap[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)] < 5) {
			/*if (bullets[i].dX > 0) {
				explosionAdd(Math.floor(bullets[i].x / tileSize) * tileSize, bullets[i].y);
			} else {
				explosionAdd(Math.floor(bullets[i].x / tileSize) * tileSize + tileSize, bullets[i].y);
			}*/
			explosionAdd(bullets[i].x, bullets[i].y);
			bullets[i].sprite.parent.removeChild(bullets[i].sprite);
			bullets.splice(i, 1);
		} else 
		//Попадание в кирпич
		if (tileMap[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)] == 5) {
			tileMap[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)] = 6;			
			//tilesSprites[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)].texture = PIXI.loader.resources["images/Кирпич_2.png"].texture;
			tilesSprites[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)].texture = PIXI.loader.resources["images/brick_2.png"].texture;
			//tilesSprites[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)].texture = PIXI.Texture.fromFrame('brick_2.png');
			/*if (bullets[i].dX > 0) {
				explosionAdd(Math.floor(bullets[i].x / tileSize) * tileSize, bullets[i].y);
			} else {
				explosionAdd(Math.floor(bullets[i].x / tileSize) * tileSize + tileSize, bullets[i].y);
			}*/
			explosionAdd(bullets[i].x, bullets[i].y);
			bullets[i].sprite.parent.removeChild(bullets[i].sprite);
			bullets.splice(i, 1);
		} else
		//Попадание в полуразрушенный кирпич
		if (tileMap[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)] == 6) {
			tileMap[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)] = 7;			
			//tilesSprites[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)].texture = PIXI.loader.resources["images/Кирпич_3.png"].texture;
			tilesSprites[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)].texture = PIXI.loader.resources["images/brick_3.png"].texture;
			//tilesSprites[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)].texture = PIXI.Texture.fromFrame('brick_3.png');
			/*if (bullets[i].dX > 0) {
				explosionAdd(Math.floor(bullets[i].x / tileSize) * tileSize, bullets[i].y);
			} else {
				explosionAdd(Math.floor(bullets[i].x / tileSize) * tileSize + tileSize, bullets[i].y);
			}*/
			explosionAdd(bullets[i].x, bullets[i].y);
			bullets[i].sprite.parent.removeChild(bullets[i].sprite);
			bullets.splice(i, 1);
		} else
		//Попадание в разрушенный кирпич	
		if (tileMap[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)] == 7) {
			tileMap[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)] = 0;			
			tilesSprites[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)].parent.removeChild(tilesSprites[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)]);
			/*if (bullets[i].dX > 0) {
				explosionAdd(Math.floor(bullets[i].x / tileSize) * tileSize, bullets[i].y);
			} else {
				explosionAdd(Math.floor(bullets[i].x / tileSize) * tileSize + tileSize, bullets[i].y);
			}*/
			explosionAdd(bullets[i].x, bullets[i].y);
			bullets[i].sprite.parent.removeChild(bullets[i].sprite);
			bullets.splice(i, 1);
		} else
		//Вылет пули за границы	карты
		if ((bullets[i].x < tilingSprite.x + offsetX) || (bullets[i].x > tilingSprite.width)) {
			bullets[i].sprite.parent.removeChild(bullets[i].sprite);
			bullets.splice(i, 1);
		}
	}
}


////////// ОБРАБОТКА БОНУСОВ ///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function bonusesUpdate(delta) {
	for (let i = 0; i < bonuses.length; i++) {
		/*if (bonuses[i].sway < 62) {
			bonuses[i].sway += delta;
		} else {
			bonuses[i].sway = 0;
		}*/
		bonuses[i].sway += delta;
		bonuses[i].dY = Math.sin(bonuses[i].sway / 30);
		bonuses[i].sprite.x = bonuses[i].x - offsetX;
		bonuses[i].sprite.y = bonuses[i].y + bonuses[i].dY * 15 - offsetY;
		if (bonuses[i].cooldown > 1000) {
		} else if (bonuses[i].cooldown > 0) {
			bonuses[i].cooldown -= delta;
		} else if (bonuses[i].cooldown < 0) {
			bonuses[i].cooldown = 0;
			bonuses[i].sprite.visible = true;
		}
		if (bonuses[i].cooldown == 0 && checkCollision(player.x - player.w / 2, player.y, player.w, player.h, bonuses[i].x, bonuses[i].y, bonuses[i].w, bonuses[i].h)) {
			if (bonuses[i].type == 1) {
				bonuses[i].cooldown = 500;
				bonuses[i].sprite.visible = false;
				player.ammoCount += 10;
				menuAmmoCountText.text = player.ammoCount;
				menuAmmoCountText.x = menuAmmo.x + menuAmmo.width - menuAmmoCountText.width - 5;
			}
			if (bonuses[i].type == 2 && !player.hasKey) {
				bonuses[i].cooldown = 2000;
				bonuses[i].sprite.visible = false;
				player.hasKey = true;
				menuKey.texture = PIXI.loader.resources["images/menu_key_true.png"].texture;
				//menuKey.texture = PIXI.Texture.fromFrame('menu_key_true.png');
			}
		}
	}
}


////////// ПРОВЕРКА СТОЛКНОВЕНИЯ ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function checkCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
	return ((x1 + w1) > x2) &&
			(x1 < (x2 + w2)) &&
			((y1 + h1) > y2) &&
			(y1 < (y2 + h2));
}


////////// ДЕЙСТВИЯ ПРИ СМЕРТИ ИГРОКА //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function gameOver(delta) {
	let moveRect_1;
	let moveRect_2;
	let moveRect_3;
	let moveRect_4;
	player.sprite.stop();
	for (let i = 0; i < tileCountY; i++) {
		for (let j = 0; j < tileCountX; j++) {
			if (tileMap[i][j] == 8) {
				tilesSprites[i][j].stop();
			}
		}
	}
	for (let i = 0; i < explosions.length; i++) {
		explosions[i].sprite.stop();
	}
	
	if (gameOverCount < 50) {
		gameOverCount++;
		gameOverText.visible = true;
		gameOverText.y = gameOverCount * 2 - gameOverText.height;
		moveRect_1 = Math.round(player.sprite.y * gameOverCount / 50);
		moveRect_2 = Math.round((app.screen.width - player.sprite.x - player.sprite.width / 2) * gameOverCount / 50);
		moveRect_3 = Math.round((app.screen.height - player.sprite.y - player.sprite.height) * gameOverCount / 50);
		moveRect_4 = Math.round((player.sprite.x - player.sprite.width / 2) * gameOverCount / 50);
		//gameOverRect.clear();
		gameOverRect.beginFill(0x000000, 0.07);
		gameOverRect.drawRect(0, 0, app.screen.width, moveRect_1);
		gameOverRect.drawRect(app.screen.width - moveRect_2, moveRect_1, moveRect_2, app.screen.height - moveRect_3 - moveRect_1);
		gameOverRect.drawRect(0, app.screen.height - moveRect_3, app.screen.width, moveRect_3);
		gameOverRect.drawRect(0, moveRect_1, moveRect_4, app.screen.height - moveRect_3 - moveRect_1);
		gameOverRect.endFill();
	}
}
