import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  final String baseUrl = 'http://10.0.2.2:3000/api'; // use 10.0.2.2 no Android emulator

  // LOGIN
  Future<Map<String, dynamic>> login(String email, String senha) async {
    final response = await http.post(
      Uri.parse('$baseUrl/login'), // Corrigido: rota correta é /login, não /utilizadores/login
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'Email': email,
        'PalavraPasse': senha,
      }),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return {'success': true, 'user': data};
    } else {
      final error = jsonDecode(response.body);
      final message = error['error'] ?? 'Erro no login';
      return {'success': false, 'message': message};
    }
  }

  // REGISTRO
  Future<Map<String, dynamic>> register(String nome, String email, String telefone, String senha, bool isAdmin) async {
    final response = await http.post(
      Uri.parse('$baseUrl/utilizadores'), // Rota correta para criação de usuário
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'Nome': nome,
        'Email': email,
        'Telefone': telefone,
        'PalavraPasse': senha,
        'TipoUtilizador': isAdmin ? 1 : 0,
      }),
    );

    if (response.statusCode == 201) {
      return {'success': true};
    } else {
      final error = jsonDecode(response.body);
      final message = error['error'] ?? 'Erro no registro';
      return {'success': false, 'message': message};
    }
  }

  // LISTAR EVENTOS
  Future<List<dynamic>> getEventos() async {
    final response = await http.get(Uri.parse('$baseUrl/eventos'));

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      return [];
    }
  }

  // CRIAR EVENTO
  Future<Map<String, dynamic>> createEvento(Map<String, dynamic> evento) async {
    final response = await http.post(
      Uri.parse('$baseUrl/eventos'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(evento),
    );

    if (response.statusCode == 201) {
      return {'success': true};
    } else {
      final message = jsonDecode(response.body)['message'] ?? 'Erro ao criar evento';
      return {'success': false, 'message': message};
    }
  }
}