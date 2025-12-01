import 'package:flutter/material.dart';
import '../widgets/tutorial_screen.dart';
import 'tutorial2.dart';

class Tutorial1 extends StatelessWidget {
  static const routeName = '/tutorial1';
  const Tutorial1({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TutorialScreen(
      imagePath: 'assets/adicionarEventos.png',
      title: 'Adicione Eventos',
      subtitle: 'Crie os seus próprios eventos dentro da nossa app',
      currentStep: 0,
      onTap: () => Navigator.pushReplacementNamed(context, Tutorial2.routeName),
    );
  }
}
