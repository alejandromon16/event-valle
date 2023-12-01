import 'package:eventvalle/data/models/event.dart';
import 'package:eventvalle/widgets/AnimatedDetailHeader.dart';
import 'package:flutter/material.dart';
import 'dart:ui';

class EventDetailsView extends StatefulWidget {
  final EventEntity event;
  final double screenHeight;

  const EventDetailsView(
      {Key? key, required this.event, required this.screenHeight});

  @override
  State<EventDetailsView> createState() => _EventDetailsViewState(event: event);
}

class _EventDetailsViewState extends State<EventDetailsView> {
  late ScrollController _controller;
  bool favorite = false;
  bool asistire = false;
  final EventEntity event;

  _EventDetailsViewState({required this.event});

  @override
  void initState() {
    _controller =
        ScrollController(initialScrollOffset: widget.screenHeight * .3);
    super.initState();
  }

  void toggle_favorite() {
    setState(() {
      favorite = !favorite;
    });
  }

  void toggle_asistire() {
    setState(() {
      asistire = !asistire;
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Stack(
      children: [
        CustomScrollView(
          controller: _controller,
          physics: const BouncingScrollPhysics(),
          slivers: [
            SliverPersistentHeader(
                delegate: BuilderPersistentDelegate(
                    maxExtent: MediaQuery.of(context).size.height,
                    minExtent: 200,
                    builder: (percent) {
                      return AnimatedDetailHeader(
                        event: widget.event,
                        topPercent: ((1 - percent) / .7).clamp(0.0, 1.0),
                        bottomPercent: (percent / .3).clamp(0.0, 1.0),
                      );
                    })),
            SliverToBoxAdapter(
              child: EventTopInfo(event: widget.event),
            ),
            SliverToBoxAdapter(
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 20, vertical: 30),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Padding(
                          padding:
                              EdgeInsets.symmetric(horizontal: 8, vertical: 10),
                          child: Text(
                            'Tags',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        )
                      ],
                    ),
                    Wrap(
                      spacing: 10,
                      runSpacing: 10,
                      children: [
                        Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: 20, vertical: 10),
                          decoration: BoxDecoration(
                              color: Colors.black12,
                              borderRadius: BorderRadius.circular(30)),
                          child: Text('Tecnologia'),
                        ),
                        Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: 20, vertical: 10),
                          decoration: BoxDecoration(
                              color: Colors.black12,
                              borderRadius: BorderRadius.circular(30)),
                          child: Text('Tecnologia'),
                        ),
                        Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: 20, vertical: 10),
                          decoration: BoxDecoration(
                              color: Colors.black12,
                              borderRadius: BorderRadius.circular(30)),
                          child: Text('Tecnologia'),
                        ),
                        Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: 20, vertical: 10),
                          decoration: BoxDecoration(
                              color: Colors.black12,
                              borderRadius: BorderRadius.circular(30)),
                          child: Text('Tecnologia'),
                        ),
                        Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: 20, vertical: 10),
                          decoration: BoxDecoration(
                              color: Colors.black12,
                              borderRadius: BorderRadius.circular(30)),
                          child: Text('Tecnologia'),
                        ),
                      ],
                    )
                  ],
                ),
              ),
            ),
            SliverToBoxAdapter(
              child: SizedBox(height: 150),
            )
          ],
        ),
        Positioned.fill(
          top: null,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            decoration: BoxDecoration(
                gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                  Colors.white.withOpacity(0),
                  Colors.white,
                ])),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Container(
                    margin: EdgeInsets.only(bottom: 10),
                    padding: EdgeInsets.symmetric(horizontal: 10, vertical: 2),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(
                          color: asistire ? Colors.white : Colors.pink),
                      color: asistire ? Colors.pink : Colors.white,
                    ),
                    child: InkWell(
                      onTap: () {
                        toggle_asistire();
                      },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          IconButton(
                            icon: Icon(Icons.handshake,
                                color: asistire ? Colors.white : Colors.pink),
                            onPressed: () {
                              toggle_asistire();
                            },
                          ),
                          Text(
                            'Asistire',
                            style: TextStyle(
                                color: asistire ? Colors.white : Colors.pink),
                          ),
                          SizedBox(width: 5)
                        ],
                      ),
                    )),
                Container(
                    margin: EdgeInsets.only(bottom: 10),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.all(Radius.circular(50)),
                      border: Border.all(
                          color: favorite ? Colors.white : Colors.pink),
                      color: favorite ? Colors.pink : Colors.white,
                    ),
                    child: IconButton(
                      onPressed: () {
                        toggle_favorite();
                      },
                      style: TextButton.styleFrom(
                        primary: Colors.pink,
                        shape: const StadiumBorder(),
                      ),
                      icon: Icon(
                        favorite ? Icons.favorite : Icons.favorite_border,
                        color: favorite ? Colors.white : Colors.pink,
                      ),
                    )),
              ],
            ),
          ),
        )
      ],
    ));
  }
}

class EventTopInfo extends StatelessWidget {
  final EventEntity event;
  const EventTopInfo({Key? key, required this.event});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      child: Column(
        children: [
          Row(
            children: [
              Container(
                padding: EdgeInsets.all(10),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: Colors.pink.shade50,
                ),
                child: const Icon(Icons.location_on, color: Colors.pink),
              ),
              SizedBox(width: 20),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    event.locationName,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 3),
                  Text(
                    event.address,
                    style: TextStyle(
                        fontWeight: FontWeight.w400, color: Colors.black45),
                  ),
                ],
              )
            ],
          ),
          SizedBox(height: 10),
          Row(
            children: [
              Container(
                padding: EdgeInsets.all(10),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: Colors.pink.shade50,
                ),
                child: const Icon(Icons.calendar_month, color: Colors.pink),
              ),
              SizedBox(width: 20),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    event.startDate.toIso8601String(),
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 3),
                  Text(
                    event.endDate.toString(),
                    style: TextStyle(
                        fontWeight: FontWeight.w400, color: Colors.black45),
                  ),
                ],
              )
            ],
          ),
          SizedBox(height: 30),
          Text(
            event.subtitle,
          ),
          SizedBox(height: 10),
          Text(
            event.description,
          ),
        ],
      ),
    );
  }
}

class BuilderPersistentDelegate extends SliverPersistentHeaderDelegate {
  final double _maxExtend;
  final double _minExtend;
  final Widget Function(double percent) builder;

  BuilderPersistentDelegate({
    required double maxExtent,
    required double minExtent,
    required this.builder,
  })  : _maxExtend = maxExtent,
        _minExtend = minExtent;

  @override
  Widget build(
      BuildContext context, double shrinkOffset, bool overlapsContent) {
    return builder(shrinkOffset / _maxExtend);
  }

  @override
  double get maxExtent => _maxExtend;

  @override
  double get minExtent => _minExtend;

  @override
  bool shouldRebuild(covariant SliverPersistentHeaderDelegate oldDelegate) {
    return false;
  }
}
