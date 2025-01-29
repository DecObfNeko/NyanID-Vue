<template>
</template>

<script>
import { Application, Assets } from 'pixi.js';
import '@esotericsoftware/spine-pixi-v8';
import { SpineBoy } from '@/config/bgenv';
import { Controller } from '@/config/Controller';
// Asynchronous IIFE
(async () =>
{
    // Create a PixiJS application.
    const app = new Application();

    // Intialize the application.
    await app.init({ resizeTo: window });

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);

    // Load the assets.
    await Assets.load([
        {
            alias: 'spineSkeleton',
            src: '/assets/4k/CH0258_home.json',
        },
        {
            alias: 'spineAtlas',
            src: '/assets/4k/CH0258_home.atlas',
        },
    ]);
    // Create a controller that handles keyboard inputs.
    const controller = new Controller();

    // Create our character
    const spineBoy = new SpineBoy();

    // Adjust views' transformation.
    spineBoy.view.x = app.screen.width ;
    spineBoy.view.y = app.screen.height ;
    spineBoy.spine.scale.set(0.5);

    // Add character to the stage.
    app.stage.addChild(spineBoy.view);

    // Trigger character's spawn animation.
    spineBoy.spawn();

    // Animate the character based on the controller's input.
    app.ticker.add(() =>
    {
        // Ignore the update loops while the character is doing the spawn animation.
        if (spineBoy.isSpawning()) return;

        // Update character's state based on the controller's input.
        spineBoy.state.walk = controller.keys.left.pressed || controller.keys.right.pressed;
        if (spineBoy.state.run && spineBoy.state.walk) spineBoy.state.run = true;
        else spineBoy.state.run = controller.keys.left.doubleTap || controller.keys.right.doubleTap;
        spineBoy.state.hover = controller.keys.down.pressed;
        if (controller.keys.left.pressed) spineBoy.direction = -1;
        else if (controller.keys.right.pressed) spineBoy.direction = 1;
        spineBoy.state.jump = controller.keys.space.pressed;

        // Update character's animation based on the latest state.
        spineBoy.update();
    });
})();
</script>

<style>

</style>