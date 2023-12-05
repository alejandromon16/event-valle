
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8000/graphql',
  documents: "document.graphql",
  generates: {
    'types.ts': {
      plugins: ['typescript', 'typescript-operations','typescript-react-query'],
      config: {
        fetcher: 'graphql-request'
      }
    },
  }
};

export default config;


