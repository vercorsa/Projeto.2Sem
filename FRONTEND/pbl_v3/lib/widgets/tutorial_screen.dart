import 'package:flutter/material.dart';

class TutorialScreen extends StatelessWidget {
  final String imagePath;
  final String title;
  final String subtitle;
  final int currentStep;
  final VoidCallback onTap;

  const TutorialScreen({
    required this.imagePath,
    required this.title,
    required this.subtitle,
    required this.currentStep,
    required this.onTap,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Scaffold(
        body: SafeArea(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(imagePath, width: 150, height: 150),
              const SizedBox(height: 24),
              Text(
                title,
                style:
                const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 32),
                child: Text(
                  subtitle,
                  textAlign: TextAlign.center,
                  style: const TextStyle(fontSize: 16),
                ),
              ),
              const SizedBox(height: 40),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(3, (index) {
                  return Container(
                    margin: const EdgeInsets.symmetric(horizontal: 4),
                    width: 12,
                    height: 12,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: currentStep == index
                          ? Colors.blue
                          : Colors.blue.withOpacity(0.3),
                    ),
                  );
                }),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
