import { SUPPORT_LINK } from "constants/links"
import React from "react"
import { Card, CardTitle } from "reactstrap"

const ErrorStatus = () => {
  return (
    <>
      <Card className={"border border-primary"}>
        <div
          style={{
            padding: "15px 5px",
          }}
        >
          <div className="text-center">
            <CardTitle className="fs-5">Произошла ошибка</CardTitle>
          </div>
        </div>
      </Card>
      <div className="text-center">
        <div className="fw-bold fs-5"></div>
        <div className="mt-2"></div>
        <div className="mt-4">
          <div className="mt-2 text-reset">Обратитесь в службу поддержки</div>
          <a
            href={SUPPORT_LINK}
            target="_blank"
            rel="noreferrer"
            className="mt-2 d-block"
          >
            Написать MCapitalSupport
          </a>
        </div>
      </div>
    </>
  )
}

export default ErrorStatus
