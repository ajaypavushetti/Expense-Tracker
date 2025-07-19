import React from "react";
import "../resources/analytics.css";
import { Progress } from "antd";

const Analytics = ({ transactions }) => {
  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const totalIncomeTransactionsPercentage =
    (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpenseTransactionsPercentage =
    (totalExpenseTransactions.length / totalTransactions) * 100;

  const totalTurnOver = transactions.reduce(
    (acc, transaction) => acc + Number(transaction.amount),
    0
  );

  const totalIncomeTurnOver = transactions.reduce(
    (acc, transaction) =>
      acc + (transaction.type === "income" ? Number(transaction.amount) : 0),
    0
  );

  const totalExpenseTurnOver = transactions.reduce(
    (acc, transaction) =>
      acc + (transaction.type === "expense" ? Number(transaction.amount) : 0),
    0
  );

  const totalIncomeTurnOverPercentage =
    (totalIncomeTurnOver / totalTurnOver) * 100;

  const totalExpenseTurnOverPercentage =
    (totalExpenseTurnOver / totalTurnOver) * 100;

  const categories = [
    "salary",
    "entertainment",
    "freelance",
    "food",
    "travel",
    "investment",
    "education",
    "medical",
    "tax",
  ];

  return (
    <div className="analytics">
      <div className="row">
        <div className="col-md-4 mt-3">
          <div className="transactions-count">
            <h4>Total Transactions : {totalTransactions}</h4>
            <hr />
            <h5>Income : {totalIncomeTransactions.length}</h5>
            <h5>Expense : {totalExpenseTransactions.length}</h5>

            <div className="progress-bars">
              <Progress
                className="mx-5"
                strokeColor="blue"
                type="circle"
                percent={Math.round(totalIncomeTransactionsPercentage)}
              />
              <Progress
                strokeColor="red"
                type="circle"
                percent={Math.round(totalExpenseTransactionsPercentage)}
              />
            </div>
          </div>
        </div>

        <div className="col-md-4 mt-3">
          <div className="transactions-count">
            <h4>Total Turnover : {totalTurnOver}</h4>
            <hr />
            <h5>Income : {totalIncomeTurnOver}</h5>
            <h5>Expense : {totalExpenseTurnOver}</h5>

            <div className="progress-bars">
              <Progress
                className="mx-5"
                strokeColor="blue"
                type="circle"
                percent={Math.round(totalIncomeTurnOverPercentage)}
              />
              <Progress
                strokeColor="red"
                type="circle"
                percent={Math.round(totalExpenseTurnOverPercentage)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="income-category-analysis">
            <h3>Income - Category Wise</h3>
            {categories.map((category) => {
              const amount = transactions
                .filter(
                  (t) => t.type === "income" && t.category === category
                )
                .reduce((acc, t) => acc + Number(t.amount), 0);

              const percent =
                totalIncomeTurnOver > 0
                  ? Math.round((amount / totalIncomeTurnOver) * 100)
                  : 0;

              return (
               amount>0 && <div className="category-card" key={category}>
                  <h5>{category}</h5>
                  <Progress percent={percent} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
