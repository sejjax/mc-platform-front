import Breadcrumb from "components/Common/Breadcrumb"
import { roundToDynamicNumbers } from "helpers/Utils"
import withAdmin from "hocs/withAdmin"
import withForbiddenWithoutBuyingPackage from "hocs/withForbiddenWithoutBuyingPackage"
import { map } from "lodash"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { MetaTags } from "react-meta-tags"
import { Card, CardBody, Container, Input, Label } from "reactstrap"
import { getAllProjects } from "services/projectService"
import "./IncomeCalculator.scss"

const IncomeCalculator = () => {
  const [formState, setFormState] = useState({
    amount: 0,
    selectedProject: 0,
  })
  const [projects, setProjects] = useState([])

  const changeAmount = e => {
    setFormState(prevValue => ({ ...prevValue, amount: e.target.value }))
  }

  const getSelectedProject = (id = formState.selectedProject) => {
    const project = projects.find(project => {
      if (id === project.id) return project
    })
    return project
  }
  const selectedProject = getSelectedProject()

  const changeSelectedProject = (id, amount) => {
    setFormState({
      amount: amount ? amount : getSelectedProject(id)?.min_amount || 0,
      selectedProject: id,
    })
  }

  const calculateAmount = () => {
    if (selectedProject) {
      const {
        apy,
        invest_period_in_weeks: ip_wks,
        payment_period_in_weeks: pp_wks,
      } = selectedProject

      const calculationsCount = +ip_wks / +pp_wks
      const earnAmount =
        +formState.amount + +formState.amount * ((+ip_wks / 52) * (+apy / 100))

      const profitabillity = earnAmount - formState.amount
      const periodPayment =
        Math.round((profitabillity / calculationsCount) * 1000) / 1000
      return { calculationsCount, earnAmount, profitabillity, periodPayment }
    }
    return undefined
  }
  const calculationsData = calculateAmount()

  useEffect(() => {
    const fetchAllProjects = async () => {
      const response = await getAllProjects()
      setProjects(response.data)
      changeSelectedProject(response.data[0].id, response.data[0].min_amount)
    }
    fetchAllProjects()
  }, [])

  return (
    <div className="page-content">
      <MetaTags>
        <title>Калькулятор MCapital</title>
      </MetaTags>
      <Container fluid>
        <Breadcrumb
          hasBreadcrumbItem={false}
          breadcrumbItem="Калькулятор доходности"
        />
        <Card className="calculator__card_wrapper">
          <CardBody>
            <div className="form__wrapper">
              <Label>Выберите пакет</Label>
              <Input
                value={formState.selectedProject}
                type="select"
                onChange={event => changeSelectedProject(+event.target.value)}
              >
                {map(projects, (project, index) => (
                  <option key={`${project.id}_${index}`} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </Input>
              <Label className="mt-2">Введите сумму средств</Label>
              <Input value={formState.amount} onChange={changeAmount} />
            </div>
            {selectedProject && (
              <div className="mt-4 calculator__data__wrapper">
                <Label>Информация о пакете</Label>
                <div className="calculator__data">
                  <div>
                    <div> Название: {selectedProject.name}</div>
                    <div>Годовая доходность: {selectedProject.apy}%</div>
                  </div>
                  <div>
                    <div>
                      Инвестиционный период: {selectedProject.invest_period}
                    </div>
                    <div>
                      Периодичность платежей: {selectedProject.payment_period}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {calculationsData && (
              <div className="mt-2 calculator__data__wrapper">
                <Label>Доходность</Label>
                <div className="calculator__data">
                  <div>
                    <div>
                      Сумма получения:{" "}
                      {roundToDynamicNumbers(calculationsData.earnAmount)}
                    </div>
                    <div>
                      Чистая доходность:{" "}
                      {roundToDynamicNumbers(calculationsData.profitabillity)}
                    </div>
                  </div>
                  <div>
                    <div>
                      Количество платежей:{" "}
                      {roundToDynamicNumbers(
                        calculationsData.calculationsCount
                      )}
                    </div>
                    <div>
                      Сумма единоразового платежа:{" "}
                      {roundToDynamicNumbers(calculationsData.periodPayment)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}

export default withForbiddenWithoutBuyingPackage(IncomeCalculator)
