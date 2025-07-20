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
    totalTransactions > 0
      ? (totalIncomeTransactions.length / totalTransactions) * 100
      : 0;
  const totalExpenseTransactionsPercentage =
    totalTransactions > 0
      ? (totalExpenseTransactions.length / totalTransactions) * 100
      : 0;

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
    totalTurnOver > 0 ? (totalIncomeTurnOver / totalTurnOver) * 100 : 0;
  const totalExpenseTurnOverPercentage =
    totalTurnOver > 0 ? (totalExpenseTurnOver / totalTurnOver) * 100 : 0;

  const allUniqueCategories = [
    ...new Set(transactions.map((t) => t.category).filter(Boolean)), // filter(Boolean) removes null/undefined/empty string categories
  ];

  const baseCategories = [
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

  const categoriesToDisplay = [
    ...new Set([...baseCategories, ...allUniqueCategories]),
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

      <div className="row mt-5">
        <div className="col-md-6">
          <div className="category-analysis">
            <h4>Income - Category Wise</h4>

            {(() => {
              const incomeCategoryData = categoriesToDisplay
                .map((category) => {
                  const amount = transactions
                    .filter(
                      (t) => t.type === "income" && t.category === category
                    )
                    .reduce((acc, t) => acc + Number(t.amount), 0);
                  return { category, amount };
                })
                .filter((data) => data.amount > 0)
                .sort((a, b) => b.amount - a.amount);

              let sumRoundedIncomePercentages = 0;
              const categoriesWithRoundedPercent = incomeCategoryData.map(
                (data) => {
                  const rawPercent =
                    totalIncomeTurnOver > 0
                      ? (data.amount / totalIncomeTurnOver) * 100
                      : 0;
                  const roundedPercent = Math.round(rawPercent);
                  sumRoundedIncomePercentages += roundedPercent;
                  return { ...data, roundedPercent };
                }
              );

              if (
                categoriesWithRoundedPercent.length > 0 &&
                totalIncomeTurnOver > 0
              ) {
                const lastCategory =
                  categoriesWithRoundedPercent[
                    categoriesWithRoundedPercent.length - 1
                  ];
                lastCategory.roundedPercent +=
                  100 - sumRoundedIncomePercentages;
              }

              return categoriesWithRoundedPercent.map((data) => (
                <div className="category-card" key={data.category}>
                  <h5>{data.category}</h5>
                  <Progress percent={data.roundedPercent} />
                </div>
              ));
            })()}
            {/* FIX END */}
          </div>
        </div>

        <div className="col-md-6">
          <div className="category-analysis">
            <h4>Expense - Category Wise</h4>

            {(() => {
              const expenseCategoryData = categoriesToDisplay
                .map((category) => {
                  const amount = transactions
                    .filter(
                      (t) => t.type === "expense" && t.category === category
                    )
                    .reduce((acc, t) => acc + Number(t.amount), 0);
                  return { category, amount };
                })
                .filter((data) => data.amount > 0)
                .sort((a, b) => b.amount - a.amount);

              let sumRoundedExpensePercentages = 0;
              const categoriesWithRoundedPercent = expenseCategoryData.map(
                (data) => {
                  const rawPercent =
                    totalExpenseTurnOver > 0
                      ? (data.amount / totalExpenseTurnOver) * 100
                      : 0;
                  const roundedPercent = Math.round(rawPercent);
                  sumRoundedExpensePercentages += roundedPercent;
                  return { ...data, roundedPercent };
                }
              );

              if (
                categoriesWithRoundedPercent.length > 0 &&
                totalExpenseTurnOver > 0
              ) {
                const lastCategory =
                  categoriesWithRoundedPercent[
                    categoriesWithRoundedPercent.length - 1
                  ];
                lastCategory.roundedPercent +=
                  100 - sumRoundedExpensePercentages;
              }

              return categoriesWithRoundedPercent.map((data) => (
                <div className="category-card" key={data.category}>
                  <h5>{data.category}</h5>
                  <Progress percent={data.roundedPercent} />
                </div>
              ));
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
