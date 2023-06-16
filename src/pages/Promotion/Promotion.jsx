import React from "react"
import { MetaTags } from "react-meta-tags"
import { Card, CardBody, Container } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./Promotion.scss"
import { usePromotion } from "./usePromotion"
import withForbiddenWithoutBuyingPackage from "hocs/withForbiddenWithoutBuyingPackage"
import { GoalChecker } from "components/GoalChecker/GoalChecker"
import { getPromotionGoalFromLevel } from "helpers/Utils/promotionLevel"
import { getDisplayedUserLevel } from "helpers/Utils/user"
import { formatMoney } from "helpers/dollarsUS"

function Promotion() {
  const {
    allStructure,
    strongestStructure,
    otherStructure,
    promotionLevel,
    firstStructure,
    rating,
  } = usePromotion()

  const displayedUserLevel = getDisplayedUserLevel(promotionLevel)

  const {
    allStructure: allStructureGoal,
    withoutStrongest: withoutStrongestGoal,
  } = getPromotionGoalFromLevel(promotionLevel)

  return (
    <div className="page-content">
      <MetaTags>
        <title>Промоушен MCapital</title>
      </MetaTags>
      <Container fluid>
        <Breadcrumbs
          title="Promotion"
          hasBreadcrumbItem={false}
          breadcrumbItem="Промоушен"
        />
        <Card>
          <CardBody>
            <div className="promotion__description_wrapper">
              <div className="promotion__description_content">
                <h3>Путешествие в Перу</h3>
                <div>
                  <div>Подарите себе путешествие мечты от MCapital.</div>
                  <div>
                    Команда MCapital планирует фантастическую поездку в октябре
                    2023 г. В Перу!
                  </div>
                  <div>
                    Перу — одно из самых удивительных мест в мире. Это
                    государство находится на западе Южной Америки. Перу называют
                    «землей инков», потому что в древности здесь процветала эта
                    могущественная цивилизация. Империя инков оставила
                    грандиозное наследие — храмы, сеть отличных дорог и
                    водопроводов, а легенды о мифическом золоте и затерянных
                    городах живы в Перу до сих пор. Вековые традиции бережно
                    хранятся местным населением. Мечтаете найти тайную дорогу к
                    Мачу-Пикчу? Увидеть своими глазами разлив Амазонки? Хотите
                    попробовать карапучу и себиче? Погрузитесь в тайны древних
                    цивилизаций, потрясающую природу, неповторимый местный
                    колорит — и вы убедитесь, что одно путешествие может
                    полностью изменить вашу жизнь.
                  </div>
                  <div className="mt-2">
                    <h4>Условия участия:</h4> Путевку в Перу на двоих человек
                    получит партнер (клиент) компании, который в период с 1 мая
                    2023 года по 31 августа 2023 года. выполнит одно из 2-х
                    условий:
                  </div>
                  <div className="mt-2">
                    <h5>
                      1.Привлечёт структурных средств на сумму не менее суммы
                      указанной в таблице ниже
                    </h5>
                    <table>
                      <thead>
                        <tr>
                          <td>Уровень партнера (по состоянию на 30.04)</td>
                          <td>Общий оборот структуры</td>
                          <td>Оборот за минусом сильной ветви</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1, 2, 3 уровень</td>
                          <td>100 000 $</td>
                          <td>50 000 $</td>
                        </tr>
                        <tr>
                          <td>4 уровень</td>
                          <td>160 000 $</td>
                          <td>80 000 $</td>
                        </tr>
                        <tr>
                          <td>5 уровень</td>
                          <td>200 000 $</td>
                          <td>100 000 $</td>
                        </tr>
                        <tr>
                          <td>6 уровень</td>
                          <td>300 000 $</td>
                          <td>150 000 $</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-2">
                    <h5>
                      2. Привлечёт лично не менее 100 000 $ (не путать с личными
                      инвестициями)
                    </h5>
                    В зачет идут все портфели (все 5 видов), и инвестиционные
                    пакеты начиная с пакета «Investor Gold» (3 вида).
                    Инвестиционные пакеты Basic, Silver и «Investor PRO» в
                    расчёте промоушена не участвуют. По первому пункту сумма
                    привлеченных средств должна быть не с одной структурной
                    ветви, а, как минимум, с 2-х. Считается это так:
                    <ul>
                      <li>
                        Для начала считаем общий оборот структуры. Сюда входят
                        личные продажи (не путать с личными инвестициями) и
                        продажи нижестоящих партнеров структуры. Сумма
                        структурных продаж должна быть не менее суммы из столбца
                        «Общий оборот структуры»
                      </li>
                      <li>
                        Далее выявляем самую большую ветвь в структуре, минусуем
                        ее оборот из общей суммы структуры, и теперь сумма с
                        остальных ветвей должна быть больше суммы в таблице из
                        столбца «Оборот за минусом сильной ветви».
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4>Дополнительные условия:</h4>
                    <ul>
                      <li>
                        Путевка выдается на 2-х человек. На один аккаунт можно
                        получить только одну путёвку, даже при перевыполнении
                        плана.
                      </li>
                      <li>
                        Уровень партнера фиксируется на 23:59 30 апреля. Все
                        условия промоушена будут действовать именно для этого
                        уровня.
                      </li>
                      <li>
                        Брать с собой в путешествие можно любого человека, даже
                        не клиента MCapital, кроме партнеров более высокого
                        уровня в MCapital (они сами должны это заслужить)
                      </li>
                      <li>
                        Если возможности поехать в путешествие нет, то выдается
                        50% в денежном эквиваленте от стоимости путевки.
                      </li>
                      <li>
                        Путевку можно передавать только от более высокого уровня
                        более низкому или равному. От нижнего более высокому
                        уровню передавать нельзя. Таблица с результатами
                        бонусной программы вы сможете видеть в личном кабинете
                        на платформе MCapital на специальной странице
                        «Промоушен».
                      </li>
                    </ul>
                  </div>
                  <div>Всем удачи...</div>
                </div>
              </div>
              <div className="promotion__img_wrapper">
                <img className="w-100" src="/promotion.jpg" alt="" />
              </div>
            </div>
            <hr />
            <div className="promotion__bottom_wrapper">
              <div className="promotion__progress_wrapper">
                <h6>Ваш уровень по состоянию на 1 мая: {displayedUserLevel}</h6>
                <h5 className="text-center mb-0">Ваш прогресс</h5>
                <div className="mt-3">
                  <div className="promotion__result_wrapper">
                    <div className="dashbaord__level_title mb-1">
                      Все ветви в структуре
                    </div>
                    <GoalChecker
                      endPoint={allStructureGoal}
                      completedPoint={allStructure}
                    />
                  </div>
                  <div className="promotion__result_wrapper">
                    <div className="dashbaord__level_title mb-1">
                      Все ветви в структуре за минусом самой сильной
                    </div>
                    <GoalChecker
                      endPoint={withoutStrongestGoal}
                      completedPoint={otherStructure}
                    />
                    <div className="mt-2">
                      Сильная ветвь в структуре:{" "}
                      {strongestStructure.fullName ?? "-"}{" "}
                      {strongestStructure.fullName &&
                        formatMoney(strongestStructure.amount)}
                    </div>
                  </div>
                  <div className="promotion__result_wrapper">
                    <div className="dashbaord__level_title mb-1">
                      Личные продажи
                    </div>
                    <GoalChecker
                      completedPoint={firstStructure}
                      endPoint={100_000}
                    />
                  </div>
                </div>
              </div>
              <div className="promotion__rating_wrapper">
                <div className="promotion__rating_title">Таблица лидеров</div>
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
  )
}

export default withForbiddenWithoutBuyingPackage(Promotion)
