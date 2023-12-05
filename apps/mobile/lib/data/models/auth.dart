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

class CreateUserInput {
  final String email;
  final String last_name;
  final String name;
  final String password;
  final String? phone_number;
  final String user_name;

  CreateUserInput({
    required this.email,
    required this.last_name,
    required this.name,
    required this.password,
    this.phone_number,
    required this.user_name,
  });

  Map<String, dynamic> toJson() {
    return {
      "email": this.email,
      "last_name": this.last_name,
      "name": this.name,
      "password": this.password,
      "phone_number": this.phone_number,
      "user_name": this.user_name,
    };
  }

  String toJsonString() {
    return json.encode(toJson());
  }
}

class UpdateUserInput {
  final String id;
  final String? name;
  final String? last_name;
  final String? user_name;
  final String? phone_number;

  UpdateUserInput({
    required this.id,
    this.name,
    this.last_name,
    this.user_name,
    this.phone_number,
  });

  Map<String, dynamic> toJson() {
    return {
      "id": this.id,
      "name": this.name,
      "last_name": this.last_name,
      "user_name": this.user_name,
      "phone_number": this.phone_number,
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
