import 'package:eventvalle/blocs/auth/auth_bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class RegisterView extends StatefulWidget {
  const RegisterView({super.key});

  @override
  State<RegisterView> createState() => _RegisterViewState();
}

class _RegisterViewState extends State<RegisterView> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController usernameController = TextEditingController();
  final TextEditingController nameController = TextEditingController();
  final TextEditingController lastnameController = TextEditingController();
  final TextEditingController phoneNumberController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController passwordRepeatController =
      TextEditingController();
  String error = "";

  FocusNode emailFocusNode = FocusNode();
  FocusNode usernameFocusNode = FocusNode();
  FocusNode nameFocusNode = FocusNode();
  FocusNode lastnameFocusNode = FocusNode();
  FocusNode phoneNumberFocusNode = FocusNode();
  FocusNode passwordFocusNode = FocusNode();
  FocusNode passwordRepeatFocusNode = FocusNode();

  bool emailFocus = false;
  bool usernameFocus = false;
  bool nameFocus = false;
  bool lastnameFocus = false;
  bool phoneNumberFocus = false;
  bool passwordFocus = false;
  bool passwordRepeatFocus = false;

  @override
  void initState() {
    super.initState();

    // Add listeners for focus nodes
    emailFocusNode.addListener(() => updateFocus('email'));
    usernameFocusNode.addListener(() => updateFocus('username'));
    nameFocusNode.addListener(() => updateFocus('name'));
    lastnameFocusNode.addListener(() => updateFocus('lastname'));
    phoneNumberFocusNode.addListener(() => updateFocus('phoneNumber'));
    passwordFocusNode.addListener(() => updateFocus('password'));
    passwordRepeatFocusNode.addListener(() => updateFocus('passwordRepeat'));
  }

  @override
  void dispose() {
    // Dispose of focus nodes
    emailFocusNode.dispose();
    usernameFocusNode.dispose();
    nameFocusNode.dispose();
    lastnameFocusNode.dispose();
    phoneNumberFocusNode.dispose();
    passwordFocusNode.dispose();
    passwordRepeatFocusNode.dispose();
    super.dispose();
  }

  void updateFocus(String field) {
    setState(() {
      emailFocus = field == 'email' && emailFocusNode.hasFocus;
      usernameFocus = field == 'username' && usernameFocusNode.hasFocus;
      nameFocus = field == 'name' && nameFocusNode.hasFocus;
      lastnameFocus = field == 'lastname' && lastnameFocusNode.hasFocus;
      phoneNumberFocus =
          field == 'phoneNumber' && phoneNumberFocusNode.hasFocus;
      passwordFocus = field == 'password' && passwordFocusNode.hasFocus;
      passwordRepeatFocus =
          field == 'passwordRepeat' && passwordRepeatFocusNode.hasFocus;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SingleChildScrollView(
      child: Container(
        color: const Color.fromARGB(255, 250, 250, 250),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Center(
                child: Image.asset(
                  'assets/logo1.png',
                  height: 190,
                  width: 230,
                ),
              ),
              const SizedBox(height: 8.0),
              const Text(
                'Registrarse',
                style: TextStyle(
                  fontSize: 24.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 8.0),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10.0),
                  border: Border.all(
                    color: emailFocus ? Colors.pink : Colors.grey.shade800,
                  ),
                ),
                child: Row(
                  children: [
                    Icon(Icons.mail, color: Colors.grey.shade800),
                    const SizedBox(width: 8.0),
                    Expanded(
                      child: TextField(
                        controller: emailController,
                        focusNode: emailFocusNode,
                        decoration: InputDecoration(
                          hintText: 'Correo Electrónico',
                          border: InputBorder.none,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 8.0),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10.0),
                  border: Border.all(
                    color: usernameFocus ? Colors.pink : Colors.grey.shade800,
                  ),
                ),
                child: Row(
                  children: [
                    Icon(Icons.person, color: Colors.grey.shade800),
                    const SizedBox(width: 8.0),
                    Expanded(
                      child: TextField(
                        controller: usernameController,
                        focusNode: usernameFocusNode,
                        decoration: InputDecoration(
                          hintText: 'Username',
                          border: InputBorder.none,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 8.0),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10.0),
                  border: Border.all(
                    color: nameFocus ? Colors.pink : Colors.grey.shade800,
                  ),
                ),
                child: Row(
                  children: [
                    Icon(Icons.person, color: Colors.grey.shade800),
                    const SizedBox(width: 8.0),
                    Expanded(
                      child: TextField(
                        controller: nameController,
                        focusNode: nameFocusNode,
                        decoration: InputDecoration(
                          hintText: 'Nombre',
                          border: InputBorder.none,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 8.0),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10.0),
                  border: Border.all(
                    color: lastnameFocus ? Colors.pink : Colors.grey.shade800,
                  ),
                ),
                child: Row(
                  children: [
                    Icon(Icons.person, color: Colors.grey.shade800),
                    const SizedBox(width: 8.0),
                    Expanded(
                      child: TextField(
                        controller: lastnameController,
                        focusNode: lastnameFocusNode,
                        decoration: InputDecoration(
                          hintText: 'Apellido',
                          border: InputBorder.none,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 8.0),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10.0),
                  border: Border.all(
                    color:
                        phoneNumberFocus ? Colors.pink : Colors.grey.shade800,
                  ),
                ),
                child: Row(
                  children: [
                    Icon(Icons.phone, color: Colors.grey.shade800),
                    const SizedBox(width: 8.0),
                    Expanded(
                      child: TextField(
                        controller: phoneNumberController,
                        focusNode: phoneNumberFocusNode,
                        decoration: InputDecoration(
                          hintText: 'Numero de celular',
                          border: InputBorder.none,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 8.0),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10.0),
                  border: Border.all(
                    color: passwordFocus ? Colors.pink : Colors.grey.shade800,
                  ),
                ),
                child: Row(
                  children: [
                    Icon(Icons.lock, color: Colors.grey.shade800),
                    const SizedBox(width: 8.0),
                    Expanded(
                      child: TextField(
                        controller: passwordController,
                        obscureText: true,
                        focusNode: passwordFocusNode,
                        decoration: InputDecoration(
                          hintText: 'Contraseña',
                          border: InputBorder.none,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 8.0),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10.0),
                  border: Border.all(
                    color: passwordRepeatFocus
                        ? Colors.pink
                        : Colors.grey.shade800,
                  ),
                ),
                child: Row(
                  children: [
                    Icon(Icons.lock, color: Colors.grey.shade800),
                    const SizedBox(width: 8.0),
                    Expanded(
                      child: TextField(
                        controller: passwordRepeatController,
                        obscureText: true,
                        focusNode: passwordRepeatFocusNode,
                        decoration: InputDecoration(
                          hintText: 'Repite la contraseña Contraseña',
                          border: InputBorder.none,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 8.0),
              Text(
                error,
                style: TextStyle(color: Colors.red),
              ),
              const SizedBox(height: 12.0),
              Center(
                child: ElevatedButton(
                  onPressed: () {
                    String email = emailController.text;
                    String username = usernameController.text;
                    String password = passwordController.text;
                    String passwordRepeat = passwordRepeatController.text;

                    if (email.isNotEmpty &&
                        email.endsWith("univalle.edu") &&
                        username.isNotEmpty &&
                        password.isNotEmpty &&
                        passwordRepeat.isNotEmpty) {
                      if (password == passwordRepeat) {
                        context.read<AuthBloc>().add(AuthRegisterUser(
                              email: email,
                              userName: username,
                              name: nameController.text,
                              lastName: lastnameController.text,
                              phoneNumber: phoneNumberController.text,
                              password: password,
                            ));
                      } else {
                        setState(() {
                          error = "Las contraseñas deben ser iguales";
                        });
                      }
                    } else {
                      setState(() {
                        error =
                            "Por favor, completa todos los campos y asegúrate de que el correo sea del dominio univalle.edu";
                      });
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF993366),
                    padding: const EdgeInsets.symmetric(
                        vertical: 16.0, horizontal: 24.0),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15.0),
                    ),
                    minimumSize: const Size(300, 0),
                    elevation: 0, // Sin sombra
                  ),
                  child: const Text(
                    'Registrarse',
                    style: TextStyle(
                      fontSize: 18.0,
                      fontWeight: FontWeight.normal,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 24.0),
              Center(
                child: GestureDetector(
                  onTap: () {
                    context
                        .read<AuthBloc>()
                        .add(ChangeAuthState(AuthUnauthenticated()));
                  },
                  child: const Text(
                    'Tienes una cuenta? Inicia sesion',
                    style: TextStyle(
                      color: Colors.brown,
                      fontSize: 16.0,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    ));
  }
}
