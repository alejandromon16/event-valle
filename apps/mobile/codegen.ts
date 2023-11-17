import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',
  overwrite: true,
  generates: {
    'lib/data2/models/app_models.dart': {
      plugins: ["flutter-freezed"]
    },
  }
};

export default config;
