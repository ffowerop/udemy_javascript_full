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
        savings: true,
        chooseExpenses: function () {
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
        },
        detectDayBudget: function () {
            appData.budgetPerDay = +(appData.budget / 30).toFixed(2);
            alert("Ваш бюджет на один день составляет " + appData.budgetPerDay);
        },
        detectLevel: function () {
            if (appData.budgetPerDay < 100) {
                console.log('budget is low');
            } else if (appData.budgetPerDay > 2000) {
                console.log('budget is big');
            } else if (appData.budgetPerDay <= 2000) {
                console.log('budget is normal');
            } else {
                console.log('something go wrong');
            }
        },
        chooseOptExpenses: function () {
            for (let i = 0, j = 1; i < 3; ++i) {
                let optExpense = prompt("Статья необязательных расходов?");
                if (typeof(optExpense) === 'string' && optExpense.length !== 0) {
                    appData.optionalExpenses[j++] = optExpense;
                }
            }
        },
        checkSavings: function () {
            if (appData.savings) {
                let save = +prompt("Какова сумма накоплений?", "100000");
                let percent = +prompt("Под какой процент?", "5");
    
                appData.monthIncome = +(save / 100 / 12 * percent).toFixed(2);
                alert("Доход с вашего депозита: " + appData.monthIncome);
            }
        },
        chooseIncome: function() {
            let items = null;
            while (!items) {
                items = prompt('Что принесет дополнительный доход?', '');
            }
            this.income = items.split(', ');
            this.income.push(prompt('Может что-то еще?', ''));
            this.income.sort();
            /*
            console.log('Способы доп заработка:\n' + this.income.forEach(function(item, index) {
                return '\t' + (index + 1) + ': ' + item;
            }) );
            */
            console.log('Способы доп заработка:');
            this.income.forEach(function(item, index) {
                console.log('\t' + (index + 1) + ': ' + item);
            });
        }
    };
    
    appData.chooseIncome();
    console.log('Наш объект содержит данные: ');
    for (let key in appData) {
        console.log(key + ': ' + appData[key]);
    }

    console.log(appData);

}());