import 'package:eventvalle/Singleton/Singleton.dart';
import 'package:eventvalle/widgets/SkeletonCard.dart';
import 'package:flutter/material.dart';
import 'package:eventvalle/data/models/event.dart';
import 'package:eventvalle/services/event_service.dart';
import 'package:eventvalle/views/event_details.dart';
import 'package:eventvalle/widgets/EventCard.dart';

class SavedEventsView extends StatefulWidget {
  const SavedEventsView({Key? key}) : super(key: key);

  @override
  _SavedEventsViewState createState() => _SavedEventsViewState();
}

class _SavedEventsViewState extends State<SavedEventsView>
    with TickerProviderStateMixin {
  final EventService _eventService = EventService();
  bool _isSearching = false;
  late TextEditingController _searchController;
  late AnimationController _slideAnimation;
  List<EventEntity> _filteredEvents = [];
  List<EventEntity> _events = [];
  final singleton = Singleton();

  _SavedEventsViewState();

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
                    })
                : Container(
                    child: const Text(
                      'Favoritos',
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
            ? Future.delayed(
                Duration(seconds: 1),
                () => _eventService
                    .getListOfSavedEvents(singleton.userId.toString()))
            : Future.delayed(
                Duration(milliseconds: 200),
                () => _eventService
                    .getListOfSavedEvents(singleton.userId.toString())),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            //skeleton aqui
            return SingleChildScrollView(
              child: Column(
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
              ),
            );
          } else if (snapshot.hasError) {
            return Text('Error: ${snapshot.error}');
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Container(
              alignment: Alignment.center,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Image.network(
                    'https://static.vecteezy.com/system/resources/previews/012/181/008/original/document-data-file-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg',
                    width: 300,
                    height: 300,
                  ),
                  SizedBox(height: 10), // Espacio entre la imagen y el texto
                  Padding(
                      padding: EdgeInsets.only(left: 15, right: 15),
                      child: Text(
                        'Actualmente, no tienes ningún evento marcado como favorito.',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w500,
                          color: Colors.grey,
                        ),
                        textAlign: TextAlign.center,
                      )),
                ],
              ),
            );
          } else {
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
                    padding:
                        EdgeInsets.symmetric(horizontal: 8.0, vertical: 10),
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
                });
          }
        },
      ),
    );
  }
}
