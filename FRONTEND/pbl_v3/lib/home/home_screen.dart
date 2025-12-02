import 'package:flutter/material.dart';
import '../services/api_service.dart';
import 'create_event_screen.dart';    // você criará esta tela depois

class HomeScreen extends StatefulWidget {
  static const routeName = '/home';

  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final ApiService _apiService = ApiService();
  List<dynamic> _eventos = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _carregarEventos();
  }

  Future<void> _carregarEventos() async {
    final data = await _apiService.getEventos();
    setState(() {
      _eventos = data;
      _loading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Eventos Disponíveis'),
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _eventos.isEmpty
          ? const Center(child: Text('Nenhum evento encontrado.'))
          : ListView.builder(
        itemCount: _eventos.length,
        itemBuilder: (context, index) {
          final evento = _eventos[index];
          return Card(
            margin: const EdgeInsets.all(12),
            child: ListTile(
              title: Text(evento['Nome'] ?? 'Sem título'),
              subtitle: Text(evento['Descricao'] ?? ''),
              trailing: Text(
                evento['Data']?.toString().split('T').first ?? '',
                style: const TextStyle(color: Colors.grey),
              ),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => const CreateEventScreen()),
          ).then((_) => _carregarEventos()); // recarrega após criação
        },
        child: const Icon(Icons.add),
        tooltip: 'Criar Evento',
      ),
    );
  }
}
