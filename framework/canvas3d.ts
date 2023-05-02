interface Window {
    CameraControls: any;
}

enum CanvasDraw {
    Line = 1,
    Triangle = 2
}

class MeshTriangle {
    point1: THREE.Vector3;
    point2: THREE.Vector3;
    point3: THREE.Vector3;
}

class Canvas3DSettings {
    backcolor: number = 0x000000;
    allowdraw: boolean;
    allowvr: boolean;
}

class Canvas3D extends FrameWork {
    canvas: HTMLCanvasElement;
    camera: THREE.Camera;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    raycaster: THREE.Raycaster;
    font: THREE.Font;
    clock: THREE.Clock = new THREE.Clock();
    pointeraxis: THREE.Object3D;
    guideaxis: THREE.Object3D;
    draw: CanvasDraw = CanvasDraw.Line;
    drawinggrid: THREE.Object3D;
    drawingguide: THREE.Object3D;
    drawingactive: THREE.Object3D;
    drawingpoint: THREE.Vector3;
    snapline: THREE.Line;
    points: THREE.Vector3[] = [];
    controls: Window["CameraControls"];
    settings: Canvas3DSettings = new Canvas3DSettings();
    aspect: number = 1;
    ctrlKey: boolean = false;
    onselect: Function;

    mousedown: THREE.Vector2 = new THREE.Vector2();
    mousemove: THREE.Vector2 = new THREE.Vector2();
    mouseup: THREE.Vector2 = new THREE.Vector2();
    mousecurrent: THREE.Vector3 = new THREE.Vector3();
    currentz: number = 0;

    highlight: THREE.Object3D;
    selectedobject: THREE.Mesh;
    selectedobjects: THREE.Mesh[] = [];
    selectedmaterial: THREE.Material;
    selectedmaterials: THREE.Material[] = [];


    /**
     *
     */
    constructor() {
        super(null, "canvas");

        this.classes.push("canvas-3D");
        window.CameraControls.install({ THREE: THREE });
        this.LoadFont(() => {
            // this.ShowGridXY(0, 0, 0);
            // this.Resize();
            // this.ShowPointerAxis(0, 0, 0);
            // this.ZoomAll();

            //Triangle
            let triangles: MeshTriangle[] = [];

            let triangle = new MeshTriangle();
            triangle.point1 = new THREE.Vector3(-1, -1, 0);
            triangle.point2 = new THREE.Vector3(-1, 1, 0);
            triangle.point3 = new THREE.Vector3(1, 1, 0);
            triangles.push(triangle);

            triangle = new MeshTriangle();
            triangle.point1 = new THREE.Vector3(-1, -1, 0);
            triangle.point2 = new THREE.Vector3(1, 1, 0);
            triangle.point3 = new THREE.Vector3(1, -1, 0);
            triangles.push(triangle);


            let drawing = this.GenerateTriangles(triangles);

            const iterations = 4;

            const params = {
                split: false,       // optional, default: true
                uvSmooth: true,      // optional, default: false
                preserveEdges: true,      // optional, default: false
                flatOnly: true,      // optional, default: false
                maxTriangles: Infinity,   // optional, default: Infinity
            };

            const geometry = LoopSubdivision.modify(drawing.geometry, iterations, params);


            const positions = geometry.getAttribute('position').array;
            const numVertices = positions.length / 3;
            const numTriangles = numVertices / 3;
            const vertices = [];
            const vertexIndices = new Map();
            const indices = [];

            for (let i = 0; i < numTriangles; i++) {
                const indexOffset = i * 3;
                const vertexIndicesOffset = i * 3;

                const v1Index = indexOffset;
                const v2Index = indexOffset + 1;
                const v3Index = indexOffset + 2;

                const v1 = [positions[v1Index * 3], positions[v1Index * 3 + 1], positions[v1Index * 3 + 2]];
                const v2 = [positions[v2Index * 3], positions[v2Index * 3 + 1], positions[v2Index * 3 + 2]];
                const v3 = [positions[v3Index * 3], positions[v3Index * 3 + 1], positions[v3Index * 3 + 2]];

                // add unique vertices to the vertices array and store their indices in the vertexIndices map
                const v1Key = v1.join(',');
                if (!vertexIndices.has(v1Key)) {
                    vertices.push(v1);
                    vertexIndices.set(v1Key, vertices.length - 1);
                }

                const v2Key = v2.join(',');
                if (!vertexIndices.has(v2Key)) {
                    vertices.push(v2);
                    vertexIndices.set(v2Key, vertices.length - 1);
                }

                const v3Key = v3.join(',');
                if (!vertexIndices.has(v3Key)) {
                    vertices.push(v3);
                    vertexIndices.set(v3Key, vertices.length - 1);
                }

                // add the triangle's vertex indices to the vertexIndices array
                const triangleIndices = [
                    vertexIndices.get(v1Key),
                    vertexIndices.get(v2Key),
                    vertexIndices.get(v3Key)
                ];

                indices.push(triangleIndices);
            }


            const quadIndices = [];
            const newVertices = [];

            let done = {};

            for (let i = 0; i < indices.length; i++) {
                if (done[i])
                    continue;

                for (let j = 0; j < indices.length; j++) {
                    if (j === i) {
                        continue; // Skip the current triangle
                    }

                    if (done[j])
                        continue;

                    let count = 0;
                    let ids = [];
                    let unique = [];

                    for (let k = 0; k < 3; k++) {
                        for (let l = 0; l < 3; l++) {
                            if (indices[i][k] === indices[j][l]) {
                                ids.push(indices[i][k]);
                                count++;
                            }
                        }
                    }

                    for (let k = 0; k < 3; k++) {
                        if (ids.indexOf(indices[i][k]) === -1) {
                            unique.push(indices[i][k]);
                        }
                    }

                    for (let k = 0; k < 3; k++) {
                        if (ids.indexOf(indices[j][k]) === -1) {
                            unique.push(indices[j][k]);
                        }
                    }

                    if (count === 2) {
                        let v1 = vertices[indices[i][0]];
                        let v2 = vertices[indices[i][1]];
                        let v3 = vertices[indices[i][2]];

                        let p1 = new THREE.Vector3(v1[0], v1[1], v1[2]);
                        let p2 = new THREE.Vector3(v2[0], v2[1], v2[2]);
                        let p3 = new THREE.Vector3(v3[0], v3[1], v3[2]);

                        let maxl = Math.max(p1.clone().sub(p2).length(), p1.clone().sub(p3).length(), p3.clone().sub(p2).length());

                        let v4 = vertices[ids[0]];
                        let v5 = vertices[ids[1]];
                        let p4 = new THREE.Vector3(v4[0], v4[1], v4[2]);
                        let p5 = new THREE.Vector3(v5[0], v5[1], v5[2]);

                        let vl = p4.clone().sub(p5).length();

                        if (maxl === vl) {
                            quadIndices.push(unique[0], ids[0], unique[1], ids[1]);

                            done[i] = 1;

                            if (!done[j])
                                done[j] = 1;

                            break;
                        }
                    }
                }
            }

            let material = new THREE.MeshPhongMaterial({
                color: 0xccffcc,
                side: THREE.DoubleSide,
                shininess: 100,
                transparent: true,
                opacity: 0.5
            });

            // let mesh = new THREE.Mesh(geometry, material);
            // this.AddObject(mesh);

            // material = new THREE.MeshPhongMaterial({
            //     color: 0xffffff,
            //     wireframe: true
            // });

            // mesh = new THREE.Mesh(geometry, material);
            // this.AddObject(mesh);

            let points: THREE.Vector3[] = [];

            for (let i = 0; i < quadIndices.length; i += 4) {
                let point1 = vertices[quadIndices[i]];
                let point2 = vertices[quadIndices[i + 1]];
                let point3 = vertices[quadIndices[i + 2]];
                let point4 = vertices[quadIndices[i + 3]];

                points.push(new THREE.Vector3(point1[0], point1[1], point1[2]));
                points.push(new THREE.Vector3(point2[0], point2[1], point2[2]));

                points.push(new THREE.Vector3(point2[0], point2[1], point2[2]));
                points.push(new THREE.Vector3(point3[0], point3[1], point3[2]));

                points.push(new THREE.Vector3(point3[0], point3[1], point3[2]));
                points.push(new THREE.Vector3(point4[0], point4[1], point4[2]));

                points.push(new THREE.Vector3(point1[0], point1[1], point1[2]));
                points.push(new THREE.Vector3(point4[0], point4[1], point4[2]));
            }

            let lines = this.GenerateLines(points, "#FFF");
            this.AddObject(lines);

            this.ZoomAll();
        });
    }

