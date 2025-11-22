import * as yup from "yup";
export const contactSchema = yup.object().shape({
  name: yup.string().required("نام الزامی است"),
  email: yup
    .string()
    .required("ایمیل الزامی است")
    .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "فرمت ایمیل اشتباه است"),
  phone: yup
    .string()
    .required("شماره تماس الزامی است")
    .matches(/^[0-9]+$/, "شماره تلفن باید فقط عدد باشد"),
});
