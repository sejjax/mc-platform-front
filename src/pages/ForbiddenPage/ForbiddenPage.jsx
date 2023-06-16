import React from "react"
import Breadcrumbs from "../../components/Common/Breadcrumb"

const ForbiddenPage = () => {
  return (
    <div className="page-content">
      <Breadcrumbs
        title="Forbidden"
        hasBreadcrumbItem={false}
        breadcrumbItem="Доступ заблокирован"
      />
    </div>
  )
}

export default ForbiddenPage
