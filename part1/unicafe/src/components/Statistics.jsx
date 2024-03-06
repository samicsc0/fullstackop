import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad, getAverage, getTotal }) => {
  return (
    <>
      <StatisticLine text={"good"} value={good} />
      <StatisticLine text={"neutral"} value={neutral} />
      <StatisticLine text={"bad"} value={bad} />
      <StatisticLine text={"total"} value={good + neutral + bad} />
      <StatisticLine text={"average"} value={getAverage()} />
      <StatisticLine text={"positive"} value={(good * 100) / getTotal()} />
    </>
  );
};
export default Statistics;
