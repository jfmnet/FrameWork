interface SAPInterface {
    $type: string
    SelectedLoadCase: SelectedLoadCase
    Name: any
    ModelGUID: string
    LoadCases: any
    Materials: Materials
    FrameSections: FrameSections
    ShellSections: ShellSections
    Joints: Joints
    Frames: Frames
    Links: Links
    Shells: Shells
    MinU: number
    MaxU: number
    MinF: number
    MaxF: number
    BridgeTables: BridgeTables
    AnalysisIndex: number
}

interface SelectedLoadCase {
    $type: string
    Name: any
    RunStatus: boolean
    LoadCombo: boolean
    LoadComboType: number
    StepNumber: StepNumber
    LoadCases: any
    Index: number
    CaseType: number
    JoinDisplacementAvailable: boolean
    JoinReactionAvailable: boolean
    ShellStressAvailable: boolean
    ShellForcesAvailable: boolean
    GirderForcesAvailable: boolean
}

interface StepNumber {
    $type: string
    $values: any[]
}

interface Materials {
    $type: string
    $values: Value[]
}

interface Value {
    $type: string
    SAPID: any
    Region: any
    Grade: any
    Standard: any
    Usage: number
    MatType: number
    Temperature: number
    MassPerUnitVolume: number
    WeightPerUnitVolume: number
    Youngsmodulus: Youngsmodulus
    Shearmodulus: Shearmodulus
    PoissonRatio: PoissonRatio
    coeffOfThermalExpansion: CoeffOfThermalExpansion
    StressStrainCurve: StressStrainCurve
    Name: string
    DefinedBy: number
    AnalysisIndex: number
}

interface Youngsmodulus {
    $type: string
    $values: number[]
}

interface Shearmodulus {
    $type: string
    $values: number[]
}

interface PoissonRatio {
    $type: string
    $values: number[]
}

interface CoeffOfThermalExpansion {
    $type: string
    $values: number[]
}

interface StressStrainCurve {
    $type: string
    $values: number[]
}

interface FrameSections {
    $type: string
    $values: Value2[]
}

interface Value2 {
    $type: string
    Name: string
    DefinedBy: number
    ObjType: any
    Shape: number
    MaterialProp: MaterialProp
    T3: number
    T2: number
    WallT: number
    Tf: number
    Tw: number
    NonPrismatic: boolean
    CardinalPoint: number
    Offset1: number
    Offset2: number
    IsJoint: boolean
    Area: number
    As2: number
    As3: number
    I22: number
    I23: number
    I33: number
    EccV2: number
    Torsion: number
    AnalysisIndex: number
}

interface MaterialProp {
    $type: string
    SAPID: any
    Region: any
    Grade: any
    Standard: any
    Usage: number
    MatType: number
    Temperature: number
    MassPerUnitVolume: number
    WeightPerUnitVolume: number
    Youngsmodulus: Youngsmodulus2
    Shearmodulus: Shearmodulus2
    PoissonRatio: PoissonRatio2
    coeffOfThermalExpansion: CoeffOfThermalExpansion2
    StressStrainCurve: StressStrainCurve2
    Name: string
    DefinedBy: number
    AnalysisIndex: number
}

interface Youngsmodulus2 {
    $type: string
    $values: number[]
}

interface Shearmodulus2 {
    $type: string
    $values: number[]
}

interface PoissonRatio2 {
    $type: string
    $values: number[]
}

interface CoeffOfThermalExpansion2 {
    $type: string
    $values: number[]
}

interface StressStrainCurve2 {
    $type: string
    $values: number[]
}

interface ShellSections {
    $type: string
    $values: Value3[]
}

interface Value3 {
    $type: string
    Name: string
    DefinedBy: number
    ObjType: any
    ShellType: number
    MatProp: MatProp
    MatAng: number
    Thickness: number
    Bending: number
    IsJoint: boolean
    AnalysisIndex: number
}

interface MatProp {
    $type: string
    SAPID: any
    Region: any
    Grade: any
    Standard: any
    Usage: number
    MatType: number
    Temperature: number
    MassPerUnitVolume: number
    WeightPerUnitVolume: number
    Youngsmodulus: Youngsmodulus3
    Shearmodulus: Shearmodulus3
    PoissonRatio: PoissonRatio3
    coeffOfThermalExpansion: CoeffOfThermalExpansion3
    StressStrainCurve: StressStrainCurve3
    Name: string
    DefinedBy: number
    AnalysisIndex: number
}

