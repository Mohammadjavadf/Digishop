export function validateCheckout(form) {
  const errors = {};

  if (!form.firstName.trim()) errors.firstName = "نام را وارد کنید";
  if (!form.lastName.trim()) errors.lastName = "نام خانوادگی را وارد کنید";

  if (!form.phone.trim()) {
    errors.phone = "شماره موبایل را وارد کنید";
  } else if (!/^09\d{9}$/.test(form.phone)) {
    errors.phone = "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود";
  }

  if (!form.province) errors.province = "استان را انتخاب کنید";
  if (!form.city.trim()) errors.city = "شهر را وارد کنید";
  if (!form.address.trim()) errors.address = "آدرس را وارد کنید";
  else if (form.address.trim().length < 10)
    errors.address = "آدرس باید حداقل ۱۰ کاراکتر باشد";

  if (!form.postalCode.trim()) {
    errors.postalCode = "کد پستی را وارد کنید";
  } else if (!/^\d{10}$/.test(form.postalCode)) {
    errors.postalCode = "کد پستی باید ۱۰ رقم باشد";
  }

  if (!form.payment) errors.payment = "روش پرداخت را انتخاب کنید";

  return errors;
}