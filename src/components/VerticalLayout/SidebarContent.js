import React, { useEffect, useRef } from 'react';

import MetisMenu from '@metismenu/react';
import useTranslation from 'hooks/useTranslation';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
// MetisMenu
import { Link, NavLink, withRouter } from 'react-router-dom';
// //Import Scrollbar
import SimpleBar from 'simplebar-react';

import { isUserBoughtProjectSelector } from 'store/auth/profile/selectors';

import SidebarProjectsCategories from './SidebarProjectsCategories';
import './metisMenu.scss';

const SidebarContent = (props) => {
  const { access } = props;
  const ref = useRef(null);
  const isDisplayInvestorFeatures = useSelector(isUserBoughtProjectSelector);
  const t = useTranslation();
  const refSidebar = useRef();
  const refMenu = useRef();
  const pathName = props.location.pathname;

  useEffect(() => {
    const body = document.body;
    body.classList.toggle('sidebar-enable');
    let matchingMenuItem = null;

    const items = refMenu.current.el.getElementsByTagName('a');

    for (let i = 0; i < items.length; ++i) {
      const item = items[i];
      if (item.classList.contains('li__first_dropdown') && pathName.indexOf('projects') === -1) {
        continue;
      }
      if (item.classList.contains('li__sidebar') && pathName.indexOf('help') !== -1) {
        continue;
      }
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }

    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [props.location.pathname]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add('active');
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== 'side-menu') {
      parent2El.classList.add('mm-show');
    }

    if (parent) {
      parent.classList.add('mm-active');
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add('mm-show'); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add('mm-active'); // li
          parent3.childNodes[0].classList.add('mm-active'); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add('mm-show'); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add('mm-show'); // li
              parent5.childNodes[0].classList.add('mm-active'); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  useEffect(() => {
    refSidebar.current.recalculate();
  });

  return (
    <React.Fragment>
      <SimpleBar className="" ref={refSidebar}>
        <div id="sidebar-menu" style={{ position: 'fixed' }}>
          <MetisMenu toggle={false} ref={refMenu}>
            <li className="menu-title" key="menu">
              {t('sidebar_menu_label')}
            </li>
            <li key="dashboard">
              <NavLink to="/dashboard">
                <i className="bx bx-home-circle" />
                <span>{t('sidebar_dashboard_label')}</span>
              </NavLink>
            </li>
            <SidebarProjectsCategories />
            {isDisplayInvestorFeatures && (
              <li key="team">
                <NavLink to="/team">
                  <i className="fas fa-users" />
                  <span>{t('sidebar_team_label')}</span>
                </NavLink>
              </li>
            )}
            <li key="notifications">
              <NavLink to="/notificationslist">
                <i className="bx bx-bell" />
                <span>{t('sidebar_notification_label')}</span>
              </NavLink>
            </li>

            <>
              <li key="finance">
                <Link className="has-arrow li__sidebar" to={'/finances'}>
                  <i className="fa fa-money-check-dollar"></i>
                  <span>{t('sidebar_finance_label')}</span>
                </Link>
                <ul className="sub-menu">
                  {isDisplayInvestorFeatures && (
                    <>
                      <li>
                        <NavLink to={'/investments'}>{t('sidebar_investments_label')}</NavLink>
                      </li>
                      <li>
                        <NavLink to={'/accruals/referral'}>
                          {t('sidebar_referral_accruals_label')}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={'/accruals/deposit'}>
                          {t('sidebar_projects_accruals_label')}
                        </NavLink>
                      </li>
                    </>
                  )}
                  <li>
                    <NavLink to={'/calculator'}>{t('sidebar_calculator_label')}</NavLink>
                  </li>
                  {isDisplayInvestorFeatures && (
                    <li>
                      <NavLink to={'/investments-analyzing'}>
                        {t('sidebar_investments_analyze_label')}
                      </NavLink>
                    </li>
                  )}
                </ul>
              </li>
              {isDisplayInvestorFeatures && (
                <>
                  <li key="help">
                    <NavLink to="/help">
                      <i className="bx bx-book" />
                      <span>{t('sidebar_help_label')}</span>
                    </NavLink>
                  </li>
                  <li key="promotion">
                    <NavLink to="/promotion">
                      <i className="fas fa-plane-departure" />
                      <span>{t('sidebar_promotion_label')}</span>
                    </NavLink>
                  </li>
                </>
              )}
            </>
            {access && access.length !== 0 && (
              <li key="admin">
                <Link className="has-arrow li__sidebar" to={'/admins'}>
                  <i className="fas fa-user-cog"></i>
                  <span>{t('sidebar_admin_panel_label')}</span>
                </Link>
                <ul className="sub-menu">
                  {access.includes('metrics') && (
                    <li className="d-flex">
                      <NavLink to={'/admin/metrics'}>{t('sidebar_metrics_label')}</NavLink>
                    </li>
                  )}
                  {access.includes('notifications') && (
                    <li>
                      <NavLink to={'/admin/notifications'}>
                        {t('sidebar_notification_label')}
                      </NavLink>
                    </li>
                  )}
                </ul>
              </li>
            )}
          </MetisMenu>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  access: PropTypes.any,
};

const mapStateToProps = (state) => ({
  access: state.Profile.user.role?.access || [],
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SidebarContent));
