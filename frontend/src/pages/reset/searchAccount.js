import { useState } from "react";
import { Formik, Form } from "formik";
import LoginInput from "../../components/inputs/loginInput";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

export default function SearchAccount({ email, setEmail, error , setError, setLoading, setUserInfos, setVisible}) {
  const validateEmail = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email address")
      .max(50, "email address can't be more than 50 characters"),
  });

  const handleSearch = async () => {
    try{
        setLoading(true)  
         
        const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/findUser`, {email})
        setUserInfos(data)
        setVisible(1)
        setError("")
        setLoading(false)

    }catch(error){
        setLoading(false)
        setError(error.response.data.message)
    }
  }

  return (
    <div className="reset_form">
      <div className="reset_form_header">Find your account</div>
      <div className="reset_form_text">
        Please enter your email and phone number to search for your account
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          email,
        }}
        validationSchema={validateEmail}
        onSubmit={() => {
            handleSearch()
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email address or phone number"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/profile" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
