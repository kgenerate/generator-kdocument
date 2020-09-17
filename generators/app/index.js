const Generator = require("yeoman-generator");
const Chalk = require("chalk");

module.exports = class extends Generator {
    async initializing() {
        this.env.adapter.promptModule.registerPrompt(
            "datepicker",
            require("inquirer-datepicker")
        );

        this.log(
            Chalk.blue(
                "Hi there, this generator is used for KoLiBer Document app initialization"
            )
        );
    }

    async prompting() {
        this.answers = await this.prompt([
            {
                type: "input",
                name: "name",
                message: `Enter app ${Chalk.red("name")}:`,
                default: this.config.getPath("app.name") || this.appname,
            },
            {
                type: "input",
                name: "description",
                message: `Enter app ${Chalk.red("description")}:`,
                default: this.config.getPath("app.description") || this.appname,
            },
            {
                type: "datepicker",
                name: "beginDate",
                message: `Enter app ${Chalk.red("begin date")}:`,
                format: ["Y", "/", "MM", "/", "DD"],
                default: this.config.getPath("app.beginDate") || new Date(),
            },
            {
                type: "list",
                name: "lifeCycle",
                message: `Enter app ${Chalk.red(
                    "SDLC"
                )} (Software Development Lifecycle):`,
                choices: [
                    "Waterfall",
                    "Iterative",
                    "Sprial",
                    "VShaped",
                    "BigBang",
                    "Agile",
                ],
                default: this.config.getPath("app.lifeCycle") || "Agile",
            },
            {
                type: "input",
                name: "ownerName",
                message: `Enter owner ${Chalk.red("name")}:`,
                default: this.config.getPath("app.ownerName") || "Owner",
            },
            {
                type: "input",
                name: "ownerEmail",
                message: `Enter owner ${Chalk.red("email")}:`,
                default:
                    this.config.getPath("app.ownerEmail") || "owner@gmail.com",
            },
        ]);
    }

    async configuring() {
        this.config.set("app", this.answers);
    }

    async writing() {
        this.fs.copy(this.templatePath("**/*"), this.destinationPath("."), {
            globOptions: {
                dot: true,
                ignore: "**/*.ejs",
            },
        });
        this.fs.copyTpl(
            this.templatePath("**/*.ejs"),
            this.destinationPath("."),
            this.config.getAll(),
            undefined,
            {
                globOptions: {
                    dot: true,
                },
            }
        );
    }

    async install() {}

    async end() {
        this.log(Chalk.green("KoLiBer Document app initialized successfully!"));
    }
};
