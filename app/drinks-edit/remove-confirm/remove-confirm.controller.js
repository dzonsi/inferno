var RemoveConfirmController = function($scope) {
	var ctrl = this;
	$scope.callChangeModal = function() {
		ctrl.changeModal();
	}
	$scope.callRemoveDrink = function() {
		ctrl.removeDrink();
	}
}
RemoveConfirmController.$inject = ['$scope'];
