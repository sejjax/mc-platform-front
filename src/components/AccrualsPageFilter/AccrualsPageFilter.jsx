import React, { useEffect, useState } from 'react';

import { useDebounce } from 'hooks/useDebounce';
import useTranslation from 'hooks/useTranslation';
import useWindowSize from 'hooks/useWindowSize';
import { Input, Label } from 'reactstrap';

import AccrualTypeSwitcher from '../AccrualTypeShitcher';
import DatePicker from '../DatePicker';
import s from './AccrualsPageFilter.module.scss';

const AccrualsPageFilter = ({
  accrualsType,
  isPassiveAccruals,
  setIsPassiveAccruals,
  setFilter,
  items,
  displayedKeyNames,
  setSort: setExternalSort,
}) => {
  const t = useTranslation();
  const { width: windowWidth } = useWindowSize();
  const [showNulled, setShowNulled] = useState(false);
  const [showSended, setShowSended] = useState(false);
  const [productId, setProductId] = useState('');
  const debounceProductId = useDebounce(productId, 1500);
  const [sort, setSort] = useState({
    field: '',
    order: 'asc',
  });

  const isMobile = windowWidth <= 770;

  const itemKeys = Object.keys(items[0] ?? {}).filter((key) => !!displayedKeyNames[key]);

  const onSortChange = (event) => {
    const sortChangeType = event.target.name;
    setSort((prev) => ({ ...prev, [sortChangeType]: event.target.value }));
  };

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      sendet: showSended,
      nulled: showNulled,
      pageNumber: 1,
      productId: debounceProductId,
    }));
  }, [setFilter, showNulled, showSended, debounceProductId]);

  useEffect(() => {
    if (isMobile && sort.field) {
      setExternalSort({ [sort.field]: sort.order.toUpperCase() });
    }
  }, [isMobile, setExternalSort, sort]);

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.container}>
          <div className={s.fields}>
            {accrualsType === 'referrals' && (
              <div className={s.block}>
                <span className={s.label}>{t('common_type')}</span>
                <AccrualTypeSwitcher value={isPassiveAccruals} onChange={setIsPassiveAccruals} />
              </div>
            )}
            <div className={s.block}>
              <span className={s.label}>{t('common_chose_period')}</span>
              <DatePicker setFilterDate={setFilter} />
            </div>
            {accrualsType === 'deposit' && (
              <div className={s.block}>
                <span className={s.label}>{t('common_product_id')}</span>
                <Input
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  placeholder={t('common_product_id_placeholder')}
                  style={{ minWidth: 240 }}
                />
              </div>
            )}
          </div>
          {isMobile && (
            <div className="d-flex gap-2 flex-wrap table_mobile_select">
              <Input type="select" value={sort.field} onChange={onSortChange} name="field">
                <option disabled value="">
                  {t('project_accruals_sorting_field')}
                </option>
                {itemKeys &&
                  itemKeys.map((key, index) => (
                    <option key={`${key}_${index}`} value={key}>
                      {displayedKeyNames[key]}
                    </option>
                  ))}
              </Input>
              <Input type="select" onChange={onSortChange} name="order">
                <option value="asc">{t('project_accruals_sorting_order_asc')}</option>
                <option value="desc">{t('project_accruals_sorting_order_desc')}</option>
              </Input>
            </div>
          )}
        </div>
        <div className={s.checkboxes}>
          <Label>
            <Input
              type="checkbox"
              checked={showNulled}
              onChange={(event) => setShowNulled(event.target.checked)}
              className="me-1"
            />
            {t('project_accruals_annulled_checkbox_label')}
          </Label>
          <Label>
            <Input
              type="checkbox"
              checked={showSended}
              onChange={(event) => setShowSended(event.target.checked)}
              className="me-1"
            />
            {t('project_accruals_show_sent_checkbox_label')}
          </Label>
        </div>
      </div>
    </div>
  );
};

export default AccrualsPageFilter;
