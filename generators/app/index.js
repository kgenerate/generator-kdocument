const Generator = require("yeoman-generator");
const Chalk = require("chalk");

module.exports = class extends Generator {
    answers = {};
    addAnswers = async (questions) => {
        this.answers = {
            ...this.answers,
            ...(await this.prompt(questions)),
        };
    };

    async initializing() {
        this.env.adapter.promptModule.registerPrompt(
            "datepicker",
            require("inquirer-datepicker")
        );
        this.env.adapter.promptModule.registerPrompt(
            "loop",
            require("inquirer-loop")(this)
        );

        this.log(
            Chalk.blue(
                "Hi there, this generator is used for KoLiBer Document project initialization"
            )
        );
    }

    async prompting() {
        /**
         * Project prompts
         */
        await this.addAnswers([
            {
                type: "input",
                name: "projectName",
                message: `Enter project ${Chalk.red("name")}:`,
                default: this.appname,
            },
            {
                type: "input",
                name: "projectDescription",
                message: `Enter project ${Chalk.red("description")}:`,
                default: this.appname,
            },
            {
                type: "datepicker",
                name: "projectBeginDate",
                message: `Enter project ${Chalk.red("begin date")}:`,
                format: ["Y", "/", "MM", "/", "DD"],
                default: new Date(),
            },
            {
                type: "list",
                name: "projectSDLC",
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
        ]);

        /**
         * Owner prompts
         */
        await this.addAnswers([
            {
                type: "input",
                name: "ownerName",
                message: `Enter owner ${Chalk.red("name")}:`,
                default: "Owner",
            },
            {
                type: "input",
                name: "ownerEmail",
                message: `Enter owner ${Chalk.red("email")}:`,
                default: "owner@gmail.com",
            },
        ]);

        /**
         * Links prompts
         */
        await this.addAnswers([
            {
                type: "loop",
                name: "links",
                message: `Add a new project ${Chalk.red("link")} ?`,
                questions: [
                    {
                        type: "input",
                        name: "label",
                        message: `Enter link ${Chalk.red("label")}:`,
                        default: "GitHub",
                    },
                    {
                        type: "input",
                        name: "url",
                        message: `Enter link ${Chalk.red("url")}:`,
                        default:
                            "https://github.com/kgenerate/generator-kdocument",
                    },
                ],
            },
        ]);
    }

    async writing() {
        /**
         * Copy Basic templates
         */
        this.fs.copyTpl(
            this.templatePath(".gitignore.ejs"),
            this.destinationPath(".gitignore"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("README.md.ejs"),
            this.destinationPath("README.md"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("LICENSE.md.ejs"),
            this.destinationPath("LICENSE.md"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("CHANGELOG.md.ejs"),
            this.destinationPath("CHANGELOG.md"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("CONTRIBUTING.md.ejs"),
            this.destinationPath("CONTRIBUTING.md"),
            this
        );

        /**
         * Copy Mkdocs config template
         */
        this.fs.copyTpl(
            this.templatePath("mkdocs.yml.ejs"),
            this.destinationPath("mkdocs.yml"),
            this
        );

        /**
         * Copy CD file template
         */
        this.fs.copyTpl(
            this.templatePath(".gitlab-ci.yml.ejs"),
            this.destinationPath(".gitlab-ci.yml"),
            this
        );

        /**
         * Copy Documents templates
         */
        this.fs.copyTpl(
            this.templatePath("docs/index.md.ejs"),
            this.destinationPath("docs/index.md"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("docs/srs_user.md.ejs"),
            this.destinationPath("docs/srs_user.md"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("docs/srs_system.md.ejs"),
            this.destinationPath("docs/srs_system.md"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("docs/dds_model.md.ejs"),
            this.destinationPath("docs/dds_model.md"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("docs/dds_architecture.md.ejs"),
            this.destinationPath("docs/dds_architecture.md"),
            this
        );
        this.fs.copyTpl(
            this.templatePath("docs/dds_access.md.ejs"),
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
