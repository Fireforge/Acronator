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
      var target = document.getElementById('spinner');
      var spinner = new Spinner().spin(target);
      var acronymObject = {'acronym': ctrl.input.acronym, 'description': ctrl.input.des}
      ctrl.input.acronym = '';
      ctrl.input.des = '';
      console.log(acronymObject);
      $http.post(URL, acronymObject).success(function(data) {
        var datas = [];
        datas.push(data);
        datas.push('United States of America');
        datas.push('Lehigh University');
        //datas.push('Yo So Co Oa Oso Sooc Soo');
        spinner.stop();

        for(var i = 0; i<datas.length; i++) {
          var tokens = datas[i].replace('"', '').split(" ");
          console.log(tokens);
          ctrl.acronyms.push(tokens);
        }
      }).error(function(){
        console.log('ERROR');
      });
    }
  }
});
