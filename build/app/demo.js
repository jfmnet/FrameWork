var Demo = /** @class */ (function () {
    function Demo() {
    }
    Demo.prototype.Show = function () {
        this.Tree();
        this.Menu();
    };
    Demo.prototype.Tree = function () {
        var tree = new FrameWork.TreeContainer();
        var parent1 = tree.Add(new FrameWork.TreeNode({ text: "Parent 1" }));
        var parent2 = tree.Add(new FrameWork.TreeNode({ text: "Parent 2" }));
        var parent3 = tree.Add(new FrameWork.TreeNode({ text: "Parent 3" }));
        var parent4 = tree.Add(new FrameWork.TreeNode({ text: "Parent 4" }));
        var child1 = parent1.Add(new FrameWork.TreeNode({ text: "Child 1" }));
        var child2 = parent1.Add(new FrameWork.TreeNode({ text: "Child 2" }));
        var child3 = parent1.Add(new FrameWork.TreeNode({ text: "Child 3" }));
        var child4 = parent1.Add(new FrameWork.TreeNode({ text: "Child 4" }));
        var child11 = child1.Add(new FrameWork.TreeNode({ text: "Child 11" }));
        tree.Show();
    };
    Demo.prototype.Menu = function () {
        var tree = new FrameWork.MenuContainer();
        var parent1 = tree.Add(new FrameWork.Menu({ text: "Menu 1" }));
        var parent2 = tree.Add(new FrameWork.Menu({ text: "Menu 2" }));
        var parent3 = tree.Add(new FrameWork.Menu({ text: "Menu 3" }));
        var parent4 = tree.Add(new FrameWork.Menu({ text: "Menu 4" }));
        var child1 = parent1.Add(new FrameWork.Menu({ text: "Child 1" }));
        var child2 = parent1.Add(new FrameWork.Menu({ text: "Child 2" }));
        var child3 = parent1.Add(new FrameWork.Menu({ text: "Child 3" }));
        var child4 = parent1.Add(new FrameWork.Menu({ text: "Child 4" }));
        var child11 = child1.Add(new FrameWork.Menu({ text: "Child 11" }));
        tree.Show();
    };
    return Demo;
}());
//# sourceMappingURL=demo.js.map