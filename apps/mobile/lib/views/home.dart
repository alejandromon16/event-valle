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

  @override
  void initState() {
    super.initState();
    _searchController = TextEditingController();
    _slideAnimation = AnimationController(
      duration: Duration(milliseconds: 300),
      vsync: this,
    );
  }

  @override
  void dispose() {
    super.dispose();
    _slideAnimation.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: AnimatedContainer(
          curve: Curves.easeInOut,
          duration: Duration(milliseconds: 200),
          child: SlideTransition(
            position: Tween<Offset>(
              begin: Offset(1, 0),
              end: Offset(0, 0),
            ).animate(CurvedAnimation(
              parent: _slideAnimation,
              curve: Curves.easeInOut,
            )),
            child: _isSearching
                ? TextField(
                    controller: _searchController,
                    decoration: InputDecoration(
                      hintText: 'Search events...',
                      hintStyle: TextStyle(color: Colors.black),
                    ),
                    onChanged: (query) {
                      // Handle search functionality based on the query
                      // You may want to update the FutureBuilder with the filtered results
                    },
                  )
                : const Text(
                    'Eventos',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
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
                }
              });
            },
          ),
        ],
        backgroundColor: Colors.white,
      ),
      body: FutureBuilder<List<EventEntity>>(
        future: _eventService.getListOfEventsForThisWeek(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            //skeleton aqui
            return CircularProgressIndicator();
          } else if (snapshot.hasError) {
            return Text('Error: ${snapshot.error}');
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Text('No events available for this week.');
          } else {
            List<EventEntity> events = snapshot.data!;
            return ListView.builder(
              physics: const BouncingScrollPhysics(),
              padding: EdgeInsets.symmetric(horizontal: 20),
              itemCount: events.length,
              itemExtent: 350,
              itemBuilder: (context, index) {
                final EventEntity event = events[index];
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
              },
            );
          }
        },
      ),

      //Navbarrrrr Rodri
      bottomNavigationBar: Container(
        height: kToolbarHeight,
        color: Colors.pink,
      ),
    );
  }
}

