class Canvas2DSettings {
    LightTheme(): void {
    }

    DarkTheme(): void {
    }
}

class Canvas2D extends FrameWork {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    buffer: HTMLCanvasElement;

    settings: Canvas2DSettings = new Canvas2DSettings();

    constructor() {
        super();

        let self = this;

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
            if (FrameWork.theme === Theme.LIGHT)
                this.settings.LightTheme();

            else if (FrameWork.theme === Theme.DARK)
                this.settings.DarkTheme();

            else if (FrameWork.theme === Theme.SYSTEM) {
                if (matches)
                    this.settings.DarkTheme();
                else
                    this.settings.LightTheme();
            }

            self.Render();
        });
    }
 
    Refresh(): void {
        let self = this;

        this.Clear();

        //Canvas and context
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("tabindex", "1");
        this.context = this.canvas.getContext('2d');

        //Add canvas to dom
        this.object.appendChild(this.canvas);

        //Mouse
        //this.mouse = new XMouse(this);

        this.Resize();
        this.Events();

        //this.ShowToolbar();
        this.RefreshChildren();

        //Subscribe to the resize event
        window.addEventListener("resize", function () {
            self.Resize();
            self.ZoomAll();
        });
    }

    Resize(): void {
    }

    Render(): void {
    }

    ZoomAll(): void {
    }
}