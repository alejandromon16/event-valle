import 'package:eventvalle/blocs/auth/auth_bloc.dart';
import 'package:eventvalle/views/app.dart';
import 'package:eventvalle/views/home.dart';
import 'package:eventvalle/views/login.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';


void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: BlocProvider(
        create: (context) => AuthBloc(),
        child: const AppRouter(),
      ),
    );
  }
}

class AppRouter extends StatelessWidget {
  const AppRouter({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<AuthBloc, AuthState>(
      builder: (context, state) {
        if (state is AuthUnauthenticated) {
          return SignInView();
        } else if (state is AuthAuthenticated) {
          // You can navigate to the main app screen or other authenticated screens here.
          return AppView();
        } else {
          return SignInView(); // Or any other initial screen.
        }
      }
    );

    // return AppView();
  }
}