interface Youngsmodulus3 {
    $type: string
    $values: number[]
}

interface Shearmodulus3 {
    $type: string
    $values: number[]
}

interface PoissonRatio3 {
    $type: string
    $values: number[]
}

interface CoeffOfThermalExpansion3 {
    $type: string
    $values: number[]
}

interface StressStrainCurve3 {
    $type: string
    $values: number[]
}

interface Joints {
    $type: string
    $values: Value4[]
}

interface Value4 {
    $type: string
    Thickness: number
    Offset: number
    SAPID: any
    Name: string
    X: number
    Y: number
    Z: number
    Restraints: Restraints
    Displacements: Displacements
    Reactions: Reactions
    AnalysisIndex: number
}

interface Restraints {
    $type: string
    Dx: number
    Dy: number
    Dz: number
    Rx: number
    Ry: number
    Rz: number
    AnalysisIndex: number
}

interface Displacements {
    $type: string
    $values: any[]
}

interface Reactions {
    $type: string
    $values: any[]
}

interface Frames {
    $type: string
    $values: Value5[]
}

interface Value5 {
    $type: string
    LineSprings: LineSprings
    XSAngle: number
    LineProperty: any
    SpanName: any
    StartStation: number
    EndStation: number
    BridgeObjItemType: number
    Pt1: Pt1
    Pt2: Pt2
    Pt3: Pt3
    KSpring: number
    Name: string
    SAPID: any
    GUID: any
    Nodes: Nodes
    AnalysisIndex: number
}

interface LineSprings {
    $type: string
    $values: any[]
}

interface Pt1 {
    $type: string
    Thickness: number
    Offset: number
    SAPID: any
    Name: string
    X: number
    Y: number
    Z: number
    Restraints: Restraints2
    Displacements: Displacements2
    Reactions: Reactions2
    AnalysisIndex: number
}

interface Restraints2 {
    $type: string
    Dx: number
    Dy: number
    Dz: number
    Rx: number
    Ry: number
    Rz: number
    AnalysisIndex: number
}

interface Displacements2 {
    $type: string
    $values: any[]
}

interface Reactions2 {
    $type: string
    $values: any[]
}

interface Pt2 {
    $type: string
    Thickness: number
    Offset: number
    SAPID: any
    Name: string
    X: number
    Y: number
    Z: number
    Restraints: Restraints3
    Displacements: Displacements3
    Reactions: Reactions3
    AnalysisIndex: number
}

interface Restraints3 {
    $type: string
    Dx: number
    Dy: number
    Dz: number
    Rx: number
    Ry: number
    Rz: number
    AnalysisIndex: number
}

interface Displacements3 {
    $type: string
    $values: any[]
}

interface Reactions3 {
    $type: string
    $values: any[]
}

interface Pt3 {
    $type: string
    Thickness: number
    Offset: number
    SAPID: any
    Name: any
    X: number
    Y: number
    Z: number
    Restraints: Restraints4
    Displacements: Displacements4
    Reactions: Reactions4
    AnalysisIndex: number
}

interface Restraints4 {
    $type: string
    Dx: number
    Dy: number
    Dz: number
    Rx: number
    Ry: number
    Rz: number
    AnalysisIndex: number
}

interface Displacements4 {
    $type: string
    $values: any[]
}

interface Reactions4 {
    $type: string
    $values: any[]
}

interface Nodes {
    $type: string
    $values: Value6[]
}

interface Value6 {
    $type: string
    Thickness: number
    Offset: number
    SAPID: any
    Name?: string
    X: number
    Y: number
    Z: number
    Restraints: Restraints5
    Displacements: Displacements5
    Reactions: Reactions5
    AnalysisIndex: number
}

interface Restraints5 {
    $type: string
    Dx: number
    Dy: number
    Dz: number
    Rx: number
    Ry: number
    Rz: number
    AnalysisIndex: number
}

interface Displacements5 {
    $type: string
    $values: any[]
}

interface Reactions5 {
    $type: string
    $values: any[]
}

