import { ChartKey } from "@/type";
import Square from "./Square";
import { METRICS_TOOLTIP_INFO } from "@/lib/constants";

interface Props {
  title: ChartKey;
}

export const ChartTooltipContent = ({ title }: Props) => {
  return (
    <div className="flex flex-col space-y-2 py-2">
      <p>
        <Square bgColor="bg-blue-50" />
        <span className="pr-1 font-semibold">
          {METRICS_TOOLTIP_INFO[title].title}
        </span>
        <span>{METRICS_TOOLTIP_INFO[title].desc}</span>
      </p>
      <p>{METRICS_TOOLTIP_INFO?.[title]?.extraInfo}</p>
    </div>
  );
};
