const ChartSkeleton = () => {
  return (
    <div className="bg-white rounded-md flex flex-col px-16 py-8 shadow-md h-[360px]">
      <div className="flex justify-between">
        <div className="w-32 bg-gray-300 animate-pulse h-9 mb-10"></div>
        <div className="w-32 bg-gray-300 animate-pulse h-9 mb-10"></div>
        <div className="w-32 bg-gray-300 animate-pulse h-9 mb-10"></div>
      </div>

      <div className="h-[200px] flex space-x-11 items-end">
        <div className="flex-1 h-5/6 bg-gray-300 animate-pulse"></div>
        <div className="flex-1 h-3/6 bg-gray-300 animate-pulse"></div>
        <div className="flex-1 h-4/6 bg-gray-300 animate-pulse"></div>
        <div className="flex-1 h-3/6 bg-gray-300 animate-pulse"></div>
        <div className="flex-1 h-4/6 bg-gray-300 animate-pulse"></div>
        <div className="flex-1 h-2/6 bg-gray-300 animate-pulse"></div>
        <div className="flex-1 h-full bg-gray-300 animate-pulse"></div>
      </div>
    </div>
  );
};

interface Props {
  page?: string;
}

const ChaartSkeletonWrapper = ({ page }: Props) => {
  return (
    <div className="flex flex-col space-y-4">
      <ChartSkeleton />
      {page !== "bugs" && <ChartSkeleton />}
    </div>
  );
};

export default ChaartSkeletonWrapper;
