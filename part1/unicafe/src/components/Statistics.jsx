import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad, getAverage, getTotal }) => {
  return (
    <>
    <table>
      <tr>
        <td>good</td>
        <td>{good}</td>
      </tr>
      <tr>
        <td>neutral</td>
        <td>{neutral}</td>
      </tr>
      <tr>
        <td>bad</td>
        <td>{bad}</td>
      </tr>
      <tr>
        <td>total</td>
        <td>{good + neutral + bad}</td>
      </tr>
      <tr>
        <td>average</td>
        <td>{getAverage()}</td>
      </tr>
      <tr>
        <td>positive</td>
        <td>{(good * 100) / getTotal()}</td>
      </tr>
    </table>
      {/* <StatisticLine text={"good"} value={good} />
      <StatisticLine text={"neutral"} value={neutral} />
      <StatisticLine text={"bad"} value={bad} />
      <StatisticLine text={"total"} value={good + neutral + bad} />
      <StatisticLine text={"average"} value={getAverage()} />
      <StatisticLine text={"positive"} value={(good * 100) / getTotal()} /> */}
    </>
  );
};
export default Statistics;
