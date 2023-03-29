abstract class Canvas3DGraphics {
    align: THREE.Vector3 = new THREE.Vector3();
    rotation: THREE.Vector3 = new THREE.Vector3();
    position: THREE.Vector3 = new THREE.Vector3();
    material: THREE.Material = new THREE.MeshPhongMaterial({ color: 0xa3b5ff, emissive: 0x111111, side: THREE.DoubleSide });

    abstract Generate(): THREE.Mesh | THREE.LineSegments;

    AlignMove(mesh: THREE.Mesh): void {
        if (this.align.x !== 0 || this.align.y !== 0 || this.align.z !== 0) {
            mesh.up = new THREE.Vector3(this.align.x, this.align.y, this.align.z);
            mesh.lookAt(this.align);
        }

        if (this.position.x !== 0 || this.position.y !== 0 || this.position.z !== 0) {
            mesh.position.copy(new THREE.Vector3(this.position.x, this.position.y, this.position.z));
            mesh.geometry.attributes.position.needsUpdate = true;
        }
    };

}

namespace Canvas3DGraphics {
    export class Sphere extends Canvas3DGraphics {
        radius: number;

        constructor(radius: number, x?: number, y?: number, z?: number) {
            super();

            this.radius = radius;
            this.position.x = x || 0;
            this.position.y = y || 0;
            this.position.z = z || 0;
        }

        Generate(): THREE.Mesh {
            let geometry = new THREE.SphereBufferGeometry(this.radius);

            let mesh = new THREE.Mesh(geometry, this.material);
            this.AlignMove(mesh);

            return mesh;
        };
    }

}