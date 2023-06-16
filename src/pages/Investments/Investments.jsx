import Table from "components/AnotherTable/Table"
import withForbiddenWithoutBuyingPackage from "hocs/withForbiddenWithoutBuyingPackage"
import React, { useEffect } from "react"
import { MetaTags } from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardBody, Container } from "reactstrap"
import { fetchInvestments } from "store/investments/actions"

import Breadcrumbs from "../../components/Common/Breadcrumb"
import { columns } from "./columns"

const Investments = () => {
  const items = useSelector(state => state.Investments.items)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchInvestments())
  }, [])

  return (
    <div className="page-content">
      <MetaTags>
        <title>Инвестиции MCapital</title>
      </MetaTags>
      <Container fluid>
        <Breadcrumbs
          title="Metrics"
          hasBreadcrumbItem={false}
          breadcrumbItem="Инвестиции"
        />
        <Card>
          <CardBody>
            <Table
              keyField="id"
              columns={columns}
              data={items}
              custom={{
                classes: "table__adaptive_bordered_between text-center",
                defaultSorted: [{ dataField: "date", order: "asc" }],
              }}
            />
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}

export default withForbiddenWithoutBuyingPackage(Investments)
