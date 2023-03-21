class Demo {
    Show(): void {
        //this.Tree();
        //this.Menu();

        this.Input();
    }

    Tree(): void {
        let tree = new FrameWork.TreeContainer();
        let parent1 = tree.Add(new FrameWork.TreeNode({ text: "Parent 1" })) as FrameWork.TreeNode;
        let parent2 = tree.Add(new FrameWork.TreeNode({ text: "Parent 2" })) as FrameWork.TreeNode;
        let parent3 = tree.Add(new FrameWork.TreeNode({ text: "Parent 3" })) as FrameWork.TreeNode;
        let parent4 = tree.Add(new FrameWork.TreeNode({ text: "Parent 4" })) as FrameWork.TreeNode;

        let child1 = parent1.Add(new FrameWork.TreeNode({ text: "Child 1" })) as FrameWork.TreeNode;
        let child2 = parent1.Add(new FrameWork.TreeNode({ text: "Child 2" })) as FrameWork.TreeNode;
        let child3 = parent1.Add(new FrameWork.TreeNode({ text: "Child 3" })) as FrameWork.TreeNode;
        let child4 = parent1.Add(new FrameWork.TreeNode({ text: "Child 4" })) as FrameWork.TreeNode;

        let child11 = child1.Add(new FrameWork.TreeNode({ text: "Child 11" })) as FrameWork.TreeNode;

        tree.Show();
    }

    Menu(): void {
        let tree = new FrameWork.MenuContainer();
        let parent1 = tree.Add(new FrameWork.Menu({ text: "Menu 1" })) as FrameWork.Menu;
        let parent2 = tree.Add(new FrameWork.Menu({ text: "Menu 2" })) as FrameWork.Menu;
        let parent3 = tree.Add(new FrameWork.Menu({ text: "Menu 3" })) as FrameWork.Menu;
        let parent4 = tree.Add(new FrameWork.Menu({ text: "Menu 4" })) as FrameWork.Menu;

        let child1 = parent1.Add(new FrameWork.Menu({ text: "Child 1" })) as FrameWork.Menu;
        let child2 = parent1.Add(new FrameWork.Menu({ text: "Child 2" })) as FrameWork.Menu;
        let child3 = parent1.Add(new FrameWork.Menu({ text: "Child 3" })) as FrameWork.Menu;
        let child4 = parent1.Add(new FrameWork.Menu({ text: "Child 4" })) as FrameWork.Menu;

        let child11 = child1.Add(new FrameWork.Menu({ text: "Child 11" })) as FrameWork.Menu;

        tree.Show();
    }

    Input(): void {
        let data = new InputData();

        let container = new FrameWork.Container();
        container.AddDataSource(data);
        container.Show();
    }
}

class InputData {
    name = new FrameWork.InputString("Name", "Hello World");
    age = new FrameWork.InputNumber("Age", 6);
}