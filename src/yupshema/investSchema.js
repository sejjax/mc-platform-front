import * as Yup from 'yup';

const investSchema = Yup.object({
  amount: Yup.number().required('Please Enter Value'),
});

export default investSchema;
