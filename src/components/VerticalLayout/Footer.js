import React from 'react';

import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={12}>
              <Trans
                i18nKey="footer_text"
                components={{
                  firstLink: (
                    <a href="https://files.elfsightcdn.com/9edf0d9a-4293-4809-8d3a-4a1049fb604a/d975335f-a6b7-4ca7-9e79-9656f50a12bd/GCRYPTON-BLOCKCHAIN-DEVELOPMENT.pdf" />
                  ),
                  secondLink: <a href="https://enreg.reestri.gov.ge" />,
                }}
              />
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
