const app = new PIXI.Application(800, 600, { transparent: true });
document.body.appendChild(app.view);

//PIXI.loader.add('atlas', 'https://raw.githubusercontent.com/MikeFlexor/game/master/atlas/atlas.json');
PIXI.loader.add('images/wall.png');
PIXI.loader.add('images/brick_1.png');
PIXI.loader.add('images/brick_2.png');
PIXI.loader.add('images/brick_3.png');
PIXI.loader.add('images/back.png');
PIXI.loader.add('images/fire_1.png');
PIXI.loader.add('images/fire_2.png');
PIXI.loader.add('images/fire_3.png');
PIXI.loader.add('images/fire_4.png');
PIXI.loader.add('images/player.png');
PIXI.loader.add('images/bullet.png');
PIXI.loader.add('images/bonus_ammo.png');
PIXI.loader.add('images/bonus_key.png');
PIXI.loader.add('images/door_close.png');
PIXI.loader.add('images/door_open.png');
PIXI.loader.add('images/menu_ammo.png');
PIXI.loader.add('images/menu_key_true.png');
PIXI.loader.add('images/menu_key_false.png');
/*PIXI.loader.add('images/Бетон_1.png');
PIXI.loader.add('images/Кирпич_1.png');
PIXI.loader.add('images/Кирпич_2.png');
PIXI.loader.add('images/Кирпич_3.png');
PIXI.loader.add('images/Панель_1.png');
PIXI.loader.add('images/Огонь.png');
PIXI.loader.add('images/Огонь_1.png');
PIXI.loader.add('images/Огонь_2.png');
PIXI.loader.add('images/Огонь_3.png');
PIXI.loader.add('images/Огонь_4.png');
PIXI.loader.add('images/Персонаж_3.png');
PIXI.loader.add('images/Пуля.png');
PIXI.loader.add('images/БонусПатроны.png');
PIXI.loader.add('images/БонусКлюч.png');
PIXI.loader.add('images/Дверь_закр.png');
PIXI.loader.add('images/Дверь_откр.png');
PIXI.loader.add('images/Меню_Патроны.png');
PIXI.loader.add('images/Меню_Ключ_Да.png');
PIXI.loader.add('images/Меню_Ключ_Нет.png');*/
PIXI.loader.load(setup);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//let music = new Audio('https://raw.githubusercontent.com/MikeFlexor/game/master/sounds/music.mp3');
//music.autoplay = true;



app.ticker.add(delta => gameUpdate(delta));
app.ticker.stop();

let player = {
	sprite: 0,
	x: 100,
	y: 100,
	w: 40,
	h: 64,
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
	hasKey: false
}

let offsetX = 0;
let offsetY = 0;

