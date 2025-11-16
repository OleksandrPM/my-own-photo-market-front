"use client";

import { Field, Formik, FormikHelpers, Form } from "formik";
import { signInSchema } from "lib/formik/schemas";

export interface Values {
  email: string;
  password: string;
}

const initialValues: Values = {
  email: "",
  password: "",
};

export default function SignInForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
    >
      <Form>
        <label htmlFor="email">Email</label>
        <Field
          id="email"
          name="email"
          placeholder="john@acme.com"
          type="email"
        />

        <label htmlFor="password">Password</label>
        <Field
          id="password"
          name="password"
          placeholder="Your password"
          type="password"
        />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
