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
            FlatButton(
              onPressed: () {
                /*...*/
              },
              child: Text("Stuck? Get help!", style: TextStyle(color: Colors.white),),
              color: Colors.deepPurple,
            ),
            Container(
              child: Text("this is a test", style: TextStyle(color: Colors.white),),
              color: Colors.deepPurple,
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