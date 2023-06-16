import PropTypes from "prop-types"
import React from "react"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"

import CountryFlag from "./CountryFlag"

import "../scss/list.scss"
import { countryName } from "constants/countries"
import { useMemo } from "react"
import { Link, withRouter } from "react-router-dom"
import { Input, Label } from "reactstrap"
import { useState } from "react"
import { roundToDynamicNumbers } from "helpers/Utils"
import { useDebounce } from "hooks/useDebounce"

export function headerFormatter(column, colIndex, { sortElement }) {
  return (
    <div className="head-column">
      <p>{column.text}</p>
      {sortElement}
    </div>
  )
}

const List = ({ partners, userPartnerId, fullName }) => {
  const [showOnlyFirstStructure, setShowOnlyFirstStructure] = useState(false)
  const [search, setSearch] = useState("")

  const debouncedSeach = useDebounce(search, 200)

  const columns = useMemo(
    () => [
      {
        dataField: "fullName",
        text: "Имя партнёра",
        sort: true,
        attrs: {
          "data-label": "Имя партнёра",
        },
        headerFormatter,
        formatter: (cell, row) => {
          const partnerFullName =
            row.referrerId === userPartnerId
              ? fullName
              : partners.find(partner => partner.partnerId === row.referrerId)
                  ?.fullName ?? ""
          return (
            <>
              <div className="fw-bold">{cell}</div>
              <div>Пригласил: {partnerFullName}</div>
            </>
          )
        },
      },
      {
        dataField: "mobile",
        text: "Номер телефона",
        sort: true,
        attrs: {
          "data-label": "Номер телефона",
        },
        headerFormatter,
      },
      {
        dataField: "createdAt",
        text: "Дата регистрации",
        sort: true,
        attrs: {
          "data-label": "Дата регистрации",
        },
        headerFormatter,
        formatter: cell => {
          return (
            <>
              {cell
                .toLocaleString()
                .slice(0, 10)
                .split("-")
                .reverse()
                .join(".")}
            </>
          )
        },
      },
      {
        dataField: "level",
        text: "Уровень пользователя",
        sort: true,
        attrs: {
          "data-label": "Уровень пользователя",
        },
        headerFormatter,
        formatter: cell => cell + 1,
      },
      {
        dataField: "firstReferrals",
        text: "Партнёров привлечено",
        attrs: {
          "data-label": "Партнёров привлечено",
        },
        sort: true,
        headerFormatter,
        formatter: (cell, row) => {
          const redirectPath = `/team/structure/${row.partnerId}`
          return (
            <>
              {cell}{" "}
              {parseInt(cell) !== 0 && row.agreement === "1" && (
                <Link to={redirectPath} target={"_blank"}>
                  Структура
                </Link>
              )}
            </>
          )
        },
      },
      {
        dataField: "country",
        sort: true,
        attrs: {
          "data-label": "Страна",
        },
        text: "Страна",
        headerFormatter,
        formatter: country => {
          return (
            <CountryFlag countryCode={country} title={countryName[country]} />
          )
        },
      },
      {
        dataField: "deposit_amount",
        sort: true,
        attrs: {
          "data-label": "Личные инвестиции",
        },
        text: "Личные инвестиции",
        headerFormatter,
        sortValue: cell => (typeof cell === "number" ? cell : -1),
        formatter: cell =>
          typeof cell === "number" ? roundToDynamicNumbers(cell, 1) : cell,
      },
      {
        dataField: "teamDeposit",
        sort: true,
        attrs: {
          "data-label": "Структурные инвестиции",
        },
        text: "Структурные инвестиции",
        headerFormatter,
        sortValue: cell => (typeof cell === "number" ? cell : -1),
        formatter: cell =>
          typeof cell === "number" ? roundToDynamicNumbers(cell, 1) : cell,
      },
    ],
    [userPartnerId, fullName, partners]
  )

  const productData = useMemo(() => {
    const partnersData = [...partners]
    partnersData.sort((a, b) => {
      const firstDate = new Date(a.createdAt)
      const secondDate = new Date(b.createdAt)

      if (firstDate > secondDate) return -1
      if (firstDate < secondDate) return 1
      return 0
    })
    if (showOnlyFirstStructure)
      return partnersData.filter(item => item.ref_level === 1)
    return partnersData
  }, [partners, showOnlyFirstStructure])

  const searchedProductData = useMemo(() => {
    if (debouncedSeach) {
      const getItemSearchedValues = item => {
        return Object.values({
          fullName: item.fullName,
          mobile: item.mobile,
          firstReferrals: item.firstReferrals,
          leveL: item.level,
          teamDeposit: item.teamDeposit,
          country: item.country,
          createdAt: item.createdAt,
        })
      }
      const debouncedSearchLowerCase = debouncedSeach.toLowerCase()
      return productData.filter(item => {
        const values = getItemSearchedValues(item)
        for (const value of values) {
          if (
            value?.toString()?.toLowerCase()?.includes(debouncedSearchLowerCase)
          ) {
            return true
          }
        }
        return false
      })
    }
    return productData
  }, [productData, debouncedSeach])

  const paginationOptions = {
    paginationPosition: "top",
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center py-3">
        <Label>
          <Input
            type="checkbox"
            checked={showOnlyFirstStructure}
            onChange={e => setShowOnlyFirstStructure(e.target.checked)}
          />{" "}
          <span> Только первая линия</span>
        </Label>
        <Input
          style={{
            maxWidth: "200px",
          }}
          placeholder="Поиск"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <BootstrapTable
        options={paginationOptions}
        keyField="id"
        data={searchedProductData}
        columns={columns}
        pagination={paginationFactory(paginationOptions)}
        headerClasses="table-head"
        wrapperClasses="table-responsive"
        classes="table__adaptive_bordered_between"
        // bordered
        responsive
      />
    </>
  )
}

List.propTypes = {
  partners: PropTypes.array,
  fullName: PropTypes.any,
  userPartnerId: PropTypes.any,
  history: PropTypes.any,
}

export default withRouter(List)
