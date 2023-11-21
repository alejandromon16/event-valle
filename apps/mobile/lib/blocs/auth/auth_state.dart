part of 'auth_bloc.dart';

abstract class AuthState extends Equatable {
  const AuthState();
}

class AuthInitial extends AuthState {
  @override
  List<Object> get props => [];
}

class AuthAuthenticated extends AuthState {
  final String userId ;
  const AuthAuthenticated({required this.userId});

  @override
  List<Object> get props => [userId];
}

class AuthUnauthenticated extends AuthState {
  @override
  List<Object> get props => [];
}

class AuthError extends AuthState {
  final String message;

  const AuthError({required this.message});

  @override
  List<Object> get props => [message];
}

class AuthInvalidCredentials extends AuthState {
  @override
  List<Object> get props => [];
}
