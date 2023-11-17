import 'package:eventvalle/data/models/event.dart';
import 'package:eventvalle/widgets/EventCard.dart';
import 'package:flutter/material.dart';

class Carrusel extends StatelessWidget {
  final String title;
  final List<EventEntity> events;

  Carrusel({Key? key, required this.title, required this.events}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 16.0), // Add left padding to the text
          child: Text(
            '${title}',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 18.0
            ),
          ),
        ),
        const SizedBox(height: 16),
        SizedBox(
          height:500,
          child: ListView.builder(
            padding: EdgeInsets.symmetric(horizontal: 10),
            itemCount: events.length,
            itemExtent: 350,
            itemBuilder: (context, index) {
              final EventEntity event = events[index];
              return Padding(
                padding: EdgeInsets.symmetric(horizontal: 8.0),
                child: EventCard(event: event, onPressed: (){},),
              );
            },
          ),
        ),
      ],
    );
  }
}
