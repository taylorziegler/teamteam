import 'package:flutter/material.dart';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';

Future<Thread> fetchThread() async {
  final response = await http.get('http://127.0.0.1:5000/threads');

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return Thread.fromJson(json.decode(response.body));
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load');
  }
}

List<Widget> fetchFakeThreads() {
  
  Map<String, dynamic> fakeThreads = {
    "static friction question": "how do you calculate static friction?",
    "i still don't understand u-substitution": "why do you take the derivative of u? so confused",
    "don't understand what overloading a method is": "my teacher talks all the time about overloading methods. literally have no clue what he's on about. help!",
    "bio help": "whats an allele",
    "german help!": "what's the difference between wissen and kennen? losing my mind"
  };
  var fakeThreadList = new List<Container>();
  for (var k in fakeThreads.keys) {
      fakeThreadList.add(new Container(
        child: Column(
          children: <Widget>[
            Text(k + "\n"),
            Text(fakeThreads[k]),
          ]
        ),
        color: Colors.yellow[200],
        padding: EdgeInsets.all(20.0),
        margin: EdgeInsets.all(20.0),
      ));

  }
  return fakeThreadList;
}

class Thread {
  final String topic;
  final String id;

  Thread({this.topic, this.id});

  factory Thread.fromJson(Map<String, dynamic> json) {
    return Thread(
      topic : json['userId'],
      id: json['id'],
    );
  }
}

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  Future<Thread> futureThreads;
  List<Widget> fakeThreads = fetchFakeThreads();

  @override
  void initState() {
    super.initState();
    futureThreads = fetchThread();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            FlatButton(
              onPressed: () {
                /*...*/
              },
              child: Text("Stuck? Get help!"),
              color: Colors.yellow[200],
            ),
            Column (
              children: fakeThreads,
            ),
            /*
            Container(
               //child: Text("threads", style: TextStyle(color: Colors.white),),
               
              child: FutureBuilder<Thread>(
                future: futureThreads,
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    return Text(snapshot.data.topic);
                  } 
                  else if (snapshot.hasError) {
                    return Text("${snapshot.error}");
                  }
                  return Text("fail lol");
                },
              ),
              
              color: Colors.yellow[200],
              padding: EdgeInsets.all(20.0),
              margin: EdgeInsets.all(20.0),
              alignment: Alignment.topLeft,
              constraints: BoxConstraints.tightForFinite(width: 500),
            ),
            */
          ],
        ),
      ),
    );
  }
}