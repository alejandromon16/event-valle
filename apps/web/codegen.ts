
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/graphql",
  documents: "document.graphql",
  generates: {
    'types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;


