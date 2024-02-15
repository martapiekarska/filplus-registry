'use client'
import BarChart from '@/components/metrics/BarChart'
import { Spinner } from '@/components/ui/spinner'
import { ChartKey, CountMetrics, GraphData, MetricsCategory } from '@/type'

import * as mockData from '@/lib/mockData.json';
import { generateDataChartObject } from '@/lib/utils';

interface ComponentProps {
  params: {
    category: MetricsCategory
  }
}

const Metrics: React.FC<ComponentProps> = ({
  params: { category },
}: {
  params: { category: MetricsCategory }
}) => {
  //to remove - from here
  const isLoading = false;
  //to remove - until here

  // to uncomment
  // const { data, isLoading } = useQuery({
  //   queryKey: ['metrics', category],
  //   queryFn: async () => await getMetrics(category),
  //   refetchInterval: 10000,
  // })
  let graphData: GraphData[] = [];

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-20">
        <Spinner />
      </div>
    )
    
    // to change to if (data)
    if (mockData) {
      // to remove
      let adjustedMockData = mockData as any;
      // until here
      graphData = generateDataChartObject(adjustedMockData[`${category}Metrics`], category)
    }
  
    return (
      <>
        {category !== MetricsCategory.Healthcheck ?
          (
            <div className="flex flex-col gap-10">
              {graphData.map(item => (
                <BarChart graphData={item} key={item.title} />
              ))}
            </div>
          ) 
          : <></>
        }
        </>
        );
      }
      
export default Metrics
