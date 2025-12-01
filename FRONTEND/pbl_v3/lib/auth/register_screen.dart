import 'package:flutter/material.dart';
import '../services/api_service.dart';
import 'login_screen.dart';

class RegisterScreen extends StatefulWidget {
  static const routeName = '/register';
  const RegisterScreen({Key? key}) : super(key: key);

  @override]
  State<RegisterScreen> createState() => _RegisterScreenState();
}


class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameCtrl = TextEditingController();
  final _emailCtrl = TextEditingController();
  final _telCtrl = TextEditingController();
  final _passCtrl = TextEditingController();
  bool _isAdmin = false;
  bool _loading = false;
  final _api = ApiService();

  void _submit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _loading = true);

    final result = await _api.register(
      _nameCtrl.text,
      _emailCtrl.text,
      _telCtrl.text,
      _passCtrl.text,
      _isAdmin,
    );

    setState(() => _loading = false);

    if (result['success']) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Registro bem-sucedido! Faça login.')),
      );

      // ✅ Volta para a tela de login e limpa o histórico
      Navigator.pushNamedAndRemoveUntil(
        context,
        LoginScreen.routeName,
            (route) => false,
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(result['message'])),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Registro')),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              TextFormField(
                controller: _nameCtrl,
                decoration: const InputDecoration(labelText: 'Nome'),
                validator: (v) => v != null && v.isNotEmpty ? null : 'Informe seu nome',
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _emailCtrl,
                decoration: const InputDecoration(labelText: 'Email'),
                validator: (v) => v != null && v.contains('@') ? null : 'Email inválido',
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _telCtrl,
                decoration: const InputDecoration(labelText: 'Telefone'),
                validator: (v) => v != null && v.length >= 9 ? null : 'Informe o telefone',
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _passCtrl,
                decoration: const InputDecoration(labelText: 'Senha'),
                obscureText: true,
                validator: (v) => v != null && v.length >= 6 ? null : 'Mínimo 6 caracteres',
              ),
              const SizedBox(height: 16),
              SwitchListTile(
                title: const Text('Sou Administrador'),
                value: _isAdmin,
                onChanged: (val) => setState(() => _isAdmin = val),
              ),
              const SizedBox(height: 24),
              _loading
                  ? const Center(child: CircularProgressIndicator())
                  : ElevatedButton(onPressed: _submit, child: const Text('Registrar')),
              const SizedBox(height: 8),
              TextButton(
                onPressed: () =>
                    Navigator.pushReplacementNamed(context, LoginScreen.routeName),
                child: const Text('Já tem conta? Entre'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}