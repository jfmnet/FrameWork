var MainView = /** @class */ (function () {
    function MainView() {
    }
    MainView.prototype.Show = function () {
        var self = this;
        var container = new FrameWork.SplitContainer();
        container.orientation = ORIENTATION.HORIZONTAL;
        FrameWork.GetJSON("resources/tree.json", function (nodes) {
            self.ShowTree(nodes, container);
        });
        FrameWork.GetJSON("resources/panel.json", function (panels) {
            self.ShowPanel(panels, container);
        });
        container.Show();
    };
    //Tree
    MainView.prototype.ShowTree = function (nodes, container) {
        var tree = new FrameWork.TreeContainer();
        this.ShowTreeNodes(tree, nodes.Nodes);
        container.Add(tree);
        var node = tree.children[3];
        node.Expand(true);
    };
    ;
    MainView.prototype.ShowTreeNodes = function (container, nodes) {
        var _a;
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            var menu = new FrameWork.TreeNode({
                text: node.Text,
                tag: node,
                onclick: function (sender) {
                }
            });
            container.Add(menu);
            if ((_a = node.Nodes) === null || _a === void 0 ? void 0 : _a.length)
                this.ShowTreeNodes(menu, node.Nodes);
        }
    };
    //Panel
    MainView.prototype.ShowPanel = function (panels, container) {
        var scroll = new FrameWork.ScrollContainer();
        for (var _i = 0, panels_1 = panels; _i < panels_1.length; _i++) {
            var panel = panels_1[_i];
            switch (panel.Type) {
                case "ObjectParameters":
                    this.ShowPanelObjectParameters(panel, scroll);
                    break;
            }
        }
        container.Add(scroll);
    };
    MainView.prototype.ShowPanelObjectParameters = function (panel, container) {
        var expander = new FrameWork.Expander({ text: panel.Caption });
        var groups = {};
        var order = {};
        if (panel.Caption) {
            container.Add(expander);
            container = expander;
        }
        //Groups
        for (var name_1 in panel.Item) {
            var param = panel.Item[name_1];
            if (param.Visible) {
                if (param.Group != null) {
                    var split = param.Group.split("#");
                    var key = param.Group;
                    var number = 100;
                    if (split.length > 1) {
                        number = parseFloat(split[0]);
                        key = split[1];
                    }
                    if (!groups[key]) {
                        groups[key] = [];
                        order[key] = number;
                    }
                    else {
                        order[key] = number;
                    }
                    groups[key].push(param);
                }
                else {
                    if (!groups["General"]) {
                        groups["General"] = [];
                        order["General"] = 100;
                    }
                    groups["General"].push(param);
                }
            }
        }
        //Sort groups
        var sorted = {};
        for (var i = 1; i <= 100; i++) {
            for (var name_2 in order) {
                if (order[name_2] == i) {
                    sorted[name_2] = groups[name_2];
                }
            }
        }
        groups = sorted;
        for (var name_3 in groups) {
            var group = groups[name_3];
            var innerexpander = new FrameWork.Expander({ text: name_3 });
            container.Add(innerexpander);
            for (var g in group) {
                var item = group[g];
                innerexpander.Add(new FrameWork.Input({ text: item.Label, value: item.DisplayValue }));
            }
        }
    };
    return MainView;
}());
//# sourceMappingURL=mainview.js.map