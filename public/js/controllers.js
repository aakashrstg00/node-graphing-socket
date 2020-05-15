'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    socket.on('send:name', function (data) {
      $scope.name = data.name;
    });
  }).
  controller('MyCtrl1', function ($scope, socket) {
    $scope.myData = [];

    socket.on('send:time', function (data) {
      $scope.time = data.time;
      if($scope.myData.length>100) { $scope.myData.shift();  }
      else {console.log($scope.myData.length);}
      $scope.myData.push(data.time);
    });
  }).
  controller('MyCtrl2', function ($scope,socket) {
    $scope.file = {};
    socket.on('send:file',function(data){
      $scope.file = data.fileContents;
      console.log(data);
    });
  });
