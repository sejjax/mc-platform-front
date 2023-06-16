import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { Button, Card, CardBody, Modal } from "reactstrap"
import moment from "moment"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
// import './scss/list.scss';
import { getAllNotifications } from "store/actions"
import parse from "html-react-parser"
import { Link } from "react-router-dom"
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import { MetaTags } from "react-meta-tags"
import { withRouter } from "react-router-dom"
// import { withTranslation } from 'react-i18next';
import { Container, Row, Col } from "reactstrap"
import CustomDropdown from "./CustomDropdown/CustomDropdown"
import { useState } from "react"
import DeleteModalNotification from "./DeleteModal/DeleteModalNotification"
import withAdmin from "hocs/withAdmin"
import { ACCESS } from "constants/access"

const paginationOptions = {
  paginationPosition: "top",
}

function headerFormatter(column, colIndex, { sortElement }) {
  return (
    <div className="head-column">
      <p>{column.text}</p>
      {sortElement}
    </div>
  )
}

const columns = [
  {
    dataField: "notification_type",
    text: "Тип уведомления",
    sort: true,
    headerFormatter,
    attrs: {
      "data-label": "Тип уведомления",
    },
  },
  {
    dataField: "notification_text",
    text: "Уведомление",
    classes: "wrap",
    sort: true,
    attrs: {
      "data-label": "Уведомление",
    },
    headerFormatter,
    formatter(row, cell) {
      return (
        <div>
          <p>
            <span className="fw-bold">Заголовок: </span>
            {cell.notification_title}
          </p>
          <div className="fw-bold">Текст:</div>
          <div>{parse(row)}</div>
        </div>
      )
    },
  },
  {
    dataField: "notification_date",
    text: "Дата уведомления",
    sort: true,
    headerFormatter,
    attrs: {
      "data-label": "Дата уведомления",
    },
  },
  {
    dataField: "delivery",
    text: "Тип доставки",
    sort: true,
    headerFormatter,
    attrs: {
      "data-label": "Тип доставки",
    },
    formatter(_cell, row) {
      const displayIsSite = row.isSite ? "Сайт" : ""
      const displayIsEmail = row.isEmail
        ? row.isSite
          ? ", Почта"
          : "Почта"
        : ""
      return (
        <>
          {displayIsSite}
          {displayIsEmail}
        </>
      )
    },
  },
]

const AdminNotifications = ({ notifications, onGetNotifications, history }) => {
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    selectedItem: null,
  })

  React.useEffect(() => {
    onGetNotifications?.()
  }, [onGetNotifications])

  const notificationsData = React.useMemo(() => {
    return notifications.map(
      ({
        id,
        notification_date,
        notification_type,
        notification_title,
        notification_text,
        isSite,
        isEmail,
      }) => ({
        id,
        notification_date: moment(notification_date).format(
          "DD-MM-YYYY , hh : mm "
        ),
        notification_type: notification_type?.title || "",
        notification_title,
        notification_text,
        isSite,
        isEmail,
      })
    )
  }, [notifications])

  const editClickHandler = id => {
    history.push(`/admin/notificationsCreate/${id}`)
  }

  const deleteModalOpenHandler = id => {
    setDeleteModal({ isOpen: true, selectedItem: id })
  }

  const closeDeleteModal = () => {
    setDeleteModal(prevState => ({ ...prevState, isOpen: false }))
  }

  const extendColumnsWithBtns = [
    ...columns,
    {
      dataField: "buttons",
      text: "",
      sort: false,
      formatter: (_, row) => {
        return (
          <CustomDropdown
            editClickHandler={() => editClickHandler(row.id)}
            deleteClickHandler={() => deleteModalOpenHandler(row.id)}
          />
        )
      },
    },
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Все уведомления MCapital</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs
            title="Уведлмления"
            hasBreadcrumbItem={false}
            breadcrumbItem="Все уведомления"
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="text-end">
                    <Button color="primary" className="notification__add_btn">
                      <Link
                        className="button_a"
                        to={"/admin/notificationsCreate"}
                      >
                        Создать уведомление
                      </Link>
                    </Button>
                  </div>
                  <div className="mt-4">
                    <BootstrapTable
                      options={paginationOptions}
                      keyField="id"
                      data={notificationsData}
                      columns={extendColumnsWithBtns}
                      pagination={paginationFactory(paginationOptions)}
                      headerClasses="table-head"
                      wrapperClasses="table-responsive without__padding table text-start table__adaptive_bordered_between"
                      responsive
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <DeleteModalNotification
          closeModal={closeDeleteModal}
          isOpen={deleteModal.isOpen}
          selectedItemId={deleteModal.selectedItem}
        />
      </div>
    </React.Fragment>
  )
}

AdminNotifications.propTypes = {
  notifications: PropTypes.any,
  onGetNotifications: PropTypes.func,
  selectCurrentNotification: PropTypes.func,
  deleteNotification: PropTypes.func,
  addNotification: PropTypes.func,
  editNotificatio: PropTypes.func,
  history: PropTypes.any,
}

const mapStateToProps = state => {
  return {
    notifications: state.Notifications.notifications,
  }
}
const mapDispatchToProps = dispatch => ({
  onGetNotifications: () => dispatch(getAllNotifications()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAdmin(AdminNotifications, ACCESS.notifications)))
