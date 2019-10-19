(function () {
    'use strict';
    // this function is strict...
    
    let money = NaN, time; 
    let askBudgetAndTime = function () {
        while(isNaN(money)) {
            money = +prompt("Ваш бюджет на месяц?", "20000");
        }
        time = prompt("Введите дату в формате YYYY-MM-DD", "2011-08-07");
    };
    
    askBudgetAndTime();

    let appData = {
        budget: money,
        timeData: time,
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings: true
    };

    let chooseExpenses = function () {
        let questionsRepeat = 2;
    
        for (let mandatoryExpenseItem, mandatoryItemPrice, i = 0; i < questionsRepeat; ++i) {
            mandatoryExpenseItem = prompt("Введите обязательную статью расходов в этом месяце",
                                        "Mandatory Expense Item " + (i + 1));
            mandatoryItemPrice = prompt("Во сколько обойдется?", "18000");
            console.log(typeof(mandatoryExpenseItem));
            if (typeof(mandatoryExpenseItem) === 'string' &&
                typeof(mandatoryItemPrice) === 'string' &&
                mandatoryExpenseItem !== '' &&
                mandatoryItemPrice !== '' &&
                mandatoryExpenseItem.length < 50) {
                    appData.expenses[mandatoryExpenseItem] = +mandatoryItemPrice;
            } else {
                alert('Wrong data, try one more time...');
                --i;
            }
        }
    };
    
    let detectDayBudget = function () {
        appData.budgetPerDay = +(appData.budget / 30).toFixed(2);
        alert("Ваш бюджет на один день составляет " + appData.budgetPerDay);
    };

    //detectDayBudget();

    let detectLevel = function () {
        if (appData.budgetPerDay < 100) {
            console.log('budget is low');
        } else if (appData.budgetPerDay > 2000) {
            console.log('budget is big');
        } else if (appData.budgetPerDay <= 2000) {
            console.log('budget is normal');
        } else {
            console.log('something go wrong');
        }
    };

    //detectLevel();

    let chooseOptExpenses = function () {
        for (let i = 0, j = 1; i < 3; ++i) {
            let optExpense = prompt("Статья необязательных расходов?");
            if (typeof(optExpense) === 'string' && optExpense.length !== 0) {
                appData.optionalExpenses[j++] = optExpense;
            }
        }
    };

    //chooseOptExpenses();

    let checkSavings = function () {
        if (appData.savings) {
            let save = +prompt("Какова сумма накоплений?", "100000");
            let percent = +prompt("Под какой процент?", "5");

            appData.monthIncome = +(save / 100 / 12 * percent).toFixed(2);
            alert("Доход с вашего депозита: " + appData.monthIncome);
        }
    };

    checkSavings();

    console.log(appData);

}());