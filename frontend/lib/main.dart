import 'package:flutter/material.dart';
import './screens/HomePage.dart';
import './screens/SignInPage.dart';
import './screens/SignUpPage.dart';
import './screens/Dashboard.dart';
import './screens/ProductPage.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SaveMart',
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      debugShowCheckedModeBanner: false,
      home: HomePage(pageTitle: 'Welcome'),
      routes: <String, WidgetBuilder>{
        '/signup': (BuildContext context) => SignUpPage(),
        '/signin': (BuildContext context) => SignInPage(),
        '/dashboard': (BuildContext context) => Dashboard(),
        '/productPage': (BuildContext context) => ProductPage(),
      },
    );
  }
}
