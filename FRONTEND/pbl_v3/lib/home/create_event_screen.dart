import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../services/api_service.dart';

class CreateEventScreen extends StatefulWidget {
  const CreateEventScreen({Key? key}) : super(key: key);

  @override
  State<CreateEventScreen> createState() => _CreateEventScreenState();
}

class _CreateEventScreenState extends State<CreateEventScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nomeCtrl = TextEditingController();
  final _localCtrl = TextEditingController();
  final _oradoresCtrl = TextEditingController();
  final _descricaoCtrl = TextEditingController();
  DateTime? _dataSelecionada;
  String _tipo = 'Gratuito';
  bool _loading = false;

  final ApiService _apiService = ApiService();

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate() || _dataSelecionada == null) return;

    setState(() => _loading = true);

    final evento = {
      'Nome': _nomeCtrl.text,
      'Data': _dataSelecionada!.toIso8601String(),
      'Local': _localCtrl.text,
      'Tipo': _tipo,
      'Oradores': _oradoresCtrl.text,
      'Descricao': _descricaoCtrl.text,
    };

    final result = await _apiService.createEvento(evento);

    setState(() => _loading = false);

    if (result['success']) {
      Navigator.pop(context);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(result['message'] ?? 'Erro ao criar evento')),
      );
    }
  }

  Future<void> _selecionarData() async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _dataSelecionada ?? DateTime.now(),
      firstDate: DateTime.now(),
      lastDate: DateTime(2100),
    );
    if (picked != null) {
      setState(() => _dataSelecionada = picked);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Criar Evento')),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              TextFormField(
                controller: _nomeCtrl,
                decoration: const InputDecoration(labelText: 'Nome do Evento'),
                validator: (v) =>
                v != null && v.isNotEmpty ? null : 'Informe o nome',
              ),
              const SizedBox(height: 16),
              GestureDetector(
                onTap: _selecionarData,
                child: InputDecorator(
                  decoration: const InputDecoration(labelText: 'Data'),
                  child: Text(_dataSelecionada != null
                      ? DateFormat('dd/MM/yyyy').format(_dataSelecionada!)
                      : 'Selecione uma data'),
                ),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _localCtrl,
                decoration: const InputDecoration(labelText: 'Local'),
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<String>(
                value: _tipo,
                items: const [
                  DropdownMenuItem(value: 'Gratuito', child: Text('Gratuito')),
                  DropdownMenuItem(value: 'Pago', child: Text('Pago')),
                ],
                onChanged: (v) => setState(() => _tipo = v!),
                decoration: const InputDecoration(labelText: 'Tipo'),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _oradoresCtrl,
                decoration:
                const InputDecoration(labelText: 'Oradores (separados por vírgula)'),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _descricaoCtrl,
                maxLines: 3,
                decoration: const InputDecoration(labelText: 'Descrição'),
              ),
              const SizedBox(height: 24),
              _loading
                  ? const Center(child: CircularProgressIndicator())
                  : ElevatedButton(
                  onPressed: _submit, child: const Text('Criar Evento')),
            ],
          ),
        ),
      ),
    );
  }
}
