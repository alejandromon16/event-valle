import 'package:flutter/material.dart';

class ImageEventView extends StatelessWidget {
  final List<String> images;
  ImageEventView({
    Key? key,
    required this.images
  });

  @override
  Widget build(BuildContext context) {
   return Column(
      children: [
        Expanded(
          child: PageView.builder(
            physics: const BouncingScrollPhysics(),
            controller: PageController(viewportFraction: .9),
            itemCount: images.length,
            itemBuilder: (context, index){
              final image = images[index];
              return Container(
                margin: const EdgeInsets.only(right: 10),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: const [
                    BoxShadow(
                      color: Colors.black26,
                      blurRadius: 10,
                    )
                  ],
                  image: DecorationImage(
                    image: NetworkImage(image),
                    fit: BoxFit.cover,
                    colorFilter: const ColorFilter.mode(
                      Colors.black26,
                        BlendMode.darken
                    )
                  )
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 10),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: List.generate(
            images.length,
            (index) => Container(
              color: Colors.black,
              margin: const EdgeInsets.symmetric(horizontal: 3),
              height: 3,
              width: 10,
            )),
        )
      ],
    );
  }
}



