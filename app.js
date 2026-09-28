export const createScene = async function () {

    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera(
        "camera1",
        new BABYLON.Vector3(0, 3, -8),
        scene
    );

    camera.setTarget(new BABYLON.Vector3(0, 1, 0));
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    light.intensity = 0.7;

    var ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        {
            width: 10,
            height: 10
        },
        scene
    );

    // TASK 1
    var cube1 = BABYLON.MeshBuilder.CreateBox(
        "cube1",
        { size: 1 },
        scene
    );

    cube1.position = new BABYLON.Vector3(-2, 1, 0);

    var material1 = new BABYLON.StandardMaterial(
        "material1",
        scene
    );

    cube1.material = material1;

    // TASK 2
    var cube2 = BABYLON.MeshBuilder.CreateBox(
        "cube2",
        { size: 1 },
        scene
    );

    cube2.position = new BABYLON.Vector3(0, 1, 0);

    var material2 = new BABYLON.StandardMaterial(
        "material2",
        scene
    );

    material2.diffuseColor = new BABYLON.Color3(0.08, 0.02, 0.36);

    cube2.material = material2;

    // TASK 3
    var cube3 = BABYLON.MeshBuilder.CreateBox(
        "cube3",
        { size: 1 },
        scene
    );

    cube3.position = new BABYLON.Vector3(2, 1, 0);

    var material3 = new BABYLON.StandardMaterial(
        "material3",
        scene
    );

    material3.diffuseColor = new BABYLON.Color3(0.93, 0.62, 0.11, 0.82);

    cube3.material = material3;

    var time = 0;

    scene.onBeforeRenderObservable.add(function () {
        time += engine.getDeltaTime() / 1000;

        // TASK 1: Change color sinusoidally
        var colorValue =
            (Math.sin(time * 2) + 1) / 2;

        material1.diffuseColor = new BABYLON.Color3(
            colorValue,
            0,
            1 - colorValue
        );

        // TASK 2: Change position sinusoidally
        cube2.position.y =
            1.5 + Math.sin(time * 2);

        // TASK 3: Change scale sinusoidally
        var scale =
            1 + 0.5 * Math.sin(time * 2);

        cube3.scaling = new BABYLON.Vector3(
            scale,
            scale,
            scale
        );
    });

    try {

        var xr = await scene.createDefaultXRExperienceAsync({
            floorMeshes: [ground]
        });

        console.log("WebXR initialized");

    } catch (error) {

        console.log("WebXR not available:", error);
    }


    return scene;
};