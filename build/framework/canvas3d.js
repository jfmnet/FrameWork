var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CanvasDraw;
(function (CanvasDraw) {
    CanvasDraw[CanvasDraw["Line"] = 1] = "Line";
    CanvasDraw[CanvasDraw["Triangle"] = 2] = "Triangle";
})(CanvasDraw || (CanvasDraw = {}));
var MeshTriangle = /** @class */ (function () {
    function MeshTriangle() {
    }
    return MeshTriangle;
}());
var Canvas3DSettings = /** @class */ (function () {
    function Canvas3DSettings() {
        this.backcolor = 0x08121A;
    }
    return Canvas3DSettings;
}());
var Canvas3D = /** @class */ (function (_super) {
    __extends(Canvas3D, _super);
    /**
     *
     */
    function Canvas3D() {
        var _this = _super.call(this, null, "canvas") || this;
        _this.clock = new THREE.Clock();
        _this.draw = CanvasDraw.Line;
        _this.points = [];
        _this.settings = new Canvas3DSettings();
        _this.aspect = 1;
        _this.ctrlKey = false;
        _this.mousedown = new THREE.Vector2();
        _this.mousemove = new THREE.Vector2();
        _this.mouseup = new THREE.Vector2();
        _this.mousecurrent = new THREE.Vector3();
        _this.currentz = 0;
        _this.selectedobjects = [];
        _this.selectedmaterials = [];
        _this.classes.push("canvas-3D");
        window.CameraControls.install({ THREE: THREE });
        _this.LoadFont(function () {
            //this.Example1();
            //this.Example2();
            _this.ShowGridXY(0, 0, 0);
            _this.Resize();
            //this.ShowPointerAxis(0, 0, 0);
            _this.ZoomAll();
        });
        return _this;
    }
    Canvas3D.prototype.Refresh = function () {
        var self = this;
        this.Clear();
        this.scene = new THREE.Scene();
        this.raycaster = new THREE.Raycaster();
        this.raycaster.params.Line.threshold = 0.01;
        this.raycaster.params.Mesh.threshold = 0.01;
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
            document.body.addEventListener("keydown", function (event) {
                var element = event.target;
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
                }
                else {
                    if (event.key === "Enter" || event.key === "Escape") {
                        input.object.classList.add("hidden");
                    }
                }
            });
            document.body.addEventListener("keyup", function (event) {
                self.ctrlKey = false;
                self.controls.enabled = true;
            });
        }
        var input = new FrameWork.Input({ classes: ["canvas-input", "hidden"] });
        input.onchange = function (object) {
            var value = input.value.trim();
            if (value)
                self.ParseInput(value);
            input.object.classList.add("hidden");
        };
        input.Show(this.object);
        //VR
        // if (this.settings.allowvr)
        //     this.object.appendChild(VRButton.createButton(this.renderer, this.scene, this.camera, function (status: String) {
        //         if (status === "enter") {
        //             self.object.style.position = "fixed";
        //             self.object.style.width = "100%";
        //         } else {
        //             self.object.style.position = "absolute";
        //             self.object.style.width = "100%";
        //         }
        //         self.Resize();
        //         self.ZoomAll();
        //     }));
        (function anim() {
            var delta = self.clock.getDelta();
            var updated = self.controls.update(delta);
            requestAnimationFrame(anim);
            if (self.controls._enabled && updated) {
                self.renderer.render(self.scene, self.camera);
            }
        })();
    };
    Canvas3D.prototype.InitializePerspectiveCamera = function () {
        this.camera = new THREE.PerspectiveCamera(30, 0.5 * this.aspect, 0.001, 10000);
        this.camera.position.x = -20;
        this.camera.position.y = -20;
        this.camera.position.z = 20;
        if (this.settings.allowvr)
            this.camera.up.set(0, 1, 0);
        else
            this.camera.up.set(0, 0, 1);
    };
    ;
    Canvas3D.prototype.InitializeOthographicCamera = function () {
        var frustumSize = 1;
        this.camera = new THREE.OrthographicCamera(frustumSize * this.aspect / -2, frustumSize * this.aspect / 2, frustumSize / 2, frustumSize / -2, -10000, 10000);
        this.camera.position.x = -20;
        this.camera.position.y = -20;
        this.camera.position.z = 2;
        if (this.settings.allowvr)
            this.camera.up.set(0, 1, 0);
        else
            this.camera.up.set(0, 0, 1);
        var width = this.object.clientWidth / 2;
        var height = width / this.aspect;
        var camera = this.camera;
        camera.left = -width;
        camera.right = width;
        camera.top = height;
        camera.bottom = -height;
    };
    ;
    Canvas3D.prototype.InitializeRenderer = function () {
        var self = this;
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
    ;
    Canvas3D.prototype.InitializeControls = function () {
        this.controls = new window.CameraControls(this.camera, this.renderer.domElement);
        this.controls.mouseButtons.right = window.CameraControls.ACTION.OFFSET;
        this.controls.dollyToCursor = true;
        var self = this;
        this.controls.addEventListener('control', function (event) {
            self.UpdateControl(event);
        });
    };
    Canvas3D.prototype.InitializeLight = function () {
        var radius = 200;
        var sunLight = new THREE.DirectionalLight(0xffffff, 0.25);
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
        var ambient = new THREE.AmbientLight(0xaaaaaa);
        this.scene.add(ambient);
        var light3 = new THREE.DirectionalLight(0xffffff, 0.25);
        light3.position.set(134, 200, 0);
        this.scene.add(light3);
        var light4 = new THREE.DirectionalLight(0xffffff, 0.25);
        light4.position.set(-134, -167, 0);
        this.scene.add(light4);
    };
    ;
    Canvas3D.prototype.Render = function () {
        this.renderer.render(this.scene, this.camera);
    };
    ;
    Canvas3D.prototype.AddObject = function (object) {
        this.scene.add(object);
    };
    ;
    Canvas3D.prototype.Remove = function (object) {
        this.scene.remove(object);
    };
    Canvas3D.prototype.ClearObjects = function () {
        var objects = [];
        for (var _i = 0, _a = this.scene.children; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.type !== "Object3D" && item.type !== "Mesh" && item.type !== "LineSegments")
                objects.push(item);
        }
        this.scene.children = objects;
    };
    Canvas3D.prototype.SetVisibility = function (name, value) {
        for (var _i = 0, _a = this.scene.children; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.name === name)
                item.visible = value;
        }
        this.Render();
    };
    Canvas3D.prototype.MouseDown = function (event) {
        event.preventDefault();
        this.mousedown.x = event.clientX;
        this.mousedown.y = event.clientY;
        this.SetRotationPoint(event);
    };
    Canvas3D.prototype.MouseMove = function (event) {
        event.preventDefault();
        this.mousemove.x = event.clientX;
        this.mousemove.y = event.clientY;
        // if (this.settings.allowdraw) {
        //     this.ShowDrawingGuide();
        //     let self = this;
        //     this.CurrentPoint(this.mousemove.x, this.mousemove.y, function (current: THREE.Vector3) {
        //         self.ShowPointerAxis(current.x, current.y, current.z);
        //     });
        // }
    };
    Canvas3D.prototype.MouseUp = function (event) {
        event.preventDefault();
        this.mouseup.x = event.clientX;
        this.mouseup.y = event.clientY;
        // if (this.settings.allowdraw) {
        //     if (Math.abs(this.mousedown.x - this.mousemove.x) < 5 && Math.abs(this.mousedown.y - this.mousemove.y) < 5)
        //         this.UpdateDrawingGuide();
        // } else {
        //     if (Math.abs(this.mousedown.x - this.mousemove.x) < 5 && Math.abs(this.mousedown.y - this.mousemove.y) < 5)
        //         this.Select(this.mouseup.x, this.mouseup.y, this.onselect);
        // }
    };
    Canvas3D.prototype.MouseWheel = function (event) {
        var point = this.points[this.points.length - 1];
        // if (this.settings.allowdraw) {
        //     if (point)
        //         this.ShowPointerAxis(point.x, point.y, point.z);
        //     else
        //         this.ShowPointerAxis(0, 0, 0);
        // }
    };
    Canvas3D.prototype.ZoomAll = function (res, xrot, yrot) {
        this.Resize();
        var mesh;
        var count = 0;
        var radius;
        var self = this;
        for (var _i = 0, _a = this.scene.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.type === "Object3D") {
                var bounds = new THREE.Box3().setFromObject(child);
                this.UpdateBounds(child, bounds);
                radius = Math.max(bounds.max.x - bounds.min.x, bounds.max.y - bounds.min.y, bounds.max.z - bounds.min.z) / 2;
                this.controls.reset(true);
                this.controls.update(true);
                var padding = radius / 10;
                var options = { paddingLeft: padding, paddingRight: padding, paddingBottom: padding, paddingTop: padding };
                try {
                    this.controls.fitToBox(bounds, false, options).then(function () {
                        self.controls.rotate(0, -Math.PI / 10, false);
                        //self.controls.rotate(-Math.PI / 4, 0, false);
                        if (res)
                            res();
                        self.Render();
                    });
                }
                catch (error) {
                }
                this.UpdateControl(null);
                break;
            }
        }
    };
    Canvas3D.prototype.ZoomOut = function () {
        if (this.camera instanceof THREE.PerspectiveCamera) {
            var camera = this.camera;
            this.controls.zoom(-camera.zoom * 0.1);
        }
        else {
            var camera = this.camera;
            this.controls.zoom(-camera.zoom * 0.1);
        }
        this.Render();
    };
    Canvas3D.prototype.ZoomIn = function () {
        if (this.camera instanceof THREE.PerspectiveCamera) {
            var camera = this.camera;
            this.controls.zoom(camera.zoom * 0.1);
        }
        else {
            var camera = this.camera;
            this.controls.zoom(camera.zoom * 0.1);
        }
        this.Render();
    };
    Canvas3D.prototype.UpdateControl = function (event) {
        // this.controls.truck(0, 0);
        // let x = this.controls._target.x;
        // let y = this.controls._target.y;
        // let z = this.controls._target.z;
        // this.camera.updateMatrixWorld();
    };
    Canvas3D.prototype.OthographicView = function () {
        this.InitializeOthographicCamera();
        this.InitializeControls();
        this.ZoomAll();
    };
    Canvas3D.prototype.PerspectiveView = function () {
        this.InitializePerspectiveCamera();
        this.InitializeControls();
        this.ZoomAll();
    };
    Canvas3D.prototype.Resize = function () {
        var ratio = window.devicePixelRatio || 1;
        ratio = 1;
        this.canvas.width = this.object.clientWidth * ratio;
        this.canvas.height = this.object.clientHeight * ratio;
        this.aspect = this.canvas.width / this.canvas.height;
        if (this.camera instanceof THREE.PerspectiveCamera) {
            var camera = this.camera;
            camera.aspect = this.aspect;
            camera.updateProjectionMatrix();
        }
        else {
            var camera = this.camera;
            camera.updateProjectionMatrix();
        }
        this.renderer.setSize(this.canvas.width, this.canvas.height);
        this.Render();
    };
    Canvas3D.prototype.ShowActiveDrawing = function () {
        if (this.points.length > 1) {
            if (this.drawingactive) {
                this.Remove(this.drawingactive);
                this.drawingactive = undefined;
            }
            this.drawingactive = this.GeneratePolyLines(this.points);
            this.AddObject(this.drawingactive);
            this.Render();
        }
    };
    Canvas3D.prototype.ShowGridXY = function (x, y, z) {
        if (this.drawinggrid) {
            this.Remove(this.drawinggrid);
            this.drawinggrid = undefined;
        }
        var points = [];
        var size = 10;
        var textsize = size / 50;
        var textmaterial = new THREE.LineBasicMaterial({
            color: 0x888888
        });
        //Minor
        for (var i = -size; i <= size; i += 0.1) {
            //Along X
            points.push(new THREE.Vector3(x + i, y - size, z));
            points.push(new THREE.Vector3(x + i, y + size, z));
            //Along Y
            points.push(new THREE.Vector3(x - size, y + i, z));
            points.push(new THREE.Vector3(x + size, y + i, z));
        }
        var lines = this.GenerateLines(points, "#0C1B27");
        this.AddObject(lines);
        //Major
        points = [];
        for (var i = -size; i <= size; i++) {
            //Along X
            this.AddObject(this.GenerateText(i.toString(), x + i, y - size - textsize, z, textsize, ALIGNHORIZONTAL.CENTER, ALIGNVERTICAL.TOP, new THREE.Vector3(), textmaterial));
            points.push(new THREE.Vector3(x + i, y - size, z));
            points.push(new THREE.Vector3(x + i, y + size, z));
            //Along Y
            this.AddObject(this.GenerateText(i.toString(), x - size - textsize, y + i, z, textsize, ALIGNHORIZONTAL.RIGHT, ALIGNVERTICAL.MIDDLE, new THREE.Vector3(), textmaterial));
            points.push(new THREE.Vector3(x - size, y + i, z));
            points.push(new THREE.Vector3(x + size, y + i, z));
        }
        lines = this.GenerateLines(points, "#142D41");
        this.AddObject(lines);
        textmaterial = new THREE.LineBasicMaterial({
            color: 0x1D3E5A
        });
        this.AddObject(this.GenerateText("CSiBangkok", 0, 0, 0.01, 2, ALIGNHORIZONTAL.CENTER, ALIGNVERTICAL.MIDDLE, new THREE.Vector3(), textmaterial));
    };
    Canvas3D.prototype.ShowPointerAxis = function (x, y, z) {
        var vector = this.camera.position.clone();
        if (Number.isNaN(vector.x))
            return;
        var distance = vector.sub(new THREE.Vector3(x, y, z)).length();
        var camera = this.camera;
        var height = distance * Math.tan(camera.fov * Math.PI / 180) / 25;
        var points = [];
        var colors = [];
        //Blue
        colors.push("#0000FF");
        //Green
        colors.push("#00FF00");
        //Red
        colors.push("#FF0000");
        var size = height || 1;
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
        for (var i = 0; i < points.length; i += 2) {
            var geometry = new THREE.BufferGeometry();
            var vertices = [];
            vertices.push(points[i].x, points[i].y, points[i].z, points[i + 1].x, points[i + 1].y, points[i + 1].z);
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            var material = new THREE.LineBasicMaterial({ color: colors.pop() });
            var lines = new THREE.LineSegments(geometry, material);
            this.pointeraxis.add(lines);
        }
        this.AddObject(this.pointeraxis);
        this.Render();
    };
    Canvas3D.prototype.ShowGuideAxis = function (x, y, z) {
        var vector = this.camera.position.clone();
        if (Number.isNaN(vector.x))
            return;
        var points = [];
        var colors = [];
        colors.push("#FFFFFF");
        colors.push("#FFFFFF");
        colors.push("#FFFFFF");
        var size = 10;
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
        for (var i = 0; i < points.length; i += 2) {
            var geometry = new THREE.BufferGeometry();
            var vertices = [];
            vertices.push(points[i].x, points[i].y, points[i].z, points[i + 1].x, points[i + 1].y, points[i + 1].z);
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            var material = new THREE.LineBasicMaterial({ color: colors.pop(), opacity: 0, transparent: true });
            var lines = new THREE.LineSegments(geometry, material);
            this.guideaxis.add(lines);
        }
        this.AddObject(this.guideaxis);
        this.Render();
    };
    Canvas3D.prototype.ShowDrawingGuide = function () {
        if (this.drawingguide) {
            this.Remove(this.drawingguide);
            this.drawingguide = undefined;
        }
        if (this.points.length) {
            var self_1 = this;
            this.CurrentPoint(this.mousemove.x, this.mousemove.y, function (current) {
                if (current) {
                    var points = [];
                    var point = self_1.points[self_1.points.length - 1];
                    self_1.drawingpoint = current;
                    points.push(point);
                    points.push(current);
                    self_1.drawingguide = self_1.GeneratePolyLines(points);
                    self_1.drawingguide.name = "guide";
                    self_1.AddObject(self_1.drawingguide);
                    self_1.Render();
                }
                else {
                    self_1.drawingpoint = undefined;
                    self_1.Render();
                }
            });
        }
    };
    Canvas3D.prototype.SetRotationPoint = function (event) {
        var x = event.x;
        var y = event.y;
        var left = this.parent.offsetLeft;
        var top = this.parent.offsetTop;
        var mouse = {
            x: ((x - left) / this.renderer.domElement.clientWidth) * 2 - 1,
            y: -((y - top) / this.renderer.domElement.clientHeight) * 2 + 1
        };
        this.camera.updateMatrixWorld();
        this.raycaster.setFromCamera(mouse, this.camera);
        var intersects;
        for (var _i = 0, _a = this.scene.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.type === "Object3D" || child.type === "Mesh") {
                intersects = this.raycaster.intersectObjects(child.children);
                if (intersects && intersects.length > 0) {
                    for (var _b = 0, intersects_1 = intersects; _b < intersects_1.length; _b++) {
                        var object = intersects_1[_b];
                        var point = object.point;
                        this.controls.setOrbitPoint(point.x, point.y, point.z);
                        this.controls.update(this.clock.getDelta());
                        break;
                    }
                }
            }
        }
    };
    Canvas3D.prototype.UpdateDrawingGuide = function () {
        if (this.draw === CanvasDraw.Triangle && this.points.length === 3) {
            this.points.push(this.points[0]);
            this.AddTriangle();
            this.Render();
        }
        else if (this.points.length && this.drawingpoint) {
            this.points.push(this.drawingpoint);
            this.ShowGuideAxis(this.drawingpoint.x, this.drawingpoint.y, this.drawingpoint.z);
            this.ShowActiveDrawing();
        }
        else {
            var self_2 = this;
            self_2.points.push(new THREE.Vector3(this.mousecurrent.x, this.mousecurrent.y, this.mousecurrent.z));
            self_2.ShowGuideAxis(this.mousecurrent.x, this.mousecurrent.y, this.mousecurrent.z);
            self_2.ShowActiveDrawing();
        }
    };
    Canvas3D.prototype.GenerateLines = function (points, color, opacity) {
        if (opacity === void 0) { opacity = 1; }
        var vertices = [];
        if (this.settings.allowvr) {
            for (var i = 0; i < points.length; i += 2) {
                vertices.push(points[i].x, points[i].z, points[i].y, points[i + 1].x, points[i + 1].z, points[i + 1].y);
            }
        }
        else {
            for (var i = 0; i < points.length; i += 2) {
                vertices.push(points[i].x, points[i].y, points[i].z, points[i + 1].x, points[i + 1].y, points[i + 1].z);
            }
        }
        var geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        var object = new THREE.Object3D();
        var material = new THREE.LineBasicMaterial({ color: color, opacity: opacity, transparent: opacity === 1 ? false : true });
        object.add(new THREE.LineSegments(geometry, material));
        return object;
    };
    Canvas3D.prototype.GeneratePolyLines = function (points) {
        var object = new THREE.Object3D();
        for (var i = 0; i < points.length - 1; i++) {
            var geometry = new THREE.BufferGeometry();
            var vertices = [];
            vertices.push(points[i].x, points[i].y, points[i].z, points[i + 1].x, points[i + 1].y, points[i + 1].z);
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            var material = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
            var lines = new THREE.Line(geometry, material);
            object.add(lines);
        }
        return object;
    };
    Canvas3D.prototype.GenerateTriangles = function (triangles, color) {
        var geometry = new THREE.BufferGeometry();
        var vertices = new Float32Array(triangles.length * 9);
        //let colors = new Float32Array(colors.length * 9);
        var j;
        var elem;
        for (var i = 0; i < triangles.length; i++) {
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
            }
            else {
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
        var material = new THREE.MeshPhongMaterial({ color: color ? color : 0x8888ff, emissive: 0x111111, side: THREE.DoubleSide, transparent: true, opacity: 0.75 });
        return new THREE.Mesh(geometry, material);
    };
    ;
    Canvas3D.prototype.GenerateText = function (text, x, y, z, size, alignx, aligny, rotation, material) {
        var geo = new THREE.TextGeometry(text, {
            font: this.font,
            size: size,
            height: 0
        });
        var center = geo.center();
        var widthx = center.boundingBox.max.x - center.boundingBox.min.x;
        var widthy = center.boundingBox.max.y - center.boundingBox.min.y;
        geo.computeBoundingBox();
        geo.computeVertexNormals();
        var mesh = new THREE.Mesh(geo, material);
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
    };
    Canvas3D.prototype.AddTriangle = function () {
        //Triangle
        var triangles = [];
        var triangle = new MeshTriangle();
        triangle.point1 = this.points[0];
        triangle.point2 = this.points[1];
        triangle.point3 = this.points[2];
        triangles.push(triangle);
        var drawing = this.GenerateTriangles(triangles);
        this.AddObject(drawing);
    };
    Canvas3D.prototype.Select = function (x, y, res) {
        //let rect = this.object.getClientRects();
        var left = this.parent.offsetLeft;
        var top = this.parent.offsetTop;
        var mouse = {
            x: ((x - left) / this.renderer.domElement.clientWidth) * 2 - 1,
            y: -((y - top) / this.renderer.domElement.clientHeight) * 2 + 1
        };
        this.camera.updateMatrixWorld();
        this.raycaster.setFromCamera(mouse, this.camera);
        var intersects;
        for (var _i = 0, _a = this.scene.children; _i < _a.length; _i++) {
            var child = _a[_i];
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
        }
        else if (!this.ctrlKey && this.selectedobject) {
            this.selectedobject.material = this.selectedmaterial;
            this.selectedobject = undefined;
            this.selectedmaterial = undefined;
        }
        else if (!this.ctrlKey) {
            var i = 0;
            for (var _b = 0, _c = this.selectedobjects; _b < _c.length; _b++) {
                var item = _c[_b];
                item.material = this.selectedmaterials[i++];
            }
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
            for (var _d = 0, intersects_2 = intersects; _d < intersects_2.length; _d++) {
                var object = intersects_2[_d];
                var material = new THREE.MeshPhongMaterial({ color: 0xffff44, specular: 0x333333, opacity: 0.75, transparent: true, side: THREE.DoubleSide });
                ;
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
        }
        else {
            if (this.selectedobject) {
                this.selectedobject.material = this.selectedmaterial;
                this.selectedobject = null;
                this.selectedmaterial = null;
            }
            this.Render();
            if (res)
                res();
        }
    };
    Canvas3D.prototype.CurrentPoint = function (x, y, res) {
        var left = this.parent.offsetLeft;
        var top = this.parent.offsetTop;
        var mouse = {
            x: ((x - left) / this.renderer.domElement.clientWidth) * 2 - 1,
            y: -((y - top) / this.renderer.domElement.clientHeight) * 2 + 1
        };
        this.camera.updateMatrixWorld();
        this.raycaster.setFromCamera(mouse, this.camera);
        var intersects;
        var snappoint;
        var snapdistance;
        this.snapline = null;
        //Snap to lines
        for (var _i = 0, _a = this.scene.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.type === "Object3D" && child.name !== "axis" && child.name !== "grid" && child.name !== "guide") {
                intersects = this.raycaster.intersectObjects(child.children, true);
                if (intersects && intersects.length > 0) {
                    var point = intersects[0].point;
                    var distance = intersects[0].distance;
                    //Check the end points
                    var position = intersects[0].object.geometry.attributes["position"].array;
                    var point1 = new THREE.Vector3(position[0], position[1], position[2]);
                    var point2 = new THREE.Vector3(position[3], position[4], position[5]);
                    var diff1 = point1.clone().sub(point).length();
                    var diff2 = point2.clone().sub(point).length();
                    if (diff1 < 0.1 && diff1 < diff2) {
                        //Cursor is closer to the starting point
                        point = point1;
                        distance = diff1;
                    }
                    else if (diff2 < 0.1 && diff2 < diff1) {
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
        for (var _b = 0, _c = this.scene.children; _b < _c.length; _b++) {
            var child = _c[_b];
            if (child.name === "grid") {
                intersects = this.raycaster.intersectObjects(child.children, true);
                if (intersects && intersects.length > 0) {
                    var point = intersects[0].point;
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
    };
    Canvas3D.prototype.CaptureThumbnail = function (res) {
        var _this = this;
        this.ZoomAll(function () {
            var image = _this.renderer.domElement.toDataURL();
            if (res)
                res(image);
        });
    };
    Canvas3D.prototype.UpdateBounds = function (child, bounds) {
        var mesh;
        bounds.min.y = Number.POSITIVE_INFINITY;
        bounds.max.y = Number.NEGATIVE_INFINITY;
        for (var _i = 0, _a = child.children; _i < _a.length; _i++) {
            var item = _a[_i];
            mesh = item;
            if (!mesh.geometry.boundingSphere)
                mesh.geometry.computeBoundingSphere();
            if (!mesh.geometry.boundingBox)
                mesh.geometry.computeBoundingBox();
            if (bounds.min.y > mesh.geometry.boundingBox.min.y)
                bounds.min.y = mesh.geometry.boundingBox.min.y;
            if (bounds.max.y < mesh.geometry.boundingBox.max.y)
                bounds.max.y = mesh.geometry.boundingBox.max.y;
        }
    };
    Canvas3D.prototype.LoadFont = function (ret) {
        var self = this;
        var loader = new THREE.FontLoader();
        try {
            if (window.chrome.webview) {
                loader.load('https://canvas/fonts/arial.json', function (response) {
                    self.font = response;
                    if (ret)
                        ret();
                });
            }
            else {
                loader.load('fonts/arial.json', function (response) {
                    self.font = response;
                    if (ret)
                        ret();
                });
            }
        }
        catch (error) {
            loader.load('fonts/arial.json', function (response) {
                self.font = response;
                if (ret)
                    ret();
            });
        }
    };
    Canvas3D.prototype.CleanInput = function (text) {
        text = text.replace("  ", " ");
        text = text.replace("  ", " ");
        text = text.replace("  ", " ");
        return text.toLowerCase();
    };
    Canvas3D.prototype.ParseInput = function (input) {
        var point;
        input = this.CleanInput(input);
        if (input.indexOf("zo") !== -1 && input.indexOf("=") !== -1) {
            //Move grid to z
            input = input.replace("zo=", "");
            var value = parseFloat(input);
            this.ShowGridXY(0, 0, value);
            return;
        }
        else if (input.indexOf("z") !== -1 && input.indexOf("=") !== -1) {
            //Draw a line from snapline z1 to z
            var position = this.snapline.geometry.attributes["position"].array;
            var point1 = new THREE.Vector3(position[0], position[1], position[2]);
            var point2 = new THREE.Vector3(position[3], position[4], position[5]);
            var normal = point1.clone().sub(point2).normalize();
            //Move grid to z
            input = input.replace("z=", "");
            var value = parseFloat(input);
            var l = value / normal.z;
            var x = point1.x + normal.x * l;
            var y = point1.y + normal.y * l;
            var z = point1.z + normal.z * l;
            this.points.push(new THREE.Vector3(x, y, z));
        }
        else if (input.indexOf(",") !== -1) {
            //Format: x, y, z
            var numbers = input.split(",");
            if (numbers.length === 2)
                this.points.push(new THREE.Vector3(parseFloat(numbers[0]), parseFloat(numbers[1]), 0));
            else if (numbers.length === 3)
                this.points.push(new THREE.Vector3(parseFloat(numbers[0]), parseFloat(numbers[1]), parseFloat(numbers[2])));
            else if (numbers.length === 5) {
                //Line
                var line = input.split(" ");
                numbers = line[0].split(",");
                this.points.push(new THREE.Vector3(parseFloat(numbers[0]), parseFloat(numbers[1]), parseFloat(numbers[2])));
                numbers = line[1].split(",");
                this.points.push(new THREE.Vector3(parseFloat(numbers[0]), parseFloat(numbers[1]), parseFloat(numbers[2])));
            }
            else if (numbers.length === 7) {
                //Triangle
                var line = input.split(" ");
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
        }
        else if (input.indexOf(" ") !== -1) {
            //Format: x y z
            var numbers = input.split(" ");
            point = this.points[this.points.length - 1];
            if (numbers.length === 2)
                this.points.push(new THREE.Vector3(point.x + parseFloat(numbers[0]), point.y + parseFloat(numbers[1]), 0));
            else if (numbers.length > 2)
                this.points.push(new THREE.Vector3(point.x + parseFloat(numbers[0]), point.y + parseFloat(numbers[1]), point.z + parseFloat(numbers[2])));
        }
        else {
            //Format: number
            var value = parseFloat(input);
            if (this.drawingpoint) {
                if (this.snapline) {
                    var position = this.snapline.geometry.attributes["position"].array;
                    var point1 = new THREE.Vector3(position[0], position[1], position[2]);
                    var point2 = new THREE.Vector3(position[3], position[4], position[5]);
                    var normal = point2.clone().sub(point1).normalize();
                    point = this.points[this.points.length - 1];
                    this.points.push(new THREE.Vector3(point.x + normal.x * value, point.y + normal.y * value, point.z + normal.z * value));
                }
                else {
                    point = this.points[this.points.length - 1];
                    if (point) {
                        var normal = this.drawingpoint.sub(point).normalize();
                        this.points.push(new THREE.Vector3(point.x + normal.x * value, point.y + normal.y * value, point.z + normal.z * value));
                    }
                }
            }
            else if (!Number.isNaN(value)) {
                this.points.push(new THREE.Vector3(value, 0, 0));
            }
            else {
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
    };
    return Canvas3D;
}(FrameWork));
//# sourceMappingURL=canvas3d.js.map