// lib/graphql/graphql_client.dart
import 'package:graphql_flutter/graphql_flutter.dart';

class GraphQLClientSingleton {
  static final GraphQLClientSingleton _singleton = GraphQLClientSingleton._internal();

  factory GraphQLClientSingleton() => _singleton;

  GraphQLClientSingleton._internal();

  static GraphQLClient getClient() {
    final Link link = HttpLink('http://localhost:3000/graphql');

    return GraphQLClient(
      cache: GraphQLCache(),
      link: link,
    );
  }
}
