import 'request_event.dart';
enum EventStatus {
  DRAFT,
  PUBLISH,
}

class EventEntity {
  String address;
  String createdAt;
  String description;
  DateTime? endDate;
  String id;
  List<String> images;
  double? latitud;
  String? locationDetail;
  String locationName;
  double? longitud;
  String principalImage;
  DateTime startDate;
  EventStatus status;
  String subtitle;
  List<String> tags;
  String title;
  String updatedAt;
  bool isLiked;
  bool isSaved;
  int? amountOfLikes;
  RequestEvent? requestEvent;

  EventEntity({
    required this.address,
    required this.createdAt,
    required this.description,
    this.endDate,
    required this.id,
    required this.images,
    this.latitud,
    this.locationDetail,
    required this.locationName,
    this.longitud,
    required this.principalImage,
    required this.startDate,
    required this.status,
    required this.subtitle,
    required this.tags,
    required this.title,
    required this.updatedAt,
    required this.isLiked,
    required this.isSaved,
    required this.amountOfLikes,
    required this.requestEvent,
  });

  factory EventEntity.fromJson(Map<String, dynamic> json) {
    return EventEntity(
      address: json['address'],
      createdAt: json['createdAt'],
      description: json['description'],
      endDate: json['endDate'] != null ? DateTime.parse(json['endDate']) : null,
      id: json['id'],
      images: List<String>.from(json['images']),
      latitud: json['latitud'],
      locationDetail: json['locationDetail'],
      locationName: json['locationName'],
      longitud: json['longitud'],
      principalImage: json['principalImage'],
      startDate: DateTime.parse(json['startDate']),
      status: _parseEventStatus(json['status']),
      subtitle: json['subtitle'],
      tags: List<String>.from(json['tags']),
      title: json['title'],
      updatedAt: json['updatedAt'],
      isLiked: json['isLiked'] ?? false,
      isSaved: json['isSaved'] ?? false,
      amountOfLikes: json['amountOfLikes'],
      requestEvent: json['requestEvent'] != null
          ? RequestEvent.fromJson(json['requestEvent'])
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = {
      'address': address,
      'createdAt': createdAt,
      'description': description,
      'id': id,
      'images': images,
      'locationName': locationName,
      'principalImage': principalImage,
      'startDate': startDate.toIso8601String(),
      'status': _eventStatusToString(status),
      'subtitle': subtitle,
      'tags': tags,
      'title': title,
      'updatedAt': updatedAt,
      'isLiked': isLiked,
      'isSaved': isSaved,
      'amountOfLikes' : amountOfLikes,
      'requestEvent': requestEvent,
    };
    if (endDate != null) data['endDate'] = endDate!.toIso8601String();
    if (latitud != null) data['latitud'] = latitud;
    if (locationDetail != null) data['locationDetail'] = locationDetail;
    if (longitud != null) data['longitud'] = longitud;
    return data;
  }

  static EventStatus _parseEventStatus(String status) {
    switch (status) {
      case 'DRAFT':
        return EventStatus.DRAFT;
      case 'PUBLISH':
        return EventStatus.PUBLISH;
      default:
        throw ArgumentError('Invalid status: $status');
    }
  }

  static String _eventStatusToString(EventStatus status) {
    return status.toString().split('.').last;
  }
}
