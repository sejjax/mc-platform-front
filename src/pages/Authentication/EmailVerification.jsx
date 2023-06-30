import React from 'react';

import dollarImg from 'assets/images/dollar-coin.png';
import PropTypes from 'prop-types';
import MetaTags from 'react-meta-tags';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

import { t } from '../../i18n';
import { confirmEmail } from '../../store/actions';
import './scss/email-verification.scss';

const EmailVerification = (props) => {
  const dispatch = useDispatch();

  const location = useLocation();

  const path = location.pathname.split('/');
  const hash = path[path.length - 1];

  const verificationHandler = (hash) => {
    // const response = await authService.confirm(hash);

    // if(response === true) {
    //   props.history.push('/login');
    // }
    dispatch(confirmEmail(hash, props.history));
  };

  return (
    <React.Fragment>
      <div className="email__verification_page_wrapper">
        <MetaTags>
          <title>Проверка Email</title>
        </MetaTags>
        <Container>
          <div className="email__verification_background_wrapper">
            <div className="email__verification_border_wrapper">
              <div className="email__verification_blur_left"></div>
              <div className="email__verification_blur_right"></div>
              <div className="email__verification_coin_left">
                <img className="email__verification_dollar_coin_img" src={dollarImg} alt="" />
              </div>
              <div className="email__verification_coin_right">
                <img className="email__verification_dollar_coin_img" src={dollarImg} alt="" />
              </div>
              <div className="email__verification_blur"></div>
              <Row>
                <Col>
                  <Card className="email__verification_content_wrapper">
                    <CardBody className="email__verification_content_wrapper_body">
                      <div className="p-2">
                        <div className="text-center">
                          <img className="email__img" src="/mail-img.png" alt="" />
                          <div className="p-2 email__verification_content_text">
                            <h4>{t('auth_register_complete')}</h4>
                            <div className="mt-4">
                              <button
                                onClick={() => {
                                  verificationHandler(hash);
                                }}
                                className="btn btn-success w-md"
                                style={{
                                  maxWidth: '210px',
                                  width: '100%',
                                  height: '50px',
                                  borderRadius: '13px',
                                }}>
                                {t('common_complete')}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

EmailVerification.propTypes = {
  history: PropTypes.any,
};

export default EmailVerification;
