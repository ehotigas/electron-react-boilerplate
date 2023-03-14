import styles from "./LineChart.module.css";
import Chart from "react-google-charts";

interface LineChartProps {
    data: string[][],
    options: Object
}

export const LineChart = (
    {
        data,
        options
    }: LineChartProps
) => {
    return (
      <>
          <Chart
              className={styles.lineChart}
              width={"1000px"} //950px / 1000px
              height={"27em"}
              chartType="LineChart"
              // x={"2.5%"}
              // fill="#fff"
              data={data}
              options={options}
          />
      </>
)
}
