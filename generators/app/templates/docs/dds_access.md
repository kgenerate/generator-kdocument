# Access Specification

-   **Confidentiality**: a user should be able to deny other users read access to his files
-   **Integrity**: a user should be able to protect his files from modification or deletion by other users

<!--prettier-ignore-->
!!! tip "Access Designing"
    There are three main concepts in **Access Designing**:

    -   **Subject (Principal)**: User, Group, ...
    -   **Object**: Resources, Files, ...
    -   **Action (Operation)**: Create, Read, Update, Delete, ...
    -   **Enforcer (Reference Monitor)**: Access Server, grants or denies access requests
    -   **Permission**:
    -   **Policy**:

    ---

    -   **Access Control Matrix (ACM)**: A matirix show `who(subjects)` can act `what(actions)` on `which(object)`
    -   **Capability Table (CT)**: All `actions` of a `subject` per each `object` (**rows of ACM**)
    -   **Access Control List (ACL)**: All `actions` of an `object` per each `subject` (**columns of ACM**)

## Access Control Matrix (ACM)

| Subject\Object | File1 | File2 | File3 | Folder1 | Folder2 | Folder 3 |
| -------------- | ----- | ----- | ----- | ------- | ------- | -------- |
| **User1**      | r,w   | r     | r,w   | r       | r,w     | r        |
| **User2**      | r     | r     | r     | r       | r,w     | r        |
| **User3**      | -     | r,w   | r     | r       | r,w     | r        |
| **Role1**      | -     | r     | -     | -       | r       | -        |
| **Role2**      | -     | r     | -     | -       | r       | -        |
| **Role3**      | -     | r     | -     | -       | r       | -        |

## Preset Rules
