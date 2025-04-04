import { Scene } from 'phaser';
import {
	HORIZONTAL_VELOCITY,
	JUMP_VELOCITY,
	PLAYER_BOUNCE,
} from '../lib/constants';

export class Game extends Scene {
	platforms: Phaser.Physics.Arcade.StaticGroup;
	player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
	kb: Phaser.Types.Input.Keyboard.CursorKeys;
	aKey: Phaser.Input.Keyboard.Key;
	dKey: Phaser.Input.Keyboard.Key;

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
		//world config
		this.add.image(0, 0, 'sky').setOrigin(0, 0);

		//platforms
		this.platforms = this.physics.add.staticGroup();
		this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

		this.platforms.create(600, 420, 'ground');
		this.platforms.create(50, 260, 'ground');
		this.platforms.create(750, 180, 'ground');

		//player config
		this.player = this.physics.add.sprite(100, 500, 'dude');
		this.player.setBounce(PLAYER_BOUNCE);
		this.player.setCollideWorldBounds(true);
		this.physics.add.collider(this.player, this.platforms);

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1,
		});

		this.anims.create({
			key: 'idle',
			frames: [{ key: 'dude', frame: 4 }],
			frameRate: 20,
		});

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1,
		});

		this.player.anims.play('idle');

		if (!this.input.keyboard) return;

		this.kb = this.input.keyboard.createCursorKeys();
		this.aKey = this.input.keyboard.addKey('A');
		this.dKey = this.input.keyboard.addKey('D');
	}

	update(): void {
		if (!this.player || !this.kb || !this.aKey || !this.dKey) return;

		if (this.kb.left.isDown || this.aKey.isDown) {
			this.player.setVelocityX(-HORIZONTAL_VELOCITY);
			this.player.anims.play('left', true);
		} else if (this.kb.right.isDown || this.dKey.isDown) {
			this.player.setVelocityX(HORIZONTAL_VELOCITY);
			this.player.anims.play('right', true);
		} else {
			this.player.anims.play('idle', true);
			this.player.setVelocityX(0);
		}

		if (
			(this.kb.up.isDown && this.player.body.touching.down) ||
			(this.kb.space.isDown && this.player.body.touching.down)
		) {
			this.player.setVelocityY(JUMP_VELOCITY);
		}
	}
}