let tilingSprite;
let tiles = new PIXI.Container();
let tilesSprites = [];
let tileSize = 32;
let tileCountX = 100;
let tileCountY = 50;
// 0 - пустота
// 1 - бетон
// 2 - дверь
// 3 - бонус: патроны
// 4 - бонус: ключ
// 5 - кирпич
// 6 - полуразрушенный кирпич
// 7 - разрушенный кирпич
let tileMap1 = [

	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,1,1],
	[1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,0,0,0,0,0,3,0,3,0,3,0,3,0,5,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,8,8,8,8,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,8,8,0,0,0,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,5,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,5,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,1,1],
	[1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,5,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,8,8,1,1],
	[1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1],
	[1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,1,1],
	[1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,5,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1],
	[1,1,0,0,0,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,5,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1],
	[1,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,3,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,1,8,8,8,1,0,0,0,5,0,0,0,0,0,0,0,0,0,1,8,8,8,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,1,1],
	[1,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1],
	[1,1,0,0,0,1,1,1,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,8,8,0,0,0,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1],
	[1,1,8,0,0,2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,5,5,0,0,0,0,0,0,1,1],
	[1,1,8,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,8,8,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,8,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,0,0,0,0,0,0,1,1],
	[1,1,8,4,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,8,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,0,0,0,0,0,8,1,1],
	[1,1,8,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,4,0,0,8,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,8,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,8,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,8,8,1,1,1,8,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
	[1,1,8,0,0,0,0,0,1,0,0,0,0,0,8,8,0,0,0,0,0,0,8,8,0,0,0,0,0,8,8,8,1,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,4,0,0,0,0,0,0,0,0,0,0,1,1],
	[1,1,8,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,8,8,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,8,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
	[1,1,8,0,0,0,0,0,0,0,0,8,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,1,0,0,0,0,0,0,0,0,1,0,3,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,1],
	[1,1,8,1,1,0,0,0,0,0,0,8,1,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,5,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,5,0,0,0,1,0,0,0,1,1],
	[1,1,8,0,0,0,0,0,0,0,0,8,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,8,1,1,0,0,0,0,0,0,5,0,0,0,1,0,0,0,1,1],
	[1,1,8,0,0,0,0,0,0,0,0,8,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,5,0,0,0,1,0,0,0,1,1],
	[1,1,8,0,0,0,0,0,0,0,0,8,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,5,5,5,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1],
	[1,1,8,8,8,8,8,0,0,0,0,8,1,0,0,0,0,0,1,0,0,0,0,5,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,8,1,1,0,0,0,0,0,0,1,8,0,0,0,0,0,0,0,0,0,1,1],
	[1,1,1,1,1,1,1,0,0,0,0,8,1,1,1,1,1,1,1,0,0,0,0,5,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,0,4,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,1,8,0,0,0,0,0,0,0,0,0,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,8,1,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0,0,8,1,0,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1],
	[1,1,0,0,0,0,0,0,0,0,0,8,8,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,5,5,5,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1],
	[1,1,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,9,9],
	[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,9,9],
	[1,1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,8,0,0,0,8,0,0,5,8,8,8,8,1,0,0,0,8,8,8,8,8,8,8,8,8,8,1,1,1,1,1,1,1,8,8,8,8,8,8,8,8,8,8,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,8,8,8,8,8,1,0,0,0,0,0,0,0,2,0,0,9,9],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

];

let tileMap = [];
for (let i = 0; i < tileCountY; i++) {
	tileMap[i] = [];
}

let bullets = [];

let menuAmmo;
let menuAmmoCountText;
let menuKey;

let bonuses = [];

let doors = [];

let fireTextures = [];


let textStyle1 = new PIXI.TextStyle({
	fontFamily: 'Tahoma',
	fontSize: 20,
	fontWeight: 'bolder',
	align: 'center',
	fill: ['#FFA040'],
	stroke: '#404040',
	strokeThickness: 3,
	//dropShadow: true,
	//dropShadowColor: '#835D68',
	//dropShadowBlur: 2,
	//dropShadowAngle: Math.PI * 1.5,
	//dropShadowDistance: 3,
	//lineJoin: 'round',
	//lineHeight: 31
});


////////// НАЧАЛЬНЫЕ УСТАНОВКИ /////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function setup() {
	for (let i = 0; i < tileCountY; i++) {
		for (let j = 0; j < tileCountX; j++) {
			tileMap[i][j] = tileMap1[i][j];
		}
	}
	
	player.sprite = 0;
	player.x = 100;
	player.y = 100;
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
	
	offsetX = 0;
	offsetY = 0;
	
	
	for (let i = 0; i < 4; i++) {
		//let fire = PIXI.loader.resources['images/Огонь_' + (i + 1) + '.png'].texture;
		let fire = PIXI.loader.resources['images/fire_' + (i + 1) + '.png'].texture;
		//let fire = PIXI.Texture.fromFrame('fire_' + (i + 1) + '.png');
		fireTextures.push(fire);
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
				//tile = new PIXI.Sprite(PIXI.loader.resources["images/Бетон_1.png"].texture);
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
				//door.sprite = new PIXI.Sprite(PIXI.loader.resources["images/Дверь_закр.png"].texture);
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
					//bonus.sprite = new PIXI.Sprite(PIXI.loader.resources["images/БонусПатроны.png"].texture);
					bonus.sprite = new PIXI.Sprite(PIXI.loader.resources["images/bonus_ammo.png"].texture);
					//bonus.sprite = new PIXI.Sprite(PIXI.Texture.fromFrame('bonus_ammo.png'));
				} else if (bonus.type == 2) {
					//bonus.sprite = new PIXI.Sprite(PIXI.loader.resources["images/БонусКлюч.png"].texture);
					bonus.sprite = new PIXI.Sprite(PIXI.loader.resources["images/bonus_key.png"].texture);
					//bonus.sprite = new PIXI.Sprite(PIXI.Texture.fromFrame('bonus_key.png'));
				}
				bonus.sprite.x = bonus.x;
				bonus.sprite.y = bonus.y;
				bonuses.push(bonus);
				tileMap[i][j] = 0;
			}
			if (tileMap[i][j] == 5) {
				//tile = new PIXI.Sprite(PIXI.loader.resources["images/Кирпич_1.png"].texture);
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
		//PIXI.loader.resources["images/Панель_1.png"].texture,
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
	//const WIN_gift_mouseB = PIXI.Texture.fromFrame('WIN_gift_mouseB.png');
	//player.sprite = new PIXI.Sprite(PIXI.loader.resources["images/Персонаж_3.png"].texture);
	player.sprite = new PIXI.Sprite(PIXI.loader.resources["images/player.png"].texture);
	//player.sprite = new PIXI.Sprite(PIXI.Texture.fromFrame('player.png'));
	player.sprite.anchor.x = 0.5;
	player.sprite.x = player.x;
	player.sprite.y = player.y;
	player.sprite.width = 48;
	player.sprite.height = 48;
	app.stage.addChild(player.sprite);
	
	
	//menuAmmo = new PIXI.Sprite(PIXI.loader.resources["images/Меню_Патроны.png"].texture);
	menuAmmo = new PIXI.Sprite(PIXI.loader.resources["images/menu_ammo.png"].texture);
	//menuAmmo = new PIXI.Sprite(PIXI.Texture.fromFrame('menu_ammo.png'));
	menuAmmo.x = 10;
	menuAmmo.y = 10;
	app.stage.addChild(menuAmmo);
	
	//menuKey = new PIXI.Sprite(PIXI.loader.resources["images/Меню_Ключ_Нет.png"].texture);
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
	
	
	
	app.ticker.start();
	
	
	//music.play();
}


