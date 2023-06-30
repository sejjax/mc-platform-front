import React from 'react';

import { getPromotionGoalFromLevel } from 'helpers/Utils/promotionLevel';
import { getDisplayedUserLevel } from 'helpers/Utils/user';
import { formatMoney } from 'helpers/dollarsUS';
import withForbiddenWithoutBuyingPackage from 'hocs/withForbiddenWithoutBuyingPackage';
import { Trans } from 'react-i18next';
import { MetaTags } from 'react-meta-tags';
import { Card, CardBody, Container } from 'reactstrap';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import { GoalChecker } from 'components/GoalChecker/GoalChecker';

import { t } from '../../i18n';
import './Promotion.scss';
import { usePromotion } from './usePromotion';

function Promotion() {
  const {
    allStructure,
    strongestStructure,
    otherStructure,
    promotionLevel,
    firstStructure,
    rating,
  } = usePromotion();

  const displayedUserLevel = getDisplayedUserLevel(promotionLevel);

  const { allStructure: allStructureGoal, withoutStrongest: withoutStrongestGoal } =
    getPromotionGoalFromLevel(promotionLevel);

  return (
    <div className="page-content">
      <MetaTags>
        <title>{t('promotion_meta_title')}</title>
      </MetaTags>
      <Container fluid>
        <Breadcrumbs
          title="Promotion"
          hasBreadcrumbItem={false}
          breadcrumbItem={t('sidebar_promotion_label')}
        />
        <Card>
          <CardBody>
            <div className="promotion__description_wrapper">
              <div className="promotion__description_content">
                <h3>{t('promotion_title')}</h3>
                <div>
                  <div>{t('promotion_subtitle')}</div>
                  <div>{t('promotion_trip_text')}</div>
                  <div>{t('promotion_trip_description')}</div>
                  <div className="mt-2">
                    <Trans i18nKey="promotion_trip_terms" components={{ title: <h4 /> }} />
                  </div>
                  <div className="mt-2">
                    <h5>{t('promotion_trip_terms_first_rule_title')}</h5>
                    <table>
                      <thead>
                        <tr>
                          <td>{t('promotion_trip_rules_partner_level')}</td>
                          <td>{t('promotion_total_turnover_structure')}</td>
                          <td>{t('promotion_turnover_minus_strong_branch')}</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{t('promotion_levels')}</td>
                          <td>100 000 $</td>
                          <td>50 000 $</td>
                        </tr>
                        <tr>
                          <td>4 {t('common_level')}</td>
                          <td>160 000 $</td>
                          <td>80 000 $</td>
                        </tr>
                        <tr>
                          <td>5 {t('common_level')}</td>
                          <td>200 000 $</td>
                          <td>100 000 $</td>
                        </tr>
                        <tr>
                          <td>6 {t('common_level')}</td>
                          <td>300 000 $</td>
                          <td>150 000 $</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-2">
                    <h5>{t('promotion_trip_terms_second_rule_title')}</h5>
                    {t('promotion_trip_terms_second_rule_description')}
                    <ul>
                      <li>{t('promotion_trip_terms_second_rule_first_text')}</li>
                      <li>{t('promotion_trip_terms_second_rule_second_text')}</li>
                    </ul>
                  </div>
                  <div>
                    <h4>{t('promotion_trip_terms_additional_conditions')}</h4>
                    <ul>
                      <li>{t('promotion_trip_terms_two_people')}</li>
                      <li>{t('promotion_trip_terms_partner_level')}</li>
                      <li>{t('promotion_trip_terms_any_people')}</li>
                      <li>{t('promotion_trip_terms_cash_equivalent')}</li>
                      <li>{t('promotion_trip_terms_voucher_transfer')}</li>
                    </ul>
                  </div>
                  <div>{t('promotion_trip_good_luck_all')}</div>
                </div>
              </div>
              <div className="promotion__img_wrapper">
                <img className="w-100" src="/promotion.jpg" alt="" />
              </div>
            </div>
            <hr />
            <div className="promotion__bottom_wrapper">
              <div className="promotion__progress_wrapper">
                <h6>{t('promotion_your_level_with_date', { level: displayedUserLevel })}</h6>
                <h5 className="text-center mb-0">{t('promotion_your_progress')}</h5>
                <div className="mt-3">
                  <div className="promotion__result_wrapper">
                    <div className="dashbaord__level_title mb-1">{t('promotion_all_branches')}</div>
                    <GoalChecker endPoint={allStructureGoal} completedPoint={allStructure} />
                  </div>
                  <div className="promotion__result_wrapper">
                    <div className="dashbaord__level_title mb-1">
                      {t('promotion_branches_without_strongest')}
                    </div>
                    <GoalChecker endPoint={withoutStrongestGoal} completedPoint={otherStructure} />
                    <div className="mt-2">
                      {t('promotion_strongest_branch', {
                        branch: `${strongestStructure.fullName ?? '-'} ${
                          strongestStructure.fullName ? formatMoney(strongestStructure.amount) : ''
                        }`,
                      })}
                    </div>
                  </div>
                  <div className="promotion__result_wrapper">
                    <div className="dashbaord__level_title mb-1">
                      {t('dashboard_personal_sales')}
                    </div>
                    <GoalChecker completedPoint={firstStructure} endPoint={100_000} />
                  </div>
                </div>
              </div>
              <div className="promotion__rating_wrapper">
                <div className="promotion__rating_title">{t('promotion_leaderboard')}</div>
                <div className="promotion__rating_list_wrapper">
                  {rating &&
                    rating.map((item, index) => (
                      <div key={item.id} className="promotion__rating__item">
                        <span>
                          {index + 1}.{item.fullName}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default withForbiddenWithoutBuyingPackage(Promotion);
