export interface Application {
  Version: number
  ID: string
  'Issue Number': string
  Client: Client
  Project: Record<string, unknown>
  Datacap: Datacap
  Lifecycle: Lifecycle
  'Allocation Requests': AllocationRequest[]
}

export interface Client {
  Name: string
  Region: string
  Industry: string
  Website: string
  'Social Media': string
  'Social Media Type': string
  Role: string
}

export interface Datacap {
  Type: string
  'Data Type': string
  'Total Requested Amount': string
  'Single Size Dataset': string
  Replicas: number
  'Weekly Allocation': string
}

export interface Lifecycle {
  State:
    | 'Submitted'
    | 'ReadyToSign'
    | 'StartSignDatacap'
    | 'Granted'
    | 'TotalDatacapReached'
    | 'Error'
  'Validated At': string
  'Validated By': string
  Active: boolean
  'Updated At': string
  'Active Request ID': string | null
  'On Chain Address': string
  'Multisig Address': string
}

export interface AllocationRequest {
  ID: string
  'Request Type': 'First' | 'Refill' | 'Remove'
  'Created At': string
  'Updated At': string
  Active: boolean
  'Allocation Amount': string
  Signers: Signer[]
}

export interface Signer {
  'Message CID': string
  'Signing Address': string
  'Created At': string
  'Github Username': string
}

export interface IWallet {
  loadWallet: (networkIndex: number) => Promise<void>
  selectNetwork: (nodeIndex: number) => Promise<this>
  getAccounts: (nStart?: number) => Promise<string[]>
  sign: (filecoinMessage: any, indexAccount: number) => Promise<any>
  api: any
}

export interface ConfigLotusNode {
  name?: string
  code?: number
  url: string | undefined
  token: string | undefined
  notaryRepo?: string
  notaryOwner?: string
  rkhMultisig?: string
  rkhtreshold?: number
  largeClientRequestAssign?: string[]
}

export interface API {
  actorAddress: (account: string) => Promise<string>
}

export interface ApiAllowanceResponse {
  error: string
  success: boolean
  data: string
}

export interface LDNActorsResponse {
  governance_gh_handles: string[]
  notary_gh_handles: string[]
}

export enum LDNActorType {
  Verifier = "verifier"
}

export interface CountMetrics {
  date: string;
  count: number;
}

export interface HealthcheckMetrics {
  ssaBot: boolean;
  dmobApi: boolean;
}

export interface BlockchainMetrics {
  successfulProposals: Array<CountMetrics>;
  failedProposals: Array<CountMetrics>;
  successfulApprovals: Array<CountMetrics>;
  failedApprovals: Array<CountMetrics>;
}

export interface UserMetrics {
  githubLogins: Array<CountMetrics>
  ledgerLogins: Array<CountMetrics>
  githubTokenLoads: Array<CountMetrics>
}

export interface ClientMetrics {
  newClients: Array<CountMetrics>
}

export interface ApplicationMetrics {
  applicationsCreated: Array<CountMetrics>;
  applicationsDeclaredStale: Array<CountMetrics>;
  applicationsWithOneGrantedAllocation: Array<CountMetrics>;
  applicationsTotalDatacapReached: Array<CountMetrics>;
  applicationsAdditionalTotalDatacap: Array<CountMetrics>;
}

export interface DatacapMetrics {
  requestedDatacap: Array<CountMetrics>,
  grantedDatacap: Array<CountMetrics>,
  refilledDatacap: Array<CountMetrics>,
  refillsGranted: Array<CountMetrics>,
  datacapUsed: Array<CountMetrics>,
}

export type ChartDataResponse = Record<string, Record<string, number>>;

export interface BarData {
  date: string;
  count: number;
}

export enum ChartKey {
  Healthcheck = "healthcheck",
  GithubLogins = "githubLogins",
  GithubTokenLoads = "githubTokenLoads",
  LedgerLogins = "ledgerLogins",
  SuccessfulProposals = "successfulProposals",
  SuccessfulApprovals = "successfulApprovals",
  FailedProposals = "failedProposals",
  FailedApprovals = "failedApprovals",
  NewClients = "newClients",
  ApplicationsCreated = "applicationsCreated",
  ApplicationsDeclaredStale = "applicationsDeclaredStale",
  ApplicationsWithOneGrantedAllocation = "applicationsWithOneGrantedAllocation",
  ApplicationsAdditionalTotalDatacap = "applicationsAdditionalTotalDatacap",
  ApplicationsTotalDatacapReached = "applicationsTotalDatacapReached",
  RequestedDatacap = "requestedDatacap",
  RefilledDatacap = "refilledDatacap",
  GrantedDatacap = "grantedDatacap",
  RefillsGranted = "refillsGranted",
  DatacapUsed = "datacapUsed",
}

export interface GraphData {
  title: ChartKey;
  data: Array<CountMetrics>
  isAmount: boolean;
}

export enum ServiceStatus {
  Online = "online",
  Offline = "offline",
  Checking = "checking"
}

export interface ServiceStatusProps {
  name: string;
  status: ServiceStatus;
}

export type Validator = (data: Response) => Promise<boolean>;

export interface CheckServiceStatusOptions {
  apiKey?: string;
  method?: string;
  body?: any;
}

export enum MetricsCategory {
  Healthcheck = "healthcheck",
  User = "user",
  Applications = "applications",
  Clients = "clients",
  Blockchain = "blockchain",
  Datacap = "datacap",
}

export interface Allocator {
  id: number;
  owner: string;
  repo: string;
  installation_id: string;
  multisig_address: string;
  verifiers_gh_handles: string;
  node_address?: string;
  node_token?: string;
}

export interface NodeConfig {
  nodeAddress: string;
  nodeToken: string;
}