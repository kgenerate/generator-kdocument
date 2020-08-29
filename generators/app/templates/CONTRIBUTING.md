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
2. **State Diagram**
3. **Architecture Diagram**
    1. Client Server
    2. Service Oriented
    3. Microservice
    4. Active Record
    5. Repository
    6. Pipeline
4. **Model Diagram**
    1. Loopback
    2. TypeORM
    3. Hasura
    4. Entity Framework
5. **API Specification**
    1. OpenAPI Schema
    2. GraphQL Schema
    3. gRPC Schema
6. **Role Specification**
    1. Decision Matrix
    1. Preset Rule
    1. Row Permission
    1. Field Permission
7. **UI Specification**
    1. Wireframe (`Low fidelity`): AdobeXD, Sketch
    2. Prototype (`High fidelity`): AdobeXD, Sketch

---

### Model Diagram

For **Modelling** the application we must do these steps:

1. Design the **Model** for business

    ```ts
    AdminUser;
    BuyerUser;
    SellerUser;

    Basket;

    Fruits;
    Vegetables;
    Meals;
    ```

2. Define models **Properties**

    ```ts
    class AdminUser {
        username;
        password;
        email;
        name;
    }
    class BuyerUser {
        username;
        password;
        email;
        name;
    }
    class SellerUser {
        username;
        password;
        email;
        name;
        age;
    }

    class Basket {
        cost;
        count;
        date;
    }

    class Fruits {
        name;
        price;
    }
    class Vegetables {
        name;
        price;
    }
    class Meals {
        name;
        price;
    }
    ```

3. Define models **Key Relations** (**belongsTo**)

    ```ts
    class AdminUser {}
    class BuyerUser {}
    class SellerUser {}

    class Basket {
        buyerId;
        itemId;
    }

    class Fruits {
        sellerId;
    }
    class Vegetables {
        sellerId;
    }
    class Meals {
        sellerId;
    }
    ```

4. Define models **Business Relations** (**hasOne**, **hasMany**)

    ```ts
    class AdminUser {}
    class BuyerUser {
        buyedBaskets;
        currentBasket;
    }
    class SellerUser {
        items;
    }

    class Basket {}

    class Fruits {}
    class Vegetables {}
    class Meals {}
    ```

5. Integrate business models into **Abstract Model**

    ```ts
    class User {}

    class Basket {}

    class Item {}
    ```

6. Define **System Roles** based on **User Business Models**

    1. **Admin**
    2. **Buyer**
    3. **Seller**

---

### API Specification

For defining application **API's** we must do these steps:

1. Define **Root Nodes** for **CRUD Operations** on models

    ```ts
    type Query {
        getAllUsers(filter)
        getOneUser(id)

        getAllBaskets(filter)
        getOneBasket(id)

        getAllItems(filter)
        getOneItem(id)
    }
    type Mutation {
        setAllUsers(filter, User[])
        setOneUser(id, User)

        setAllBaskets(filter, Basket[])
        setOneBasket(id, Basket)

        setAllItems(filter, Item[])
        setOneItem(id, Item)
    }
    ```

2. Define **Specific Operations** based on business

    ```ts
    type Query {
        getMe()
    }
    type Mutation {
        addItemToBasket(item, count)
    }
    ```

---

### Role Specification

For defining application **Authorization** we must do these steps:

1. Define **Decision Matrices** for each model:

    | **`User`** | Get | Set  |
    | ---------- | --- | ---- |
    | **Admin**  | All | All  |
    | **Buyer**  | All | Self |
    | **Seller** | All | Self |

    ***

    | **`Basket`** | Get  | Set      |
    | ------------ | ---- | -------- |
    | **Admin**    | All  | All      |
    | **Buyer**    | Own  | Own,Open |
    | **Seller**   | None | None     |

    ***

    | **`Item`** | Get | Set  |
    | ---------- | --- | ---- |
    | **Admin**  | All | All  |
    | **Buyer**  | All | None |
    | **Seller** | All | Own  |

2. Define **Preset Rules** per model

    - These rules will **force rewrite** some fields of entities, for example users cannot set **CreateDate**, instead this field will filled automatically

    ```ts
    function (context: Context, entities: Entity[]): Entity[];
    ```

    ***

    ```ts
    @Preset({
        admin: {},
        buyer: {
            username: undefined,
            age: Date.now(),
        },
        seller: {
            username: undefined,
            age: undefined,
        },
    })
    class User {
        username;
        password;
        email;
        name;
        age;
        buyedBaskets;
        currentBasket;
    }

    @Preset({
        admin: {},
        buyer: {
            date: Date.now(),
        },
        seller: {
            date: Date.now(),
        },
    })
    class Basket {
        cost;
        count;
        date;
        buyerId;
        itemId;
    }

    @Preset({
        admin: {},
        buyer: {},
        seller: {},
    })
    class Item {
        name;
        price;
        sellerId;
    }
    ```

3. Define **Row Permissions** per model

    - These permissions will **filter table rows** for each user based on their **permissions**

    ```ts
    function (context: Context, access: "get" | "set"): Where<Entity>;
    ```

    ***

    ```ts
    @Authorize({
        admin: {
            get: {},
            set: {},
        },
        buyer: {
            get: {},
            set: { id: me.id },
        },
        seller: {
            get: {},
            set: { id: me.id },
        },
    })
    class User {
        username;
        password;
        email;
        name;
        age;
        buyedBaskets;
        currentBasket;
    }

    @Authorize({
        admin: {
            get: {},
            set: {},
        },
        buyer: {
            get: { buyerId: me.id },
            set: { id: "" },
        },
        seller: {
            get: { id: "" },
            set: { id: "" },
        },
    })
    class Basket {
        cost;
        count;
        date;
        buyerId;
        itemId;
    }

    @Authorize({
        admin: {
            get: {},
            set: {},
        },
        buyer: {
            get: {},
            set: { id: "" },
        },
        seller: {
            get: {},
            set: { sellerId: me.id },
        },
    })
    class Item {
        name;
        price;
        sellerId;
    }
    ```

4. Define **Field Permissions** per model

    - These permissions will **filter table columns** for each user based on their **permissions**

    ```ts
    function (context: Context, access: "get" | "set"): {[field: string]: boolean};
    ```

    ***

    ```ts
    @Authorize({
        admin: {},
        buyer: {
            buyedBaskets: {
                get: { id: me.id },
                set: { id: "" },
            },
            currentBasket: {
                get: { id: me.id },
                set: { id: me.id },
            },
        },
        seller: {
            buyedBaskets: {
                get: { id: "" },
                set: { id: "" },
            },
            currentBasket: {
                get: { id: "" },
                set: { id: "" },
            },
        },
    })
    class User {
        username;
        password;
        email;
        name;
        age;
        buyedBaskets;
        currentBasket;
    }

    @Authorize({
        admin: {},
        buyer: {},
        seller: {},
    })
    class Basket {
        cost;
        count;
        date;
        buyerId;
        itemId;
    }

    @Authorize({
        admin: {},
        buyer: {},
        seller: {},
    })
    class Item {
        name;
        price;
        sellerId;
    }
    ```

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
4. Use [Git-Extras](https://github.com/tj/git-extras) to generate changelogs before finishing each release
    1. `git changelog CHANGELOG.md`

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
