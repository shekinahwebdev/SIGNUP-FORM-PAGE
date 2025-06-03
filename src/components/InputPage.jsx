import React from "react";
import { useFormik } from "formik";
import errorImage from "/public/assets/images/icon-error.svg";

const InputPage = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.firstName.trim()) {
        errors.firstName = "First Name cannot be empty";
      }

      if (!values.lastName.trim()) {
        errors.lastName = "Last Name cannot be empty";
      }

      if (!values.email.trim()) {
        errors.email = "Email Address cannot be empty";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password.trim()) {
        errors.password = "Password cannot be empty";
      }

      return errors;
    },
    onSubmit: (values) => {
      alert("Form submitted successfully");
      console.log(values);
      // page reload
      window.location.reload();
    },
  });

  // input fields
  const fields = [
    { name: "firstName", placeholder: "First Name" },
    { name: "lastName", placeholder: "Last Name" },
    { name: "email", placeholder: "Email Address" },
    { name: "password", placeholder: "Password" },
  ];

  return (
    <section className="signup_page">
      <div className="subscription_page">
        <p>
          <strong>Try it free 7 days </strong>then $20/mo. thereafter
        </p>
      </div>

      <div className="input_page">
        <form className="input_page_form" onSubmit={formik.handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="input-wrapper">
              <input
                type={field.name === "password" ? "password" : "text"}
                name={field.name}
                value={formik.values[field.name]}
                placeholder={field.placeholder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`user_input ${
                  formik.touched[field.name] && formik.errors[field.name]
                    ? "input-error"
                    : ""
                }`}
              />
              {formik.touched[field.name] && formik.errors[field.name] && (
                <>
                  <img
                    className="error-icon"
                    src={errorImage}
                    alt="error"
                    aria-hidden="true"
                  />
                  <div className="text">
                    <p aria-live="polite" className="error-message">
                      {formik.errors[field.name]}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}

          <button type="submit" className="submit_btn">
            Claim your free trial
          </button>
        </form>

        <p className="subscription_info">
          By clicking the button, you are agreeing to our
          <span> Terms and Services</span>
        </p>
      </div>
    </section>
  );
};

export default InputPage;