interface Links {
    $type: string
    $values: any[]
}

interface Shells {
    $type: string
    $values: Value7[]
}

interface Value7 {
    $type: string
    ShellPropName: any
    ShellProp: any
    Stresses: Stresses
    Forces: Forces
    AreaSprings: AreaSprings
    Name: string
    SAPID: any
    GUID: any
    Nodes: Nodes2
    AnalysisIndex: number
}

interface Stresses {
    $type: string
    $values: any[]
}

interface Forces {
    $type: string
    $values: any[]
}

interface AreaSprings {
    $type: string
    $values: any[]
}

interface Nodes2 {
    $type: string
    $values: NodeValue[]
}

interface NodeValue {
    $type: string
    Thickness: number
    Offset: number
    SAPID: any
    Name: string
    X: number
    Y: number
    Z: number
    Restraints: Restraints6
    Displacements: Displacements6
    Reactions: Reactions6
    AnalysisIndex: number
}

interface Restraints6 {
    $type: string
    Dx: number
    Dy: number
    Dz: number
    Rx: number
    Ry: number
    Rz: number
    AnalysisIndex: number
}

interface Displacements6 {
    $type: string
    $values: any[]
}

interface Reactions6 {
    $type: string
    $values: any[]
}

interface BridgeTables {
    $type: string
    $values: any[]
}

class SAPViewer {
    canvas: Canvas3D;
    tree: FrameWork.TreeContainer;
    property: FrameWork.ScrollContainer;

    model: SAPInterface;

    showframes: boolean = true;
    showshells: boolean = true;
    showrestraints: boolean = true;
    showjoints: boolean = true;

    Show(): void {
        let self = this;
        let viewer = new MaterialDesign2.AppBar({ text: "SAPFire Viewer" });

        //Buttons
        let open = new MaterialDesign2.Button({ icon: "folder_open" });
        open.type = MaterialDesign2.ButtonType.APPBAR;
        open.onclick = () => {
            FrameWork.OpenFile(function (model) {
                self.model = model;
                self.ShowModel(model);
            })
        };

        viewer.buttons.push(open);

        //Splitter
        let splitter = new FrameWork.SplitContainer();
        splitter.size = [300];
        viewer.Add(splitter);
        viewer.Show();

        //Inner splitter
        let leftsplit = new FrameWork.SplitContainer();
        leftsplit.orientation = ORIENTATION.VERTICAL;
        splitter.Add(leftsplit);

        //Tree
        this.tree = new FrameWork.TreeContainer({ text: "Model" });
        leftsplit.Add(this.tree);

        //Property
        this.property = new FrameWork.ScrollContainer({ text: "Properties" });
        leftsplit.Add(this.property);

        //Canvas

        this.canvas = new Canvas3D();
        this.canvas.settings.backcolor = 0xffffff;
        this.canvas.settings.allowvr = true;
        this.canvas.fileformat = FILEFORMAT.TEXT;
        this.canvas.ondrop = function (text) {
            self.model = JSON.parse(text);
            self.ShowModel(self.model);
        };

        splitter.Add(this.canvas);

        FrameWork.GetJSON("resources/sap.model", function (model: SAPInterface) {
            self.model = model;
            self.ShowModel(model);
        });
    }

    ShowModel(model: SAPInterface): void {
        this.tree.ClearChildren();
        this.canvas.ClearObjects();

        this.ShowFrames(model);
        this.ShowShells(model);
        this.ShowJoints(model);
        this.ShowRestraints(model);

        this.ShowFrameSections(model);
        this.ShowShellSections(model);

        this.ShowFrameMaterials(model);
        this.ShowShellMaterials(model);

        this.canvas.ZoomAll();
        this.canvas.Render();

        this.tree.Refresh();
    }

