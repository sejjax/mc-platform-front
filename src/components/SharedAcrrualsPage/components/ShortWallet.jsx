import React from "react"
import { UncontrolledTooltip } from "reactstrap"

const ShortWallet = ({ id, wallet }) => {
  const shortWallet = `${wallet.slice(0, 5)}...${wallet.slice(-5)}`
  const tooltipId = `wallet__addr${id}`
  return (
    <div>
      <span id={tooltipId}>{shortWallet}</span>
      <UncontrolledTooltip placement="top" target={tooltipId} autohide={false}>
        {wallet}
      </UncontrolledTooltip>
    </div>
  )
}

export default ShortWallet