    Refresh(): void {
        let self = this;
        this.Clear();

        this.scene = new THREE.Scene();
        this.raycaster = new THREE.Raycaster();
        this.raycaster.params.Line.threshold = 0.1;
        this.raycaster.params.Mesh.threshold = 0.1;

        this.InitializePerspectiveCamera();
        this.InitializeRenderer();
        this.InitializeControls();
        this.InitializeLight();

        //Initialize events
        this.Events();

        //Initialize drag and drop
        this.DragandDrop();

        window.addEventListener("resize", function () {
            self.Resize();
            self.ZoomAll();
        });

        if (this.settings.allowdraw) {
            document.body.addEventListener("keydown", (event) => {
                let element = event.target as HTMLElement;

                if (element.localName !== "input") {
                    self.ctrlKey = event.ctrlKey;
                    self.controls.enabled = false;

                    if (event.key === "Escape") {
                        self.drawingactive = undefined;
                        self.points = [];
                    }
                    else {
                        input.object.classList.remove("hidden");
                        input.Focus();
                    }
                } else {
                    if (event.key === "Enter" || event.key === "Escape") {
                        input.object.classList.add("hidden");
                    }
                }
            });

            document.body.addEventListener("keyup", (event) => {
                self.ctrlKey = false;
                self.controls.enabled = true;
            });
        }

        let input = new FrameWork.Input({ classes: ["canvas-input", "hidden"] });

        input.onchange = (object: FrameWork.Input) => {
            let value = input.value.trim();

            if (value)
                self.ParseInput(value);

            input.object.classList.add("hidden");
        };

        input.Show(this.object);

        //VR
        if (this.settings.allowvr)
            this.object.appendChild(VRButton.createButton(this.renderer, this.scene, this.camera, function (status: String) {
                if (status === "enter") {
                    self.object.style.position = "fixed";
                    self.object.style.width = "100%";
                } else {
                    self.object.style.position = "absolute";
                    self.object.style.width = "100%";
                }

                self.Resize();
                self.ZoomAll();
            }));


        (function anim() {
            const delta = self.clock.getDelta();
            const updated = self.controls.update(delta);

            requestAnimationFrame(anim);

            if (self.controls._enabled && updated) {
                self.renderer.render(self.scene, self.camera);
            }
        })();
    }

