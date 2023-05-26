class Demo {
    Show(): void {
        //this.Show3D();

        //this.Tree();
        //this.Menu();
        //this.Input();
        this.MaterialDesign2();
    }

    Show3D(): void {
        let app = new MaterialDesign2.AppBar({ text: "XWind" });
        let canvas: Canvas3D;

        let select = new MaterialDesign2.Button({ icon: "ads_click" });
        select.type = MaterialDesign2.ButtonType.APPBAR;
        select.onclick = ()=> {
            alert(1);
        };

        app.buttons.push(select);

        let draw = new MaterialDesign2.Button({ icon: "draw" });
        draw.type = MaterialDesign2.ButtonType.APPBAR;
        draw.onclick = ()=> {
            alert(1);
        };

        app.buttons.push(draw);

        canvas = app.Add(new Canvas3D()) as Canvas3D;
        app.Show();
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
       let app = new MaterialDesign2.AppBar({text:"XWind demo"});
       //adding appbar button
       let select = new MaterialDesign2.Button({icon: "ads_click", text:'open model file'}); //Appbar button type, text will be tooltip
       select.type = MaterialDesign2.ButtonType.APPBAR;
       select.onclick = ()=>{
            alert("open model");
       }
       let draw = new MaterialDesign2.Button({icon:"draw", text:"drawer"});
       draw.type = MaterialDesign2.ButtonType.APPBAR;
       draw.onclick = ()=>{
            let dia = new MaterialDesign2.Dialogs({text: "Are you sure to draw it?"});
            dia.title ="Confirmation";
            dia.onclick = () =>{
                console.log("some process");
            }
            dia.showCancel = false;
            dia.Show();
       }
       app.buttons.push(select);
       app.buttons.push(draw);

       /* adding drawer */
       let drawer = new MaterialDesign2.NavDrawer();
       drawer.headerEmail = 'bsangpi@ait.asia';
       drawer.headerName  ='Mr. Sang pi';
       drawer.headerImage = 'https://th.bing.com/th/id/OIP.AA5M9TpxmIwgFwQKmdZ2jQHaLH?pid=ImgDet&rs=1';
       let btnW3 = new MaterialDesign2.Anchor({text:"Home", icon:'home'});
       btnW3.link = 'https://www.w3schools.com/';
       drawer.Add(btnW3);

       let btnSerach = new MaterialDesign2.Anchor({text:"Search", icon:'search'});
       btnSerach.link = 'https://www.google.com/';
       drawer.Add(btnSerach);
       app.drawer = drawer;
       app.Show();
       

       /*  tab bar demo */
       let tab = new MaterialDesign2.Tabs();
       //tabBar Button
       let btnTab1 = new MaterialDesign2.Button({text:"Add", icon: "add"});
       btnTab1.type = MaterialDesign2.ButtonType.TABBAR;
       btnTab1.isActive = true;
       tab.buttons.push(btnTab1);

       let btnTab2 = new MaterialDesign2.Button({text:"Favorite", icon: "favorite"});
       btnTab2.type = MaterialDesign2.ButtonType.TABBAR;
       tab.buttons.push(btnTab2);

       // tab content
       let container1 = new FrameWork.Container();
       container1.Add(new MaterialDesign2.Button({text:"Tab 1 Content Adding"}));
       tab.Add(container1);

       let container2 = new FrameWork.Container();
       container2.Add(new MaterialDesign2.Button({text: "Tab 2 Content Favorite"}));
       tab.Add(container2);

       //tab.Show();
     
        
        
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