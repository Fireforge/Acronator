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

  /*
  $scope.$watch('input', function(newInput, oldInput, scope) {
    ctrl.output.name = newInput.acronym;
    console.log(oldInput);
  }, true);
  */
  ctrl.spaced = false;
  ctrl.preSpaced = false;
  //detect Space Key
  ctrl.onKeyPress = function(e) {
    ctrl.prespaced = ctrl.spaced;
    console.log('PRE ' + ctrl.prespaced);
    ctrl.spaced = (e.charCode == 32);
    console.log('NOW ' + ctrl.spaced);
  }

  ctrl.typing = true;
  ctrl.temp = 0;
  ctrl.limit = 3;
  ctrl.change = function () {
    console.log('changed');
    /*
    for(var i = 0; i<ctrl.input.des;i++) {
      if(ctrl.input)
    }
  */
    if(ctrl.spaced)
      ctrl.sendObject();
  }
  ctrl.sendObject = function() {
    if(!(ctrl.input&&ctrl.input.acronym&&ctrl.input.des)) {
      console.log('NO acronym or description');
    }
    else {
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
