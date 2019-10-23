(function () {
    'use strict';
    // this function is strict...

    let btnStart = document.querySelector('#start');

    let resultTable = document.querySelector('.result-table');
    let budgetValue = resultTable.querySelector('.budget-value');
    let dayBudgetValue = resultTable.querySelector('.daybudget-value');
    let levelValue = resultTable.querySelector('.level-value');
    let expensesValue = resultTable.querySelector('.expenses-value');
    let optionalExpensesValue = resultTable.querySelector('.optionalexpenses-value');
    let incomeValue = resultTable.querySelector('.income-value');
    let monthSavingsValue = resultTable.querySelector('.monthsavings-value');
    let yearSavingsValue = resultTable.querySelector('.yearsavings-value');
    console.log(expensesValue);
    let inputExpensesItem = document.querySelectorAll('input.expenses-item');
    let btnExpenses = document.getElementsByTagName('button')[0];
    let btnOptionalExpenses = document.getElementsByTagName('button')[1];
    let btnCountBudget = document.getElementsByTagName('button')[2];
    let inputOptionalExpensesItem = document.querySelectorAll('input.optionalexpenses-item');

    let inputChooseIncome = document.querySelector('input.choose-income');
    let inputSavings = document.querySelector('input#savings');
    let inputSum = document.querySelector('input#sum');
    let inputPercent = document.querySelector('input#percent');
    let inputYear = document.querySelector('input.year-value');
    let inputMonth = document.querySelector('input.month-value');
    let inputDay = document.querySelector('input.day-value');


    // console.log(rightBlocks);
    // console.log(inputExpensesItem);
    // console.log(inputExpensesItem);
    // console.log(btnOptionalExpenses);
    // console.log(btnCountBudget);
    // console.log(inputOptionalExpensesItem);

    // console.log(inputChooseIncome);
    // console.log(inputSavings);
    // console.log(inputSum);
    // console.log(inputPercent);
    // console.log(inputYear);
    // console.log(inputMonth);
    // console.log(inputDay);
    
    let money = NaN;
    let time;
    let start = false; 
    btnStart.addEventListener('click', function () {
        start = true;
        while(isNaN(money) || money === '' || money === null) {
            money = +prompt("Ваш бюджет на месяц?", "20000");
        }
        time = new Date(prompt("Введите дату в формате YYYY-MM-DD", "2011-08-07"));
        
        budgetValue.textContent = appData.budget = money.toFixed(2);
        appData.timeData = time;
        inputYear.value = time.getFullYear();
        inputMonth.value = time.getMonth() + 1;
        inputDay.value = time.getDate();

        console.log(appData);
    });

    btnExpenses.addEventListener('click', function() {
        if(!start) {
            return;
        }
        let sum = 0;
        for (let mandatoryExpenseItem, mandatoryItemPrice, i = 0; i < inputExpensesItem.length; i += 2) {
            mandatoryExpenseItem = inputExpensesItem[i].value;
            mandatoryItemPrice = inputExpensesItem[i + 1].value;
            //console.log(typeof(mandatoryExpenseItem));
            if (typeof(mandatoryExpenseItem) === 'string' &&
                typeof(mandatoryItemPrice) === 'string' &&
                mandatoryExpenseItem !== '' &&
                !isNaN(mandatoryItemPrice) &&
                mandatoryItemPrice !== '' &&
                mandatoryExpenseItem.length < 50) {
                    appData.expenses[mandatoryExpenseItem] = +mandatoryItemPrice;
                    sum += +mandatoryItemPrice;
            } else {
                alert('Wrong data, try one more time...');
                inputExpensesItem[i].value = inputExpensesItem[i + 1].value = null;
                sum = 0;
                break;
            }
            expensesValue.textContent = sum;
            console.log(appData);
        }
    });

    btnOptionalExpenses.addEventListener('click', function() {
        if(!start) {
            return;
        }
        for (let i = 0, j = 1; i < inputOptionalExpensesItem.length; ++i) {
            let optExpense = inputOptionalExpensesItem[i].value;
            if (typeof(optExpense) === 'string') {
                if (optExpense !== '') {
                    appData.optionalExpenses[j++] = optExpense;
                }
            } else {
                alert('wrong data!');
                break;
            }
            optionalExpensesValue.textContent = Object.values(appData.optionalExpenses).join(', ');
            console.log(appData.optionalExpenses);
        }
    });
    
    btnCountBudget.addEventListener('click', function() {
        if(!start) {
            return;
        }
        if (!isNaN(appData.budget)) {
            dayBudgetValue.textContent = appData.budgetPerDay = +((appData.budget - expensesValue.textContent) / 30).toFixed(2);
                
            if (appData.budgetPerDay < 100) {
                levelValue.textContent = "Низкий";
            } else if (appData.budgetPerDay > 2000) {
                levelValue.textContent = "Высокий";
            } else if (appData.budgetPerDay <= 2000) {
                levelValue.textContent = "Средний";
            } else {
                levelValue.textContent = 'Что-то пошло не так :(';
            }
        } else {
            alert('Начните с кнопки "Начать расчет"!');
        }
    });

    inputChooseIncome.addEventListener('input', function() {
        incomeValue.textContent = this.value;
    });

    inputSavings.addEventListener('click', function(e) {
        if (appData.savings) {
            appData.savings = false;
        } else {
            appData.savings = true;
        }
        console.log(appData.savings);
        console.log(e);
    });

    inputSum.addEventListener('input', function() {
        if (appData.savings) {
            let save = +inputSum.value;
            let percent = inputPercent.value;
            monthSavingsValue.textContent = appData.monthIncome = +(save / 100 / 12 * percent).toFixed(2);
            yearSavingsValue.textContent = appData.yearIncome = +(save / 100 * percent).toFixed(2);
        }
    });

    inputPercent.addEventListener('input', function() {
        if (appData.savings) {
            let save = +inputSum.value;
            let percent = +inputPercent.value;
            monthSavingsValue.textContent = appData.monthIncome = +(save / 100 / 12 * percent).toFixed(2);
            yearSavingsValue.textContent = appData.yearIncome = +(save / 100 * percent).toFixed(2);
        }

    });

    let appData = {
        budget: money,
        timeData: time,
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings: false,
        // chooseExpenses: function () {
        //     let questionsRepeat = 2;
        
        //     for (let mandatoryExpenseItem, mandatoryItemPrice, i = 0; i < questionsRepeat; ++i) {
        //         mandatoryExpenseItem = prompt("Введите обязательную статью расходов в этом месяце",
        //                                     "Mandatory Expense Item " + (i + 1));
        //         mandatoryItemPrice = prompt("Во сколько обойдется?", "18000");
        //         console.log(typeof(mandatoryExpenseItem));
        //         if (typeof(mandatoryExpenseItem) === 'string' &&
        //             typeof(mandatoryItemPrice) === 'string' &&
        //             mandatoryExpenseItem !== '' &&
        //             mandatoryItemPrice !== '' &&
        //             mandatoryExpenseItem.length < 50) {
        //                 appData.expenses[mandatoryExpenseItem] = +mandatoryItemPrice;
        //         } else {
        //             alert('Wrong data, try one more time...');
        //             --i;
        //         }
        //     }
        // },
        // detectDayBudget: function () {
        //     appData.budgetPerDay = +(appData.budget / 30).toFixed(2);
        //     alert("Ваш бюджет на один день составляет " + appData.budgetPerDay);
        // },
        // detectLevel: function () {
        //     if (appData.budgetPerDay < 100) {
        //         console.log('budget is low');
        //     } else if (appData.budgetPerDay > 2000) {
        //         console.log('budget is big');
        //     } else if (appData.budgetPerDay <= 2000) {
        //         console.log('budget is normal');
        //     } else {
        //         console.log('something go wrong');
        //     }
        // },
        // chooseOptExpenses: function () {
        //     for (let i = 0, j = 1; i < 3; ++i) {
        //         let optExpense = prompt("Статья необязательных расходов?");
        //         if (typeof(optExpense) === 'string' && optExpense.length !== 0) {
        //             appData.optionalExpenses[j++] = optExpense;
        //         }
        //     }
        // },
        // checkSavings: function () {
        //     if (appData.savings) {
        //         let save = +prompt("Какова сумма накоплений?", "100000");
        //         let percent = +prompt("Под какой процент?", "5");
    
        //         appData.monthIncome = +(save / 100 / 12 * percent).toFixed(2);
        //         alert("Доход с вашего депозита: " + appData.monthIncome);
        //     }
        // },
        // chooseIncome: function() {
        //     let items = null;
        //     while (!items) {
        //         items = prompt('Что принесет дополнительный доход?', '');
        //     }
        //     this.income = items.split(', ');
        //     this.income.push(prompt('Может что-то еще?', ''));
        //     this.income.sort();
        //     /*
        //     console.log('Способы доп заработка:\n' + this.income.forEach(function(item, index) {
        //         return '\t' + (index + 1) + ': ' + item;
        //     }) );
        //     */
        //     console.log('Способы доп заработка:');
        //     this.income.forEach(function(item, index) {
        //         console.log('\t' + (index + 1) + ': ' + item);
        //     });
        // }
    };
    
    //appData.chooseIncome();
    // console.log('Наш объект содержит данные: ');
    // for (let key in appData) {
    //     console.log(key + ': ' + appData[key]);
    // }

    console.log(appData);

}());

