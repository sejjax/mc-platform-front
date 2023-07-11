import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { roundToDynamicNumbers } from 'helpers/Utils';
import i18next from 'i18next';
import { map } from 'lodash';
import { MetaTags } from 'react-meta-tags';
import { Card, CardBody, Container, Input, Label } from 'reactstrap';

import { getAllProjects } from 'services/projectService';

import Breadcrumb from 'components/Common/Breadcrumb';

import { convertLocale } from '../../helpers/convertLocation';
import { t } from '../../i18n';
import './IncomeCalculator.scss';

const IncomeCalculator = () => {
  const [formState, setFormState] = useState({
    amount: 0,
    selectedProject: 0,
  });
  const [projects, setProjects] = useState([]);

  const changeAmount = (e) => {
    setFormState((prevValue) => ({ ...prevValue, amount: e.target.value }));
  };

  const getSelectedProject = (id = formState.selectedProject) => {
    const project = projects.find((project) => {
      if (id === project.id) return project;
    });
    return project;
  };
  const selectedProject = getSelectedProject();

  const changeSelectedProject = (id, amount) => {
    setFormState({
      amount: amount ? amount : getSelectedProject(id)?.min_amount || 0,
      selectedProject: id,
    });
  };

  const calculateAmount = () => {
    if (selectedProject) {
      const {
        apy,
        invest_period_in_weeks: ip_wks,
        payment_period_in_weeks: pp_wks,
      } = selectedProject;

      const calculationsCount = +ip_wks / +pp_wks;
      const earnAmount = +formState.amount + +formState.amount * ((+ip_wks / 52) * (+apy / 100));

      const profitabillity = earnAmount - formState.amount;
      const periodPayment = Math.round((profitabillity / calculationsCount) * 1000) / 1000;
      return { calculationsCount, earnAmount, profitabillity, periodPayment };
    }
    return undefined;
  };
  const calculationsData = calculateAmount();

  useEffect(() => {
    const fetchAllProjects = async () => {
      const response = await getAllProjects(convertLocale(i18next.language));
      setProjects(response.data);
      changeSelectedProject(response.data[0]?.id, response.data[0]?.min_amount);
    };
    fetchAllProjects();
  }, []);

  return (
    <div className="page-content">
      <MetaTags>
        <title>{t('income_calculator_meta_title')}</title>
      </MetaTags>
      <Container fluid>
        <Breadcrumb hasBreadcrumbItem={false} breadcrumbItem={t('income_calculator_title')} />
        <Card className="calculator__card_wrapper">
          <CardBody>
            <div className="form__wrapper">
              <Label>{t('income_calculator_choose_package')}</Label>
              <Input
                value={formState.selectedProject}
                type="select"
                onChange={(event) => changeSelectedProject(+event.target.value)}>
                {map(projects, (project, index) => (
                  <option key={`${project.id}_${index}`} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </Input>
              <Label className="mt-2">{t('income_calculator_enter_amount')}</Label>
              <Input value={formState.amount} onChange={changeAmount} />
            </div>
            {selectedProject && (
              <div className="mt-4 calculator__data__wrapper">
                <Label>{t('income_calculator_package_info')}</Label>
                <div className="calculator__data">
                  <div>
                    <div>{t('income_calculator_package_name', { name: selectedProject.name })}</div>
                    <div>
                      {t('income_calculator_package_yearly_profit', { apy: selectedProject.apy })}
                    </div>
                  </div>
                  <div>
                    <div>
                      {t('income_calculator_package_investment_period', {
                        period: selectedProject.invest_period,
                      })}
                    </div>
                    <div>
                      {t('income_calculator_package_payment_period', {
                        period: selectedProject.payment_period,
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {calculationsData && (
              <div className="mt-2 calculator__data__wrapper">
                <Label>{t('income_calculator_package_income_label')}</Label>
                <div className="calculator__data">
                  <div>
                    <div>
                      {t('income_calculator_package_income_amount', {
                        amount: roundToDynamicNumbers(calculationsData.earnAmount),
                      })}
                    </div>
                    <div>
                      {t('income_calculator_package_profit', {
                        amount: roundToDynamicNumbers(calculationsData.profitabillity),
                      })}
                    </div>
                  </div>
                  <div>
                    <div>
                      {t('income_calculator_payment_count', {
                        count: roundToDynamicNumbers(calculationsData.calculationsCount),
                      })}
                    </div>
                    <div>
                      {t('income_calculator_one_time_payment_amount', {
                        amount: roundToDynamicNumbers(calculationsData.periodPayment),
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default IncomeCalculator;
