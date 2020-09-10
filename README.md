# Matplan

### Basic info
This website uses the following technologies

* Yarn (Package-manager)
* ReactJs
* Typescript
* Material-UI (CSS-framework)
* Firebase Firestore
* Firebase Auth
* i18next

### Getting started

#### Installing
This project uses yarn, so all you have to do is to clone, install and run.

```
git clone git@github.com:olros/matplan.git
cd matplan
yarn
yarn start 
```

#### Available Scripts
In the project directory, you can run:

- `yarn start` - Runs the app in the development mode.
- `yarn test` - Launches the test runner in the interactive watch mode.
- `yarn build` - Builds the app for production to the `build` folder.
- `yarn format` - Formats the code with Prettier/ESlint

#### Workspace

There is a file called `matplan.code-workspace` with settings which autoformats your code with Prettier when you click save.

### Firestore structure

```
{
  "plans (collection - docId: uid)": [
    {
      "uid": "string",
      "public": "boolean",
      "slug": "string",
      "days": [
        "day": "number (YYYYMMDD)",
        "plan": "string",
        "recipe": "reference"
      ]
    }
  ],
  "expenses (collection - docId: uid)": [
    {
      "uid": "string",
      "expense_months (collection - docId: YYYYMM)": [
        {
          "totalAmount": "number",
          "totalTimes: "number",
          "expenses": [
            {
              "time": "TIMESTAMP",
              "amount: "number",
            }
          ]
        }
      ] 
    }
  ],
  "recipes (collection - docId: random)": [
    {
      "owner": "string (uid)",
      "public": "boolean",
      "title": "string",
      "img": "string",
      "ingredients": [
        {
          "name": "string",
          "amount": "number",
        }
      ],
      "steps": [
        "string"
      ]
    }
  ]
}
```
