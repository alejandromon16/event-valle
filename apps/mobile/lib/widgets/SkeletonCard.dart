import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

class EventCardSkeleton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 400,
      height: 200,
      margin: EdgeInsets.all(16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        color: Colors.grey[300],
      ),
      child: Shimmer.fromColors(
        baseColor: Colors.grey[300]!,
        highlightColor: Colors.grey[100]!,
        child: Container(
          height: 220, // <-- Set the height of the Column widget
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 50,
                height: 50,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: Colors.white,
                ),
              ),
              SizedBox(height: 10),
              Container(
                width: double.infinity,
                height: 10,
                color: Colors.white,
              ),
              SizedBox(height: 8),
              Container(
                width: double.infinity,
                height: 10,
                color: Colors.white,
              ),
              SizedBox(height: 16),
              Container(
                width: 150,
                height: 20,
                color: Colors.white,
              ),
              SizedBox(height: 8),
              Container(
                width: 200,
                height: 20,
                color: Colors.white,
              ),
              SizedBox(height: 16),
              Container(
                width: 250,
                height: 20,
                color: Colors.white,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
