import 'package:eventvalle/data/models/auth.dart';
import 'package:eventvalle/data/models/user.dart';
import 'package:eventvalle/graphql/graphql-client.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class AuthService {

  Future<UserEntity?> signInWithEmailPassword(String email, String password) async {
    try {
      final graphQLClient = GraphQLClientSingleton.getClient();
      final loginInput = LoginInput(email: email, password: password);

      final result = await graphQLClient.mutate(
        MutationOptions(
          document: gql('''
            mutation Login(\$input: LoginInput!) {
              login(loginInput: \$input) {
                createdAt
                email
                id
                last_name
                name
                password
                phone_number
                roles {
                  name
                }
                updatedAt
                user_name
              }
            }
          '''),
          variables: {
            'input': loginInput.toJson(),
          },
        ),
      );


      final userData = result.data?['login'];
      print(result.data?['login']);
      if (userData != null) {
        return UserEntity.fromJson(userData);
      } else {
        return null;
      }
    } catch (e) {
      throw Exception(e.toString());
    }
  }
}