    ShowFrames(model: SAPInterface): void {
        let self = this;
        let points: THREE.Vector3[] = [];
        let node: FrameWork.TreeNode;

        let checkbox = new FrameWork.Input({
            text: "Frames",
            value: this.showframes
        }, INPUTTYPE.CHECKBOX);

        checkbox.onchange = (obj: FrameWork.Input) => {
            self.showframes = obj.value;
            self.canvas.SetVisibility("Frames", self.showframes);
        }

        let parent = new FrameWork.TreeNode({
            text: checkbox
        });

        this.tree.Add(parent);

        let frames = {};
        let name = "";

        for (let frame of model.Frames.$values) {
            node = new FrameWork.TreeNode({ text: "Frame-" + frame.Name });
            node.tag = frame;
            node.onclick = (object: FrameWork.TreeNode) => {
                this.ShowProperties(object.tag);
            };

            parent.Add(node);

            if (this.showframes) {
                points.push(new THREE.Vector3(frame.Pt1.X / 1000, frame.Pt1.Y / 1000, frame.Pt1.Z / 1000));
                points.push(new THREE.Vector3(frame.Pt2.X / 1000, frame.Pt2.Y / 1000, frame.Pt2.Z / 1000));

                name = (frame.Pt1.X / 1000).toFixed(3) + "-" + (frame.Pt1.Y / 1000).toFixed(3) + "-" + (frame.Pt1.Z / 1000).toFixed(3);
                name += (frame.Pt2.X / 1000).toFixed(3) + "-" + (frame.Pt2.Y / 1000).toFixed(3) + "-" + (frame.Pt2.Z / 1000).toFixed(3);

                if (frames[name])
                    node.text += " (Duplicate)";
                else
                    frames[name]++;

                frames[name] = 1;
            }
        }

        if (points.length) {
            let object = this.canvas.GenerateLines(points, "#040");
            object.name = "Frames";
            this.canvas.AddObject(object);
        }
    }

    ShowShells(model: SAPInterface): void {
        let self = this;
        let triangles: MeshTriangle[] = [];
        let triangle: MeshTriangle;
        let points: THREE.Vector3[] = [];
        let joint: NodeValue;
        let point: THREE.Vector3;
        let node: FrameWork.TreeNode;

        let checkbox = new FrameWork.Input({
            text: "Shells",
            value: this.showshells
        }, INPUTTYPE.CHECKBOX);

        checkbox.onchange = (obj: FrameWork.Input) => {
            self.showshells = obj.value;
            self.canvas.SetVisibility("Shells", self.showshells);
        }

        let parent = new FrameWork.TreeNode({
            text: checkbox
        });

        this.tree.Add(parent);

        for (let shell of model.Shells.$values) {

            triangle = new MeshTriangle();

            node = new FrameWork.TreeNode({ text: "Shells-" + shell.Name });
            node.tag = shell;
            node.onclick = (object: FrameWork.TreeNode) => {
                this.ShowProperties(object.tag);
            };

            parent.Add(node);

            if (this.showshells) {
                if (shell.Nodes.$values.length === 3) {
                    joint = shell.Nodes.$values[0];
                    triangle.point1 = this.GenerateNode(joint);

                    joint = shell.Nodes.$values[1];
                    triangle.point2 = this.GenerateNode(joint);

                    joint = shell.Nodes.$values[2];
                    triangle.point3 = this.GenerateNode(joint);

                    points.push(triangle.point1);
                    points.push(triangle.point2);

                    points.push(triangle.point2);
                    points.push(triangle.point3);

                    points.push(triangle.point1);
                    points.push(triangle.point3);

                    triangles.push(triangle);

                } else if (shell.Nodes.$values.length === 4) {
                    joint = shell.Nodes.$values[0];
                    triangle.point1 = this.GenerateNode(joint);

                    joint = shell.Nodes.$values[1];
                    triangle.point2 = this.GenerateNode(joint);

                    joint = shell.Nodes.$values[2];
                    triangle.point3 = this.GenerateNode(joint);

                    point = triangle.point2;
                    triangles.push(triangle);

                    triangle = new MeshTriangle();

                    joint = shell.Nodes.$values[0];
                    triangle.point1 = this.GenerateNode(joint);

                    joint = shell.Nodes.$values[2];
                    triangle.point2 = this.GenerateNode(joint);

                    joint = shell.Nodes.$values[3];
                    triangle.point3 = this.GenerateNode(joint);

                    points.push(triangle.point1);
                    points.push(point);

                    points.push(point);
                    points.push(triangle.point2);

                    points.push(triangle.point2);
                    points.push(triangle.point3);

                    points.push(triangle.point3);
                    points.push(triangle.point1);

                    triangles.push(triangle);

                } else if (shell.Nodes.$values.length > 4) {
                    console.log("Unhandled shells with " + shell.Nodes.$values.length + " lengths");
                }
            }
        }

        let object = new THREE.Object3D();
        object.name = "Shells";

        let handle = false;

        if (triangles.length) {
            let tris = this.canvas.GenerateTriangles(triangles);
            object.add(tris);
            handle = true;
        }

        if (points.length) {
            let lines = this.canvas.GenerateLines(points, "#444");
            object.add(lines);
            handle = true;
        }

        if (handle)
            this.canvas.AddObject(object);
    }

