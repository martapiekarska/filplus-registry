import ReactEcharts from "echarts-for-react";
import { InfoIcon } from "../icons";
import Tooltip from "./Tooltip";
import { useState } from "react";
import TotalCount from "./TotalCount";
import TimeRangeButton from "./TimeRangeButton";
import { ChartTooltipContent } from "./ChartTooltipContent";
import { BarData, GraphData } from "@/type";
import { barChartOption } from "@/lib/utils";
import { CHART_TITLES } from "@/lib/constants";

interface Props {
  graphData: GraphData;
}

const BarChart = ({ graphData }: Props) => {
  const [tab, setTab] = useState(graphData.data.length);

  let data: BarData[] = graphData.data;

  const option = barChartOption(data, graphData.isAmount);

  return (
    <div className="bg-white rounded-md flex flex-col p-4 shadow-md">
      <div className="flex justify-between px-10 items-center z-10">
        {/* TITLE */}
        <h4 className="text-xl font-semibold">
          {CHART_TITLES[graphData.title]}
        </h4>

        {/* TOTAL COUNT INFO */}
        <div className="flex space-x-2">
          <TotalCount
            data={graphData.data}
            title={""}
            n={tab}
            bgColor="bg-blue-500"
            isAmount={graphData.isAmount}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center space-x-4">
          <Tooltip comp={<ChartTooltipContent title={graphData.title} />}>
            <InfoIcon />
          </Tooltip>

          {/* TIME RANGE CHANGE BUTTONS */}
          <div>
            <TimeRangeButton tab={tab} setTab={setTab} changeTab={7} />
            <TimeRangeButton tab={tab} setTab={setTab} changeTab={14} />
          </div>
        </div>
      </div>

      <ReactEcharts option={option} />
    </div>
  );
};

export default BarChart;
