import 'package:flutter/material.dart';
import '../widgets/tutorial_screen.dart';
import 'tutorial3.dart';

class Tutorial2 extends StatelessWidget {
  static const routeName = '/tutorial2';
  const Tutorial2({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TutorialScreen(
      imagePath: 'assets/participarEventos.png',
      title: 'Participe em Eventos',
      subtitle: 'Inscreva-se e participe em eventos de acordo com seu interesse',
      currentStep: 1,
      onTap: () => Navigator.pushReplacementNamed(context, Tutorial3.routeName),
    );
  }
}
