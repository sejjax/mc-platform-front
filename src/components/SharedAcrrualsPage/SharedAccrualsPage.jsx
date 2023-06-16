import Table from "components/AnotherTable/Table"
import withForbiddenWithoutBuyingPackage from "hocs/withForbiddenWithoutBuyingPackage"
import useWindowSize from "hooks/useWindowSize"
import React, { useEffect, useMemo, useState, useRef } from "react"
import { Card, CardBody, Input, Label } from "reactstrap"

const DepositAccruals = ({ items, columns, displayedKeyNames }) => {
  const { width: windowWidth } = useWindowSize()
  const table = useRef(null)

  const [showNulled, setShowNulled] = useState(false)
  const [showSended, setShowSended] = useState(false)
  const [sort, setSort] = useState({
    field: "",
    order: "asc",
  })
  const isMobile = windowWidth <= 770

  const filteredAndSorteredItems = useMemo(() => {
    let sortedItems = [...items]
    if (isMobile) {
      const sortKey = sort.field
      const sortOrder = sort.order
      sortedItems.sort((a, b) => {
        if (sortOrder === "asc") {
          if (sortKey === "payment_date")
            return (
              new Date(a[sortKey]).getTime() - new Date(b[sortKey]).getTime()
            )
          return a[sortKey] - b[sortKey]
        }
        if (sortOrder === "desc") {
          if (sortKey === "payment_date")
            return (
              new Date(b[sortKey]).getTime() - new Date(a[sortKey]).getTime()
            )
          return b[sortKey] - a[sortKey]
        }
      })
    }
    if (showNulled === true && showSended === true) return sortedItems
    return sortedItems.filter(item => {
      const sendedFilter = showSended ? true : item.status !== "sent"
      const nulledFilter = showNulled ? true : item.status !== "nulled"
      return sendedFilter && nulledFilter
    })
  }, [items, showNulled, sort, isMobile, showSended])

  const itemKeys = Object.keys(items[0] ?? {}).filter(
    key => !!displayedKeyNames[key]
  )

  const onSortChange = event => {
    const sortChangeType = event.target.name
    setSort(prev => ({ ...prev, [sortChangeType]: event.target.value }))
  }

  useEffect(() => {
    if (isMobile && sort.field) {
      table.current.sortContext.handleSort(sort.field)
    }
  }, [sort, isMobile])

  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center gap-3">
          <div style={{ flex: "1 1 auto" }}>
            {isMobile && (
              <div className="d-flex gap-2 flex-wrap table_mobile_select">
                <Input
                  type="select"
                  value={sort.field}
                  onChange={onSortChange}
                  name="field"
                >
                  <option disabled value="">
                    Поле сортировки
                  </option>
                  {itemKeys &&
                    itemKeys.map((key, index) => (
                      <option key={`${key}_${index}`} value={key}>
                        {displayedKeyNames[key]}
                      </option>
                    ))}
                </Input>
                <Input type="select" onChange={onSortChange} name="order">
                  <option value="asc">По возрастанию</option>
                  <option value="desc">По убыванию</option>
                </Input>
              </div>
            )}
          </div>
          <div className="text-end d-flex flex-column align-items-baseline">
            <Label>
              <Input
                type="checkbox"
                checked={showNulled}
                onChange={event => setShowNulled(event.target.checked)}
                className="me-1"
              />
              Показать аннулированные
            </Label>
            <Label>
              <Input
                type="checkbox"
                checked={showSended}
                onChange={event => setShowSended(event.target.checked)}
                className="me-1"
              />
              Показать отправленные
            </Label>
          </div>
        </div>
        <Table
          ref={table}
          keyField="id"
          columns={columns}
          data={filteredAndSorteredItems}
          custom={{
            classes: "table__adaptive_bordered_between text-center",
            defaultSorted: [{ dataField: "payment_date", order: "asc" }],
          }}
        />
      </CardBody>
    </Card>
  )
}

export default withForbiddenWithoutBuyingPackage(DepositAccruals)
