import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:eventvalle/data/models/user.dart';
import 'package:eventvalle/services/auth_service.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final AuthService _authService = AuthService();
  late String _requesterId;

  AuthBloc() : super(AuthInitial()) {
    on<AuthCheckRequested>(onAuthCheckRequested);
    on<AuthSignInWithEmailPassword>(onSignInWithEmailPassword);
    on<AuthSignOut>(onSignOut);
    on<AuthRegisterUser>(onRegisterUser);
    on<ChangeAuthState>(onChangeAuthState);
  }

  void onAuthCheckRequested(
      AuthCheckRequested event, Emitter<AuthState> emit) async {
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
    UserEntity? user = await _authService.signInWithEmailPassword(
        event.email, event.password);

    if (user != null) {
      print('succes login suc ${user.name}');
      _requesterId = user.id;
      emit(AuthAuthenticated(userId: user.id));
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

  void onRegisterUser(AuthRegisterUser event, Emitter<AuthState> emit) async {
    try {
      UserEntity? user = await _authService.registerUser(
        event.email,
        event.lastName,
        event.name,
        event.password,
        phoneNumber: event.phoneNumber,
        userName: event.userName,
      );

      if (user != null) {
        emit(AuthRegisterUserSuccess(user));
        emit(AuthAuthenticated(userId: user.id));
      } else {
        emit(AuthRegisterUserFailure('Error registering user'));
      }
    } catch (e) {
      emit(AuthError(message: e.toString()));
    }
  }

  void onChangeAuthState(ChangeAuthState event, Emitter<AuthState> emit) {
    emit(event.newState);
  }
}
