import 'package:eventvalle/Singleton/Singleton.dart';
import 'package:eventvalle/data/models/auth.dart';
import 'package:eventvalle/data/models/user.dart';
import 'package:eventvalle/graphql/graphql-client.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class AuthService {
  Future<UserEntity?> signInWithEmailPassword(
      String email, String password) async {
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
        print(UserEntity.fromJson(userData).id);
        return UserEntity.fromJson(userData);
      } else {
        return null;
      }
    } catch (e) {
      throw Exception(e.toString());
    }
  }

  Future<UserEntity?> registerUser(
      String email, String lastName, String name, String password,
      {String? phoneNumber, String? userName}) async {
    try {
      final graphQLClient = GraphQLClientSingleton.getClient();

      final userInput = CreateUserInput(
        email: email,
        last_name: lastName,
        name: name,
        password: password,
        phone_number: phoneNumber,
        user_name: userName ?? '',
      );

      final result = await graphQLClient.mutate(
        MutationOptions(
          document: gql('''
            mutation Register(\$input: CreateUserInput!) {
              createUser(createUserInput: \$input) {
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
            'input': userInput.toJson(),
          },
        ),
      );

      final userData = result.data?['createUser'];

      if (userData != null) {
        return UserEntity.fromJson(userData);
      } else {
        return null;
      }
    } catch (e) {
      throw Exception(e.toString());
    }
  }

  Future<UserEntity?> updateUser(
    String id,
    String? name,
    String? last_name,
    String? user_name,
    String? phone_number,
  ) async {
    try {
      final graphQLClient = GraphQLClientSingleton.getClient();

      final result = await graphQLClient.mutate(
        MutationOptions(
          document: gql('''
            mutation UpdateUser(\$input: UpdateUserInput!) {
              updateUser(updateUserInput: \$input) {
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
            'input': {
              'id': id,
              'name': name,
              'last_name': last_name,
              'user_name': user_name,
              'phone_number': phone_number,
            },
          },
        ),
      );

      final userData = result.data?['updateUser'];

      if (userData != null) {
        Singleton().setUserEntity(UserEntity.fromJson(userData));
        return UserEntity.fromJson(userData);
      } else {
        return null;
      }
    } catch (e) {
      throw Exception(e.toString());
    }
  }
}
