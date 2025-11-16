import fs from "node:fs";
import openapiTS, { astToString } from "openapi-typescript";
import * as prettier from "prettier";
import ts from "typescript";

const DATE = ts.factory.createTypeReferenceNode(ts.factory.createIdentifier("Date"));

const origin = "http://localhost:5000";
const outPath = "./src/lib/apis/gen/schemas.ts";
const url = new URL("/api-json", origin);
const ast = await openapiTS(url, {
  transform(schemaObject) {
    if (schemaObject.format == "date-time") {
      return {
        schema: DATE,
        questionToken: !!schemaObject.nullable,
      };
    }
  },
});
const contents = astToString(ast);

prettier.format(contents, { filepath: outPath }).then((str) => {
  fs.writeFileSync(outPath, str);
});