    ShowRestraints(model: SAPInterface): void {
        let self = this;
        let restraintx: THREE.Vector3[] = [];
        let restrainty: THREE.Vector3[] = [];
        let restraintz: THREE.Vector3[] = [];
        let node: FrameWork.TreeNode;
        let restraint: Restraints;
        let size: number = 0.5;

        let checkbox = new FrameWork.Input({
            text: "Restraints",
            value: this.showrestraints
        }, INPUTTYPE.CHECKBOX);

        checkbox.onchange = (obj: FrameWork.Input) => {
            self.showrestraints = obj.value;
            self.canvas.SetVisibility("Restraints", self.showrestraints);
        }

        let parent = new FrameWork.TreeNode({
            text: checkbox
        });

        this.tree.Add(parent);

        for (let joint of model.Joints.$values) {
            restraint = joint.Restraints;

            if (restraint.Dx != 0 || restraint.Dy != 0 || restraint.Dz != 0) {
                node = new FrameWork.TreeNode({ text: "Joint-" + joint.Name });
                node.tag = joint;
                node.onclick = (object: FrameWork.TreeNode) => {
                    this.ShowProperties(object.tag);
                };

                parent.Add(node);

                if (this.showrestraints) {
                    if (restraint.Dx != 0) {
                        restraintx.push(new THREE.Vector3(joint.X / 1000 - size, joint.Y / 1000, joint.Z / 1000));
                        restraintx.push(new THREE.Vector3(joint.X / 1000 + size, joint.Y / 1000, joint.Z / 1000));
                    }

                    if (restraint.Dy != 0) {
                        restrainty.push(new THREE.Vector3(joint.X / 1000, joint.Y / 1000 - size, joint.Z / 1000));
                        restrainty.push(new THREE.Vector3(joint.X / 1000, joint.Y / 1000 + size, joint.Z / 1000));
                    }

                    if (restraint.Dz != 0) {
                        restraintz.push(new THREE.Vector3(joint.X / 1000, joint.Y / 1000, joint.Z / 1000 - size));
                        restraintz.push(new THREE.Vector3(joint.X / 1000, joint.Y / 1000, joint.Z / 1000 + size));
                    }
                }
            }
        }

        if (restraintx.length) {
            let object = this.canvas.GenerateLines(restraintx, "#F00");
            object.name = "Restraints";
            this.canvas.AddObject(object);
        }

        if (restrainty.length) {
            let object = this.canvas.GenerateLines(restrainty, "#080");
            object.name = "Restraints";
            this.canvas.AddObject(object);
        }

        if (restraintz.length) {
            let object = this.canvas.GenerateLines(restraintz, "#00F");
            object.name = "Restraints";
            this.canvas.AddObject(object);
        }
    }

    ShowJoints(model: SAPInterface): void {
        let self = this;
        let points: THREE.Vector3[] = [];
        let node: FrameWork.TreeNode;
        let size: number = 0.1;

        let checkbox = new FrameWork.Input({
            text: "Joints",
            value: this.showjoints
        }, INPUTTYPE.CHECKBOX);

        checkbox.onchange = (obj: FrameWork.Input) => {
            self.showjoints = obj.value;
            self.canvas.SetVisibility("Joints", self.showjoints);
        }

        let parent = new FrameWork.TreeNode({
            text: checkbox
        });

        this.tree.Add(parent);

        for (let joint of model.Joints.$values) {
            node = new FrameWork.TreeNode({ text: "Joint-" + joint.Name });
            node.tag = joint;
            node.onclick = (object: FrameWork.TreeNode) => {
                this.ShowProperties(object.tag);
            };

            parent.Add(node);

            if (this.showjoints) {
                points.push(new THREE.Vector3(joint.X / 1000 - size, joint.Y / 1000, joint.Z / 1000));
                points.push(new THREE.Vector3(joint.X / 1000 + size, joint.Y / 1000, joint.Z / 1000));

                points.push(new THREE.Vector3(joint.X / 1000, joint.Y / 1000 - size, joint.Z / 1000));
                points.push(new THREE.Vector3(joint.X / 1000, joint.Y / 1000 + size, joint.Z / 1000));
            }
        }

        if (points.length) {
            let object = this.canvas.GenerateLines(points, "#F00");
            object.name = "Joints";
            this.canvas.AddObject(object);
        }
    }

