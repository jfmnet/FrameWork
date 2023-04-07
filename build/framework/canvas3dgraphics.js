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
var Canvas3DGraphics = /** @class */ (function () {
    function Canvas3DGraphics() {
        this.align = new THREE.Vector3();
        this.rotation = new THREE.Vector3();
        this.position = new THREE.Vector3();
        this.material = new THREE.MeshPhongMaterial({ color: 0xa3b5ff, emissive: 0x111111, side: THREE.DoubleSide });
    }
    Canvas3DGraphics.prototype.AlignMove = function (mesh) {
        if (this.align.x !== 0 || this.align.y !== 0 || this.align.z !== 0) {
            mesh.up = new THREE.Vector3(this.align.x, this.align.y, this.align.z);
            mesh.lookAt(this.align);
        }
        if (this.position.x !== 0 || this.position.y !== 0 || this.position.z !== 0) {
            mesh.position.copy(new THREE.Vector3(this.position.x, this.position.y, this.position.z));
            mesh.geometry.attributes.position.needsUpdate = true;
        }
    };
    ;
    return Canvas3DGraphics;
}());
(function (Canvas3DGraphics) {
    var Sphere = /** @class */ (function (_super) {
        __extends(Sphere, _super);
        function Sphere(radius, x, y, z) {
            var _this = _super.call(this) || this;
            _this.radius = radius;
            _this.position.x = x || 0;
            _this.position.y = y || 0;
            _this.position.z = z || 0;
            return _this;
        }
        Sphere.prototype.Generate = function () {
            var geometry = new THREE.SphereBufferGeometry(this.radius);
            var mesh = new THREE.Mesh(geometry, this.material);
            this.AlignMove(mesh);
            return mesh;
        };
        ;
        return Sphere;
    }(Canvas3DGraphics));
    Canvas3DGraphics.Sphere = Sphere;
})(Canvas3DGraphics || (Canvas3DGraphics = {}));
//# sourceMappingURL=canvas3dgraphics.js.map