import { type LDNActorsResponse, type Application, BlockchainMetrics, UserMetrics, ApplicationMetrics, DatacapMetrics, HealthcheckMetrics, Allocator } from '@/type'
import axios from 'axios'
import { getCurrentDate } from './utils'

/**
 * Axios client instance with a predefined base URL for making API requests.
 */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

/**
 * Get all applications
 *
 * @returns {Promise<Application[]>}
 * @throws {Error} When the API call fails.
 */
export const getAllApplications = async (repo: string, owner: string): Promise<
  Application[] | undefined
> => {
  try {
    const [activeResponse, mergedResponse] = await Promise.all([
      apiClient.get('application/active', {
        params: {
          repo,
          owner
        }
      }),
      apiClient.get('application/merged', {
        params: {
          repo,
          owner
        }
      }),
    ])
    if (
      !Array.isArray(activeResponse.data) ||
      !Array.isArray(mergedResponse.data)
    ) {
      throw new Error('Received invalid data from the API')
    }

    const activeApplicationsMap = new Map(
      activeResponse.data.map((app: Application) => [app.ID, app]),
    )

    // Here we merge the active applications with the merged applications prioritizing the active ones
    const allApplications = [
      ...activeResponse.data,
      ...mergedResponse.data
        .filter(([prData, app]) => !activeApplicationsMap.has(app.ID))
        .map(([prData, mergedApp]) => mergedApp),
    ]

    return allApplications
  } catch (error: any) {
    console.error(error)

    const message = error?.message ?? 'Failed to fetch applications'
    throw new Error(message)
  }
}

/**
 * Retrieves an application based on its ID.
 *
 * @param id - The ID of the application to retrieve.
 * @returns A promise that resolves with the application data or undefined if there's an error.
 */
export const getApplicationByParams = async (
  id: string,
  repo: string,
  owner: string
): Promise<Application | undefined> => {
  try {
    const { data } = await apiClient.get(`application`, {
      params: {
        id,
        owner,
        repo,
      }
    })
    if (Object.keys(data).length > 0) return data
  } catch (error) {
    console.error(error)
  }
}

/**
 * Triggers a LDN application based on its ID.
 *
 * @param id - The ID of the application to trigger.
 * @param actor - The actor that triggers the application.
 * @returns A promise that resolves with the application data after the trigger or undefined if there's an error.
 */
export const postApplicationTrigger = async (
  id: string,
  actor: string,
  repo: string,
  owner: string
): Promise<Application | undefined> => {
  try {
    const { data } = await apiClient.post(`application/${id}/trigger`, {
      actor,
      repo,
      owner
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

/**
 * Proposes a LDN application based on its ID.
 *
 * @param id - The ID of the application to propose.
 * @param requestId - The id of the request to send.
 * @returns A promise that resolves with the application data after the trigger or undefined if there's an error.
 */
export const postApplicationProposal = async (
  id: string,
  requestId: string,
  userName: string,
  owner: string,
  repo: string,
  address: string,
  signature: string,
): Promise<Application | undefined> => {
  try {
    const { data } = await apiClient.post(`application/${id}/propose`, {
      request_id: requestId,
      owner,
      repo,
      signer: {
        signing_address: address,
        // Datetime in format YYYY-MM-DDTHH:MM:SSZ
        created_at: getCurrentDate(),
        message_cid: signature,
        github_username: userName,
      },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

/**
 * Approves a LDN application based on its ID.
 *
 * @param id - The ID of the application to approve.
 * @param requestId - The id of the request to send.
 * @returns A promise that resolves with the application data after the trigger or undefined if there's an error.
 */
export const postApplicationApproval = async (
  id: string,
  requestId: string,
  userName: string,
  owner: string,
  repo: string,
  address: string,
  signature: string,
): Promise<Application | undefined> => {
  try {
    const { data } = await apiClient.post(`application/${id}/approve`, {
      request_id: requestId,
      owner,
      repo,
      signer: {
        signing_address: address,
        created_at: getCurrentDate(),
        message_cid: signature,
        github_username: userName,
      },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

/**
 * Retrieves an application based on its ID.
 *
 * @returns A promise that resolves with a JSON containing 2 lists: notaries info, governance team info.
 */
export const fetchLDNActors = async (): Promise<
  LDNActorsResponse | undefined
> => {
  try {
    const { data } = await apiClient.get(`ldn-actors`)

    return data
  } catch (e) {
    console.error(e)
  }
}

/**
 * Retrieves metrics (statistics) based on category of metrics.
 *
 * @returns A promise that resolves with a JSON containing all metrics of sent category.
 */
export const getMetrics = async (category: string): Promise<
  HealthcheckMetrics
  | UserMetrics 
  | BlockchainMetrics 
  | ApplicationMetrics 
  | DatacapMetrics
> => {
  try {
    const { data } = await apiClient.get(`metrics/${category}`)

    return data
  } catch (e) {
    console.error(e)
    throw e
  }
}

/**
 * Retrieves all allocators using the Fil+ infrastructure.
 *
 * @returns A promise that resolves with a JSON containing the details of all allocators using the Fil+ infrastructure.
 */
export const getAllocators = async (): Promise<Array<Allocator>> => {
  try {
    const { data } = await apiClient.get(`allocators`)

    return data
  } catch (e) {
    console.error(e);
    throw e;
  }
}