    ShowFrameSections(model: SAPInterface): void {
        let node: FrameWork.TreeNode;

        let parent = new FrameWork.TreeNode({
            text: "Frame Sections"
        });

        this.tree.Add(parent);

        let sections = {};
        let name: string;

        for (let frame of model.Frames.$values) {
            name = frame.LineProperty.Name;

            if (sections[name])
                continue;

            sections[name] = 1;

            node = new FrameWork.TreeNode({ text: name });
            node.tag = frame;
            node.onclick = (object: FrameWork.TreeNode) => {
                let frame = object.tag;
                this.ShowProperties(frame);
                this.SelectFrames(this.model, frame.LineProperty.Name, "$");
            };

            parent.Add(node);
        }

        node = new FrameWork.TreeNode({ text: "Null" });
        node.onclick = (object: FrameWork.TreeNode) => {
            this.SelectFrames(this.model, "", "");
        };

        parent.Add(node);
    }

    ShowShellSections(model: SAPInterface): void {
        let node: FrameWork.TreeNode;

        let parent = new FrameWork.TreeNode({
            text: "Shell Sections"
        });

        this.tree.Add(parent);

        let sections = {};
        let name: string;

        for (let shell of model.Shells.$values) {
            name = shell.ShellProp.Name;

            if (sections[name])
                continue;

            sections[name] = 1;

            node = new FrameWork.TreeNode({ text: name });
            node.tag = shell;
            node.onclick = (object: FrameWork.TreeNode) => {
                let shell = object.tag;
                this.ShowProperties(shell);
                this.SelectShells(this.model, shell.ShellProp.Name, "$");
            };

            parent.Add(node);
        }

        node = new FrameWork.TreeNode({ text: "Null" });
        node.onclick = (object: FrameWork.TreeNode) => {
            this.SelectShells(this.model, "", "");
        };

        parent.Add(node);
    }

    ShowFrameMaterials(model: SAPInterface): void {
        let node: FrameWork.TreeNode;

        let parent = new FrameWork.TreeNode({
            text: "Frame Materials"
        });

        this.tree.Add(parent);

        let sections = {};
        let name: string;

        for (let frame of model.Frames.$values) {
            name = frame.LineProperty.MaterialProp.Name;

            if (sections[name])
                continue;

            sections[name] = 1;

            node = new FrameWork.TreeNode({ text: name });
            node.tag = frame;
            node.onclick = (object: FrameWork.TreeNode) => {
                let frame = object.tag;
                this.ShowProperties(frame.LineProperty.MaterialProp);
                this.SelectFrames(this.model, "$", frame.LineProperty.MaterialProp.Name);
            };

            parent.Add(node);
        }

        node = new FrameWork.TreeNode({ text: "Null" });
        node.onclick = (object: FrameWork.TreeNode) => {
            this.SelectFrames(this.model, null, null);
        };

        parent.Add(node);
    }

    ShowShellMaterials(model: SAPInterface): void {
        let node: FrameWork.TreeNode;

        let parent = new FrameWork.TreeNode({
            text: "Shell Materials"
        });

        this.tree.Add(parent);

        let sections = {};
        let name: string;

        for (let shell of model.Shells.$values) {
            name = shell.ShellProp.MatProp.Name;

            if (sections[name])
                continue;

            sections[name] = 1;

            node = new FrameWork.TreeNode({ text: name });
            node.tag = shell;
            node.onclick = (object: FrameWork.TreeNode) => {
                let shell = object.tag;
                this.ShowProperties(shell.ShellProp.MatProp);
                this.SelectShells(this.model, "$", shell.ShellProp.MatProp.Name);
            };

            parent.Add(node);
        }

        node = new FrameWork.TreeNode({ text: "Null" });
        node.onclick = (object: FrameWork.TreeNode) => {
            this.SelectFrames(this.model, null, null);
        };

        parent.Add(node);
    }

