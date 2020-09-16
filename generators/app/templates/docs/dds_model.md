# Model Diagram

<!--prettier-ignore-->
!!! tip "Model Designing"
    For designing **Models** we must do these steps:

    1. Design the **Model** for business
    2. Define models **Properties**
    3. Define models **Key Relations** (**belongsTo**)
    4. Define models **Business Relations** (**hasOne**, **hasMany**)
    5. Integrate business models into **Abstract Model**
    6. Define **System Roles** based on **User Business Models**

---

## Domain Models (ER Diagram)

<!--prettier-ignore-->
!!! tip "Domain Model Designing"
    For designing the **Domain Models** we must follow these steps:

    1. Find business **Entities**
    2. Find entities **Key Relations** (**belongsTo**)
    3. Find entities **Business Relations** (**hasOne**, **hasMany**)

```mermaid
erDiagram

Buyer ||--o{ Basket : buyedBaskets
Buyer ||--|| Basket : currentBaskets
Seller ||--o{ Item : ownedItems

Basket ||--o| Buyer : buyerId
Basket ||--o| Item : itemId

Item ||--o| Seller : sellerId
```

---

## Data Models (Class Diagram)

<!--prettier-ignore-->
!!! tip "Data Model Designing"
    For designing the **Data Models** we must follow these steps:

    1. Integrate **Business Entities** into **Abstract Data Models**
    2. Find model **Properties**

```mermaid
classDiagram

class User {
    String username
    String password
    String email
    String name
    int age
}
class Basket {
    int cost
    int count
    Date date
    String buyerId
    String itemId
}
class Item {
    String name
    double price
    String sellerId
}

User "1" --> "n" Basket : buyedBaskets
User "1" --> "1" Basket : currentBasket

Basket "1" --> "1" User : buyer
Basket "1" --> "1" Item : item

Item "1" --> "1" User : seller
```

---

## Domain into Data

---

## System Roles

1. **Admin**
2. **Buyer**
3. **Seller**
