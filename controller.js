var exampleApp = angular.module('creditСalculator', []);
        
  exampleApp.controller('calculatorСontroller',  ['$scope', function ($scope) {

    //функция создающая таблицу по введеным данным
    $scope.createTable = function() { 
    		
    	$scope.rowCollection = [];
    	var repaymentPercentSum = 0;
    	var repaymentCredit = $scope.sum/$scope.time;
    	var annualRate = $scope.percent*0.01/12;

    	for (var i = 0; i < $scope.time; i++) {
            
	      var repaymentPercent = ($scope.sum-repaymentCredit*i)*annualRate;
	      var creditBalance = $scope.sum-(repaymentCredit)*(i+1);
	       
	      $scope.rowCollection.push({ 
	        'month':i+1, 
	        'repaymentCredit': repaymentCredit,
	        'repaymentPercent': repaymentPercent,
	        'totalContribution': repaymentCredit+repaymentPercent,
	        'creditBalance':creditBalance 
	            
	      });
      
	      repaymentPercentSum  += repaymentPercent;

    	}   
   
    	//добавление последней строки суммы по процентам и кредиту в таблицу
			$scope.rowCollection.push({ 
            
				'repaymentCredit':$scope.sum,
				'repaymentPercent':(repaymentPercentSum),
				'totalContribution': ($scope.sum*1+repaymentPercentSum) 
            
			});

		};

		//отслеживание изменений состояния ng-model элементов 'sum', 'time', 'percent' 
		$scope.$watch('sum', function(){
			$scope.createTable();
		});
		$scope.$watch('time', function(){
			$scope.createTable();
		});
		$scope.$watch('percent', function(){
			$scope.createTable();
		});

		//проверка поля ввода на вводимые символы и их количество для суммы кредита
		$scope.checkInputForSum = function(event) {
		
			if (event.target.value.length > 12 && event.keyCode != 8) event.preventDefault();
			
			if(event.keyCode>47&&event.keyCode<58||event.keyCode==8||event.keyCode==190||event.keyCode==191||event.keyCode==37||event.keyCode==39){
			}else{
				event.preventDefault();
			}

		}

        //проверка поля ввода на вводимые символы и их количество для срока кредита
		$scope.checkInputForTime = function(event) {

			if (event.target.value.length > 2 && event.keyCode != 8) event.preventDefault();
				
			if(event.keyCode>47&&event.keyCode<58||event.keyCode==8||event.keyCode==37||event.keyCode==39){
			}else{
				event.preventDefault();
			}

		}
		
		//проверка поля ввода на вводимые символы и их количество для процентной ставки
		$scope.checkInputForPercent = function(event) {
		
			if (event.target.value.length > 6 && event.keyCode != 8) event.preventDefault();
			
			if(event.keyCode>47&&event.keyCode<58||event.keyCode==8||event.keyCode==190||event.keyCode==191||event.keyCode==37||event.keyCode==39){
			}else{
				event.preventDefault();
			}
		}
		
  }])