function restart() {
	app.ticker.stop();
	for (let i = app.stage.children.length - 1; i >= 0; i--) {
		app.stage.removeChild(app.stage.children[i]);
	}
	
	tiles.removeChildren();
	
	bullets = [];
	bonuses = [];
	doors = [];
	
	player.x = 100;
	player.y = 100;
	
	setup();
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
		}
	}
	if (e.keyCode == 32 && player.ammoCount > 0 && player.canShoot) {
		bulletAdd();
		player.canShoot = false;
	}
}


////////// ОТЖАТИЕ КЛАВИШИ /////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function keyUpHandler(e) {
	if(e.keyCode == 39) {
		player.moveRight = false;
		//player.moveLeft = false;
	}
	else if(e.keyCode == 37) {
		player.moveLeft = false;
		//player.moveRight = false;
	}
	if (e.keyCode == 32 && !player.canShoot) {
		player.canShoot = true;
	}
}


////////// ОБНОВЛЕНИЕ ДАННЫХ ПО ТИКУ ТАЙМЕРА ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function gameUpdate(delta){
	playerMove(delta);
	bulletMove(delta);
	bonusesUpdate();
}


////////// ПЕРЕМЕЩЕНИЕ ИГРОКА //////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function playerMove(delta) {
	if (player.moveLeft) {
		player.dX = -5
	} else if (player.moveRight) {
		player.dX = 5;
	} else {
		player.dX = 0;
	}
	
	player.nextX = player.x + player.dX * delta;
		
	let col = false;
	for (let j = Math.floor((player.x - player.w / 2) / tileSize); j <= Math.floor((player.x + player.w / 2) / tileSize); j++) {
		if ((tileMap[Math.floor((player.y + player.h) / tileSize) + 1][j] != 0) &&
			(player.y + player.h == Math.floor((player.y + player.h) / tileSize))) {
			col = true;
		}
	}
	if (!col) {
		player.onGround = false;
	}
	
	if (player.jump) {
		player.dY = -10;
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
					if (player.hasKey && checkCollision(player.nextX - player.w / 2, player.y, player.w, player.h, doors[i].x, doors[i].y, doors[i].w, doors[i].h)) {
						//doors[i].sprite.texture = PIXI.loader.resources["images/Дверь_откр.png"].texture;
						doors[i].sprite.texture = PIXI.loader.resources["images/door_open.png"].texture;
						//doors[i].sprite.texture = PIXI.Texture.fromFrame('door_open.png');
						tileMap[doors[i].bottomTileY][doors[i].bottomTileX] = 0;
						tileMap[doors[i].bottomTileY - 1][doors[i].bottomTileX] = 0;
						tileMap[doors[i].bottomTileY - 2][doors[i].bottomTileX] = 0;
						player.hasKey = false;
						//menuKey.texture = PIXI.loader.resources["images/Меню_Ключ_Нет.png"].texture;
						menuKey.texture = PIXI.loader.resources["images/menu_key_false.png"].texture;
						//menuKey.texture = PIXI.Texture.fromFrame('menu_key_false.png');
					}
				}
			}
			if (tileMap[i][Math.floor((player.nextX - player.w / 2) / tileSize)] == 8) {
				restart();
				//console.log('death');
			}
			if (tileMap[i][Math.floor((player.nextX - player.w / 2) / tileSize)] == 9) {
				alert('Вы выиграли!');
				restart();
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
					if (player.hasKey && checkCollision(player.nextX - player.w / 2, player.y, player.w, player.h, doors[i].x, doors[i].y, doors[i].w, doors[i].h)) {
						//doors[i].sprite.texture = PIXI.loader.resources["images/Дверь_откр.png"].texture;
						doors[i].sprite.texture = PIXI.loader.resources["images/door_open.png"].texture;
						//doors[i].sprite.texture = PIXI.Texture.fromFrame('door_open.png');
						tileMap[doors[i].bottomTileY][doors[i].bottomTileX] = 0;
						tileMap[doors[i].bottomTileY - 1][doors[i].bottomTileX] = 0;
						tileMap[doors[i].bottomTileY - 2][doors[i].bottomTileX] = 0;
						player.hasKey = false;
						//menuKey.texture = PIXI.loader.resources["images/Меню_Ключ_Нет.png"].texture;
						menuKey.texture = PIXI.loader.resources["images/menu_key_false.png"].texture;
						//menuKey.texture = PIXI.Texture.fromFrame('menu_key_false.png');
					}
				}
			} 
			if (tileMap[i][Math.floor((player.nextX + player.w / 2) / tileSize)] == 8) {
				restart();
				//console.log('death');
			}
			if (tileMap[i][Math.floor((player.nextX + player.w / 2) / tileSize)] == 9) {
				alert('Вы выиграли!');
				restart();
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
				restart();
				//console.log('death');
			}
			if (tileMap[Math.floor(player.nextY / tileSize)][j] == 9) {
				alert('Вы выиграли!');
				restart();
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
				restart();
				//console.log('death');
			}
			if (tileMap[Math.floor((player.nextY + player.h) / tileSize)][j] == 9) {
				alert('Вы выиграли!');
				restart();
			}
		}
		if (col) {
			player.nextY = Math.floor((player.nextY + player.h) / tileSize) * tileSize - player.h - 0.01;
			player.dY = 0;
			player.onGround = true;
		}
	}
	
	player.y = player.nextY;
	
	if ((player.x > app.screen.width / 2 - player.w / 2) && (player.x < tiles.width - app.screen.width / 2 - player.w / 2)) {
		offsetX = player.x - app.screen.width / 2 + player.w / 2;
	}
	if ((player.y > app.screen.height / 2 - player.h / 2) && (player.y < tiles.height - app.screen.height / 2 - player.h / 2)) {
		offsetY = player.y - app.screen.height / 2 + player.h / 2;
	}
	
	tiles.x = -offsetX;
	tiles.y = -offsetY;
	tilingSprite.x = -offsetX;
	tilingSprite.y = -offsetY;
	for (let i = 0; i < doors.length; i++) {
		doors[i].sprite.x = doors[i].x - offsetX;
		doors[i].sprite.y = doors[i].y - offsetY;
	}
	
	if (player.directionLeft) {
		player.sprite.scale.x = -0.75;
	} else {
		player.sprite.scale.x = 0.75;
	}
	
	player.sprite.x = player.x - offsetX;
	player.sprite.y = player.y - offsetY;
}


