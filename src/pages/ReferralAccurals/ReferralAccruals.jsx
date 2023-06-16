// import Table from "components/Table/Table"
import SharedAccrualsPage from "components/SharedAcrrualsPage/SharedAccrualsPage"
import withForbiddenWithoutBuyingPackage from "hocs/withForbiddenWithoutBuyingPackage"
import React, { useEffect } from "react"
import { MetaTags } from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import { Container } from "reactstrap"
import { fetchAccruals } from "store/accruals/actions"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { columns, DISPLAYED_KEY_NAMES } from "./columns"

export const ReferralAccruals = () => {
  const items = useSelector(state => state.Accruals.items)
  const dispatch = useDispatch()

  const formattedItems = items.map(({ userPartner, ...otherFields }) => ({
    ...otherFields,
    referralPartnerId: userPartner?.partnerId ?? "",
    referralFullName: userPartner?.fullName ?? "",
  }))

  useEffect(() => {
    dispatch(fetchAccruals("referrals"))
  }, [])

  return (
    <div className="page-content">
      <MetaTags>
        <title>Реферальные начисления MCapital</title>
      </MetaTags>
      <Container fluid>
        <Breadcrumbs
          title="Metrics"
          hasBreadcrumbItem={false}
          breadcrumbItem="Реферальные начисления"
        />
        <SharedAccrualsPage
          items={formattedItems}
          columns={columns}
          displayedKeyNames={DISPLAYED_KEY_NAMES}
        />
      </Container>
    </div>
  )
}

export default withForbiddenWithoutBuyingPackage(ReferralAccruals)
