import 'package:eventvalle/blocs/auth/auth_bloc.dart';
import 'package:eventvalle/views/app.dart';
import 'package:eventvalle/views/login.dart';
import 'package:eventvalle/views/register.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:intl/date_symbol_data_local.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initializeDateFormatting('es_ES', '');
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
    return BlocBuilder<AuthBloc, AuthState>(builder: (context, state) {
      if (state is AuthUnauthenticated) {
        return SignInView();
      } else if (state is AuthAuthenticated ||
          state is AuthRegisterUserSuccess) {
        return AppView();
      } else if (state is AuthRegisterNewUser) {
        return RegisterView();
      } else {
        return SignInView();
      }
    });

    // return AppView();
  }
}