////////// СОЗДАНИЕ НОВОЙ ПУЛИ /////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function bulletAdd() {
	let bullet = {
		//sprite: new PIXI.Sprite(PIXI.loader.resources["images/Пуля.png"].texture),
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
	app.stage.addChild(bullet.sprite);
	bullets.push(bullet);
	player.ammoCount--;
	menuAmmoCountText.text = player.ammoCount;
	menuAmmoCountText.x = menuAmmo.x + menuAmmo.width - menuAmmoCountText.width - 5;
}


////////// ПЕРЕМЕЩЕНИЕ ПУЛИ ////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function bulletMove(delta) {
	for (let i = 0; i < bullets.length; i++) {
		bullets[i].x += bullets[i].dX * delta;
		bullets[i].sprite.x = bullets[i].x - offsetX;
		bullets[i].sprite.y = bullets[i].y - offsetY;
		
		//Попадание в бетон
		if (tileMap[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)] == 1) {
			bullets[i].sprite.parent.removeChild(bullets[i].sprite);
			bullets.splice(i, 1);
		} else 
		//Попадание в дверь
		if (tileMap[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)] > 1 && tileMap[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)] < 5) {
			bullets[i].sprite.parent.removeChild(bullets[i].sprite);
			bullets.splice(i, 1);
		} else 
		//Попадание в кирпич
		if (tileMap[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)] == 5) {
			tileMap[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)] = 6;			
			//tilesSprites[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)].texture = PIXI.loader.resources["images/Кирпич_2.png"].texture;
			tilesSprites[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)].texture = PIXI.loader.resources["images/brick_2.png"].texture;
			//tilesSprites[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)].texture = PIXI.Texture.fromFrame('brick_2.png');
			bullets[i].sprite.parent.removeChild(bullets[i].sprite);
			bullets.splice(i, 1);
		} else
		//Попадание в полуразрушенный кирпич
		if (tileMap[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)] == 6) {
			tileMap[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)] = 7;			
			//tilesSprites[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)].texture = PIXI.loader.resources["images/Кирпич_3.png"].texture;
			tilesSprites[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)].texture = PIXI.loader.resources["images/brick_3.png"].texture;
			//tilesSprites[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)].texture = PIXI.Texture.fromFrame('brick_3.png');
			bullets[i].sprite.parent.removeChild(bullets[i].sprite);
			bullets.splice(i, 1);
		} else
		//Попадание в разрушенный кирпич	
		if (tileMap[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)] == 7) {
			tileMap[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)] = 0;			
			tilesSprites[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)].parent.removeChild(tilesSprites[Math.floor(bullets[i].y / tileSize)][Math.floor(bullets[i].x / tileSize)]);
			bullets[i].sprite.parent.removeChild(bullets[i].sprite);
			bullets.splice(i, 1);
		} else
		//Вылет пули за границы	карты
		if ((bullets[i].x < tiles.x) || (bullets[i].x > tiles.width)) {
			bullets[i].sprite.parent.removeChild(bullets[i].sprite);
			bullets.splice(i, 1);
		}
	}
}


