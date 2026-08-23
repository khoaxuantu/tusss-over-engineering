---
name: refactor
description: Defines the convetions for refactoring
---

# Refactoring

This file defines anything you have to know to refactor correctly in this project.

## Steps

Follow the below steps to not messing up:

1. Plan the new structures/patterns that I prompt to you to the refactoring code.
2. Review the **Design checklist** section to make sure the new structures/patterns qualify all the
   criteria, write a report about it and ask me to peer-review as well.
3. After I confirm, start adding new code.
4. Give me a detail report of what new so that I can keep up with the changes.
5. After I confirm the newly code, give me a report of what you will delete.
6. After I confirm the deleted code, start deleting them.
7. Give me the final report of what you have changed.

> [!NOTE]
>
> Make sure to remember changes each step so that I can revert to a step if needed

## Design checklist

Use the template below to show the report to me:

```md
### SOLID

#### S

...

#### O

...

#### L

...

#### I

...

#### D

...

### Project conventions

#### Corresponding unit tests

...

#### NestJS patterns

...

#### Dependencies graph

...
```
