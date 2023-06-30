import React, { useEffect, useState } from 'react';

import withForbiddenWithoutBuyingPackage from 'hocs/withForbiddenWithoutBuyingPackage';
import parse from 'html-react-parser';
import { MetaTags } from 'react-meta-tags';
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledAccordion,
} from 'reactstrap';

import { getHelpInfo } from '../../services/helpService';

import Breadcrumb from 'components/Common/Breadcrumb';

import { t } from '../../i18n';

const Help = () => {
  const [helpInfo, setHelpInfo] = useState(null);

  useEffect(async () => {
    const info = await getHelpInfo();

    setHelpInfo(info);
  }, []);

  return (
    <>
      <div className="page-content">
        <MetaTags>
          <title>{t('help_meta_title')}</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumb hasBreadcrumbItem={false} breadcrumbItem={t('sidebar_help_label')} />
          <Card>
            <CardBody>
              {helpInfo && (
                <Row className="gx-5 row__media_gap">
                  <Col>
                    <UncontrolledAccordion stayOpen>
                      {helpInfo.faqItems &&
                        helpInfo.faqItems.map((item, index) => (
                          <AccordionItem key={`${item.id}${index}`}>
                            <AccordionHeader targetId={`${item.id}`}>{item.Header}</AccordionHeader>
                            <AccordionBody accordionId={`${item.id}`}>
                              {parse(item.Content)}
                            </AccordionBody>
                          </AccordionItem>
                        ))}
                    </UncontrolledAccordion>
                  </Col>
                </Row>
              )}
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withForbiddenWithoutBuyingPackage(Help);
