import 'package:eventvalle/views/home.dart';
import 'package:eventvalle/views/profile.dart';
import 'package:eventvalle/widgets/BottomNavBar.dart';
import 'package:flutter/material.dart';


class AppView extends StatefulWidget {
  const AppView({Key? key}) : super(key: key);

  @override
  _AppViewState createState() => _AppViewState();
}

class _AppViewState extends State<AppView> {

int _currentIndex = 0;
final List<Widget> _screens = [
    HomeView(),
    HomeView(),
    ProfileView(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_currentIndex],
      bottomNavigationBar: CustomBottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
            switch (_currentIndex) {
              case 0:
                print('Elemento seleccionado: Inicio');
                // Aquí puedes realizar acciones específicas para "Inicio"
                break;
              case 1:
                print('Elemento seleccionado: Favoritos');
                // Aquí puedes realizar acciones específicas para "Favoritos"
                break;
              case 2:
                print('Elemento seleccionado: Perfil');
                // Aquí puedes realizar acciones específicas para "Perfil"
                break;
            }
          });
        },
      )
    );
  }
}

