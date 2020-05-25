import 'package:flutter/material.dart';

class Settings extends StatefulWidget {
  @override
  _SettingsState createState() => _SettingsState();
}

class _SettingsState extends State<Settings> {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
              Container(
                child: TextField(
                  decoration: InputDecoration(
                    border: InputBorder.none,
                    hintText: 'username'
                  ),
                ),
                padding: EdgeInsets.all(10.0),
                margin: EdgeInsets.all(20.0),
                color: Colors.yellow[200],
              ),
              Container(
                child: TextField(
                  decoration: InputDecoration(
                    border: InputBorder.none,
                    hintText: 'password'
                  ),
                ),
                padding: EdgeInsets.all(10.0),
                margin: EdgeInsets.all(20.0),
                color: Colors.yellow[200],
              ),
              FlatButton(
              onPressed: () {
                /*...*/
              },
              child: Text("Login"),
              color: Colors.yellow[200],
            ),
            ],
          ),
        ));
  }
}
