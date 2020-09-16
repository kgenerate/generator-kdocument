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
                "Hi there, this generator is used for KoLiBer Document link adding"
            )
        );
    }

    async prompting() {
        this.answers = await this.prompt([
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
                default: "https://github.com/kgenerate/generator-kdocument",
            },
        ]);
    }

    async configuring() {
        this.config.set("links", [...this.config.get("links"), this.answers]);
    }

    async writing() {}

    async install() {}

    async end() {
        this.log(Chalk.green("KoLiBer Document link added successfully!"));
    }
};
