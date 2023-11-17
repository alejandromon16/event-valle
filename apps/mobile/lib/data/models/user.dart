
class UserEntity {
  String? createdAt;
  String email;
  String id;
  String last_name;
  String name;
  String? password;
  String? phone_number;
  String? updatedAt;
  String user_name;

  UserEntity({
    this.createdAt,
    required this.email,
    required this.id,
    required this.last_name,
    required this.name,
    this.password,
    this.phone_number,
    this.updatedAt,
    required this.user_name,
  });

  factory UserEntity.fromJson(Map<String, dynamic> json) {
    return UserEntity(
      createdAt: json['createdAt'],
      email: json['email'],
      id: json['id'],
      last_name: json['last_name'],
      name: json['name'],
      password: json['password'],
      phone_number: json['phone_number'],
      updatedAt: json['updatedAt'],
      user_name: json['user_name'],
    );
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = {
      'email': email,
      'id': id,
      'last_name': last_name,
      'name': name,
      'user_name': user_name,
    };
    if (createdAt != null) data['createdAt'] = createdAt;
    if (password != null) data['password'] = password;
    if (phone_number != null) data['phone_number'] = phone_number;
    if (updatedAt != null) data['updatedAt'] = updatedAt;
    return data;
  }
}
