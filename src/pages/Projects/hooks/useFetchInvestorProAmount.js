import { useEffect, useState } from 'react';

import { fetchInvestorProAmount } from 'services/depositService';

export const useFetchInvestorProAmount = () => {
  const [values, setValues] = useState({
    perUser: 0,
    allPackages: 0,
  });

  useEffect(() => {
    fetchInvestorProAmount().then((values) => {
      if (values.perUser && values.allPackages)
        setValues({ allPackages: values.allPackages, perUser: values.perUser });
    });
  }, []);

  return values;
};
