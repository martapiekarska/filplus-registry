'use client'

import { useEffect, useState } from 'react'
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import { BlockieAvatar } from '@/components/scaffold-eth/BlockieAvatar'
import { wagmiConfig } from '@/services/web3/wagmiConfig'
import { appChains } from '@/services/web3/wagmiConnectors'
import AuthProvider from '@/components/AuthProvider'
import ReactQueryProvider from '@/context/ReactQueryProvider'
import Navbar from '@/components/Navbar'
import { AllocatorProvider } from '@/lib/AllocatorProvider'

export const ScaffoldEthAppWithProviders = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <AllocatorProvider>
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider
              chains={appChains.chains}
              avatar={BlockieAvatar}
              theme={lightTheme()}
            >
              <Navbar />
              {children}
            </RainbowKitProvider>
          </WagmiConfig>
        </AllocatorProvider>
      </AuthProvider>
    </ReactQueryProvider>
  )
}