    InitializePerspectiveCamera(): void {
        this.camera = new THREE.PerspectiveCamera(30, 0.5 * this.aspect, 0.001, 10000);
        this.camera.position.x = -20;
        this.camera.position.y = -20;
        this.camera.position.z = 20;

        if (this.settings.allowvr)
            this.camera.up.set(0, 1, 0);
        else
            this.camera.up.set(0, 0, 1);
    };

    InitializeOthographicCamera(): void {
        let frustumSize = 1;
        this.camera = new THREE.OrthographicCamera(frustumSize * this.aspect / - 2, frustumSize * this.aspect / 2, frustumSize / 2, frustumSize / - 2, -10000, 10000);
        this.camera.position.x = -20;
        this.camera.position.y = -20;
        this.camera.position.z = 2;

        if (this.settings.allowvr)
            this.camera.up.set(0, 1, 0);
        else
            this.camera.up.set(0, 0, 1);

        let width = this.object.clientWidth / 2;
        let height = width / this.aspect;

        let camera = this.camera as THREE.OrthographicCamera;
        camera.left = -width;
        camera.right = width;
        camera.top = height;
        camera.bottom = -height;
    };

    InitializeRenderer(): void {
        let self = this;

        this.renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
        this.renderer.setClearColor(this.settings.backcolor);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.object.appendChild(this.renderer.domElement);

        this.canvas = this.renderer.domElement;

        this.canvas.addEventListener('pointerdown', function (event) { self.MouseDown(event); });
        this.canvas.addEventListener('pointermove', function (event) { self.MouseMove(event); });
        this.canvas.addEventListener('pointerup', function (event) { self.MouseUp(event); });
        this.canvas.addEventListener('wheel', function (event) { self.MouseWheel(event); });
    };

    InitializeControls(): void {
        this.controls = new window.CameraControls(this.camera, this.renderer.domElement);
        this.controls.mouseButtons.right = window.CameraControls.ACTION.OFFSET;
        this.controls.dollyToCursor = true;

        let self = this;

        this.controls.addEventListener('control', function (event: MouseEvent) {
            self.UpdateControl(event);
        });
    }

    InitializeLight(): void {
        let radius = 200;

        let sunLight = new THREE.DirectionalLight(0xffffff, 0.25);
        sunLight.position.set(-180, -160, 100);
        sunLight.shadow.camera.left = -radius;
        sunLight.shadow.camera.right = radius;
        sunLight.shadow.camera.top = radius;
        sunLight.shadow.camera.bottom = -radius;
        sunLight.shadow.mapSize.width = 4096;
        sunLight.shadow.mapSize.height = 4096;
        sunLight.shadow.camera.near = 0.5;
        sunLight.shadow.camera.far = 10000;
        sunLight.castShadow = true;
        this.scene.add(sunLight);

        let ambient = new THREE.AmbientLight(0xaaaaaa);
        this.scene.add(ambient);

        let light3 = new THREE.DirectionalLight(0xffffff, 0.25);
        light3.position.set(134, 200, 0);
        this.scene.add(light3);

        let light4 = new THREE.DirectionalLight(0xffffff, 0.25);
        light4.position.set(-134, -167, 0);
        this.scene.add(light4);
    };

    Render(): void {
        this.renderer.render(this.scene, this.camera);
    };

    AddObject(object: THREE.Object3D | THREE.Mesh): void {
        this.scene.add(object);
    };

    Remove(object: THREE.Object3D | THREE.Mesh): void {
        this.scene.remove(object);
    }

    ClearObjects(): void {
        let objects: THREE.Object3D[] = [];

        for (let item of this.scene.children) {
            if (item.type !== "Object3D" && item.type !== "Mesh" && item.type !== "LineSegments")
                objects.push(item);
        }

        this.scene.children = objects;
    }

    SetVisibility(name: string, value: boolean): void {
        for (let item of this.scene.children) {
            if (item.name === name)
                item.visible = value;
        }

        this.Render();
    }

    MouseDown(event: MouseEvent): void {
        event.preventDefault();

        this.mousedown.x = event.clientX;
        this.mousedown.y = event.clientY;

        this.SetRotationPoint(event);
    }

    MouseMove(event: MouseEvent): void {
        event.preventDefault();

        this.mousemove.x = event.clientX;
        this.mousemove.y = event.clientY;

        if (this.settings.allowdraw) {
            this.ShowDrawingGuide();

            let self = this;

            this.CurrentPoint(this.mousemove.x, this.mousemove.y, function (current: THREE.Vector3) {
                self.ShowPointerAxis(current.x, current.y, current.z);
            });
        }
    }

    MouseUp(event: MouseEvent): void {
        event.preventDefault();

        this.mouseup.x = event.clientX;
        this.mouseup.y = event.clientY;

        if (this.settings.allowdraw) {
            if (Math.abs(this.mousedown.x - this.mousemove.x) < 5 && Math.abs(this.mousedown.y - this.mousemove.y) < 5)
                this.UpdateDrawingGuide();
        } else {
            if (Math.abs(this.mousedown.x - this.mousemove.x) < 5 && Math.abs(this.mousedown.y - this.mousemove.y) < 5)
                this.Select(this.mouseup.x, this.mouseup.y, this.onselect);
        }
    }

    MouseWheel(event: MouseEvent): void {
        let point = this.points[this.points.length - 1];

        if (this.settings.allowdraw) {
            if (point)
                this.ShowPointerAxis(point.x, point.y, point.z);
            else
                this.ShowPointerAxis(0, 0, 0);
        }
    }

