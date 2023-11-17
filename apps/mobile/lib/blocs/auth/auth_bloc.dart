import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:eventvalle/data/models/user.dart';
import 'package:eventvalle/services/auth_service.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final AuthService _authService = AuthService();

  AuthBloc() : super(AuthInitial()) {
    on<AuthCheckRequested>(onAuthCheckRequested);
    on<AuthSignInWithEmailPassword>(onSignInWithEmailPassword);
    on<AuthSignOut>(onSignOut);
  }

  void onAuthCheckRequested(AuthCheckRequested event, Emitter<AuthState> emit) async {
    // try {
    //   final isAuthenticated = true;
    //   if (isAuthenticated) {
    //     emit(AuthAuthenticated(user: /* Your user data from AuthService */));
    //   } else {
    //     emit(AuthUnauthenticated());
    //   }
    // } catch (e) {
    //   emit(AuthError(message: e.toString()));
    // }
  }

  void onSignInWithEmailPassword(
      AuthSignInWithEmailPassword event, Emitter<AuthState> emit) async {
    try {

      print(event.email);
      UserEntity? user = await _authService.signInWithEmailPassword(event.email, event.password);

      if (user != null) {
        print('succes login suc ${user.name}');
        emit(AuthAuthenticated());
      } else {
        print('error');
        emit(AuthUnauthenticated());
        emit(AuthInvalidCredentials());
      }
    } catch (e) {
      emit(AuthError(message: e.toString()));
    }
  }

  void onSignOut(AuthSignOut event, Emitter<AuthState> emit) async {
    emit(AuthUnauthenticated());
  }
}
