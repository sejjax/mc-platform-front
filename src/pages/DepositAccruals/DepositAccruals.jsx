import SharedAccrualsPage from "components/SharedAcrrualsPage/SharedAccrualsPage"
import withForbiddenWithoutBuyingPackage from "hocs/withForbiddenWithoutBuyingPackage"
import React, { useEffect } from "react"
import { MetaTags } from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import { Container } from "reactstrap"
import { fetchAccruals } from "store/accruals/actions"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { columns, DISPLAYED_KEY_NAMES } from "./columns"

const DepositAccruals = () => {
  const items = useSelector(state => state.Accruals.items)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAccruals("deposit"))
  }, [])

  return (
    <div className="page-content">
      <MetaTags>
        <title>Проектные начисления MCapital</title>
      </MetaTags>
      <Container fluid>
        <Breadcrumbs
          title="Metrics"
          hasBreadcrumbItem={false}
          breadcrumbItem="Проектные начисления"
        />
        <SharedAccrualsPage
          items={items}
          columns={columns}
          displayedKeyNames={DISPLAYED_KEY_NAMES}
        />
      </Container>
    </div>
  )
}

export default withForbiddenWithoutBuyingPackage(DepositAccruals)