    SelectFrames(model: SAPInterface, propname: string, matname: string): void {
        let self = this;
        let points: THREE.Vector3[] = [];

        for (let frame of model.Frames.$values) {
            if (propname === frame.LineProperty.Name || matname === frame.LineProperty.MaterialProp.Name) {
                points.push(new THREE.Vector3(frame.Pt1.X / 1000, frame.Pt1.Y / 1000, frame.Pt1.Z / 1000));
                points.push(new THREE.Vector3(frame.Pt2.X / 1000, frame.Pt2.Y / 1000, frame.Pt2.Z / 1000));
            }
        }

        this.canvas.Remove(this.canvas.highlight);

        if (points.length) {
            let object = this.canvas.GenerateLines(points, "#FF0");
            this.canvas.AddObject(object);

            let bounds = new THREE.Box3().setFromObject(object);

            this.canvas.highlight = object;
        }

        this.canvas.Render();
    }

    SelectShells(model: SAPInterface, propname: string, matname: string): void {
        let self = this;
        let triangles: MeshTriangle[] = [];
        let triangle: MeshTriangle;
        let points: THREE.Vector3[] = [];
        let joint: NodeValue;
        let point: THREE.Vector3;

        for (let shell of model.Shells.$values) {
            if (propname === shell.ShellProp.Name || matname === shell.ShellProp.MatProp.Name) {
                triangle = new MeshTriangle();

                if (shell.Nodes.$values.length === 3) {
                    joint = shell.Nodes.$values[0];
                    triangle.point1 = this.GenerateNode(joint);

                    joint = shell.Nodes.$values[1];
                    triangle.point2 = this.GenerateNode(joint);

                    joint = shell.Nodes.$values[2];
                    triangle.point3 = this.GenerateNode(joint);

                    points.push(triangle.point1);
                    points.push(triangle.point2);

                    points.push(triangle.point2);
                    points.push(triangle.point3);

                    points.push(triangle.point1);
                    points.push(triangle.point3);

                    triangles.push(triangle);

                } else if (shell.Nodes.$values.length === 4) {
                    joint = shell.Nodes.$values[0];
                    triangle.point1 = this.GenerateNode(joint);

                    joint = shell.Nodes.$values[1];
                    triangle.point2 = this.GenerateNode(joint);

                    joint = shell.Nodes.$values[2];
                    triangle.point3 = this.GenerateNode(joint);

                    point = triangle.point2;
                    triangles.push(triangle);

                    triangle = new MeshTriangle();

                    joint = shell.Nodes.$values[0];
                    triangle.point1 = this.GenerateNode(joint);

                    joint = shell.Nodes.$values[2];
                    triangle.point2 = this.GenerateNode(joint);

                    joint = shell.Nodes.$values[3];
                    triangle.point3 = this.GenerateNode(joint);

                    points.push(triangle.point1);
                    points.push(point);

                    points.push(point);
                    points.push(triangle.point2);

                    points.push(triangle.point2);
                    points.push(triangle.point3);

                    points.push(triangle.point3);
                    points.push(triangle.point1);

                    triangles.push(triangle);

                } else if (shell.Nodes.$values.length > 4) {
                    console.log("Unhandled shells with " + shell.Nodes.$values.length + " lengths");
                }
            }
        }

        let object = new THREE.Object3D();
        let handle = false;

        this.canvas.Remove(this.canvas.highlight);

        if (triangles.length) {
            let tris = this.canvas.GenerateTriangles(triangles, 0xffff00);
            object.add(tris);
            handle = true;
        }

        if (handle) {
            this.canvas.highlight = object;
            this.canvas.AddObject(object);
        }

        this.canvas.Render();
    }

    ShowProperties(object: any): void {
        this.property.RenderObject(object);
    }

    GenerateNode(node: NodeValue): THREE.Vector3 {
        return new THREE.Vector3(node.X / 1000, node.Y / 1000, node.Z / 1000);
    }
}