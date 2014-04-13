'use strict';
var app = angular.module('app', []);
app.config(function($httpProvider){
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.controller('ctrl', function($scope, $http, $timeout) {
  var ctrl = this;

  ctrl.button = {};
  ctrl.button.name = 'Send';
  ctrl.acronyms = [];
  ctrl.counter = 0;

  $scope.input = {
    acronym: '',
    des: ''
  };

  ctrl.output = {
    name: ''
  }
  ctrl.parse = function(object) {
    console.log(object);
    return JSON.parse(object);
  }

  ctrl.http = function() {
    var postData = {
      'name': ctrl.input.acronym,
      'des': ctrl.input.des
    }
    console.log(postData);

    /*
    $http({
          url: 'http://acronatorpython.herokuapp.com/api',
          method: "POST",
          data: postData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
              console.log(data);
          }).error(function (data, status, headers, config) {
              console.log(data);
          });
    */
        $http({
          url: 'http://acronatorpython.herokuapp.com/'
          + postData.name
          + '&'
          + postData.des,
          method: "GET",
          //withCredentials: true,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
              console.log(data);
              ctrl.acronyms = data.result;
          }).error(function (data, status, headers, config) {
              console.log(data);
          });
  }

  ctrl.spaced = false;
  ctrl.preSpaced = false;

  //detect Space Key
  /*
  ctrl.onKeyPress = function(e) {
    console.log('pressed');
    $timeout(function(){console.log('yes')}, 1000);
  }
  */
  ctrl.wait = 900;

  ctrl.changeAcronym = function() {
    if(ctrl.input.acronym) {
      console.log('change header');
      ctrl.header = ctrl.input.acronym.toUpperCase().split('');
      //$scope.$apply();
      console.log(ctrl.header);
    }
    console.log('change acronym');
    ctrl.pressedAcronym(ctrl.input.acronym);
  }
  ctrl.changeKeyWords = function () {
    console.log('change keyword')
    ctrl.pressedKeyword(ctrl.input.des);
  }

  /*
  ctrl.pressed = function() {
    ctrl.lastKeyPressed = ctrl.keyPressed;
    ctrl.keyPressed = (new Date()).getMilliseconds();
    $timeout(function(){
      console.log('done waiting, checking key...');
      ctrl.checkKey(ctrl.lastKeyPressed);
    }, ctrl.wait);
  };

  ctrl.checkKey = function(time) {
    console.log(time);
    console.log(ctrl.keyPressed);
    if(time==ctrl.keyPressed)
      console.log('SendingX...');
      //ctrl.sendObject();
  }
  */
  ctrl.pressedAcronym = function() {
    var lastAcronym = ctrl.input.acronym;
    $timeout(function(){
      console.log(lastAcronym);
      ctrl.checkAcronym(lastAcronym);
    }, ctrl.wait);
  }

  ctrl.checkAcronym = function(last) {
    if(last === ctrl.input.acronym) {
      console.log('Sending...');
      ctrl.sendObject();
    }
    else
      console.log('Changed!');
  }

  ctrl.pressedKeyword = function() {
    var lastKeyWords = ctrl.input.des;
    $timeout(function(){
      console.log(lastKeyWords);
      ctrl.checkKeyword(lastKeyWords);
    }, ctrl.wait);
  }

  ctrl.checkKeyword = function(last) {
    if(last === ctrl.input.des) {
      console.log('Sending...');
      ctrl.sendObject();
    }
    else
      console.log('Changed!');
  }

  ctrl.sendObject = function() {
    if(!(ctrl.input&&ctrl.input.acronym&&ctrl.input.des)) {
      console.log('NO acronym or description');
    }
    else {
      console.log('Calling server...');
      //change button name
      ctrl.button.name = 'Redo';
      //start spinner
      var target = document.getElementById('spinner');
      var spinner = new Spinner().spin(target);

      var postData = {
      'name': ctrl.input.acronym,
      'des': ctrl.input.des
    }

        $http({
          url: 'http://acronatorpython.herokuapp.com/'
          + postData.name
          + '&'
          + postData.des,
          method: "GET",
          //withCredentials: true,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
              console.log(data);
              var results = [];
              for(var i = 0; i<data.result.length; i++) {
                var tokens = data.result[i].split(" ");
                results.push(tokens);
              }
              ctrl.acronyms = results;
              spinner.stop();
          }).error(function (data, status, headers, config) {
              console.log(data);
              spinner.stop();
          });
    }
  }
});
