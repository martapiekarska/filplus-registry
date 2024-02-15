import { ChartKey, ServiceStatus } from "@/type";

export const requestTypeColor = {
  First: 'bg-lime-500 text-white',
  Refill: 'bg-teal-500 text-white',
  default: 'bg-gray-400 text-white',
}

export const stateColor = {
  Submitted: 'bg-blue-400 text-white',
  StartSignDatacap: 'bg-purple-400 text-white',
  ReadyToSign: 'bg-orange-500 text-white',
  Granted: 'bg-green-400 text-white',
}

export const allocationActiveColor = {
  inactive: 'bg-purple-400 text-white',
  active: 'bg-green-500 text-white',
}

export const stateMapping = {
  Submitted: 'Pending Governance Review',
  StartSignDatacap: 'Start sign datacap',
  ReadyToSign: 'Ready to sign',
  Granted: 'Granted',
}

export const METRICS_TOOLTIP_INFO: {
  [key: string]: {
    title: string;
    desc: string;
    extraInfo: string;
  }
} = {
  githubLogins: {
    title: 'titleText',
    desc: 'descText',
    extraInfo: 'extraInfoText'
  },
  githubTokenLoads: {
    title: 'titleText',
    desc: 'descText',
    extraInfo: 'extraInfoText'
  },
  ledgerLogins: {
    title: 'titleText',
    desc: 'descText',
    extraInfo: 'extraInfoText'
  },
  newClients: {
    title: 'titleText',
    desc: 'descText',
    extraInfo: 'extraInfoText'
  },
  successfulApprovals: {
    title: 'titleText',
    desc: 'descText',
    extraInfo: 'extraInfoText'
  },
  successfulProposals: {
    title: 'titleText',
    desc: 'descText',
    extraInfo: 'extraInfoText'
  },
  failedApprovals: {
    title: 'titleText',
    desc: 'descText',
    extraInfo: 'extraInfoText'
  },
  failedProposals: {
    title: 'titleText',
    desc: 'descText',
    extraInfo: 'extraInfoText'
  },
  applicationsCreated: {
    title: 'titleText',
    desc: 'descText',
    extraInfo: 'extraInfoText'
  },
  applicationsDeclaredStale: {
    title: 'titleText',
    desc: 'descText',
    extraInfo: 'extraInfoText'
  },
  applicationsWithOneGrantedAllocation: {
    title: 'titleText',
    desc: 'descText',
    extraInfo: 'extraInfoText'
  },
  applicationsAdditionalTotalDatacap: {
    title: 'titleText',
    desc: 'descText',
    extraInfo: 'extraInfoText'
  },
  applicationsTotalDatacapReached: {
    title: 'titleText',
    desc: 'descText',
    extraInfo: 'extraInfoText'
  },
  requestedDatacap: {
    title: 'titleText',
    desc: 'descText',
    extraInfo: 'extraInfoText'
  },
  refilledDatacap: {
    title: 'titleText',
    desc: 'descText',
    extraInfo: 'extraInfoText'
  },
  grantedDatacap: {
    title: 'titleText',
    desc: 'descText',
    extraInfo: 'extraInfoText'
  },
  refillsGranted: {
    title: 'titleText',
    desc: 'descText',
    extraInfo: 'extraInfoText'
  },
  datacapUsed: {
    title: 'titleText',
    desc: 'descText',
    extraInfo: 'extraInfoText'
  },
};

export const CHART_TITLES: Record<ChartKey, string> = {
  [ChartKey.Healthcheck]: "",
  [ChartKey.LedgerLogins]: "Ledger Logins",
  [ChartKey.GithubLogins]: "Github Logins",
  [ChartKey.GithubTokenLoads]: "Github Token Loads",
  [ChartKey.SuccessfulProposals]: "Proposals - Successful",
  [ChartKey.SuccessfulApprovals]: "Approvals - Successful",
  [ChartKey.FailedProposals]: "Proposals - Failed",
  [ChartKey.FailedApprovals]: "Approvals - Failed",
  [ChartKey.NewClients]: "Clients - New",
  [ChartKey.ApplicationsCreated]: "Applications - Created",
  [ChartKey.ApplicationsDeclaredStale]: "Applications - Declared Stale",
  [ChartKey.ApplicationsWithOneGrantedAllocation]: "Applications - At Least 1 Granted Allocation",
  [ChartKey.ApplicationsAdditionalTotalDatacap]: "Applications - Additional Total Datacap Requested",
  [ChartKey.ApplicationsTotalDatacapReached]: "Applications - Total Datacap Reached",
  [ChartKey.RequestedDatacap]: "DataCap - Requested",
  [ChartKey.RefilledDatacap]: "DataCap - Refilled",
  [ChartKey.GrantedDatacap]: "DataCap - Granted",
  [ChartKey.RefillsGranted]: "DataCap - Refills",
  [ChartKey.DatacapUsed]: "DataCap - Used",
};

export const SERVICE_STATUS: Record<ServiceStatus, string> = {
  [ServiceStatus.Online]: "online",
  [ServiceStatus.Offline]: "offline",
  [ServiceStatus.Checking]: "checking"
};
