import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: AppBar(
        title: Text("Home"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            Container(
              child: Text("this is a test"),
              color: Colors.lightBlueAccent,
              padding: EdgeInsets.all(20.0),
              margin: EdgeInsets.all(20.0),
              alignment: Alignment.topLeft,
              constraints: BoxConstraints.tightForFinite(width: 500),
            ),
          ],
        ),
      ),
    );
  }
}