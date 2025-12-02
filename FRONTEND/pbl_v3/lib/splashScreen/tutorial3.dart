import 'package:flutter/material.dart';
import '../widgets/tutorial_screen.dart';
import '../auth/login_screen.dart';

class Tutorial3 extends StatelessWidget {
  static const routeName = '/tutorial3';
  const Tutorial3({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TutorialScreen(
      imagePath: 'assets/images/horarios.png',
      title: 'Horários',
      subtitle: 'Consulte os horários dos eventos em tempo real',
      currentStep: 2,
      onTap: () => Navigator.pushReplacementNamed(context, LoginScreen.routeName),
    );
  }
}
