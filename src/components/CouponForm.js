import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function CouponForm({ addCoupon }) {
  const formik = useFormik({
    initialValues: {
      code: '',
      discount: '',
      expiry: '',
      description: '',
      store_id: '',
      user_id: '',
    },
    validationSchema: Yup.object({
      code: Yup.string().required('Coupon code is required'),
      discount: Yup.number()
        .required('Discount is required')
        .min(1, 'Discount must be at least 1%')
        .max(100, 'Discount cannot exceed 100%'),
      expiry: Yup.date().required('Expiry date is required'),
      description: Yup.string(),
      store_id: Yup.number().required('Store ID is required'),
      user_id: Yup.number().required('User ID is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('Submitting form values:', values);  // Debug log

      fetch('http://localhost:5555/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Coupon created:', data);  // Debug log
          addCoupon(data);
          resetForm();
        })
        .catch((error) => console.error('Error adding coupon:', error));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="coupon-form">
      <input
        type="text"
        name="code"
        placeholder="Coupon Code"
        value={formik.values.code}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.code && formik.errors.code ? (
        <div className="error">{formik.errors.code}</div>
      ) : null}

      <input
        type="number"
        name="discount"
        placeholder="Discount %"
        value={formik.values.discount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.discount && formik.errors.discount ? (
        <div className="error">{formik.errors.discount}</div>
      ) : null}

      <input
        type="date"
        name="expiry"
        value={formik.values.expiry}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.expiry && formik.errors.expiry ? (
        <div className="error">{formik.errors.expiry}</div>
      ) : null}

      <textarea
        name="description"
        placeholder="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <input
        type="number"
        name="store_id"
        placeholder="Store ID"
        value={formik.values.store_id}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.store_id && formik.errors.store_id ? (
        <div className="error">{formik.errors.store_id}</div>
      ) : null}

      <input
        type="number"
        name="user_id"
        placeholder="User ID"
        value={formik.values.user_id}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.user_id && formik.errors.user_id ? (
        <div className="error">{formik.errors.user_id}</div>
      ) : null}

      <button type="submit">Add Coupon</button>
    </form>
  );
}

export default CouponForm;
