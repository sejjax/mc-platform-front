import classNames from "classnames"
import DepositModal from "components/DepositModals/DepositModal/DepositModal"
import { Progress } from "components/Progress/Progress"
import parse from "html-react-parser"
import { isEmpty, map } from "lodash"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Button, Col, Row, Table } from "reactstrap"
import {
  getProjectDetailSuccess,
  getProjects as onGetProjects,
} from "store/actions"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useFetchInvestorProAmount } from "./hooks/useFetchInvestorProAmount"
import { useIsProjectDisabled } from "./hooks/useIsProjectDisabled"
import { useProjectInvestmentTimeout } from "./hooks/useProjectInvestmentTimeout"
import ProjectImage from "./projectImage"
import ProjectTimer from "./projectTimer"
import RangeSlider from "./rangeSlider"
import { investorProAllLimit, investorProPerUserLimit } from "constants/deposit"

const selector = state => ({
  projectCategory: state?.Project.projects,
  isDepositButtonDisabledByInvestment:
    state.Project.isDepositButtonDisabledByInvestment,
})

const ProjectsList = () => {
  const [investModal, setInvestModal] = useState(false)
  const dispatch = useDispatch()

  const { projectCategory, isDepositButtonDisabledByInvestment } =
    useSelector(selector)
  useProjectInvestmentTimeout()
  const investorProDepositAmount = useFetchInvestorProAmount()
  const isProjectDisabled = useIsProjectDisabled(investorProDepositAmount)

  const params = useParams()

  const investClickHandler = projectDetails => () => {
    dispatch(getProjectDetailSuccess(projectDetails))
    setInvestModal(true)
  }

  useEffect(() => {
    if (params && params.type) {
      dispatch(onGetProjects(params.type))
    }
  }, [params, dispatch])

  return (
    <React.Fragment>
      <Breadcrumbs title="Проекты" breadcrumbItem={projectCategory.name} />
      <Row>
        <Col xl={12} sm={12}>
          {!isEmpty(projectCategory.projects) ? (
            <div className="table-responsive">
              <Table className="project-list-table align-middle table-borderless">
                <thead>
                  <tr>
                    <th scope="col" colSpan={2}>
                      {projectCategory.name === "Портфели"
                        ? "Портфели"
                        : "Пакеты"}
                    </th>
                    <th scope="col" className="min-col-sm">
                      Инвестиционный период
                    </th>
                    <th scope="col" className="min-col-sm">
                      Периодичность платежей
                    </th>
                    <th scope="col" className="min-col-md" colSpan={2}>
                      Годовая доходность
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {map(projectCategory.projects, (project, index) => {
                    const isInvestorPro =
                      project.service_name.includes("investor_pro")
                    return (
                      <tr key={index}>
                        <td className="after-none">
                          <ProjectImage
                            name={project.name}
                            url={project.image && project.image.url}
                          />
                        </td>
                        <td className="project__title after-none">
                          <div>
                            <h5 className="text-truncate font-size-14">
                              {project.name}
                            </h5>
                            <p className="text-muted mb-0">
                              {parse(project.title)}
                            </p>
                          </div>
                        </td>
                        <td data-label="Инвестиционный период">
                          {project?.invest_period}
                        </td>
                        <td data-label="Периодичность платежей">
                          {project?.payment_period}
                        </td>
                        <td data-label="Годовая доходность">{project?.apy}%</td>
                        <td
                          className={classNames("after-none", {
                            td__with_timer: isInvestorPro,
                          })}
                        >
                          <div className="d-flex flex-wrap gap-2 justify-content-end align-items-center w-100 media__flex_right btn__maybe_with_timer">
                            <Button
                              color="success"
                              onClick={investClickHandler(project)}
                              style={{
                                width: "100%",
                                maxWidth: "120px",
                              }}
                              disabled={isProjectDisabled(project)}
                            >
                              Инвестировать
                            </Button>
                            {isDepositButtonDisabledByInvestment && (
                              <span className="text-end">
                                Ожидается начисление
                              </span>
                            )}
                          </div>
                          {isInvestorPro && (
                            <div>
                              <ProjectTimer endDate={project?.dueDate} />
                              <div className="mt-2">
                                <Progress
                                  completed={investorProDepositAmount.perUser}
                                  end={investorProPerUserLimit}
                                  title="Куплено вами:"
                                />
                                <Progress
                                  completed={
                                    investorProDepositAmount.allPackages
                                  }
                                  end={investorProAllLimit}
                                  title="Всего куплено:"
                                />
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          ) : (
            <p>Пока что нет проектов в данной категории</p>
          )}
        </Col>
        <Col xl={3} sm={12}>
          <RangeSlider risk={projectCategory.risk} disabled />
        </Col>
      </Row>

      <DepositModal
        isOpen={investModal}
        closeHandler={() => setInvestModal(false)}
      />
    </React.Fragment>
  )
}

export default ProjectsList