    ZoomAll(res?: Function, xrot?: number, yrot?: number): void {
        this.Resize();

        let mesh: THREE.Object3D;
        let count = 0;
        let radius: number;
        let self = this;

        for (let child of this.scene.children) {
            if (child.type === "Object3D") {
                let bounds = new THREE.Box3().setFromObject(child);
                this.UpdateBounds(child, bounds);

                radius = Math.max(bounds.max.x - bounds.min.x, bounds.max.y - bounds.min.y, bounds.max.z - bounds.min.z) / 2;

                this.controls.reset(true);
                this.controls.update(true);

                let padding = radius / 10;
                let options = { paddingLeft: padding, paddingRight: padding, paddingBottom: padding, paddingTop: padding };

                try {
                    this.controls.fitToBox(bounds, false, options).then(function () {
                        self.controls.rotate(0, -Math.PI / 10, false);
                        //self.controls.rotate(-Math.PI / 4, 0, false);

                        if (res)
                            res();

                        self.Render();
                    });
                } catch (error) {
                }

                this.UpdateControl(null);
                break;
            }
        }
    }

    ZoomOut(): void {
        if (this.camera instanceof THREE.PerspectiveCamera) {
            let camera = this.camera as THREE.PerspectiveCamera;
            this.controls.zoom(-camera.zoom * 0.1);

        } else {
            let camera = this.camera as THREE.OrthographicCamera;
            this.controls.zoom(-camera.zoom * 0.1);
        }

        this.Render();
    }

    ZoomIn(): void {
        if (this.camera instanceof THREE.PerspectiveCamera) {
            let camera = this.camera as THREE.PerspectiveCamera;
            this.controls.zoom(camera.zoom * 0.1);

        } else {
            let camera = this.camera as THREE.OrthographicCamera;
            this.controls.zoom(camera.zoom * 0.1);
        }

        this.Render();
    }

    UpdateControl(event: MouseEvent): void {
        // this.controls.truck(0, 0);

        // let x = this.controls._target.x;
        // let y = this.controls._target.y;
        // let z = this.controls._target.z;

        // this.camera.updateMatrixWorld();
    }

    OthographicView(): void {
        this.InitializeOthographicCamera();
        this.InitializeControls();
        this.ZoomAll();
    }

    PerspectiveView(): void {
        this.InitializePerspectiveCamera();
        this.InitializeControls();
        this.ZoomAll();
    }

    Resize(): void {
        let ratio = window.devicePixelRatio || 1;
        ratio = 1;

        this.canvas.width = this.object.clientWidth * ratio;
        this.canvas.height = this.object.clientHeight * ratio;

        this.aspect = this.canvas.width / this.canvas.height;

        if (this.camera instanceof THREE.PerspectiveCamera) {
            let camera = this.camera as THREE.PerspectiveCamera;
            camera.aspect = this.aspect;
            camera.updateProjectionMatrix();

        } else {
            let camera = this.camera as THREE.OrthographicCamera;
            camera.updateProjectionMatrix();
        }

        this.renderer.setSize(this.canvas.width, this.canvas.height);
        this.Render();
    }

    ShowActiveDrawing(): void {
        if (this.points.length > 1) {
            if (this.drawingactive) {
                this.Remove(this.drawingactive);
                this.drawingactive = undefined;
            }

            this.drawingactive = this.GeneratePolyLines(this.points);
            this.AddObject(this.drawingactive);
            this.Render();
        }
    }

    ShowGridXY(x: number, y: number, z: number): void {
        if (this.drawinggrid) {
            this.Remove(this.drawinggrid);
            this.drawinggrid = undefined;
        }

        let points: THREE.Vector3[] = [];
        let size = 10;
        let textsize = size / 50;

        let textmaterial = new THREE.LineBasicMaterial({
            color: 0x888888
        });

        for (let i = -size; i <= size; i++) {
            //Along X
            this.AddObject(this.GenerateText(i.toString(), x + i, y - size - textsize, z, textsize, ALIGNHORIZONTAL.CENTER, ALIGNVERTICAL.TOP, new THREE.Vector3(), textmaterial));
            points.push(new THREE.Vector3(x + i, y - size, z));
            points.push(new THREE.Vector3(x + i, y + size, z));

            //Along Y
            this.AddObject(this.GenerateText(i.toString(), x - size - textsize, y + i, z, textsize, ALIGNHORIZONTAL.RIGHT, ALIGNVERTICAL.MIDDLE, new THREE.Vector3(), textmaterial));
            points.push(new THREE.Vector3(x - size, y + i, z));
            points.push(new THREE.Vector3(x + size, y + i, z));
        }

        var lines = this.GenerateLines(points, "#444");
        lines.name = "grid";
        this.AddObject(lines);

        this.drawinggrid = lines;
    }

