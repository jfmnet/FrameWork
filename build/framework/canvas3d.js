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
var Canvas3DSettings = /** @class */ (function () {
    function Canvas3DSettings() {
        this.backcolor = 0x000000;
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
        _this.LoadFont();
        return _this;
    }
    Canvas3D.prototype.Refresh = function () {
        var _this = this;
        var self = this;
        this.Clear();
        this.scene = new THREE.Scene();
        this.raycaster = new THREE.Raycaster();
        this.raycaster.params.Line.threshold = 0.05;
        this.InitializePerspectiveCamera();
        this.InitializeRenderer();
        this.InitializeControls();
        this.InitializeLight();
        window.addEventListener("resize", function () {
            self.Resize();
            self.ZoomAll();
        });
        document.body.addEventListener("keydown", function (event) {
            var element = event.target;
            if (element.localName !== "input") {
                self.ctrlKey = event.ctrlKey;
                self.controls.enabled = false;
                if (event.key === "Enter" || event.key === "Escape") {
                    //Add current drawing
                    if (_this.points.length > 1) {
                        if (_this.drawingactive) {
                            _this.Remove(_this.drawingactive);
                            _this.drawingactive = undefined;
                        }
                        var drawing = _this.GeneratePolyLines(_this.points);
                        _this.AddObject(drawing);
                        _this.Render();
                    }
                    _this.points = [];
                }
                else {
                    input.object.classList.remove("hidden");
                    input.Focus();
                }
            }
        });
        document.body.addEventListener("keyup", function (event) {
            self.ctrlKey = false;
            self.controls.enabled = true;
        });
        var input = new FrameWork.Input({ classes: ["canvas-input", "hidden"] });
        input.onchange = function (object) {
            var value = input.value;
            self.ParseInput(value);
            input.object.classList.add("hidden");
        };
        input.Show(this.object);
        this.ShowGridXY(0, 0, 0);
        this.Resize();
        this.ShowDrawingAxis(0, 0, 0);
        this.ZoomAll();
        (function anim() {
            var delta = self.clock.getDelta();
            var elapsed = self.clock.getElapsedTime();
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
        this.camera.up.set(0, 0, 1);
    };
    ;
    Canvas3D.prototype.InitializeOthographicCamera = function () {
        var frustumSize = 1;
        this.camera = new THREE.OrthographicCamera(frustumSize * this.aspect / -2, frustumSize * this.aspect / 2, frustumSize / 2, frustumSize / -2, -10000, 10000);
        this.camera.position.x = -20;
        this.camera.position.y = -20;
        this.camera.position.z = 2;
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
    Canvas3D.prototype.MouseDown = function (event) {
        event.preventDefault();
        this.mousedown.x = event.clientX;
        this.mousedown.y = event.clientY;
    };
    Canvas3D.prototype.MouseMove = function (event) {
        event.preventDefault();
        this.mousemove.x = event.clientX;
        this.mousemove.y = event.clientY;
        this.ShowDrawingGuide();
        var self = this;
        this.CurrentPoint(this.mousemove.x, this.mousemove.y, function (current) {
            self.ShowDrawingAxis(current.x, current.y, current.z);
        });
    };
    Canvas3D.prototype.MouseUp = function (event) {
        event.preventDefault();
        this.mouseup.x = event.clientX;
        this.mouseup.y = event.clientY;
        if (Math.abs(this.mousedown.x - this.mousemove.x) < 5 && Math.abs(this.mousedown.y - this.mousemove.y) < 5)
            this.UpdateDrawingGuide();
    };
    Canvas3D.prototype.MouseWheel = function (event) {
        var point = this.points[this.points.length - 1];
        if (point)
            this.ShowDrawingAxis(point.x, point.y, point.z);
        else
            this.ShowDrawingAxis(0, 0, 0);
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
                var padding = 1;
                var options = { paddingLeft: padding, paddingRight: padding, paddingBottom: padding, paddingTop: padding };
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
    Canvas3D.prototype.ParseInput = function (input) {
        var point;
        if (input.toLowerCase().indexOf("zo") !== -1 && input.toLowerCase().indexOf("=") !== -1) {
            //Move grid to z
            input = input.replace("  ", " ");
            input = input.replace("  ", " ");
            input = input.replace("  ", " ");
            input = input.replace("zo=", "");
            var value = parseFloat(input);
            this.ShowGridXY(0, 0, value);
            return;
        }
        else if (input.toLowerCase().indexOf("z") !== -1 && input.toLowerCase().indexOf("=") !== -1) {
            //Draw a line from snapline z1 to z
            var position = this.snapline.geometry.attributes["position"].array;
            var point1 = new THREE.Vector3(position[0], position[1], position[2]);
            var point2 = new THREE.Vector3(position[3], position[4], position[5]);
            var normal = point1.clone().sub(point2).normalize();
            //Move grid to z
            input = input.replace("  ", " ");
            input = input.replace("  ", " ");
            input = input.replace("  ", " ");
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
            else if (numbers.length > 2)
                this.points.push(new THREE.Vector3(parseFloat(numbers[0]), parseFloat(numbers[1]), parseFloat(numbers[2])));
        }
        else if (input.indexOf(" ") !== -1) {
            //Format: x y z
            input = input.replace("  ", " ");
            input = input.replace("  ", " ");
            input = input.replace("  ", " ");
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
                point = this.points[this.points.length - 1];
                if (point) {
                    var normal = this.drawingpoint.sub(point).normalize();
                    this.points.push(new THREE.Vector3(point.x + normal.x * value, point.y + normal.y * value, point.z + normal.z * value));
                }
            }
            else {
                this.points.push(new THREE.Vector3(value, 0, 0));
            }
        }
        point = this.points[this.points.length - 1];
        this.ShowDrawingAxis(point.x, point.y, point.z);
        this.ShowActiveDrawing();
        if (this.points.length === 1)
            this.ZoomAll();
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
        for (var i = -size; i <= size; i++) {
            //Along X
            points.push(new THREE.Vector3(x + i, y - size, z));
            points.push(new THREE.Vector3(x + i, y + size, z));
            //Along Y
            points.push(new THREE.Vector3(x - size, y + i, z));
            points.push(new THREE.Vector3(x + size, y + i, z));
        }
        var lines = this.GenerateLines(points, "#444");
        lines.name = "grid";
        this.AddObject(lines);
        this.drawinggrid = lines;
    };
    Canvas3D.prototype.ShowDrawingAxis = function (x, y, z) {
        var vector = this.camera.position.clone();
        if (Number.isNaN(vector.x))
            return;
        var distance = vector.sub(new THREE.Vector3(x, y, z)).length();
        var camera = this.camera;
        var height = distance * Math.tan(camera.fov * Math.PI / 180) / 25;
        var points = [];
        var colors = [];
        colors.push("#FFFFFF");
        colors.push("#FFFFFF");
        colors.push("#FFFFFF");
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
        this.drawingaxis.name = "axis";
        for (var i = 0; i < points.length; i += 2) {
            var geometry = new THREE.BufferGeometry();
            var vertices = [];
            vertices.push(points[i].x, points[i].y, points[i].z, points[i + 1].x, points[i + 1].y, points[i + 1].z);
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            var material = new THREE.LineBasicMaterial({ color: colors.pop(), opacity: i < 6 ? 1 : 0, transparent: true });
            var lines = new THREE.LineSegments(geometry, material);
            this.drawingaxis.add(lines);
        }
        this.AddObject(this.drawingaxis);
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
    Canvas3D.prototype.UpdateDrawingGuide = function () {
        if (this.points.length && this.drawingpoint) {
            this.points.push(this.drawingpoint);
            this.ShowDrawingAxis(this.drawingpoint.x, this.drawingpoint.y, this.drawingpoint.z);
            this.ShowActiveDrawing();
        }
        else {
            var self_2 = this;
            self_2.points.push(new THREE.Vector3(this.mousecurrent.x, this.mousecurrent.y, this.mousecurrent.z));
            self_2.ShowDrawingAxis(this.mousecurrent.x, this.mousecurrent.y, this.mousecurrent.z);
            self_2.ShowActiveDrawing();
        }
    };
    Canvas3D.prototype.GenerateLines = function (points, color, opacity) {
        if (opacity === void 0) { opacity = 1; }
        var object = new THREE.Object3D();
        for (var i = 0; i < points.length; i += 2) {
            var geometry = new THREE.BufferGeometry();
            var vertices = [];
            vertices.push(points[i].x, points[i].y, points[i].z, points[i + 1].x, points[i + 1].y, points[i + 1].z);
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            var material = new THREE.LineBasicMaterial({ color: color, opacity: opacity, transparent: opacity === 1 ? false : true });
            var lines = new THREE.LineSegments(geometry, material);
            object.add(lines);
        }
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
    Canvas3D.prototype.Select = function (x, y, res) {
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
            for (var _d = 0, intersects_1 = intersects; _d < intersects_1.length; _d++) {
                var object = intersects_1[_d];
                var material = new THREE.MeshPhongMaterial({ color: 0xffff44, specular: 0x333333, opacity: 0.75, transparent: true, side: THREE.DoubleSide });
                ;
                if (this.selectedobject) {
                    this.selectedobject.material = this.selectedmaterial;
                    this.selectedobject = null;
                    this.selectedmaterial = null;
                }
                if (this.ctrlKey) {
                    this.selectedobjects.push(object.object);
                    this.selectedmaterials.push(object.object.material);
                    object.object.material = material;
                }
                else {
                    this.selectedobject = object.object;
                    this.selectedmaterial = this.selectedobject.material;
                    this.selectedobject.material = material;
                }
                this.Render();
                if (res)
                    res(intersects[0].point);
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
        for (var _i = 0, _a = this.scene.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.type === "Object3D" && child.name !== "axis" && child.name !== "grid" && child.name !== "guide") {
                intersects = this.raycaster.intersectObjects(child.children, true);
                if (intersects && intersects.length > 0) {
                    var point = intersects[0].point;
                    var distance = intersects[0].distance;
                    //Check also the second point
                    var position = intersects[0].object.geometry.attributes["position"].array;
                    var point1 = new THREE.Vector3(position[0], position[1], position[2]);
                    var point2 = new THREE.Vector3(position[3], position[4], position[5]);
                    var diff1 = point1.clone().sub(point).length();
                    var diff2 = point2.clone().sub(point).length();
                    if (diff1 < 0.1 && diff1 < diff2) {
                        point = point1;
                        distance = diff1;
                    }
                    else if (diff2 < 0.1 && diff2 < diff1) {
                        point = point2;
                        distance = diff2;
                    }
                    if (!snappoint || snapdistance > distance) {
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
    Canvas3D.prototype.LoadFont = function () {
        // let self = this;
        // let loader = new THREE.FontLoader();
        // try {
        //     if (window.chrome.webview) {
        //         loader.load('https://canvas/fonts/arial.json', function (response) {
        //             self.font = response;
        //         });
        //     } else {
        //         loader.load('fonts/arial.json', function (response) {
        //             self.font = response;
        //         });
        //     }
        // } catch (error) {
        //     loader.load('fonts/arial.json', function (response) {
        //         self.font = response;
        //     });
        // }
    };
    return Canvas3D;
}(FrameWork));
//# sourceMappingURL=canvas3d.js.map