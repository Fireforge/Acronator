'use strict';
var app = angular.module('app', []);
app.config(function($httpProvider){
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.controller('ctrl', function($http) {
  var ctrl = this;
  ctrl.acronyms = [];
  ctrl.shout = function() {
      console.log(ctrl.input.des);
  }

  ctrl.acronize = function() {
    ctrl.acronyms.push(ctrl.input.acronym);
    ctrl.input.acronym='';
    ctrl.input.des='';
  }

  var URL = 'http://acronator.azurewebsites.net/api/test';

  ctrl.sendObject = function() {
    if(!(ctrl.input&&ctrl.input.acronym&&ctrl.input.des)) {
      console.log('NO acronym or description');
    }
    else {
      //start spinner
      var target = document.getElementById('spinner');
      var spinner = new Spinner().spin(target);

      //create object from input fields
      var acronymObject = {'acronym': ctrl.input.acronym, 'description': ctrl.input.des}
      ctrl.input.acronym = '';
      ctrl.input.des = '';
      console.log(acronate(acronymObject.acronym, acronymObject.description));
      console.log(acronymObject);

      $http.post(URL, acronymObject).success(function(data) {
        //TEST


        ctrl.acronyms = acronate(acronymObject.acronym, acronymObject.description);

        //stop spinner
        spinner.stop();

        /*
        for(var i = 0; i<datas.length; i++) {
          var tokens = datas[i].replace('"', '').split(" ");
          console.log(tokens);
          ctrl.acronyms.push(tokens);
        }
        */

      }).error(function(){
        console.log('ERROR');
      });
    }
  }
});
