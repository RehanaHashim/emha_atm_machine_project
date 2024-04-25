#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
// print welcome message
async function welcome() {
    let title = chalkAnimation.rainbow("\n \tWelcome To My New Project ATM Machine with REHANA HASHIM\n \t");
    await new Promise((resolve) => {
        setTimeout(resolve, 5000);
    });
    title.stop();
}
await welcome();
// Intailize user balance and pin code
let myBalance = 10000;
let myPin = 7788;
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: (chalk.yellow.bold("Enter your pin code:")),
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\nPin is correct, Login successfully!\n"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: (chalk.yellow.bold("Select an operation:")),
            choices: ["withdraw amount", "check balance"],
        }
    ]);
    if (operationAns.operation === "withdraw amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: (chalk.yellow.bold("select a withdraw method:")),
                choices: ["fast cash", "enter amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "fast cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: (chalk.yellow.bold("select amount:")),
                    choices: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 12000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("insufficient balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(chalk.green(`${fastCashAns.fastCash} withdraw successfully`));
                console.log(chalk.bgGrey(`your remaining balance is : ${myBalance}`));
            }
        }
        else if (withdrawAns.withdrawMethod === "enter amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:",
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("insufficient balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(chalk.green(`${amountAns.amount}Your amount is withdraw successfully`));
                console.log(chalk.bgGrey(` Your remaining balance is: ${myBalance}`));
            }
        }
    }
    else if (operationAns.operation === "check balance") {
        console.log(chalk.bgGray(`your remaining balance is: ${myBalance}`));
    }
}
else {
    console.log(chalk.red.bold("pin is incorrect , try again!"));
}
