import { useWeb3Modal } from "@web3modal/react"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Button, Input } from "reactstrap"
import { useAccount, useDisconnect } from "wagmi"
import ConfirmChangeDefaultWalletModal from "./ConfirmChangeDefaultWalletModal"

const ChangeDefaultWalletProfile = () => {
  const userWalletAddr = useSelector(
    state => state.Profile.user.default_wallet_address ?? ""
  )
  const [manualChangeWallet, setManualChangeWallet] = useState(userWalletAddr)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newWallet, setNewWallet] = useState("")
  const [isDisabled, setIsDisabled] = useState(true)

  const { open: openWalletConnectModal } = useWeb3Modal()
  const { disconnectAsync } = useDisconnect()

  useAccount({
    onConnect({ address }) {
      if (address && !isDisabled) {
        onWalletConnect(address)
      }
    },
  })

  function onWalletConnect(walletNumber) {
    setNewWallet(walletNumber)
    setIsModalOpen(true)
  }

  function saveChangeWallet() {
    setIsModalOpen(true)
    setNewWallet(manualChangeWallet)
  }

  function closeModal() {
    setNewWallet("")
    setIsModalOpen(false)
  }

  function cancelChange() {
    setIsDisabled(true)
    setManualChangeWallet(userWalletAddr)
  }

  async function changeWalletByWalletConnect() {
    await disconnectAsync()
    openWalletConnectModal()
  }

  useEffect(() => {
    if (manualChangeWallet !== userWalletAddr)
      setManualChangeWallet(userWalletAddr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userWalletAddr])

  return (
    <>
      <Input
        value={manualChangeWallet}
        disabled={isDisabled}
        onChange={e => setManualChangeWallet(e.target.value)}
      />
      <div className="mt-2 d-flex gap-2 flex-wrap">
        {isDisabled && (
          <>
            <Button color="primary" onClick={() => setIsDisabled(false)}>
              Редактировать
            </Button>
          </>
        )}
        {!isDisabled && (
          <>
            <Button
              color="success"
              onClick={saveChangeWallet}
              disabled={manualChangeWallet.length <= 40}
            >
              Сохранить
            </Button>
            <Button color="danger" onClick={cancelChange}>
              Отменить
            </Button>
            <Button color="primary" onClick={changeWalletByWalletConnect}>
              Подключить кошелек
            </Button>
          </>
        )}
      </div>
      <ConfirmChangeDefaultWalletModal
        closeModal={closeModal}
        isOpen={isModalOpen}
        wallet={newWallet}
      />
    </>
  )
}

export default ChangeDefaultWalletProfile
