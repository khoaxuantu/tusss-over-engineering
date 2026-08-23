---
name: write-agent-md
description: The guideline to write an AGENTS.md for a module
---

# Write AGENTS.md

This skill defines how to write an `AGENTS.md` file for a module. It features:

- Write a new `AGENTS.md` file
- Update the existing `AGENTS.md` file

## Step by step guide

1. Check the prompted directory, and ensure it qualifies all the conditions belows. If it is not
   qualified, report to the user and stop.
   - The directory exists.

2. Check if there is any existing `AGENTS.md` in the highest level of the directory
3. Write to `AGENTS.md` file depending on the (2)
4. If yes
   - Read the `AGENTS.md`
   - Read the directory
   - Compare the existing directory with the existing `AGENTS.md`, update the `AGENTS.md` if needed

5. If no
   - Read the directory
   - Create the `AGENTS.md`
   - Write to it

6. Format the AGENTS.md file using `prettier`
   ```bash
   prettier -w path/to/AGENTS.md
   ```

## Key mindsets

- Write it clear and simple, easy to read and cover all the logic of the module
- **Do not** touch the manually customized sections, including:
  - Do
  - Don't

## Don't

- Set the blank codeblock without specifying any language (i.e bare ` ``` `).

## Do

- Set the blank codeblock as txt, so it will be ` ```txt `
