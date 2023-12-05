import 'package:eventvalle/Singleton/Singleton.dart';
import 'package:eventvalle/data/models/event.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

// ignore: must_be_immutable
class EventCard extends StatelessWidget {
  final EventEntity event;
  final VoidCallback onPressed;
  final userId = Singleton().userId;
  List<EventEntity> savedEvents = [];
  EventCard({
    Key? key,
    required this.event,
    required this.onPressed,
  }) : super(key: key);



  @override
  Widget build(BuildContext context) {
    DateTime fecha = DateTime.parse(event.startDate.toString());
    String fechaFormateada = DateFormat.yMMMMEEEEd().add_jm().format(fecha);
    return InkWell(
      onTap: onPressed,
      child: Container(
        width: 400,
        height: 200,
        padding: EdgeInsets.all(12),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          color: event.principalImage.isNotEmpty
              ? null
              : Color.fromARGB(190, 0, 0, 0),
          image: event.principalImage.isNotEmpty
              ? DecorationImage(
                  image: NetworkImage(event.principalImage),
                  fit: BoxFit.cover,
                  scale: 1,
                  colorFilter: ColorFilter.mode(
                    Colors.black26,
                    BlendMode.darken,
                  ),
                )
              : null, // No mostrar imagen si la cadena está vacía
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                CircleAvatar(
                  backgroundImage: NetworkImage(
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWIotHotczo-GHEp_iWoQVBC-MjeWvniZyZmNy7X6Lgw&s'),
                ),
                const SizedBox(width: 10),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      event.subtitle,
                      style: TextStyle(
                        fontWeight: FontWeight.w500,
                        color: Colors.white,
                      ),
                    ),
                    Text(
                      fechaFormateada,
                      style: TextStyle(
                        fontWeight: FontWeight.w300,
                        color: Colors.white70,
                      ),
                    )
                  ],
                ),
                const Spacer(),
              ],
            ),
            const Spacer(),
            const Spacer(),
            Text(
              event.title,
              style: TextStyle(
                fontSize: 38,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            SizedBox(
              height: 10,
            ),
            const Spacer(),
            const Spacer(),
            Container(
              width: MediaQuery.of(context).size.width,
              padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                color: Color.fromARGB(129, 27, 3, 20),
                backgroundBlendMode: BlendMode.colorBurn,
              ),
              child: Text(
                fechaFormateada,
                style: TextStyle(
                  fontWeight: FontWeight.w600,
                  color: Colors.white,
                ),
              ),
            ),
            const Spacer(),
          ],
        ),
      ),
    );
  }
}