    ShowPointerAxis(x: number, y: number, z: number): void {
        let vector = this.camera.position.clone();

        if (Number.isNaN(vector.x))
            return;

        let distance = vector.sub(new THREE.Vector3(x, y, z)).length();
        let camera = this.camera as THREE.PerspectiveCamera;
        let height = distance * Math.tan(camera.fov * Math.PI / 180) / 25;

        let points: THREE.Vector3[] = [];
        let colors: string[] = [];

        //Blue
        colors.push("#0000FF");

        //Green
        colors.push("#00FF00");

        //Red
        colors.push("#FF0000");

        let size = height || 1;

        //X
        points.push(new THREE.Vector3(x - size, y, z));
        points.push(new THREE.Vector3(x + size, y, z));

        //Y
        points.push(new THREE.Vector3(x, y - size, z));
        points.push(new THREE.Vector3(x, y + size, z));

        //Z
        points.push(new THREE.Vector3(x, y, z - size));
        points.push(new THREE.Vector3(x, y, z + size));

        if (this.pointeraxis) {
            this.Remove(this.pointeraxis);
            this.pointeraxis = undefined;
        }

        this.pointeraxis = new THREE.Object3D();
        this.pointeraxis.name = "axis";

        for (let i = 0; i < points.length; i += 2) {
            let geometry = new THREE.BufferGeometry();
            let vertices = [];

            vertices.push(points[i].x, points[i].y, points[i].z, points[i + 1].x, points[i + 1].y, points[i + 1].z);

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

            let material = new THREE.LineBasicMaterial({ color: colors.pop() });
            let lines = new THREE.LineSegments(geometry, material);
            this.pointeraxis.add(lines);
        }

        this.AddObject(this.pointeraxis);
        this.Render();
    }

    ShowGuideAxis(x: number, y: number, z: number): void {
        let vector = this.camera.position.clone();

        if (Number.isNaN(vector.x))
            return;

        let points: THREE.Vector3[] = [];
        let colors: string[] = [];

        colors.push("#FFFFFF");
        colors.push("#FFFFFF");
        colors.push("#FFFFFF");

        let size = 10;

        points.push(new THREE.Vector3(x - size, y, z));
        points.push(new THREE.Vector3(x + size, y, z));

        points.push(new THREE.Vector3(x, y - size, z));
        points.push(new THREE.Vector3(x, y + size, z));

        points.push(new THREE.Vector3(x, y, z - size));
        points.push(new THREE.Vector3(x, y, z + size));

        if (this.guideaxis) {
            this.Remove(this.guideaxis);
            this.guideaxis = undefined;
        }

        this.guideaxis = new THREE.Object3D();

        for (let i = 0; i < points.length; i += 2) {
            let geometry = new THREE.BufferGeometry();
            let vertices = [];

            vertices.push(points[i].x, points[i].y, points[i].z, points[i + 1].x, points[i + 1].y, points[i + 1].z);

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

            let material = new THREE.LineBasicMaterial({ color: colors.pop(), opacity: 0, transparent: true });
            let lines = new THREE.LineSegments(geometry, material);
            this.guideaxis.add(lines);
        }

        this.AddObject(this.guideaxis);
        this.Render();
    }

    ShowDrawingGuide(): void {
        if (this.drawingguide) {
            this.Remove(this.drawingguide);
            this.drawingguide = undefined;
        }

        if (this.points.length) {
            let self = this;
            this.CurrentPoint(this.mousemove.x, this.mousemove.y, function (current: THREE.Vector3) {
                if (current) {
                    let points: THREE.Vector3[] = [];
                    let point = self.points[self.points.length - 1];

                    self.drawingpoint = current;

                    points.push(point);
                    points.push(current);

                    self.drawingguide = self.GeneratePolyLines(points);
                    self.drawingguide.name = "guide";

                    self.AddObject(self.drawingguide);
                    self.Render();

                } else {
                    self.drawingpoint = undefined;
                    self.Render();
                }
            });
        }
    }

    SetRotationPoint(event: MouseEvent): void {
        let x = event.x;
        let y = event.y;

        let left = this.parent.offsetLeft;
        let top = this.parent.offsetTop;

        let mouse = {
            x: ((x - left) / this.renderer.domElement.clientWidth) * 2 - 1,
            y: -((y - top) / this.renderer.domElement.clientHeight) * 2 + 1
        };

        this.camera.updateMatrixWorld();
        this.raycaster.setFromCamera(mouse, this.camera);

        let intersects;

        for (let child of this.scene.children) {
            if (child.type === "Object3D" || child.type === "Mesh") {
                intersects = this.raycaster.intersectObjects(child.children);

                if (intersects && intersects.length > 0) {
                    for (let object of intersects) {
                        let point = object.point as THREE.Vector3;
                        this.controls.setOrbitPoint(point.x, point.y, point.z);
                        this.controls.update(this.clock.getDelta());
                        break;
                    }
                }
            }
        }
    }

    UpdateDrawingGuide(): void {
        if (this.draw === CanvasDraw.Triangle && this.points.length === 3) {
            this.points.push(this.points[0]);
            this.AddTriangle();
            this.Render();

        } else if (this.points.length && this.drawingpoint) {
            this.points.push(this.drawingpoint);
            this.ShowGuideAxis(this.drawingpoint.x, this.drawingpoint.y, this.drawingpoint.z);
            this.ShowActiveDrawing();

        } else {
            let self = this;
            self.points.push(new THREE.Vector3(this.mousecurrent.x, this.mousecurrent.y, this.mousecurrent.z));
            self.ShowGuideAxis(this.mousecurrent.x, this.mousecurrent.y, this.mousecurrent.z);
            self.ShowActiveDrawing();
        }
    }

    GenerateLines(points: THREE.Vector3[], color: string, opacity: number = 1): THREE.Object3D {
        let vertices = [];

        if (this.settings.allowvr) {
            for (let i = 0; i < points.length; i += 2) {
                vertices.push(points[i].x, points[i].z, points[i].y, points[i + 1].x, points[i + 1].z, points[i + 1].y);
            }
    
        } else {
            for (let i = 0; i < points.length; i += 2) {
                vertices.push(points[i].x, points[i].y, points[i].z, points[i + 1].x, points[i + 1].y, points[i + 1].z);
            }
        }

        let geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        let object = new THREE.Object3D();
        let material = new THREE.LineBasicMaterial({ color: color, opacity: opacity, transparent: opacity === 1 ? false : true });
        object.add(new THREE.LineSegments(geometry, material));

        return object;
    }

