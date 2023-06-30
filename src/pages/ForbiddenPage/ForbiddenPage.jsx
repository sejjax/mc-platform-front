import React from 'react';

import Breadcrumbs from '../../components/Common/Breadcrumb';

import { t } from '../../i18n';

const ForbiddenPage = () => {
  return (
    <div className="page-content">
      <Breadcrumbs
        title="Forbidden"
        hasBreadcrumbItem={false}
        breadcrumbItem={t('forbidden_page')}
      />
    </div>
  );
};

export default ForbiddenPage;
