import 'package:eventvalle/views/profile.dart';
import 'package:eventvalle/widgets/BottomNavBar.dart';
import 'package:eventvalle/widgets/SkeletonCard.dart';
import 'package:flutter/material.dart';
import 'package:eventvalle/data/models/event.dart';
import 'package:eventvalle/services/event_service.dart';
import 'package:eventvalle/views/event_details.dart';
import 'package:eventvalle/widgets/EventCard.dart';

class HomeView extends StatefulWidget {
  const HomeView({Key? key}) : super(key: key);

  @override
  _HomeViewState createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> with TickerProviderStateMixin {
  final EventService _eventService = EventService();
  bool _isSearching = false;
  late TextEditingController _searchController;
  late AnimationController _slideAnimation;
  List<EventEntity> _filteredEvents = [];
  List<EventEntity> _events = [];

  @override
  void initState() {
    super.initState();
    _searchController = TextEditingController();
    _slideAnimation = AnimationController(
      duration: Duration(milliseconds: 500),
      vsync: this,
    );
  }

  @override
  void dispose() {
    super.dispose();
    _slideAnimation.dispose();
  }

  List<EventEntity> _filterEventsBySearchTerm(String query) {
    query = query.toLowerCase();
    return _events.where((event) {
      return event.title.toLowerCase().contains(query);
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: AnimatedContainer(
          curve: Curves.easeInOut,
          duration: Duration(milliseconds: 700),
          child: SlideTransition(
            position: Tween<Offset>(
              begin: Offset(-0.0001, 0),
              end: Offset(0, 0),
            ).animate(CurvedAnimation(
              parent: _slideAnimation,
              curve: Curves.easeInOut,
            )),
            child: _isSearching
                ? TextField(
                    textAlign: TextAlign.start,
                    controller: _searchController,
                    decoration: InputDecoration(
                      hintText: 'Search events...',
                      hintStyle: TextStyle(color: Colors.black),
                    ),
                    onChanged: (query) {
                      setState(() {
                        _filteredEvents = _filterEventsBySearchTerm(query);
                      });
                    }

                  )
                : Container(
                  child: const Text(
                    'Eventos',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                    ),
                  ),
                ),
          ),
        ),
        actions: [
          IconButton(
            icon: Icon(
              _isSearching ? Icons.cancel : Icons.search,
              color: Colors.black,
            ),
            onPressed: () {
              setState(() {
                _isSearching = !_isSearching;
                if (_isSearching) {
                  _slideAnimation.forward();
                } else {
                  _slideAnimation.reverse();
                  _filteredEvents = List.from(_events);
                }
              });
            },
          ),
        ],
        backgroundColor: Colors.white,
      ),
      body: FutureBuilder<List<EventEntity>>(
        future: !_isSearching
        ? Future.delayed(Duration(seconds: 1), () => _eventService.getListOfEventsForThisWeek())
        : Future.delayed(Duration(milliseconds: 200), () => _eventService.getListOfEventsForThisWeek()),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            //skeleton aqui
            return Column(
              children: [
                SizedBox(
                  height: 300,
                  child: EventCardSkeleton(),
                ),
                SizedBox(height: 16),
                SizedBox(
                  height: 300,
                  child: EventCardSkeleton(),
                ),
              ],
            );
          } else if (snapshot.hasError) {
            return Text('Error: ${snapshot.error}');
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Text('No events available for this week.');
          } else {
            // Update the _events variable
            _events = snapshot.data!;

            List<EventEntity> displayEvents =
                _filteredEvents.isEmpty ? _events : _filteredEvents;

            return ListView.builder(
              physics: const BouncingScrollPhysics(),
              padding: EdgeInsets.symmetric(horizontal: 20),
              itemCount: displayEvents.length,
              itemExtent: 350,
              itemBuilder: (context, index) {
                final EventEntity event = displayEvents[index];
                return Padding(
                  padding: EdgeInsets.symmetric(horizontal: 8.0, vertical: 10),
                  child: EventCard(
                    event: event,
                    onPressed: () {
                      Navigator.push(
                        context,
                        PageRouteBuilder(
                          pageBuilder: (_, animation, __) => FadeTransition(
                            opacity: animation,
                            child: EventDetailsView(
                              event: event,
                              screenHeight:
                                  MediaQuery.of(context).size.height,
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                );
              }
            );
          }
        },
      ),
    );
  }
}

