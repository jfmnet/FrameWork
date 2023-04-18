var SAPViewer = /** @class */ (function () {
    function SAPViewer() {
        this.showframes = true;
        this.showshells = true;
        this.showrestraints = true;
    }
    SAPViewer.prototype.Show = function () {
        var self = this;
        var viewer = new MaterialDesign2.AppBar({ text: "SAPFire Viewer" });
        //Buttons
        var open = new MaterialDesign2.Button({ icon: "folder_open" });
        open.type = MaterialDesign2.ButtonType.APPBAR;
        open.onclick = function () {
            FrameWork.OpenFile(function (model) {
                self.model = model;
                self.ShowModel(model);
            });
        };
        viewer.buttons.push(open);
        //Splitter
        var splitter = new FrameWork.SplitContainer();
        splitter.size = [300];
        viewer.Add(splitter);
        viewer.Show();
        //Inner splitter
        var leftsplit = new FrameWork.SplitContainer();
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
        this.canvas.fileformat = FILEFORMAT.TEXT;
        this.canvas.ondrop = function (text) {
            self.model = JSON.parse(text);
            self.ShowModel(self.model);
        };
        splitter.Add(this.canvas);
        FrameWork.GetJSON("resources/sap.model", function (model) {
            self.model = model;
            self.ShowModel(model);
        });
    };
    SAPViewer.prototype.ShowModel = function (model) {
        this.tree.ClearChildren();
        this.canvas.ClearObjects();
        this.ShowFrames(model);
        this.ShowShells(model);
        this.ShowRestraints(model);
        this.canvas.ZoomAll();
        this.canvas.Render();
    };
    SAPViewer.prototype.ShowFrames = function (model) {
        var _this = this;
        var self = this;
        var points = [];
        var node;
        var checkbox = new FrameWork.Input({
            text: "Frames",
            value: this.showframes
        }, INPUTTYPE.CHECKBOX);
        checkbox.onchange = function (obj) {
            self.showframes = obj.value;
            self.canvas.SetVisibility("Frames", self.showframes);
        };
        var parent = new FrameWork.TreeNode({
            text: checkbox
        });
        this.tree.Add(parent);
        for (var _i = 0, _a = model.Frames.$values; _i < _a.length; _i++) {
            var frame = _a[_i];
            node = new FrameWork.TreeNode({ text: frame.Name });
            node.tag = frame;
            node.onclick = function (object) {
                _this.ShowProperties(object.tag);
            };
            parent.Add(node);
            if (this.showframes) {
                points.push(new THREE.Vector3(frame.Pt1.X / 1000, frame.Pt1.Y / 1000, frame.Pt1.Z / 1000));
                points.push(new THREE.Vector3(frame.Pt2.X / 1000, frame.Pt2.Y / 1000, frame.Pt2.Z / 1000));
            }
        }
        if (points.length) {
            var object = this.canvas.GenerateLines(points, "#FF0");
            object.name = "Frames";
            this.canvas.AddObject(object);
        }
        this.tree.Refresh();
    };
    SAPViewer.prototype.ShowShells = function (model) {
        var _this = this;
        var self = this;
        var triangles = [];
        var triangle;
        var points = [];
        var joint;
        var point;
        var node;
        var checkbox = new FrameWork.Input({
            text: "Shells",
            value: this.showshells
        }, INPUTTYPE.CHECKBOX);
        checkbox.onchange = function (obj) {
            self.showshells = obj.value;
            self.canvas.SetVisibility("Shells", self.showshells);
        };
        var parent = new FrameWork.TreeNode({
            text: checkbox
        });
        this.tree.Add(parent);
        for (var _i = 0, _a = model.Shells.$values; _i < _a.length; _i++) {
            var shell = _a[_i];
            triangle = new MeshTriangle();
            node = new FrameWork.TreeNode({ text: shell.Name });
            node.tag = shell;
            node.onclick = function (object) {
                _this.ShowProperties(object.tag);
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
                }
                else if (shell.Nodes.$values.length === 4) {
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
                }
                else if (shell.Nodes.$values.length > 4) {
                    console.log("Unhandled shells with " + shell.Nodes.$values.length + " lengths");
                }
            }
        }
        if (triangles.length) {
            var object = this.canvas.GenerateTriangles(triangles);
            object.name = "Shells";
            this.canvas.AddObject(object);
        }
        if (points.length) {
            var lines = this.canvas.GenerateLines(points, "#444");
            lines.name = "Shells";
            this.canvas.AddObject(lines);
        }
    };
    SAPViewer.prototype.ShowRestraints = function (model) {
        var _this = this;
        var self = this;
        var restraintx = [];
        var restrainty = [];
        var restraintz = [];
        var node;
        var restraint;
        var size = 0.5;
        var checkbox = new FrameWork.Input({
            text: "Restraints",
            value: this.showrestraints
        }, INPUTTYPE.CHECKBOX);
        checkbox.onchange = function (obj) {
            self.showrestraints = obj.value;
            self.canvas.SetVisibility("Restraints", self.showrestraints);
        };
        var parent = new FrameWork.TreeNode({
            text: checkbox
        });
        this.tree.Add(parent);
        for (var _i = 0, _a = model.Joints.$values; _i < _a.length; _i++) {
            var joint = _a[_i];
            restraint = joint.Restraints;
            if (restraint.Dx != 0 || restraint.Dy != 0 || restraint.Dz != 0) {
                node = new FrameWork.TreeNode({ text: joint.Name });
                node.tag = joint;
                node.onclick = function (object) {
                    _this.ShowProperties(object.tag);
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
            var object = this.canvas.GenerateLines(restraintx, "#F00");
            object.name = "Restraints";
            this.canvas.AddObject(object);
        }
        if (restrainty.length) {
            var object = this.canvas.GenerateLines(restrainty, "#080");
            object.name = "Restraints";
            this.canvas.AddObject(object);
        }
        if (restraintz.length) {
            var object = this.canvas.GenerateLines(restraintz, "#00F");
            object.name = "Restraints";
            this.canvas.AddObject(object);
        }
        this.tree.Refresh();
    };
    SAPViewer.prototype.ShowProperties = function (object) {
        this.property.RenderObject(object);
    };
    SAPViewer.prototype.GenerateNode = function (node) {
        return new THREE.Vector3(node.X / 1000, node.Y / 1000, node.Z / 1000);
    };
    return SAPViewer;
}());
//# sourceMappingURL=sapviewer.js.map