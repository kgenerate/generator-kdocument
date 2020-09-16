# Contributing

There are six steps for software development

1.  **Planning** (Customer Contact)
2.  **Defining** (SRS Document)
3.  **Designing** (DDS Document)
4.  **Building** ([12Factor](https://www.12factor.net/), [SemVer](https://semver.org/))
5.  **Testing**
6.  **Deployment**

---

## Planning and Requirement Analysis

The most important and fundamental stage in **SDLC**

In this step the **Senior Members** of team with contact to **Customers** to find the **Business** of the product

The result of this stage is:

1. **Product Definition**
2. **Business Concepts**
3. **Requirements**

---

## Defining Requirements

In this stage we **clearly define** and **document** the **product requirements** and get them **approved** from the customer or the market analysts

The result of this stage is **SRS Document** or **Software Requirements Specification**:

1. **User Requirements**
    1. User Story
    2. Use Case
    3. Use Case Diagram
2. **System Requirements**
    1. Functional Requirements
    2. Non-Functional Requirements

---

## Designing the Product Architecture

When the **software requirements** are clearly defined, we can design the product

The result of this stage is **DDS Document** or **Design Document Specification**:

1. **BPMN Diagram**
2. **Model Diagram**
    1. Domain Model
    2. Data Model
    3. System Roles
3. **Architecture Diagram**
    1. Client Server
    2. Service Oriented
    3. Microservice
    4. Active Record
    5. Repository
    6. Pipeline
4. **Access Specification**
    1. Access Control Matrix
    2. Access Permissions
    3. Preset Rules
5. **UI Specification**
    1. Wireframe (Low fidelity)
    2. Prototype (High fidelity)

---

## Building or Developing the Product

In this stage of SDLC the actual development starts and the product is built

We start implementing the product based on **DDS Document**

There are two important principles:

1. **Clean Code**
2. [**12 Factor**](https://www.12factor.net/)

There are many important concepts in implementing and coding the product based on **Clean Code** principles:

---

### Structures

1. File names must be **simple**, **readable**, **consistent**
2. **SQL** commands with Capital characters
3. Consistant **Indention** (space and {} and ...)
4. After finishing every file **refactor** it (check comment, method size, variable naming, SQL, ...)
5. **DRY** principle (Don't Repeat Yourself)

---

### Names

1. Names must be **simple**
2. Names must be **readable**
3. Names must be **one word per meat**
4. Names **should'nt be abbrevation** (ksto -> koliber standard orm)
5. Name -> File, Class, Variable, Temp, ID
6. Verb -> Method
7. Fixed naming style (**CamelCase -> AddNumber**, **UnderScore -> add_number**)
8. Variable Naming:
    - Naming by **goal** and **simple**
9. Temps Naming:
    1. **i, j, k, t** -> loops
    2. **cursor** -> important loops
    3. **result** -> method return value
    4. **item** -> foreach or iterator
10. ID Naming:
    - **{base component}\_{view type}[\_{description 1}\_{description 2}\_{description 3}]**

---

### Classes

1. No GOD class (simple and small)
2. Every class has one goal
3. Every class is a black box (private every unnecessary methods and getter/setter for variables)
4. Every class is a module (no dependency - inteact with other classes using interfaces)
5. No Dead code -> if don't need now the code remove it !
6. For using DBMS, Net, etc create wrapper class (implement logic - them implement low level code (net, file, ...) using other class)

---

### Methods

1. Methods should be small
2. Methods should have one goal (do only one work)
3. Methods should be blackbox (get params, return result - without side effect !) (side effects using getter, setters (var, file, memory, net, db, ...))
4. Not nested control structures (if{if{...}} -> if{} if{} if{})
5. If control conditions gets bigger (if(a & !c | d & f)) use a method for that (if(cond()){...})
6. Methods should'nt return error codes, throw errors is better !
7. Grouping codes in every method and comment every group
8. DRY principle (don't copy methods - move them into super class)

---

### Comments

1. Don't comment bad code, rewrite it !
2. Don't comment big if conditions, move it to new method !
3. Comment descriptions
4. Comment tips
5. Comment alerts
6. Comment XDoc
7. Comment method code groups
8. Other comments are noises !
9. XDoc:
    - File Description
    - Class Description
    - Constructor Description
    - Methods Description
10. XDoc Descriptions:
    ```text
       /**
       * your comments
       * your comments
       * your comments
       * @ xdoc command
       * @ xdoc command
       * @ xdoc command
       */
    ```

---

### Versions

1. Use [Git](https://git-scm.com/) and [Git-Flow](https://danielkummer.github.io/git-flow-cheatsheet/) to managing the code versions and branches and histories
2. Use [Conventional Commits Standard](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) for your commit messages to be `Human Readability` and `Robot Readability`
3. Use [Semantic Versioning Standard](https://semver.org/) to tag the product (**Major.Minor.Patch**)
    1. **Major**: older product versions are not compatible
    2. **Minor**: added features
    3. **Patch**: fixed bugs
4. Add [Change Logs](https://keepachangelog.com/) before finishing each **Release** to your `CHANGELOG.md` file

---

## Testing the Product

In this stage we write some **tests** for the product

The result of this stage is:

1. **Unit Tests**
2. **Load Tests**
3. **Stress Tests**
4. **Performance Tests**

---

## Deployment in the Market and Maintenance

In this stage we deploy the product in the production environment

We can use **CI/CD** concepts to automate the testing and deployment

The result of this stage is:

1. **Install Docker**
2. **Deploy Services**
3. **Deploy Servers**
4. **CI/CD**

---
