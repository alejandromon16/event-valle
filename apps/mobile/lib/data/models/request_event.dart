class RequestEvent {
  String requestedByName;
  String requestedByLastName;

  RequestEvent({
    required this.requestedByName,
    required this.requestedByLastName,
  });

  factory RequestEvent.fromJson(Map<String, dynamic> json) {
    return RequestEvent(
      requestedByName: json['requestedBy']['name'],
      requestedByLastName: json['requestedBy']['last_name'],
    );
  }
}