    GeneratePolyLines(points: THREE.Vector3[]): THREE.Object3D {
        let object = new THREE.Object3D();

        for (let i = 0; i < points.length - 1; i++) {
            let geometry = new THREE.BufferGeometry();
            let vertices = [];

            vertices.push(points[i].x, points[i].y, points[i].z, points[i + 1].x, points[i + 1].y, points[i + 1].z);

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

            let material = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
            let lines = new THREE.Line(geometry, material);

            object.add(lines);
        }

        return object;
    }

    GenerateTriangles(triangles: MeshTriangle[], color?: any): THREE.Mesh {
        let geometry = new THREE.BufferGeometry();
        let vertices = new Float32Array(triangles.length * 9);
        //let colors = new Float32Array(colors.length * 9);

        let j: number;
        let elem;

        for (let i = 0; i < triangles.length; i++) {
            j = i * 9;

            if (this.settings.allowvr) {
                vertices[j + 0] = triangles[i].point1.x;
                vertices[j + 1] = triangles[i].point1.z;
                vertices[j + 2] = triangles[i].point1.y;
    
                vertices[j + 3] = triangles[i].point2.x;
                vertices[j + 4] = triangles[i].point2.z;
                vertices[j + 5] = triangles[i].point2.y;
    
                vertices[j + 6] = triangles[i].point3.x;
                vertices[j + 7] = triangles[i].point3.z;
                vertices[j + 8] = triangles[i].point3.y;
    
            } else {
                vertices[j + 0] = triangles[i].point1.x;
                vertices[j + 1] = triangles[i].point1.y;
                vertices[j + 2] = triangles[i].point1.z;
    
                vertices[j + 3] = triangles[i].point2.x;
                vertices[j + 4] = triangles[i].point2.y;
                vertices[j + 5] = triangles[i].point2.z;
    
                vertices[j + 6] = triangles[i].point3.x;
                vertices[j + 7] = triangles[i].point3.y;
                vertices[j + 8] = triangles[i].point3.z;
            }

            // if (usepointcolor) {
            //     colors[j + 0] = colors[i].x;
            //     colors[j + 1] = colors[i].y;
            //     colors[j + 2] = colors[i].z;

            //     colors[j + 3] = colors[i].point2.x;
            //     colors[j + 4] = colors[i].point2.y;
            //     colors[j + 5] = colors[i].point2.z;

            //     colors[j + 6] = colors[i].point3.x;
            //     colors[j + 7] = colors[i].point3.y;
            //     colors[j + 8] = colors[i].point3.z;
            // }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        // if (usepointcolor) {
        //     material = new THREE.MeshPhongMaterial({
        //         color: 0xffffff,
        //         flatShading: false,
        //         vertexColors: true,
        //         shininess: 0
        //     });

        //     geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3, true));
        // }

        geometry.computeVertexNormals();

        let material = new THREE.MeshPhongMaterial({ color: color ? color : 0x8888ff, emissive: 0x111111, side: THREE.DoubleSide, transparent: true, opacity: 0.75 });
        return new THREE.Mesh(geometry, material);
    };

    GenerateText(text: string, x: number, y: number, z: number, size: number, alignx: ALIGNHORIZONTAL, aligny: ALIGNVERTICAL, rotation: THREE.Vector3, material: THREE.Material): THREE.Mesh {
        let geo = new THREE.TextGeometry(text, {
            font: this.font,
            size: size,
            height: size / 20
        });

        let center = geo.center();
        let widthx = center.boundingBox.max.x - center.boundingBox.min.x;
        let widthy = center.boundingBox.max.y - center.boundingBox.min.y;

        geo.computeBoundingBox();
        geo.computeVertexNormals();

        let mesh = new THREE.Mesh(geo, material);

        if (alignx === ALIGNHORIZONTAL.LEFT)
            mesh.position.x = x + widthy / 2;

        else if (alignx === ALIGNHORIZONTAL.RIGHT)
            mesh.position.x = x - widthy / 2;

        else
            mesh.position.x = x;

        if (aligny === ALIGNVERTICAL.TOP)
            mesh.position.y = y - widthx / 2;

        else if (aligny === ALIGNVERTICAL.BOTTOM)
            mesh.position.y = y + widthx / 2;

        else
            mesh.position.y = y;

        mesh.position.z = z;

        mesh.rotation.x = rotation.x;
        mesh.rotation.z = rotation.z;
        mesh.rotation.y = rotation.y;

        return mesh;
    }

    AddTriangle(): void {
        //Triangle
        let triangles: MeshTriangle[] = [];

        let triangle = new MeshTriangle();
        triangle.point1 = this.points[0];
        triangle.point2 = this.points[1];
        triangle.point3 = this.points[2];

        triangles.push(triangle);

        let drawing = this.GenerateTriangles(triangles);
        this.AddObject(drawing);
    }

    Select(x: number, y: number, res?: Function): void {
        //let rect = this.object.getClientRects();

        let left = this.parent.offsetLeft;
        let top = this.parent.offsetTop;

        let mouse = {
            x: ((x - left) / this.renderer.domElement.clientWidth) * 2 - 1,
            y: -((y - top) / this.renderer.domElement.clientHeight) * 2 + 1
        };

        this.camera.updateMatrixWorld();
        this.raycaster.setFromCamera(mouse, this.camera);

        let intersects;

        for (let child of this.scene.children) {
            if (child.type === "Object3D") {
                intersects = this.raycaster.intersectObjects(child.children);

                if (intersects && intersects.length > 0)
                    break;
            }
        }

        if (this.ctrlKey && this.selectedobject) {
            this.selectedobjects = [this.selectedobject];
            this.selectedmaterials = [this.selectedmaterial];

            this.selectedobject = undefined;
            this.selectedmaterial = undefined;

        } else if (!this.ctrlKey && this.selectedobject) {
            this.selectedobject.material = this.selectedmaterial;
            this.selectedobject = undefined;
            this.selectedmaterial = undefined;

        } else if (!this.ctrlKey) {
            let i = 0;

            for (let item of this.selectedobjects)
                item.material = this.selectedmaterials[i++];

            if (this.selectedobject) {
                this.selectedobject.material = this.selectedmaterial;
                this.selectedobject = null;
            }

            this.selectedobjects = [];
            this.selectedmaterials = [];

            this.selectedobject = undefined;
            this.selectedmaterial = undefined;
        }

        if (intersects && intersects.length > 0) {
            for (let object of intersects) {
                let material = new THREE.MeshPhongMaterial({ color: 0xffff44, specular: 0x333333, opacity: 0.75, transparent: true, side: THREE.DoubleSide });;

                // if (this.selectedobject) {
                //     this.selectedobject.material = this.selectedmaterial;
                //     this.selectedobject = null;
                //     this.selectedmaterial = null;
                // }

                // if (this.ctrlKey) {
                //     this.selectedobjects.push(object.object);
                //     this.selectedmaterials.push(object.object.material as THREE.Material);
                //     object.object.material = material;

                // } else {
                //     this.selectedobject = object.object as THREE.Mesh;
                //     this.selectedmaterial = this.selectedobject.material as THREE.Material;
                //     this.selectedobject.material = material;
                // }

                // this.Render();

                if (res)
                    res(object);

                break;
            }

        } else {
            if (this.selectedobject) {
                this.selectedobject.material = this.selectedmaterial;
                this.selectedobject = null;
                this.selectedmaterial = null;
            }

            this.Render();

            if (res)
                res();
        }
    }

    CurrentPoint(x: number, y: number, res?: Function): void {
        let left = this.parent.offsetLeft;
        let top = this.parent.offsetTop;

        let mouse = {
            x: ((x - left) / this.renderer.domElement.clientWidth) * 2 - 1,
            y: -((y - top) / this.renderer.domElement.clientHeight) * 2 + 1
        };

        this.camera.updateMatrixWorld();
        this.raycaster.setFromCamera(mouse, this.camera);

        let intersects;
        let snappoint: THREE.Vector3;
        let snapdistance: number;

        this.snapline = null;

        //Snap to lines
        for (let child of this.scene.children) {
            if (child.type === "Object3D" && child.name !== "axis" && child.name !== "grid" && child.name !== "guide") {
                intersects = this.raycaster.intersectObjects(child.children, true);

                if (intersects && intersects.length > 0) {
                    let point = intersects[0].point;
                    let distance = intersects[0].distance;

                    //Check the end points
                    let position = intersects[0].object.geometry.attributes["position"].array;
                    let point1 = new THREE.Vector3(position[0], position[1], position[2]);
                    let point2 = new THREE.Vector3(position[3], position[4], position[5]);

                    let diff1 = point1.clone().sub(point).length();
                    let diff2 = point2.clone().sub(point).length();

                    if (diff1 < 0.1 && diff1 < diff2) {
                        //Cursor is closer to the starting point
                        point = point1;
                        distance = diff1;

                    } else if (diff2 < 0.1 && diff2 < diff1) {
                        //Cursor is closer to the ending point
                        point = point2;
                        distance = diff2;
                    }

                    if (!snappoint || snapdistance > distance) {
                        //Update the snappoint
                        snappoint = point;
                        snapdistance = distance;
                        this.snapline = intersects[0].object;
                    }
                }
            }
        }

        if (snappoint) {
            this.mousecurrent.x = snappoint.x;
            this.mousecurrent.y = snappoint.y;
            this.mousecurrent.z = snappoint.z;

            res(snappoint);
            return;
        }

        //Snap to grid
        for (let child of this.scene.children) {
            if (child.name === "grid") {
                intersects = this.raycaster.intersectObjects(child.children, true);

                if (intersects && intersects.length > 0) {
                    let point = intersects[0].point;

                    point.x = Math.round(point.x);
                    point.y = Math.round(point.y);
                    point.z = Math.round(point.z);

                    this.mousecurrent.x = point.x;
                    this.mousecurrent.y = point.y;
                    this.mousecurrent.z = point.z;

                    res(point);
                    return;
                }
            }
        }
    }

    CaptureThumbnail(res?: Function): void {
        this.ZoomAll(() => {
            let image = this.renderer.domElement.toDataURL();
            if (res)
                res(image);
        });
    }

    UpdateBounds(child: THREE.Object3D, bounds: THREE.Box3): void {
        let mesh: THREE.Mesh;

        bounds.min.y = Number.POSITIVE_INFINITY;
        bounds.max.y = Number.NEGATIVE_INFINITY;

        for (let item of child.children) {
            mesh = item as THREE.Mesh;

            if (!mesh.geometry.boundingSphere)
                mesh.geometry.computeBoundingSphere();

            if (!mesh.geometry.boundingBox)
                mesh.geometry.computeBoundingBox();

            if (bounds.min.y > mesh.geometry.boundingBox.min.y)
                bounds.min.y = mesh.geometry.boundingBox.min.y;

            if (bounds.max.y < mesh.geometry.boundingBox.max.y)
                bounds.max.y = mesh.geometry.boundingBox.max.y;
        }
    }

    LoadFont(ret: Function): void {
        let self = this;
        let loader = new THREE.FontLoader();

        try {
            if (window.chrome.webview) {
                loader.load('https://canvas/fonts/arial.json', function (response) {
                    self.font = response;
                    if (ret) ret();
                });
            } else {
                loader.load('fonts/arial.json', function (response) {
                    self.font = response;
                    if (ret) ret();
                });
            }
        } catch (error) {
            loader.load('fonts/arial.json', function (response) {
                self.font = response;
                if (ret) ret();
            });
        }
    }

    CleanInput(text: string): string {
        text = text.replace("  ", " ");
        text = text.replace("  ", " ");
        text = text.replace("  ", " ");

        return text.toLowerCase();
    }

    ParseInput(input: string): void {
        let point: THREE.Vector3;

        input = this.CleanInput(input);

        if (input.indexOf("zo") !== -1 && input.indexOf("=") !== -1) {
            //Move grid to z
            input = input.replace("zo=", "");

            let value = parseFloat(input);
            this.ShowGridXY(0, 0, value);
            return;

        } else if (input.indexOf("z") !== -1 && input.indexOf("=") !== -1) {
            //Draw a line from snapline z1 to z
            let position = this.snapline.geometry.attributes["position"].array;
            let point1 = new THREE.Vector3(position[0], position[1], position[2]);
            let point2 = new THREE.Vector3(position[3], position[4], position[5]);
            let normal = point1.clone().sub(point2).normalize();

            //Move grid to z
            input = input.replace("z=", "");

            let value = parseFloat(input);
            let l = value / normal.z;
            let x = point1.x + normal.x * l;
            let y = point1.y + normal.y * l;
            let z = point1.z + normal.z * l;

            this.points.push(new THREE.Vector3(x, y, z));

        } else if (input.indexOf(",") !== -1) {
            //Format: x, y, z
            let numbers = input.split(",");

            if (numbers.length === 2)
                this.points.push(new THREE.Vector3(parseFloat(numbers[0]), parseFloat(numbers[1]), 0));

            else if (numbers.length === 3)
                this.points.push(new THREE.Vector3(parseFloat(numbers[0]), parseFloat(numbers[1]), parseFloat(numbers[2])));

            else if (numbers.length === 5) {
                //Line
                let line = input.split(" ");
                numbers = line[0].split(",");
                this.points.push(new THREE.Vector3(parseFloat(numbers[0]), parseFloat(numbers[1]), parseFloat(numbers[2])));

                numbers = line[1].split(",");
                this.points.push(new THREE.Vector3(parseFloat(numbers[0]), parseFloat(numbers[1]), parseFloat(numbers[2])));

            } else if (numbers.length === 7) {
                //Triangle
                let line = input.split(" ");
                numbers = line[0].split(",");
                this.points.push(new THREE.Vector3(parseFloat(numbers[0]), parseFloat(numbers[1]), parseFloat(numbers[2])));

                numbers = line[1].split(",");
                this.points.push(new THREE.Vector3(parseFloat(numbers[0]), parseFloat(numbers[1]), parseFloat(numbers[2])));

                numbers = line[2].split(",");
                this.points.push(new THREE.Vector3(parseFloat(numbers[0]), parseFloat(numbers[1]), parseFloat(numbers[2])));

                this.AddTriangle();
                this.Render();

                this.points = [];
            }

        } else if (input.indexOf(" ") !== -1) {
            //Format: x y z
            let numbers = input.split(" ");
            point = this.points[this.points.length - 1];

            if (numbers.length === 2)
                this.points.push(new THREE.Vector3(point.x + parseFloat(numbers[0]), point.y + parseFloat(numbers[1]), 0));

            else if (numbers.length > 2)
                this.points.push(new THREE.Vector3(point.x + parseFloat(numbers[0]), point.y + parseFloat(numbers[1]), point.z + parseFloat(numbers[2])));

        } else {
            //Format: number
            let value = parseFloat(input);

            if (this.drawingpoint) {
                if (this.snapline) {
                    let position = this.snapline.geometry.attributes["position"].array;
                    let point1 = new THREE.Vector3(position[0], position[1], position[2]);
                    let point2 = new THREE.Vector3(position[3], position[4], position[5]);
                    let normal = point2.clone().sub(point1).normalize();

                    point = this.points[this.points.length - 1];
                    this.points.push(new THREE.Vector3(point.x + normal.x * value, point.y + normal.y * value, point.z + normal.z * value));

                } else {
                    point = this.points[this.points.length - 1];

                    if (point) {
                        let normal = this.drawingpoint.sub(point).normalize();
                        this.points.push(new THREE.Vector3(point.x + normal.x * value, point.y + normal.y * value, point.z + normal.z * value));

                    }
                }

            } else if (!Number.isNaN(value)) {
                this.points.push(new THREE.Vector3(value, 0, 0));

            } else {
                return;
            }
        }

        point = this.points[this.points.length - 1];

        if (point) {
            this.ShowGuideAxis(point.x, point.y, point.z);
            this.ShowActiveDrawing();
        }

        if (this.points.length === 1)
            this.ZoomAll();
    }
}