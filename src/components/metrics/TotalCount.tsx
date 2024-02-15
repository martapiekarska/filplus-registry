import { calculateTotalLastNDays } from "@/lib/utils";
import Square from "./Square";
import { CountMetrics } from "@/type";

interface Props {
  data: Array<CountMetrics>;
  n: number;
  bgColor: string;
  title?: string;
  isAmount: boolean;
}

const TotalCount = ({ data, n, bgColor, title, isAmount }: Props) => {
  return (
    <div className="flex items-center text-xs">
      <Square bgColor={bgColor} />
      {"Total: "}{data.reduce((a, b) => a += b.count,0)}{isAmount ? 'TiB' : ''}
    </div>
  );
};

export default TotalCount;
