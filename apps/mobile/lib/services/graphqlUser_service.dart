import 'package:eventvalle/data/models/auth.dart';
import 'package:eventvalle/data/models/user.dart';
import 'package:eventvalle/utils/graphql_config..dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class GraphQLUserService {
  static GraphQLConfig graphQLConfig = GraphQLConfig();
  GraphQLClient client = graphQLConfig.clientToQuery();

  Future<List<UserEntity>> getListOfUsers() async {
    try {
      QueryResult result = await client.query(
        QueryOptions(
          fetchPolicy: FetchPolicy.noCache,
          document: gql("""
            query {
              listUsers {
                id
                email
                name
                last_name
                user_name
              }
            }
          """),
        ),
      );

      if (result.hasException) {
        throw Exception(result.exception);
      } else {
        List? res = result.data?['listUsers'];

        if (res == null || res.isEmpty) {
          return [];
        }

        List<UserEntity> users = res.map((data) => UserEntity.fromJson(data)).toList();

        print(users);
        return users;
      }
    } catch (error) {
      print(error);
      return []; // Return an empty list or handle the error as needed
    }
  }

  Future<UserEntity?> loginUser(LoginInput loginInput) async {
    try {
      QueryResult result = await client.mutate(
        MutationOptions(
          document: gql("""
            mutation Login(\$input: LoginInput!) {
              login(loginInput: \$input) {
                id
                name
                user_name
                email
                last_name
              }
            }
          """),
          variables: {"input": loginInput.toJson()},
        ),
      );

      if (result.hasException) {
        throw Exception(result.exception);
      } else {
        Map<String, dynamic>? userData = result.data?['login'];
        if (userData == null) {
          return null; // User not found or other login error
        }

        UserEntity user = UserEntity.fromJson(userData);
        print(user);
        return user;
      }
    } catch (error) {
      print(error);
      return null; // Return null or handle the error as needed
    }
  }

  Future<LogoutEntity> logoutUser() async {
    try {
      QueryResult result = await client.query(
        QueryOptions(
          document: gql("""
            query Logout {
              logout {
                status
              }
            }
          """),
        ),
      );

      if (result.hasException) {
        throw Exception(result.exception);
      } else {
        Map<String, dynamic>? data = result.data?['logout'];

        if (data == null) {
          throw Exception("Logout failed");
        }

        return LogoutEntity.fromJson(data);
      }
    } catch (error) {
      throw Exception("Logout failed: $error");
    }
  }
}
