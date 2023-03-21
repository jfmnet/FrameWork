MathJax = {
    options: {
        enableMenu: false,
        menuOptions: {
            settings: {
                semantics: true,
                assistiveMml: false,
                inTabOrder: false
            }
        }
    },
    startup: {
        ready() {
            const { Menu } = MathJax._.ui.menu.Menu;

            class myMenu extends Menu {
                constructor(document, options) {
                    super(document, options);
                    this.applySettings();
                }

                applySettings() {
                    this.setTabOrder(this.settings.inTabOrder);
                    this.document.options.enableAssistiveMml = this.settings.assistiveMml;
                    this.document.outputJax.options.scale = parseFloat(this.settings.scale);
                    if (this.settings.renderer !== this.defaultSettings.renderer) {
                        this.setRenderer(this.settings.renderer);
                    }
                }
            }

            if (MathJax.version === '3.2.0') {
                MathJax.config.options.MenuClass = myMenu;
            }
            MathJax.startup.defaultReady();
        }
    }
};