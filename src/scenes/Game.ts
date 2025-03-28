import { Scene } from 'phaser';

export class Game extends Scene {
	platforms: Phaser.Physics.Arcade.StaticGroup;

	constructor() {
		super('Game');
	}

	preload() {
		this.load.setPath('assets');

		this.load.image('sky', 'sky.png');
		this.load.image('ground', 'platform.png');
		this.load.image('star', 'star.png');
		this.load.image('bomb', 'bomb.png');
		this.load.spritesheet('dude', 'dude.png', {
			frameWidth: 32,
			frameHeight: 48,
		});
	}

	create() {
		this.add.image(0, 0, 'sky').setOrigin(0, 0);

		this.platforms = this.physics.add.staticGroup();
		this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

		this.platforms.create(600, 400, 'ground');
		this.platforms.create(50, 250, 'ground');
		this.platforms.create(750, 220, 'ground');
	}
}
