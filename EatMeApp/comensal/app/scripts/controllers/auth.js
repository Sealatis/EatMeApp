'use strict';

/**
 * @ngdoc function
 * @name comensalApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the comensalApp
 */
angular.module('comensalApp')
  .controller('AuthCtrl',['AutenticationService','store','$state','$timeout', function (AutenticationService,store,$state,$timeout) {

  var vm = this;

    // ------------------------------------------------
    // Functions
    // ------------------------------------------------
    
    vm.login = login;
    vm.signUp = signUp;




    function login(){
    	AutenticationService.login(vm.user)
      .then(
        function(data){
          store.set('access_token',data.access_token)
          store.set('currentCommensal',data.user)
          $state.go('comensal.listado',{},{reload:true})
        },
        function(error){
         vm.LoginErrorMessage = "Error en las credenciales"
         $timeout(function() {
          vm.LoginErrorMessage = ""
        }, 3000,true);
       })
    }
    


    function signUp(){
      if(vm.user.pass1 == vm.user.pass2){
        vm.user.password = vm.user.pass1;

        AutenticationService.signUp(vm.user)
        .then(
          function(data){
            var obj = {}
            obj.username = vm.user.username;
            obj.password = vm.user.password;

            AutenticationService.login(vm.user)
            .then(
              function(data){
                store.set('access_token',data.access_token)
                store.set('currentComensal',data.user)
                $state.go('comensal.listado',{},{reload:true})
              },
              function(error){
                vm.LoginErrorMessage = "Error en las credenciales"
                $timeout(function() {
                  vm.LoginErrorMessage = ""
                }, 3000,true);
              })
          },
          function(error){
            vm.LoginErrorMessage = "Error en las credenciales"
            $timeout(function() {
              vm.LoginErrorMessage = ""
            }, 3000,true);
          })
      }else{
        vm.errorMessage = "Los passwords no coinciden."
        $timeout(function() {
          vm.errorMessage = ""
        }, 3000,true);
      }

    }
  }]);
