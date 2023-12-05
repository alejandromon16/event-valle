import 'package:eventvalle/Singleton/Singleton.dart';
import 'package:eventvalle/blocs/auth/auth_bloc.dart';
import 'package:eventvalle/data/models/user.dart';
import 'package:eventvalle/services/auth_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ProfileView extends StatefulWidget {
  const ProfileView({Key? key}) : super(key: key);
  @override
  _ProfileViewState createState() => _ProfileViewState();
}

class _ProfileViewState extends State<ProfileView>
    with TickerProviderStateMixin {
  late AnimationController _slideAnimation;
  final Singleton singleton = Singleton();
  final TextEditingController userNameController = TextEditingController();
  final TextEditingController phoneNumberController = TextEditingController();
  final TextEditingController nameController = TextEditingController();
  final TextEditingController lastNameController = TextEditingController();
  FocusNode userNameFocusNode = FocusNode();
  FocusNode phoneNumberFocusNode = FocusNode();
  FocusNode nameFocusNode = FocusNode();
  FocusNode lastNameFocusNode = FocusNode();
  bool userNameFocus = false;
  bool phoneNumberFocus = false;
  bool nameFocus = false;
  bool lastNameFocus = false;
  String mensaje = "";

  @override
  void dispose() {
    userNameFocusNode.dispose();
    phoneNumberFocusNode.dispose();
    nameFocusNode.dispose();
    lastNameFocusNode.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    _slideAnimation = AnimationController(
      duration: Duration(milliseconds: 300),
      vsync: this,
    );
    userNameFocusNode.addListener(() {
      setState(() {
        userNameFocus = userNameFocusNode.hasFocus;
      });
    });
    phoneNumberFocusNode.addListener(() {
      setState(() {
        phoneNumberFocus = phoneNumberFocusNode.hasFocus;
      });
    });
    nameFocusNode.addListener(() {
      setState(() {
        nameFocus = nameFocusNode.hasFocus;
      });
    });
    lastNameFocusNode.addListener(() {
      setState(() {
        lastNameFocus = lastNameFocusNode.hasFocus;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    UserEntity? userEntity = singleton.userEntity;
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: Colors.white,
        title: AnimatedContainer(
          curve: Curves.easeInOut,
          duration: Duration(milliseconds: 200),
          child: SlideTransition(
            position: Tween<Offset>(
              begin: Offset(-0.001, 0),
              end: Offset(0, 0),
            ).animate(CurvedAnimation(
              parent: _slideAnimation,
              curve: Curves.easeInOut,
            )),
            child: const Text(
              'Perfil',
              textAlign: TextAlign.start,
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(
                'assets/logo1.png',
                height: 190,
                width: 230,
              ),
              SizedBox(
                height: 20,
              ),
              const SizedBox(height: 16.0),
              Padding(
                padding: EdgeInsets.all(18),
                child: Text(
                  userEntity != null
                      ? userEntity.email
                      : 'Información del usuario no disponible',
                  style: TextStyle(
                    fontSize: 24.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.only(left: 30, right: 30, top: 15),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10.0),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10.0),
                    border: Border.all(
                      color: nameFocus ? Color(0xFF993366) : Colors.grey.shade800,
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
                            hintText: userEntity?.name ?? 'Nombre',
                            border: InputBorder.none,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.only(left: 30, right: 30, top: 15),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10.0),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10.0),
                    border: Border.all(
                      color: lastNameFocus ? Color(0xFF993366) : Colors.grey.shade800,
                    ),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.person_outline, color: Colors.grey.shade800),
                      const SizedBox(width: 8.0),
                      Expanded(
                        child: TextField(
                          controller: lastNameController,
                          focusNode: lastNameFocusNode,
                          decoration: InputDecoration(
                            hintText: userEntity?.last_name ?? 'Apellido',
                            border: InputBorder.none,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.only(left: 30, right: 30, top: 15),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10.0),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10.0),
                    border: Border.all(
                      color: userNameFocus ? Color(0xFF993366) : Colors.grey.shade800,
                    ),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.card_membership, color: Colors.grey.shade800),
                      const SizedBox(width: 8.0),
                      Expanded(
                        child: TextField(
                          controller: userNameController,
                          focusNode: userNameFocusNode,
                          decoration: InputDecoration(
                            hintText: userEntity?.user_name ?? 'Username',
                            border: InputBorder.none,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Padding(
                padding:
                    EdgeInsets.only(left: 30, right: 30, top: 15, bottom: 15),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10.0),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10.0),
                    border: Border.all(
                      color:
                          phoneNumberFocus ? Color(0xFF993366) : Colors.grey.shade800,
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
                            hintText: userEntity?.phone_number ??
                                'Numero de telefono',
                            border: InputBorder.none,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Text(mensaje, style: TextStyle(color: Colors.red)),
              SizedBox(height: 10),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  ElevatedButton.icon(
                    onPressed: () async {
                      if (nameController.text.isEmpty &&
                          lastNameController.text.isEmpty &&
                          userNameController.text.isEmpty &&
                          phoneNumberController.text.isEmpty) {
                        setState(() {
                          mensaje = "Por favor completa al menos un campo";
                        });
                        return;
                      }
                      final updatedUser = await AuthService().updateUser(
                        userEntity!.id,
                        nameController.text.isNotEmpty
                            ? nameController.text
                            : userEntity?.name ?? '',
                        lastNameController.text.isNotEmpty
                            ? lastNameController.text
                            : userEntity?.last_name ?? '',
                        userNameController.text.isNotEmpty
                            ? userNameController.text
                            : userEntity?.user_name ?? '',
                        phoneNumberController.text.isNotEmpty
                            ? phoneNumberController.text
                            : userEntity?.phone_number ?? '',
                      );

                      if (updatedUser != null) {
                        setState(() {
                          userEntity = singleton.userEntity;
                          mensaje = "Usuario actualizado correctamente";
                        });
                      } else {
                        setState(() {
                          mensaje = "Error al actualizar el usuario";
                        });
                      }
                    },
                    icon: Icon(
                      Icons.edit,
                      color: Colors.white,
                    ),
                    label: Text(
                      'Editar Perfil',
                      style: TextStyle(color: Colors.white),
                    ),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Color(0xFF993366),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                        side: BorderSide(color: Color(0xFF993366)),
                      ),
                      padding: EdgeInsets.all(15),
                    ),
                  ),
                  ElevatedButton.icon(
                    onPressed: () {
                      context.read<AuthBloc>().add(AuthSignOut());
                    },
                    icon: Icon(
                      Icons.logout,
                      color: Colors.black,
                    ),
                    label: Text(
                      'Cerrar sesión',
                      style: TextStyle(color: Colors.black),
                    ),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                        side: BorderSide(color: Color(0xFF993366)),
                      ),
                      padding: EdgeInsets.all(15),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
