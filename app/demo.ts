class Demo {
    Show(): void {
        //this.Tree();
        //this.Menu();

        this.Input();
        this.MaterialDesign2();
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

    MaterialDesign2(): void {
        let button = new FrameWork.MD2Button({ text: "OK", icon: "favorite" });
        button.Show();
    }
}

class InputData {
    name = new FrameWork.InputString("Name", "Hello World");
    age = new FrameWork.InputNumber("Age", 6);
    button = new FrameWork.InputButton("Submit", 'Click me');    
    checkBox = new FrameWork.InputCheckBox("Gender", "Male");
    color = new FrameWork.InputColor("myColor", "red");
    date = new FrameWork.InputDate("Choose Date", "my-local-date");
    dateTime = new FrameWork.InputDateTime("choose Datetime", 'dt');
    email = new FrameWork.InputEmail("Email", 'dt@ait.asia');
    file = new FrameWork.InputFile("Choose File", null);
    hidden = new FrameWork.InputHidden("my secret","lianu");
    image = new FrameWork.InputImage("my image","photo");
    month = new FrameWork.InputMonth("choose month","January");
    password = new FrameWork.InputPassword("Password","lianu");
    radio = new FrameWork.InputRadio("Exam",null);
    range = new FrameWork.InputRange("5-3", "baby");
    reset = new FrameWork.InputReset("Reset", "testing button");
    search = new FrameWork.InputSearch("Search", "search my norch");
    submit  = new FrameWork.InputSubmit("submit", "submit button",() => {alert('ok');});
    telephone = new FrameWork.InputTelehone("Phone", "0934188674");
    time  = new FrameWork.InputTime("choose Time", "my time zone");
    url = new FrameWork.InputUrl("URl", "Event Url");
    week  = new FrameWork.InputWeek("week", "my week");
}