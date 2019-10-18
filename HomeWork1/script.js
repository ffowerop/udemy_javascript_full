var money = prompt("Ваш бюджет на месяц?", "100000");
var time = prompt("Введите дату в формате YYYY-MM-DD", "2011-08-07");
var appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

var mandatoryExpenseItem = prompt("Введите обязательную статью расходов в этом месяце", "Advertising");
var mandatoryItemPrice = prompt("Во сколько обойдется?", "18000");

appData.expenses[mandatoryExpenseItem] = mandatoryItemPrice;
alert("Ващ бюджет на один день составляет " + Number(appData.expenses[mandatoryExpenseItem]) / 30);

console.log(appData);