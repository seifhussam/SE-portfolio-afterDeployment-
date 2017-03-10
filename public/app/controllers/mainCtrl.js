angular.module('mainController',['authServices'])
.controller ('mainCtrl',function (Auth,$timeout,$location,$rootScope,$http,$scope) {

  var app = this ;
  app.loadme =false ;
  app.MyWork = [] ;
  $rootScope.$on('$routeChangeStart',function(){
    if (Auth.isLoggedIn ()) {

      app.isLoggedIn = true ;

      // Auth.getUser().then (function (data){
      // app.username = data.data.username ;
      // app.useremail = data.data.sid ;
      // app.pname = data.data.pname;
      // app.MyWork = data.data.Work ;
      // app.loadme =true ;
      // }) ;
    }
    else {

      app.username = "" ;
      app.isLoggedIn = false ;
      app.loadme =true ;
    }
  });


  this.doLogin = function (loginData) {
    app.Emsg = false ;
    app.Smsg = false  ;
    app.loading = true ;

    Auth.login(app.loginData).then (function (data) {
      if (data.data.success) {
        $timeout(function () {
          $location.path('/') ;
          app.loginData = '' ;
          app.Smsg = '' ;
        }, 2000);
        app.loading = false ;
        app.Smsg = data.data.message ;


      }
      else {
        app.loading = false ;
        app.Emsg = data.data.message ;
      }
    });
  };
  this.addWork = function (addworkdata) {
    var req = {'username' : app.username ,
    'details' : app.addworkdata.details,
    'type' : app.addworkdata.type,
    'codeSource' : app.addworkdata.codeSource
  } ;
  return $http.post('/api/addWork', req).then (function (data){
    console.log(data) ;
    app.updatme();


  }) ;
};
app.allWork = new Array () ;
this.getAllWork = function () {
  return $http.get('/api/allWork').then (function (data){
    var Temp = data.data.allusers ;
    console.log (data) ;
    if (Temp != null)
    for (var i = 0; i < Temp.length; i++) {
      for (var j = 0; j < Temp[i].Work.length; j++) {
        app.allWork.push(Temp[i].Work[j]) ;
      }
    }
  }) ;
};

this.refresh = new function () {
  app.getAllWork() ;
};
// this.updatme = new function (){
//   Auth.getUser().then (function (data){
//     app.username = data.data.username ;
//     app.useremail = data.data.sid ;
//     app.pname = data.data.pname;
//     app.MyWork = data.data.Work ;
//     app.loadme =true ;
//
//   }) ;
//
// };

this.logout = function () {

  $timeout(function () {
    $location.path('/') ;
  }, 2000);
  Auth.logout () ;
  $location.path('/logout') ;
};
});
