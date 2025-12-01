import 'package:flutter/material.dart';

// Splash e tutoriais
import 'splashScreen/splash_screen.dart';
import 'splashScreen/tutorial1.dart';
import 'splashScreen/tutorial2.dart';
import 'splashScreen/tutorial3.dart';

// Telas de autenticação
import 'auth/login_screen.dart';
import 'auth/register_screen.dart';

// Tela inicial após login
import 'home/home_screen.dart';

void main() => runApp(const CampusEventsApp());

class CampusEventsApp extends StatelessWidget {
  const CampusEventsApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Campus Events',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: SplashScreen.routeName,
      routes: {
        SplashScreen.routeName: (context) => const SplashScreen(),
        Tutorial1.routeName: (context) => const Tutorial1(),
        Tutorial2.routeName: (context) => const Tutorial2(),
        Tutorial3.routeName: (context) => const Tutorial3(),
        LoginScreen.routeName: (context) => const LoginScreen(),
        RegisterScreen.routeName: (context) => const RegisterScreen(),
        HomeScreen.routeName: (context) => const HomeScreen(),
      },
      onUnknownRoute: (settings) => MaterialPageRoute(
        builder: (_) => const Scaffold(
          body: Center(child: Text('Página não encontrada')),
        ),
      ),
    );
  }
}