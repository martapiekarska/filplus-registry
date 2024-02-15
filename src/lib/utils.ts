import { ApplicationMetrics, BlockchainMetrics, ChartKey, ClientMetrics, DatacapMetrics, MetricsCategory, UserMetrics, type AllocationRequest, type Application, type BarData } from '@/type'
import ByteConverter from '@wtfcode/byte-converter'
import { type UnitNames } from '@wtfcode/byte-converter/dist/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export const getCurrentDate = (): string => {
  const now = new Date()

  const year = now.getUTCFullYear()
  const month = String(now.getUTCMonth() + 1).padStart(2, '0')
  const day = String(now.getUTCDate()).padStart(2, '0')
  const hours = String(now.getUTCHours()).padStart(2, '0')
  const minutes = String(now.getUTCMinutes()).padStart(2, '0')
  const seconds = String(now.getUTCSeconds()).padStart(2, '0')

  const milliseconds = String(now.getUTCMilliseconds()).padStart(3, '0')
  const nanoseconds = '000000'

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}${nanoseconds} UTC`
}

export const anyToBytes = (inputDatacap: string): number => {
  const formatDc = inputDatacap
    .replace(/[t]/g, 'T')
    .replace(/[b]/g, 'B')
    .replace(/[p]/g, 'P')
    .replace(/[I]/g, 'i')
    .replace(/\s*/g, '')
  const ext = formatDc.replace(/[0-9.]/g, '') as UnitNames
  const datacap = formatDc.replace(/[^0-9.]/g, '')
  const bytes = ByteConverter.convert(
    ByteConverter.value(parseFloat(datacap), ext),
    'B',
  )
  return Math.floor(bytes.value)
}

export const getLastDatacapAllocation = (
  application: Application,
): AllocationRequest | undefined => {
  if (application.Lifecycle['Active Request ID'] === null) {
    return undefined
  }
  const lastAllocation = application['Allocation Requests'].find(
    (allocation: AllocationRequest) =>
      allocation.ID === application.Lifecycle['Active Request ID'],
  )

  if (
    lastAllocation === undefined ||
    lastAllocation.Active ||
    lastAllocation.Signers.length !== 2
  ) {
    return undefined
  }

  return lastAllocation
}

export const shortenUrl = (
  url: string,
  first: number,
  last: number,
): string => {
  if (url.length <= first + last) {
    return url
  }

  const start = url.slice(0, first)
  const end = url.slice(-last)

  return `${start}[...]${end}`
}


export const calculateTotalLastNDays = (
  data: Record<string, number>,
  n: number
): number => {
  const values = Object.values(data);
  const lastNDaysValues = values.slice(-n);
  return lastNDaysValues.reduce((acc: number, value: number) => acc + value, 0);
};

export const barChartOption = (data: BarData[], isAmount: boolean) => {
  return {
    tooltip: {},
    grid: {
      left: "5%",
      right: "5%",
      top: "10%",
      bottom: "10%"
    },
    xAxis: {
      type: "category",
      data: data.map(item => item.date)
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        name: isAmount ? "Amount in PiB" :"",
        stack: "total",
        type: "bar",
        data: data.map(item => item.count),
        itemStyle: {
          color: "#2196F3"
        }
      },
    ]
  };
};

export const generateDataChartObject = (
  data: 
    BlockchainMetrics
    |  UserMetrics
    |  ClientMetrics
    |  ApplicationMetrics
    |  DatacapMetrics,
  category: MetricsCategory
) => {
    let dataForChart: BlockchainMetrics
      |  UserMetrics
      |  ClientMetrics
      |  ApplicationMetrics
      |  DatacapMetrics

    switch (category) {
      case MetricsCategory.Healthcheck:
        // to-do

      case MetricsCategory.User:
        dataForChart = data as UserMetrics;
        return [
          {
            title: ChartKey.GithubLogins,
            data: dataForChart.githubLogins,
            isAmount: false
          },
          {
            title: ChartKey.GithubTokenLoads,
            data: dataForChart.githubTokenLoads,
            isAmount: false
          },
          {
            title: ChartKey.LedgerLogins,
            data: dataForChart.ledgerLogins,
            isAmount: false
          },
        ]

      case MetricsCategory.Clients:
        dataForChart = data as ClientMetrics;
        return [
          {
            title: ChartKey.NewClients,
            data: dataForChart.newClients,
            isAmount: false
          },
        ]

      case MetricsCategory.Blockchain:
        dataForChart = data as BlockchainMetrics;
        return [
          {
            title: ChartKey.SuccessfulApprovals,
            data: dataForChart.successfulApprovals,
            isAmount: false
          },
          {
            title: ChartKey.SuccessfulProposals,
            data: dataForChart.successfulProposals,
            isAmount: false
          },
          {
            title: ChartKey.FailedApprovals,
            data: dataForChart.failedApprovals,
            isAmount: false
          },
          {
            title: ChartKey.FailedProposals,
            data: dataForChart.failedProposals,
            isAmount: false
          },
        ]

      case MetricsCategory.Applications:
        dataForChart = data as ApplicationMetrics;
        return [
          {
            title: ChartKey.ApplicationsCreated,
            data: dataForChart.applicationsCreated,
            isAmount: false
          },
          {
            title: ChartKey.ApplicationsDeclaredStale,
            data: dataForChart.applicationsDeclaredStale,
            isAmount: false
          },
          {
            title: ChartKey.ApplicationsWithOneGrantedAllocation,
            data: dataForChart.applicationsWithOneGrantedAllocation,
            isAmount: false
          },
          {
            title: ChartKey.ApplicationsAdditionalTotalDatacap,
            data: dataForChart.applicationsAdditionalTotalDatacap,
            isAmount: false
          },
          {
            title: ChartKey.ApplicationsTotalDatacapReached,
            data: dataForChart.applicationsTotalDatacapReached,
            isAmount: false
          },
        ]

      case MetricsCategory.Datacap:
        dataForChart = data as DatacapMetrics;
        return [
          {
            title: ChartKey.RequestedDatacap,
            data: dataForChart.requestedDatacap,
            isAmount: true
          },
          {
            title: ChartKey.RefilledDatacap,
            data: dataForChart.refilledDatacap,
            isAmount: true
          },
          {
            title: ChartKey.GrantedDatacap,
            data: dataForChart.grantedDatacap,
            isAmount: true
          },
          {
            title: ChartKey.RefillsGranted,
            data: dataForChart.refillsGranted,
            isAmount: false
          },
          {
            title: ChartKey.DatacapUsed,
            data: dataForChart.datacapUsed,
            isAmount: true
          },
        ]

    }
}