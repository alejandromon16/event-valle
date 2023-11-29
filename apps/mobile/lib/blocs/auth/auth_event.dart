part of 'auth_bloc.dart';

abstract class AuthEvent extends Equatable {
  const AuthEvent();
}

class AuthCheckRequested extends AuthEvent {
  @override
  List<Object> get props => [];
}

class AuthSignInWithEmailPassword extends AuthEvent {
  final String email;
  final String password;


  const AuthSignInWithEmailPassword({
    required this.email,
    required this.password,
  });

  @override
  List<Object> get props => [email, password];
}

class AuthRegisterUser extends AuthEvent {
  final String email;
  final String lastName;
  final String name;
  final String password;
  final String? phoneNumber;
  final String userName;

  const AuthRegisterUser({
    required this.email,
    required this.lastName,
    required this.name,
    required this.password,
    this.phoneNumber,
    required this.userName,
  });

  @override
  List<Object> get props => [email, lastName, name, password, phoneNumber ?? ' ', userName];
}

class AuthSignOut extends AuthEvent {
  @override
  List<Object> get props => [];
}

class ChangeAuthState extends AuthEvent {
  final AuthState newState;

  const ChangeAuthState(this.newState);

  @override
  List<Object> get props => [newState];
}

