import React, { useEffect } from "react"
import PropTypes from "prop-types"

import { Label, Input } from "reactstrap"

import { shallowEqual, useDispatch, useSelector } from "react-redux"
import {
  setDepositSuccess,
  setProfileData,
  setProjectButtonCondition,
} from "store/actions"
import { recipientAddress } from "./contract/environment"
import { sendDeposit } from "services/depositService"

import { setDisabledProjectTime } from "helpers/DisabledProject/DisabledProject"
import {
  checkTransactionLongPolling,
  retriesExceededErrorName,
} from "services/projectService"
import { DepositStatus } from "../BaseDepositModal/BaseDepositModal"
import { useAccount, useDisconnect } from "wagmi"
import { Controller, useForm } from "react-hook-form"
import { useWeb3Modal } from "@web3modal/react"
import { ethers } from "ethers"
import { useUsdtTransfer } from "hooks/useUsdtTransfer"

const ByTokenForm = ({
  closeModal,
  setBaseDepositContent,
  setDepositStatus,
}) => {
  const { allProjectsSlug, depositSuccess, loading, minAmount, serviceName } =
    useSelector(byTokenFormSelector, shallowEqual)

  const { disconnect: disconnectWallet } = useDisconnect()
  const { open: openWalletConnectModal } = useWeb3Modal()
  const {
    watch,
    formState: { errors: formErrors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: { amount: minAmount.toString() },
    mode: "onChange",
  })
  const dispatch = useDispatch()
  const { address, isConnected } = useAccount()
  const amount = watch("amount")
  const tokenValue = ethers.utils.parseUnits(amount || "0", "ether")
  const [usdtTransfer] = useUsdtTransfer({
    amount: tokenValue,
    recipientAddress,
  })

  async function onSubmit(values) {
    try {
      setDepositStatus(DepositStatus.loading)
      if (serviceName.includes("basic") && !serviceName.includes("investor")) {
        setBaseDepositContent(true)
      }
      const currentTimePlusMinutes = new Date()
      currentTimePlusMinutes.setMinutes(currentTimePlusMinutes.getMinutes() + 2)
      setDisabledProjectTime(currentTimePlusMinutes.getTime())
      dispatch(setProjectButtonCondition(true))
      const body = {
        product_service_description: serviceName,
        wallet_addr: address,
        amount: values.amount.toString(),
      }
      const transaction = await sendDeposit(body)
      usdtTransfer.write?.()
      const successTransaction = await checkTransactionLongPolling(
        transaction.id
      )
      if (
        serviceName.includes("basic") &&
        !serviceName.includes("investor") &&
        successTransaction.investorLevel
      ) {
        dispatch(
          setProfileData({
            investorLevel: successTransaction.investorLevel,
            baseDepositLevel: parseInt(serviceName[serviceName.length - 1]),
          })
        )
      }
      setDepositStatus(DepositStatus.success)
    } catch (error) {
      if (error.message === retriesExceededErrorName) {
        return
      }
      if (error.message !== "User canceled") {
        dispatch(setDepositSuccess(false))
      }
      setDepositStatus(DepositStatus.error)
    } finally {
      setDisabledProjectTime(0)
      dispatch(setProjectButtonCondition(false))
    }
  }

  useEffect(() => {
    if (depositSuccess) {
      closeModal()
    }
    return () => {
      dispatch(setDepositSuccess(null))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositSuccess])

  return (
    <div className="form-horizontal">
      <div className="mt-4">
        <Label className="form-label" htmlFor="mcToken">
          Внести средства в проект
        </Label>
      </div>
      <div className="mt-4">
        <div className="d-flex align-items-strech">
          <div
            style={{
              width: "86px",
              borderRadius: "0.25rem 0 0 0.25rem",
              borderRight: "none",
            }}
            className="input-group-text d-flex justify-content-center"
          >
            USDT
          </div>
          <Controller
            name="amount"
            control={control}
            rules={{ required: true, min: minAmount }}
            render={({ field }) => (
              <Input
                type="number"
                disabled={!allProjectsSlug.includes("investor")}
                style={{ borderRadius: "0 0.25rem 0.25rem 0" }}
                {...field}
                invalid={!!formErrors.amount}
              />
            )}
          />
        </div>

        {allProjectsSlug === "investor" && (
          <div className="mt-1">Минимальная сумма: {minAmount}</div>
        )}
      </div>
      <div className="mt-3 d-flex">
        <button
          className="btn btn-success"
          disabled={
            !address || loading || !usdtTransfer.write || !!formErrors.amount
          }
          onClick={handleSubmit(onSubmit)}
        >
          Внести средства
        </button>
        {!isConnected && (
          <button
            className="btn btn-primary ms-2"
            onClick={openWalletConnectModal}
          >
            Подключить кошелек
          </button>
        )}
        {isConnected && (
          <button
            className="btn btn-danger ms-2"
            disabled={loading}
            onClick={disconnectWallet}
          >
            Отключить кошелек
          </button>
        )}
      </div>
      {isConnected && (
        <div className="mt-3">Подключенный кошелек: {address}</div>
      )}
    </div>
  )
}

export default ByTokenForm

ByTokenForm.propTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  closeModal: PropTypes.func,
}

function byTokenFormSelector(state) {
  const { projectDetail, projects } = state.Project
  const { loading, depositSuccess } = state.Wallet
  return {
    loading,
    depositSuccess,
    minAmount: projectDetail.min_amount,
    serviceName: projectDetail.service_name,
    allProjectsSlug: projects.slug,
  }
}

