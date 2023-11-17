import 'dart:convert';

class LoginInput {
  final String email;
  final String password;

  LoginInput({
    required this.email,
    required this.password,
  });

  Map<String, dynamic> toJson() {
    return {
      "email": this.email,
      "password": this.password,
    };
  }

  String toJsonString() {
    return json.encode(toJson());
  }
}

class LogoutEntity {
  final String status;

  LogoutEntity({
    required this.status,
  });

  factory LogoutEntity.fromJson(Map<String, dynamic> json) {
    return LogoutEntity(
      status: json['status'],
    );
  }
}
