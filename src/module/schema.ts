import * as yup from 'yup';

export const schema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  company: yup.string().required(),
  email: yup.string().email().required(),
  role: yup.string().oneOf(['user', 'admin']).required(),
  password: yup.string().required().min(8),
});
