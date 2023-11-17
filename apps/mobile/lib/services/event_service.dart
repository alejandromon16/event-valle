import 'package:eventvalle/data/models/event.dart';
import 'package:eventvalle/graphql/graphql-client.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class EventService {
  Future<List<EventEntity>> getListOfEventsForThisWeek() async {
    try {
      final graphQLClient = GraphQLClientSingleton.getClient();

      final result = await graphQLClient.query(
        QueryOptions(
          document: gql('''
            query GetListOfEventsForThisWeek {
              getListOfEventsForThisWeek {
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
}
