const Generator = require("yeoman-generator");
const Chalk = require("chalk");

module.exports = class extends Generator {
    async _promptLoop(message, questions) {
        const loop = await this.prompt({
            type: "confirm",
            name: "loop",
            message: message,
            default: true,
        });

        if (loop.loop) {
            return [
                await this.prompt(questions),
                ...(await this._promptLoop(message, questions)),
            ];
        } else {
            return [];
        }
    }

    async initializing() {
        this.env.adapter.promptModule.registerPrompt(
            "datepicker",
            require("inquirer-datepicker")
        );

        this.log(
            Chalk.blue(
                "Hi there, this generator is used for KoLiBer Document project initialization"
            )
        );
    }

    async prompting() {
        this.project = await this.prompt([
            {
                type: "input",
                name: "name",
                message: `Enter project ${Chalk.red("name")}:`,
                default: this.appname,
            },
            {
                type: "input",
                name: "description",
                message: `Enter project ${Chalk.red("description")}:`,
                default: this.appname,
            },
            {
                type: "datepicker",
                name: "beginDate",
                message: `Enter project ${Chalk.red("begin date")}:`,
                format: ["Y", "/", "MM", "/", "DD"],
                default: new Date(),
            },
            {
                type: "list",
                name: "sdlc",
                message: `Enter project ${Chalk.red(
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
                default: "Agile",
            },
            {
                type: "input",
                name: "ownerName",
                message: `Enter project ${Chalk.red("owner name")}:`,
                default: "Owner",
            },
            {
                type: "input",
                name: "ownerEmail",
                message: `Enter project ${Chalk.red("owner email")}:`,
                default: "owner@gmail.com",
            },
        ]);

        this.links = await this._promptLoop(
            `Add a new project ${Chalk.red("link")} ?`,
            [
                {
                    type: "input",
                    name: "label",
                    message: `Enter project link ${Chalk.red("label")}:`,
                    default: "GitHub",
                },
                {
                    type: "input",
                    name: "url",
                    message: `Enter project link ${Chalk.red("url")}:`,
                    default: "https://github.com/kgenerate/generator-kdocument",
                },
            ]
        );
    }

    async writing() {
        this.fs.copyTpl(
            this.templatePath("README.md"),
            this.destinationPath("README.md"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("mkdocs.yml"),
            this.destinationPath("mkdocs.yml"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("LICENSE.md"),
            this.destinationPath("LICENSE.md"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("CONTRIBUTING.md"),
            this.destinationPath("CONTRIBUTING.md"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("CHANGELOG.md"),
            this.destinationPath("CHANGELOG.md"),
            this
        );
        this.fs.copyTpl(
            this.templatePath(".gitignore"),
            this.destinationPath(".gitignore"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("docs/index.md"),
            this.destinationPath("docs/index.md"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("docs/srs_user.md"),
            this.destinationPath("docs/srs_user.md"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("docs/srs_system.md"),
            this.destinationPath("docs/srs_system.md"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("docs/dds_model.md"),
            this.destinationPath("docs/dds_model.md"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("docs/dds_architecture.md"),
            this.destinationPath("docs/dds_architecture.md"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("docs/dds_access.md"),
            this.destinationPath("docs/dds_access.md"),
            this
        );
    }

    async install() {}

    async end() {
        this.log(
            Chalk.green("KoLiBer Document project initialized successfully!")
        );
    }
};