////////// ОБРАБОТКА БОНУСОВ ///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function bonusesUpdate() {
	for (let i = 0; i < bonuses.length; i++) {
		if (bonuses[i].sway < 62) {
			bonuses[i].sway++;
		} else {
			bonuses[i].sway = 0;
		}
		bonuses[i].dY = Math.sin(bonuses[i].sway / 10);
		bonuses[i].sprite.x = bonuses[i].x - offsetX;
		bonuses[i].sprite.y = bonuses[i].y + bonuses[i].dY * 10 - offsetY;
		if (bonuses[i].cooldown > 0) {
			bonuses[i].cooldown--;
		} else if (bonuses[i].cooldown == 0) {
			bonuses[i].sprite.visible = true;
		}
		if (bonuses[i].cooldown == 0 && checkCollision(player.x - player.w / 2, player.y, player.w, player.h, bonuses[i].x, bonuses[i].y, bonuses[i].w, bonuses[i].h)) {
			if (bonuses[i].type == 1) {
				bonuses[i].cooldown = 300;
				bonuses[i].sprite.visible = false;
				player.ammoCount += 10;
				menuAmmoCountText.text = player.ammoCount;
				menuAmmoCountText.x = menuAmmo.x + menuAmmo.width - menuAmmoCountText.width - 5;
			}
			if (bonuses[i].type == 2 && !player.hasKey) {
				bonuses[i].cooldown = -1;
				bonuses[i].sprite.visible = false;
				player.hasKey = true;
				//menuKey.texture = PIXI.loader.resources["images/Меню_Ключ_Да.png"].texture;
				menuKey.texture = PIXI.loader.resources["images/menu_key_true.png"].texture;
				//menuKey.texture = PIXI.Texture.fromFrame('menu_key_true.png');
			}
			//music.play();
		}
	}
}


////////// ПРОВЕРКА СТОЛКНОВЕНИЯ ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function checkCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
	return ((x1 + w1) > x2) && (x1 < (x2 + w2)) && ((y1 + h1) > y2) && (y1 < (y2 + h2));
}
