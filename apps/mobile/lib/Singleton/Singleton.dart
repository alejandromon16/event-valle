import 'package:eventvalle/data/models/user.dart';

class Singleton {
  static Singleton? _instance;
  String? _userId;
  UserEntity? _userEntity;

  factory Singleton() {
    if (_instance == null) {
      _instance = Singleton._();
    }
    return _instance!;
  }

  Singleton._();

  String? get userId => _userId;
  UserEntity? get userEntity => _userEntity;

  void setUserId(String userId) {
    _userId = userId;
  }

  void setUserEntity(UserEntity userEntity) {
    _userEntity = userEntity;
  }

  void logout() {
    _userId = null;
    _userEntity = null;
    // Puedes realizar otras acciones de cierre de sesión aquí
  }
}
