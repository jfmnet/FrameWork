class MainView {
    Show(): void {
        let self = this;
        let container = new FrameWork.SplitContainer();
        container.orientation = FrameWork.ORIENTATION.HORIZONTAL;

        FrameWork.GetJSON("resources/tree.json", function (nodes: any) {
            self.ShowTree(nodes, container);
        })

        FrameWork.GetJSON("resources/panel.json", function (panels: any) {
            self.ShowPanel(panels, container);
        })

        container.Show();
    }

    //Tree

    ShowTree(nodes: any, container: FrameWork.SplitContainer): void {
        let tree = new FrameWork.TreeContainer();
        this.ShowTreeNodes(tree, nodes.Nodes);
        container.Add(tree);

        let node = tree.children[3] as FrameWork.TreeNode;
        node.Expand(true);
    };

    ShowTreeNodes(container: FrameWork, nodes: any): void {
        for (let node of nodes) {
            let menu = new FrameWork.TreeNode({
                text: node.Text,
                tag: node,
                onclick: (sender: FrameWork.TreeNode) => {
                }
            });

            container.Add(menu);

            if (node.Nodes?.length)
                this.ShowTreeNodes(menu, node.Nodes);
        }
    }

    //Panel
    ShowPanel(panels: any, container: FrameWork.SplitContainer): void {
        let scroll = new FrameWork.ScrollContainer();

        for (let panel of panels) {
            switch (panel.Type) {
                case "ObjectParameters":
                    this.ShowPanelObjectParameters(panel, scroll);
                    break;
            }
        }

        container.Add(scroll);
    }

    ShowPanelObjectParameters(panel: any, container: FrameWork): void {
        let expander = new FrameWork.Expander({ text: panel.Caption });
        let groups = {};
        let order = {};

        if (panel.Caption) {
            container.Add(expander);
            container = expander;
        }

        //Groups
        for (let name in panel.Item) {
            let param = panel.Item[name];

            if (param.Visible) {
                if (param.Group != null) {
                    let split: string[] = param.Group.split("#");
                    let key: string = param.Group;
                    let number: number = 100;

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
        let sorted = {};

        for (let i = 1; i <= 100; i++) {
            for (let name in order) {
                if (order[name] == i) {
                    sorted[name] = groups[name];
                }
            }
        }

        groups = sorted;

        for (let name in groups) {
            let group = groups[name];

            let innerexpander = new FrameWork.Expander({ text: name });
            container.Add(innerexpander);

            for (let g in group) {
                let item = group[g];
                innerexpander.Add(new FrameWork.Input({ text: item.Label, value: item.DisplayValue }));
            }
        }
    }
}