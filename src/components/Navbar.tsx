'use client'
import { Github } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import UserNav from './UserNav'
import { Button } from './ui/button'
import Image from 'next/image'
import { RainbowKitCustomConnectButton } from './scaffold-eth/RainbowKitCustomConnectButton'
import { getNonce, testSignature } from '@/lib/apiClient'
import { useAccount, useSignMessage } from 'wagmi'

const Navbar: React.FC = () => {
  const session = useSession()
  const { address, isConnected } = useAccount()
  const { data: signMessageData, error, isLoading, signMessage, signMessageAsync, variables } = useSignMessage()

  const testSignatureAction = async () => {
    if (!address) return
    const response = await getNonce(address, 'test')

    const signature = await signMessageAsync({
      message: response.nonce,
    })

    const isAuth = await testSignature(
      address,
      signature,
    )

    console.log('isAuth: ', isAuth.is_valid);
  }

  return (
    <div className="h-16 shadow-md flex items-center px-12 justify-between">
      <Link href="/">
        <Image
          src="/filplus-logo.png"
          width="150"
          height="50"
          alt="filecoin plus logo"
        />
      </Link>
      <RainbowKitCustomConnectButton />
      <div onClick={testSignatureAction}>Click me</div>

      <div>
        {session.status !== 'authenticated' ? (
          <Button onClick={() => void signIn('github')}>
            <Github className="mr-2 h-4 w-4" /> Login with Github
          </Button>
        ) : (
          <UserNav />
        )}
      </div>
    </div>
  )
}

export default Navbar
