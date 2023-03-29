interface Window {
    CameraControls: any;
}

class Canvas3DSettings {
    backcolor: number = 0x000000;
}

class Canvas3D extends FrameWork {
    canvas: HTMLCanvasElement;
    camera: THREE.Camera;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    raycaster: THREE.Raycaster;
    font: THREE.Font;
    clock: THREE.Clock = new THREE.Clock();
    drawingaxis: THREE.Object3D;
    drawingguide: THREE.Object3D;
    drawingactive: THREE.Object3D;
    drawingpoint: THREE.Vector3;
    points: THREE.Vector3[] = [];
    controls: Window["CameraControls"];
    settings: Canvas3DSettings = new Canvas3DSettings();
    aspect: number = 1;
    ctrlKey: boolean = false;

    mousedown: THREE.Vector2 = new THREE.Vector2();
    mousemove: THREE.Vector2 = new THREE.Vector2();
    mouseup: THREE.Vector2 = new THREE.Vector2();

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
        this.LoadFont();
    }

    Refresh(): void {
        let self = this;
        this.Clear();

        this.scene = new THREE.Scene();
        this.raycaster = new THREE.Raycaster();

        this.InitializePerspectiveCamera();
        this.InitializeRenderer();
        this.InitializeControls();
        this.InitializeLight();

        window.addEventListener("resize", function () {
            self.Resize();
            self.ZoomAll();
        });

        document.body.addEventListener("keydown", (event) => {
            let element = event.target as HTMLElement;

            if (element.localName !== "input") {
                self.ctrlKey = event.ctrlKey;
                self.controls.enabled = false;

                if (event.key === "Enter" || event.key === "Escape") {
                    //Add current drawing
                    if (this.points.length > 1) {
                        if (this.drawingactive) {
                            this.Remove(this.drawingactive);
                            this.drawingactive = undefined;
                        }

                        let drawing = this.GeneratePolyLines(this.points);
                        this.AddObject(drawing);
                        this.Render();
                    }

                    this.points = [];
                }
                else {
                    input.object.classList.remove("hidden");
                    input.Focus();
                }
            }
        });

        document.body.addEventListener("keyup", (event) => {
            self.ctrlKey = false;
            self.controls.enabled = true;
        });

        let input = new FrameWork.Input({ classes: ["canvas-input", "hidden"] });

        input.onchange = (object: FrameWork.Input) => {
            let value = input.value;
            self.ParseInput(value);
            input.object.classList.add("hidden");
        };

        input.Show(this.object);

        this.Resize();
        this.ShowDrawingAxis(0, 0, 0);

        (function anim() {
            const delta = self.clock.getDelta();
            const elapsed = self.clock.getElapsedTime();
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
        this.camera.up.set(0, 0, 1);
    };

    InitializeOthographicCamera(): void {
        let frustumSize = 1;
        this.camera = new THREE.OrthographicCamera(frustumSize * this.aspect / - 2, frustumSize * this.aspect / 2, frustumSize / 2, frustumSize / - 2, -10000, 10000);
        this.camera.position.x = -20;
        this.camera.position.y = -20;
        this.camera.position.z = 2;
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

    MouseDown(event: MouseEvent): void {
        event.preventDefault();

        this.mousedown.x = event.clientX;
        this.mousedown.y = event.clientY;
    }

    MouseMove(event: MouseEvent): void {
        event.preventDefault();

        this.mousemove.x = event.clientX;
        this.mousemove.y = event.clientY;

        this.ShowDrawingGuide();

        let self = this;
        this.CurrentPoint(this.mousemove.x, this.mousemove.y, function (current: THREE.Vector3) {
            self.ShowDrawingAxis(current.x, current.y, current.z);
        });
    }

    MouseUp(event: MouseEvent): void {
        event.preventDefault();

        this.mouseup.x = event.clientX;
        this.mouseup.y = event.clientY;

        if (Math.abs(this.mousedown.x - this.mousemove.x) < 5 && Math.abs(this.mousedown.y - this.mousemove.y) < 5)
            this.UpdateDrawingGuide();
    }

    MouseWheel(event: MouseEvent): void {
        let point = this.points[this.points.length - 1];

        if (point)
            this.ShowDrawingAxis(point.x, point.y, point.z);
        else
            this.ShowDrawingAxis(0, 0, 0);
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

                let padding = 1;
                let options = { paddingLeft: padding, paddingRight: padding, paddingBottom: padding, paddingTop: padding };

                try {
                    this.controls.fitToBox(bounds, false, options).then(function () {
                        if (yrot)
                            self.controls.rotate(0, yrot, false);
                        else
                            self.controls.rotate(0, -Math.PI / 10, false);

                        if (xrot)
                            self.controls.rotate(xrot, 0, false);
                        else
                            self.controls.rotate(-Math.PI / 4, 0, false);

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
        this.controls.truck(0, 0);

        let x = this.controls._target.x;
        let y = this.controls._target.y;
        let z = this.controls._target.z;

        this.camera.updateMatrixWorld();
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

    ParseInput(input: string): void {
        let point: THREE.Vector3;

        if (input.indexOf(",") !== -1) {
            //Format: x, y, z
            let numbers = input.split(",");

            if (numbers.length === 2)
                this.points.push(new THREE.Vector3(parseFloat(numbers[0]), parseFloat(numbers[1]), 0));

            else if (numbers.length > 2)
                this.points.push(new THREE.Vector3(parseFloat(numbers[0]), parseFloat(numbers[1]), parseFloat(numbers[2])));

        } else if (input.indexOf(" ") !== -1) {
            //Format: x y z
            input = input.replace("  ", " ");
            input = input.replace("  ", " ");
            input = input.replace("  ", " ");

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
                point = this.points[this.points.length - 1];
                let normal = this.drawingpoint.sub(point).normalize();
                this.points.push(new THREE.Vector3(point.x + normal.x * value, point.y + normal.y * value, point.z + normal.z * value));
            } else {
                this.points.push(new THREE.Vector3(value, 0, 0));
            }
        }

        point = this.points[this.points.length - 1];
        this.ShowDrawingAxis(point.x, point.y, point.z);

        this.ShowActiveDrawing();

        if (this.points.length === 1)
            this.ZoomAll();
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

    ShowDrawingAxis(x: number, y: number, z: number): void {
        let vector = this.camera.position.clone();
        let distance = vector.sub(new THREE.Vector3(x, y, z)).length();
        let camera = this.camera as THREE.PerspectiveCamera;
        let height = distance * Math.tan(camera.fov * Math.PI / 180) / 100;

        let points: THREE.Vector3[] = [];
        let colors: string[] = [];

        colors.push("#FFFFFF");
        colors.push("#FFFFFF");
        colors.push("#FFFFFF");

        //Blue
        colors.push("#0000FF");

        //Green
        colors.push("#00FF00");

        //Red
        colors.push("#FF0000");

        let size = height;

        //X
        points.push(new THREE.Vector3(x - size, y, z));
        points.push(new THREE.Vector3(x + size, y, z));

        //Y
        points.push(new THREE.Vector3(x, y - size, z));
        points.push(new THREE.Vector3(x, y + size, z));

        //Z
        points.push(new THREE.Vector3(x, y, z - size));
        points.push(new THREE.Vector3(x, y, z + size));

        size = 10;

        //X
        points.push(new THREE.Vector3(x - size, y, z));
        points.push(new THREE.Vector3(x + size, y, z));

        //Y
        points.push(new THREE.Vector3(x, y - size, z));
        points.push(new THREE.Vector3(x, y + size, z));

        //Z
        points.push(new THREE.Vector3(x, y, z - size));
        points.push(new THREE.Vector3(x, y, z + size));

        if (this.drawingaxis) {
            this.Remove(this.drawingaxis);
            this.drawingaxis = undefined;
        }

        this.drawingaxis = new THREE.Object3D();

        for (let i = 0; i < points.length; i += 2) {
            let geometry = new THREE.BufferGeometry();
            let vertices = [];

            vertices.push(points[i].x, points[i].y, points[i].z, points[i + 1].x, points[i + 1].y, points[i + 1].z);

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

            let material = new THREE.LineBasicMaterial({ color: colors.pop(), opacity: i < 6 ? 1 : 0, transparent: true });
            let lines = new THREE.LineSegments(geometry, material);
            this.drawingaxis.add(lines);
        }

        this.AddObject(this.drawingaxis);
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
                    self.AddObject(self.drawingguide);
                    self.Render();

                } else {
                    self.drawingpoint = undefined;
                    self.Render();
                }
            });
        }
    }

    UpdateDrawingGuide(): void {
        if (this.points.length && this.drawingpoint) {
            this.points.push(this.drawingpoint);
            this.ShowDrawingAxis(this.drawingpoint.x, this.drawingpoint.y, this.drawingpoint.z);
            this.ShowActiveDrawing();
        }
    };

    GenerateLines(points: THREE.Vector3[], opacity: number = 1): THREE.Object3D {
        let object = new THREE.Object3D();
        let geometry = new THREE.BufferGeometry();
        let vertices = [];

        for (let i = 0; i < points.length; i += 2)
            vertices.push(points[i].x, points[i].y, points[i].z, points[i + 1].x, points[i + 1].y, points[i + 1].z);

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        let material = new THREE.LineBasicMaterial({ color: 0xFFFFFF, opacity: opacity, transparent: opacity === 1 ? false : true });
        let lines = new THREE.LineSegments(geometry, material);
        object.add(lines);

        return object;
    };

    GeneratePolyLines(points: THREE.Vector3[]): THREE.Object3D {
        let object = new THREE.Object3D();
        let geometry = new THREE.BufferGeometry();
        let vertices = [];

        for (let i = 0; i < points.length - 1; i++)
            vertices.push(points[i].x, points[i].y, points[i].z, points[i + 1].x, points[i + 1].y, points[i + 1].z);

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        let material = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
        let lines = new THREE.LineSegments(geometry, material);
        object.add(lines);

        return object;
    };


    Select(x: number, y: number, res?: Function): void {
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

                if (this.selectedobject) {
                    this.selectedobject.material = this.selectedmaterial;
                    this.selectedobject = null;
                    this.selectedmaterial = null;
                }

                if (this.ctrlKey) {
                    this.selectedobjects.push(object.object);
                    this.selectedmaterials.push(object.object.material as THREE.Material);
                    object.object.material = material;

                } else {
                    this.selectedobject = object.object as THREE.Mesh;
                    this.selectedmaterial = this.selectedobject.material as THREE.Material;
                    this.selectedobject.material = material;
                }

                this.Render();

                if (res)
                    res(intersects[0].point);

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

        for (let child of this.scene.children) {
            if (child.type === "Object3D") {
                intersects = this.raycaster.intersectObjects(child.children);

                if (intersects && intersects.length > 0)
                    break;
            }
        }

        if (intersects && intersects.length > 0) {
            for (let object of intersects) {
                if (res)
                    res(intersects[0].point);
                break;
            }

        } else {

            let vec = new THREE.Vector3(); // create once and reuse
            let pos = new THREE.Vector3(); // create once and reuse

            let x = this.mousemove.x;
            let y = this.mousemove.y;
            let left = this.parent.offsetLeft;
            let top = this.parent.offsetTop;

            let mouse = {
                x: ((x - left) / this.renderer.domElement.clientWidth) * 2 - 1,
                y: -((y - top) / this.renderer.domElement.clientHeight) * 2 + 1
            };

            vec.set(mouse.x, mouse.y, this.points[this.points.length - 1].z);

            let camera = this.camera as THREE.PerspectiveCamera;
            camera.updateProjectionMatrix();

            vec.unproject(this.camera);
            vec.sub(this.camera.position).normalize();

            let distance = - this.camera.position.z / vec.z;
            pos.copy(this.camera.position).add(vec.multiplyScalar(distance));

            if (res)
                res(new THREE.Vector3(pos.x, pos.y, pos.z));
        }
    }

    CaptureThumbnail(res?: Function): void {
        this.ZoomAll(() => {
            let image = this.renderer.domElement.toDataURL();
            if (res)
                res(image);
        });
    };

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

    LoadFont(): void {
        let self = this;
        let loader = new THREE.FontLoader();

        try {
            if (window.chrome.webview) {
                loader.load('https://canvas/fonts/arial.json', function (response) {
                    self.font = response;
                });
            } else {
                loader.load('fonts/arial.json', function (response) {
                    self.font = response;
                });
            }
        } catch (error) {
            loader.load('fonts/arial.json', function (response) {
                self.font = response;
            });
        }
    };
}