angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $state) {    
  $http.get("http://52.4.68.230:1337/expense/find")
    .success(function(response) {
      $scope.myExpenses = response;
  });
    
   $scope.showExpenseImage = function(id, image, vendor) {
    $state.go('tab.dash-detail', {expenseId: id, image: image, vendor: vendor})
   }
})

.controller('DashDetailCtrl', function($scope, $stateParams) {
    var vendorNameData = $stateParams.vendor,
        imageData = $stateParams.image;
    $scope.myExpenses = [{
        image: imageData,
        vendorName: vendorNameData
    }]
    console.log($scope.myExpenses);
})

.controller('ChatsCtrl', function($scope, $http, $state) {
    $http.get("http://52.4.68.230:1337/expense/find?where={%22approved%22:%22pending%22}")
    .success(function(response) {
      $scope.expensesToBeApproved = response;
  });
    $scope.showExpenseImage = function(id, image, vendor) {
    $state.go('tab.chat-detail', {expenseId: id, image: image, vendor: vendor})
   }
  /**
  $scope.approve = function(chat) {
  	Chats.approve(chat);
  }
  **/
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  var vendorNameData = $stateParams.vendor,
        imageData = $stateParams.image;
    $scope.myExpenses = [{
        image: imageData,
        vendorName: vendorNameData
    }]
    console.log($scope.myExpenses);
})

.controller('AccountCtrl1', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('AccountCtrl', function($scope, $cordovaCamera) {
 
    $scope.takePicture = function() {
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 600,
            targetHeight: 600,
            //picturefill();
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
 
});
