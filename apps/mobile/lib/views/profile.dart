import 'package:eventvalle/blocs/auth/auth_bloc.dart';
import 'package:eventvalle/views/home.dart';
import 'package:eventvalle/widgets/BottomNavBar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ProfileView extends StatefulWidget {
  @override
  _ProfileViewState createState() => _ProfileViewState();
}

class _ProfileViewState extends State<ProfileView>
    with TickerProviderStateMixin {
  late AnimationController _slideAnimation;

  @override
  void initState() {
    super.initState();
    _slideAnimation = AnimationController(
      duration: Duration(milliseconds: 300),
      vsync: this,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: Colors.white,
        title: AnimatedContainer(
          curve: Curves.easeInOut,
          duration: Duration(milliseconds: 200),
          child: SlideTransition(
            position: Tween<Offset>(
              begin: Offset(-0.001, 0),
              end: Offset(0, 0),
            ).animate(CurvedAnimation(
              parent: _slideAnimation,
              curve: Curves.easeInOut,
            )),
            child: const Text(
              'Perfil',
              textAlign: TextAlign.start,
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
          ),
        ),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                image: DecorationImage(
                  image: NetworkImage(
                    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                  ),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Column(
                  children: [
                    Text(
                      '350',
                      style: TextStyle(fontSize: 16),
                    ),
                    Text(
                      'Seguidores',
                      style: TextStyle(fontSize: 16),
                    ),
                  ],
                ),
                SizedBox(width: 20),
                Column(
                  children: [
                    Text(
                      '340',
                      style: TextStyle(fontSize: 16),
                    ),
                    Text(
                      'Siguiendo',
                      style: TextStyle(fontSize: 16),
                    ),
                  ],
                ),
              ],
            ),
            SizedBox(height: 20),
            SizedBox(
              height: 20,
            ),
            Text(
              'Sobre mi',
              style: TextStyle(
                fontSize: 18,
              ),
            ),
            Padding(
              padding: EdgeInsets.all(18),
              child: Text(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                textAlign: TextAlign.left,
              ),
            ),
            ElevatedButton.icon(
              onPressed: () {
                // Lógica para editar el perfil
                context.read<AuthBloc>().add(AuthSignOut());
              },
              icon: Icon(
                Icons.logout,
                color: Colors.black,
              ),
              label: Text(
                'Cerrar session',
                style: TextStyle(color: Colors.black),
              ),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                  side: BorderSide(color: Colors.pink),
                ),
                padding: EdgeInsets.all(15),
              ),
            ),

          ],
        ),
      ),
    );
  }
}
