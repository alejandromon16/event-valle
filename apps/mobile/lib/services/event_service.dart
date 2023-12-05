import 'package:eventvalle/data/models/event.dart';
import 'package:eventvalle/graphql/graphql-client.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class EventService {
  Future<List<EventEntity>> getListOfEventsForThisWeek(String userId) async {
    try {
      final graphQLClient = GraphQLClientSingleton.getClient();

      final result = await graphQLClient.query(
        QueryOptions(
          document: gql('''
          query GetListOfEventsForThisWeek(\$userId: String!) {
            getListOfEventsForThisWeek(getListOfEventsInput: { userId: \$userId }) {
              address
              amountOfLikes
              createdAt
              description
              endDate
              id
              images
              isLiked
              isSaved
              latitud
              locationDetail
              locationName
              longitud
              principalImage
              startDate
              status
              subtitle
              tags
              title
              updatedAt
              requestEvent {
                requestedBy {
                  name
                  last_name
                }
              }
            }
          }
        '''),
          variables: {'userId': userId},
        ),
      );

      final eventsData = result.data?['getListOfEventsForThisWeek'];
      if (eventsData != null) {
        return List<EventEntity>.from(
          eventsData.map((event) => EventEntity.fromJson(event)),
        );
      } else {
        return [];
      }
    } catch (e) {
      throw Exception(e.toString());
    }
  }

  Future<List<EventEntity>> getListOfEvents() async {
    try {
      final graphQLClient = GraphQLClientSingleton.getClient();

      final result = await graphQLClient.query(
        QueryOptions(
          document: gql('''
            query GetListOfEvents {
              getListOfEvents {
                address
                createdAt
                description
                endDate
                id
                images
                latitud
                locationDetail
                locationName
                longitud
                principalImage
                startDate
                status
                subtitle
                tags
                title
                updatedAt
              }
            }
          '''),
        ),
      );

      final eventsData = result.data?['getListOfEvents'];
      if (eventsData != null) {
        return List<EventEntity>.from(
          eventsData.map((event) => EventEntity.fromJson(event)),
        );
      } else {
        return [];
      }
    } catch (e) {
      throw Exception(e.toString());
    }
  }

  Future<void> saveEvent(String eventId, String userId) async {
    try {
      final graphQLClient = GraphQLClientSingleton.getClient();

      await graphQLClient.mutate(
        MutationOptions(
          document: gql('''
      mutation SaveEvent(\$eventId: String!, \$userId: String!) {
        saveEventByUser(saveEventInput: { eventId: \$eventId, userId: \$userId }) {
          id
        }
      }
    '''),
          variables: {'eventId': eventId, 'userId': userId},
        ),
      );
    } catch (e) {
      throw Exception(e.toString());
    }
  }

  Future<void> unsaveEvent(String eventId, String userId) async {
    try {
      final graphQLClient = GraphQLClientSingleton.getClient();

      await graphQLClient.mutate(
        MutationOptions(
          document: gql('''
      mutation UnsaveEvent(\$eventId: String!, \$userId: String!) {
        unSaveEventByUser(saveEventInput: { eventId: \$eventId, userId: \$userId }) {
          id
        }
      }
    '''),
          variables: {'eventId': eventId, 'userId': userId},
        ),
      );
    } catch (e) {
      throw Exception(e.toString());
    }
  }

  Future<void> removeLike(String eventId, String userId) async {
    try {
      final graphQLClient = GraphQLClientSingleton.getClient();

      await graphQLClient.mutate(
        MutationOptions(
          document: gql('''
          mutation RemoveLike(\$eventId: String!, \$userId: String!) {
            removeLike(likedEventInput: { eventId: \$eventId, userId: \$userId }) {
              id
            }
          }
        '''),
          variables: {'eventId': eventId, 'userId': userId},
        ),
      );
    } catch (e) {
      throw Exception(e.toString());
    }
  }

  Future<void> addLike(String eventId, String userId) async {
    try {
      final graphQLClient = GraphQLClientSingleton.getClient();

      await graphQLClient.mutate(
        MutationOptions(
          document: gql('''
          mutation AddLike(\$eventId: String!, \$userId: String!) {
            addLike(likedEventInput: { eventId: \$eventId, userId: \$userId }) {
              id
            }
          }
        '''),
          variables: {'eventId': eventId, 'userId': userId},
        ),
      );
    } catch (e) {
      throw Exception(e.toString());
    }
  }

  Future<List<EventEntity>> getListOfSavedEvents(String userId) async {
    try {
      final graphQLClient = GraphQLClientSingleton.getClient();

      final result = await graphQLClient.query(
        QueryOptions(
          document: gql('''
      query GetListOfSavedEvents(\$userId: String!) {
        getListOfEventsSavedByUserId(getListOfEventsSavedByUserIdInput: { userId: \$userId }) {
          address
          createdAt
          description
          endDate
          id
          images
          latitud
          locationDetail
          locationName
          longitud
          principalImage
          startDate
          status
          subtitle
          tags
          title
          updatedAt
          isLiked
          isSaved
          amountOfLikes
          requestEvent {
            requestedBy {
              name
              last_name
            }
          }
        }
      }
    '''),
          variables: {'userId': userId},
        ),
      );

      final eventsData = result.data?['getListOfEventsSavedByUserId'];
      if (eventsData != null) {
        return List<EventEntity>.from(
          eventsData.map((event) => EventEntity.fromJson(event)),
        );
      } else {
        return [];
      }
    } catch (e) {
      throw Exception(e.toString());
    }
  }
}
