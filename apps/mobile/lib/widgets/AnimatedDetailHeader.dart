import 'dart:ui';

import 'package:eventvalle/Singleton/Singleton.dart';
import 'package:eventvalle/data/models/event.dart';
import 'package:eventvalle/services/event_service.dart';
import 'package:eventvalle/widgets/ImageEventView.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class AnimatedDetailHeader extends StatelessWidget {
  final EventEntity event;
  final double topPercent;
  final double bottomPercent;

  AnimatedDetailHeader({
    Key? key,
    required this.topPercent,
    required this.bottomPercent,
    required this.event,
  });

  @override
  Widget build(BuildContext context) {
    final List<String> images = [event.principalImage.isNotEmpty
      ? event.principalImage : "https://img.freepik.com/fotos-premium/fondo-negro-oscuro-estudio-fotografico-presentacion-producto-imagen-generada-ia_532963-7621.jpg?w=2000",];
    final topPadding = MediaQuery.of(context).padding.top;
    DateTime fecha = DateTime.parse(event.startDate.toString());
    String fechaFormateada = DateFormat.yMMMMEEEEd().add_jm().format(fecha);

    return Stack(
      fit: StackFit.expand,
      children: [
        ClipRRect(
            child: Stack(
          children: [
            Padding(
              padding: EdgeInsets.only(
                top: (20 + topPadding) * (1 - bottomPercent),
                bottom: 168 * (1 - bottomPercent),
              ),
              child: Transform.scale(
                  scale: lerpDouble(1, 1.3, bottomPercent),
                  child: ImageEventView(images: images)),
            ),
            Positioned(
                top: topPadding + 20,
                left: -60 * (1 - bottomPercent),
                child: BackButton(
                  color: Colors.white,
                )),
            Positioned(
                top: lerpDouble(-30, 140, topPercent)!
                    .clamp(topPadding + 10, 140),
                left: lerpDouble(60, 20, topPercent)!.clamp(20.0, 50.0),
                right: 20,
                child: AnimatedOpacity(
                    duration: kThemeAnimationDuration,
                    opacity: bottomPercent < 1 ? 0 : 1,
                    child: Opacity(
                      opacity: topPercent,
                      child: Text(
                        event.title,
                        style: TextStyle(
                          fontSize: lerpDouble(20, 40, topPercent),
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                    ))),
            Positioned(
              left: 20,
              top: 200,
              child: AnimatedOpacity(
                duration: kThemeAnimationDuration,
                opacity: bottomPercent < 1 ? 0 : 1,
                child: Opacity(
                  opacity: topPercent,
                  child: Container(
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
                ),
              ),
            )
          ],
        )),
        Positioned.fill(
            top: null,
            bottom: -140 * (1 - topPercent),
            child: TranslateAnimation(
              child: _LikesContainer(
                event: event,
              ),
            )),
        Align(
          alignment: Alignment.bottomCenter,
          child: Container(
            color: Colors.white,
            height: 10,
          ),
        ),
        Positioned.fill(
            top: null,
            child: TranslateAnimation(
              child: UserInfoContainer(
                event: event,
              ),
            )),
      ],
    );
  }
}

class TranslateAnimation extends StatelessWidget {
  final Widget child;
  const TranslateAnimation({Key? key, required this.child}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 1, end: 0),
      duration: const Duration(milliseconds: 600),
      curve: Curves.easeInOutBack,
      builder: (context, value, child) {
        return Transform.translate(
          offset: Offset(0, 100 * value),
          child: child,
        );
      },
      child: child,
    );
  }
}

class UserInfoContainer extends StatefulWidget {
  final EventEntity event;
  const UserInfoContainer({Key? key, required this.event});

  @override
  State<UserInfoContainer> createState() =>
      _UserInfoContainerState(event: event);
}

class _UserInfoContainerState extends State<UserInfoContainer> {
  bool guardado = false;
  final EventEntity event;
  final EventService _eventService = EventService();
  final Singleton singleton = Singleton();

  @override
  void initState() {
    super.initState();
    guardado = event.isSaved;
  }

  void toggle_guardado() {
    if (event.isSaved) {
      _eventService.unsaveEvent(event.id, singleton.userId.toString());
    } else if (!event.isSaved) {
      _eventService.saveEvent(event.id, singleton.userId.toString());
    }
    setState(() {
      guardado = !guardado;
    });
  }

  _UserInfoContainerState({required this.event});

  @override
  Widget build(BuildContext context) {
    return Container(
        padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        height: 70,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(30)),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            CircleAvatar(
              backgroundImage: NetworkImage(
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWIotHotczo-GHEp_iWoQVBC-MjeWvniZyZmNy7X6Lgw&s'),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 10),
                Text(
                  event.title,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
              ],
            ),
            const Spacer(),
            IconButton(
                onPressed: () {
                  toggle_guardado();
                },
                icon: Icon(
                  guardado ? Icons.turned_in : Icons.turned_in_not,
                  color: Colors.black,
                )),
          ],
        ));
  }
}

class _LikesContainer extends StatelessWidget {
  final EventEntity event;
  const _LikesContainer({Key? key, required this.event}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 140,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      decoration: BoxDecoration(
          color: Colors.pink,
          borderRadius: const BorderRadius.vertical(
            top: Radius.circular(30),
          )),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TextButton(
              onPressed: () {},
              child: TextButton.icon(
                onPressed: () {},
                style: TextButton.styleFrom(
                    primary: Colors.black, shape: const StadiumBorder()),
                icon: Icon(Icons.favorite_border),
                label: Text(event.amountOfLikes.toString()),
              )),
          const Spacer(),
        ],
      ),
    );
  }
}
