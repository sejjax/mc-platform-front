import React, { useCallback, useState } from 'react';

import { Card, CardBody, CardText, CardTitle, Col, Container, Row } from 'reactstrap';

import ByTokenForm from 'components/DepositModals/ByTokenForm/byTokenForm';

import BUSDIcon from '../../assets/images/icons/BUSD.svg';
import { t } from '../../i18n';
import CurrencyCard from './currencyCard';

const NonZero = () => {
  const [tokens, setTokens] = useState('BUSD');

  const changeTokenHandler = (token) => {
    setTokens(token);
  };

  const callback = useCallback(
    (token) => {
      changeTokenHandler(token);
    },
    [tokens],
  );

  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col sm={12}>
            <Card>
              <CardBody>
                <CardTitle className="mb-3 font-size-18">
                  {t('dashboard_contribute_funds')}
                </CardTitle>
                <Card className="border">
                  <CardBody>
                    <CardText className="font-size-14">{t('common_currency')}</CardText>
                    <Row>
                      {/* <Col sm={4}>
                        <CurrencyCard
                          title="BNB"
                          description="Binance Smart Chain"
                          icon={BNDIcon}
                          currentPrice="1 BNB = $ 500 = 10 000 TGT"
                          onClick={callback}
                          isActive={"BNB" === tokens}
                        />
                      </Col> */}
                      <Col sm={4}>
                        <CurrencyCard
                          title="BUSD"
                          description="Binance Smart Chain"
                          icon={BUSDIcon}
                          currentPrice="1 BUSD = 1 $ = 1 MC"
                          onClick={callback}
                          isActive={'BUSD' === tokens}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={4}>
                        <ByTokenForm label={tokens} />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default NonZero;
