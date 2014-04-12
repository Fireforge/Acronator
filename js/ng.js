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

  var URL = '/foo';

  ctrl.sendObject = function() {
    var acronym = ctrl.input.acronym;
    var description = ctrl.input.des;
    if(!(acronym&&description)) {
      console.log('NO acronym or description');
    }
    else {
      var acronymObject = {'acronym': acronym, 'description': description}
      console.log(acronymObject);
      $http.post(URL, acronymObject).success(function(data) {
         ctrl.acronyms = data.strings;
      }).error(function(){
        console.log('ERROR');
      });
    }
  }
});
