angular.module('Addition', []).controller('AdditionController', function($scope, $route, addition) {
	$scope.counter = 1;
    
    var self = this;
    
    self.clickableIndexG1 = 0;
    self.clickableIndexG2 = 0;

    self.initialize = function () {
        var values = addition.initialize();
        $scope.num1 = values.num1;
        $scope.num2 = values.num2;
        $scope.choices = values.choices;
        $("[data-choice]").addClass("disabled");
        $(".card").removeClass("flipped");
        $scope.counter = 1;
    }();
    
    self.canClick = function (index, numId) {
        if (numId === 'num1' && self.clickableIndexG1 <= ($scope.num1 - 1) && index == self.clickableIndexG1) {
            self.clickableIndexG1++;
            return true;
        }
        else if (numId === 'num2' && self.clickableIndexG1 == $scope.num1 && self.clickableIndexG2 <= ($scope.num2 - 1) && index == self.clickableIndexG2) {
            self.clickableIndexG2++;
            return true;
        }
        return false;
    };

    $scope.range1 = function () {
        var input = [];
        for (var i = 1; i <= $scope.num1; i += 1) input.push(i);
        return input;
    }();

    $scope.range2 = function () {
        var input = [];
        for (var i = 1; i <= $scope.num2; i += 1) input.push(i);
        return input;
    }();

    $scope.burfderClick = function (card, $event, $index, numId) {
        if (self.canClick($index, numId)) {
            var closestCard = $($event.target).closest(".card");
            if (!$(closestCard).hasClass("flipped")) {
                closestCard.toggleClass("flipped");
                $($event.target).next(".back").find('p:first').text($scope.counter);
                $scope.counter++;
            }
            
            if ($scope.counter == ($scope.num1 + $scope.num2 + 1)) {
                $("[data-choice]").removeClass("disabled");
                $("[data-wrong]").addClass("disabled");
            }
        }
    }

    $scope.answerClick = function (choice, $event) {
        if (addition.evaluate(choice)) {
            $($event.target).addClass("btn-success");
            setTimeout(function () {
                $route.reload();
            }, 1000);
        } 
        else {
            $($event.target).addClass("btn-danger");
            $($event.target).attr('data-wrong', 'true');;

            $("[data-choice]").addClass("disabled");
            $(".card").removeClass("flipped");
            $scope.counter = 1;

            self.clickableIndexG1 = 0;
            self.clickableIndexG2 = 0;
        }
    }
});