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
        this.fs.copyTpl(
            this.templatePath(".gitignore.ejs"),
            this.destinationPath(".gitignore"),
            this.config.getAll()
        );
        this.fs.copyTpl(
            this.templatePath("README.md.ejs"),
            this.destinationPath("README.md"),
            this.config.getAll()
        );
        this.fs.copyTpl(
            this.templatePath("LICENSE.md.ejs"),
            this.destinationPath("LICENSE.md"),
            this.config.getAll()
        );
        this.fs.copyTpl(
            this.templatePath("CHANGELOG.md.ejs"),
            this.destinationPath("CHANGELOG.md"),
            this.config.getAll()
        );
        this.fs.copyTpl(
            this.templatePath("CONTRIBUTING.md.ejs"),
            this.destinationPath("CONTRIBUTING.md"),
            this.config.getAll()
        );
        this.fs.copyTpl(
            this.templatePath("mkdocs.yml.ejs"),
            this.destinationPath("mkdocs.yml"),
            this.config.getAll()
        );
        this.fs.copyTpl(
            this.templatePath(".gitlab-ci.yml.ejs"),
            this.destinationPath(".gitlab-ci.yml"),
            this.config.getAll()
        );
        // this.fs.copyTpl(
        //     this.templatePath("docs/index.md.ejs"),
        //     this.destinationPath("docs/index.md"),
        //     this.config.getAll()
        // );
        // this.fs.copyTpl(
        //     this.templatePath("docs/srs_user.md.ejs"),
        //     this.destinationPath("docs/srs_user.md"),
        //     this.config.getAll()
        // );
        // this.fs.copyTpl(
        //     this.templatePath("docs/srs_system.md.ejs"),
        //     this.destinationPath("docs/srs_system.md"),
        //     this.config.getAll()
        // );
        // this.fs.copyTpl(
        //     this.templatePath("docs/dds_model.md.ejs"),
        //     this.destinationPath("docs/dds_model.md"),
        //     this.config.getAll()
        // );
        // this.fs.copyTpl(
        //     this.templatePath("docs/dds_architecture.md.ejs"),
        //     this.destinationPath("docs/dds_architecture.md"),
        //     this.config.getAll()
        // );
        // this.fs.copyTpl(
        //     this.templatePath("docs/dds_access.md.ejs"),
        //     this.destinationPath("docs/dds_access.md"),
        //     this.config.getAll()
        // );
    }

    async install() {}

    async end() {
        this.log(Chalk.green("KoLiBer Document app initialized successfully!"));
    }
};
