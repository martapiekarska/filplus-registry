import {
  type LDNActorsResponse,
  type Application,
  type Allocator,
} from '@/type'
import axios from 'axios'
import { getCurrentDate } from './utils'
import { getAccessToken } from './session'

/**
 * Axios client instance with a predefined base URL for making API requests.
 */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  async (error) => {
    return await Promise.reject(error)
  },
)

/**
 * Get applications for repo
 *
 * @param repo - The repo containing the applications to retrieve.
 * @param owner - The owner containing the repo.
 *
 * @returns {Promise<Application[]>}
 * @throws {Error} When the API call fails.
 */
export const getApplicationsForRepo = async (
  repo: string,
  owner: string,
): Promise<Application[] | undefined> => {
  try {
    const [activeResponse, mergedResponse] = await Promise.all([
      apiClient.get('application/active', {
        params: {
          repo,
          owner,
        },
      }),
      apiClient.get('application/merged', {
        params: {
          repo,
          owner,
        },
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
 * Get all applications of all repos
 *
 * @returns {Promise<Application[]>}
 * @throws {Error} When the API call fails.
 */
export const getAllApplications = async (): Promise<
  Application[] | undefined
> => {
  try {
    const applications = (await apiClient.get('/applications')).data.map(
      (e: { 0: Application; 1: string; 2: string }) => ({
        ...e[0],
        owner: e[1],
        repo: e[2],
      }),
    )

    return applications
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
  owner: string,
): Promise<Application | undefined> => {
  try {
    const { data } = await apiClient.get(`application`, {
      params: {
        id,
        owner,
        repo,
      },
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
  owner: string,
): Promise<Application | undefined> => {
  try {
    const { data } = await apiClient.post(
      `verifier/application/trigger`,
      {
        actor,
      },
      {
        params: {
          repo,
          owner,
          id,
        },
      },
    )
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
    const { data } = await apiClient.post(
      `verifier/application/propose`,
      {
        request_id: requestId,
        owner,
        repo,
        signer: {
          signing_address: address,
          // Datetime in format YYYY-MM-DDTHH:MM:SSZ
          created_at: getCurrentDate(),
          message_cid: signature,
        },
      },
      {
        params: {
          repo,
          owner,
          id,
          github_username: userName,
        },
      },
    )
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
    const { data } = await apiClient.post(
      `verifier/application/approve`,
      {
        request_id: requestId,
        owner,
        repo,
        signer: {
          signing_address: address,
          created_at: getCurrentDate(),
          message_cid: signature,
        },
      },
      {
        params: {
          repo,
          owner,
          id,
          github_username: userName,
        },
      },
    )
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
 * Retrieves all allocators using the Fil+ infrastructure.
 *
 * @returns A promise that resolves with a JSON containing the details of all allocators using the Fil+ infrastructure.
 */
export const getAllocators = async (): Promise<Allocator[]> => {
  try {
    const { data } = await apiClient.get(`allocators`)

    return data
  } catch (e) {
    console.error(e)
    throw e
  }
}

/**
 * Retrieve nonce for a given address
 * 
 * @param wallet_address - The address to retrieve the nonce for
 * @param multisig_address - The multisig address for which the wallet address is a signer
 * 
 * @returns A promise that resolves with the nonce for the given address
 */
export const getNonce = async (wallet_address: string, multisig_address:string): Promise<{
  nonce: string
}> => {
  try {
    const { data } = await apiClient.get(`nonce`, {
      params: {
        wallet_address: wallet_address,
        multisig_address: multisig_address
      },
    })

    return data
  } catch (e) {
    console.error(e)
    throw e
  }
}

/**
 * Test signature
 * 
 * @param wallet_address - The address to retrieve the nonce for
 * @param signature - The signature to test
 * 
 * @returns A promise that resolves with the result of the test
 */
export const testSignature = async (wallet_address: string, signature: string): Promise<{
  is_valid: boolean
}> => {
  try {
    const { data } = await apiClient.post(`test-signature`, {
      wallet_address: wallet_address,
      signature: signature
    })

    return data
  } catch (e) {
    console.error(e)
    throw e
  }
}