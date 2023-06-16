import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={12}>
              <div>
                MCapital. Платформа работает в юрисдикции Свободной
                Индустриальной Зоны Хуалинг Грузия. Лицензия на осуществление
                деятельности{" "}
                <a href="https://files.elfsightcdn.com/9edf0d9a-4293-4809-8d3a-4a1049fb604a/d975335f-a6b7-4ca7-9e79-9656f50a12bd/GCRYPTON-BLOCKCHAIN-DEVELOPMENT.pdf">
                  Открыть
                </a>
                . Регистрационный номер 412772557. Публичный реестр юридических
                лиц{" "}
                <a href="https://enreg.reestri.gov.ge">
                  https://enreg.reestri.gov.ge
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
