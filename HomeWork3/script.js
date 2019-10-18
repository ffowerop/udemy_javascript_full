(function () {
    'use strict';
    // this function is strict...
        
    var money = +prompt("Ваш бюджет на месяц?", "180000");
    var time = prompt("Введите дату в формате YYYY-MM-DD", "2011-08-07");
    var appData = {
        budget: money,
        timeData: time,
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings: false
    };
    var questionsRepeat = 2;

    // Loop #1 FOR
    /* for (let mandatoryExpenseItem, mandatoryItemPrice, i = 0; i < questionsRepeat; ++i) {
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
    } */
    // Loop #2 WHILE
    /* let mandatoryExpenseItem, mandatoryItemPrice, i = 0;
    while (i < questionsRepeat) {
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
                ++i;
        } else {
            alert('Wrong data, try one more time...');
        }
    } */
    // Loop #3 DO WHILE
    let mandatoryExpenseItem, mandatoryItemPrice, i = 0;
    do {
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
                ++i;
        } else {
            alert('Wrong data, try one more time...');
        }
    }
    while (i < questionsRepeat);

    appData.budgetPerDay = appData.budget / 30;
    alert("Ваш бюджет на один день составляет " + appData.budgetPerDay);
    if (appData.budgetPerDay < 100) {
        console.log('budget is low');
    } else if (appData.budgetPerDay > 2000) {
        console.log('budget is big');
    } else if (appData.budgetPerDay <= 2000) {
        console.log('budget is normal');
    } else {
        console.log('something go wrong');
    }
    console.log(appData);
}());