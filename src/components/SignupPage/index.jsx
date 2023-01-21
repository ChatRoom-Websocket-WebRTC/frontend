import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Navigate } from "react-router";
import { Formik } from "formik";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import background from "../../assets/images/signup.jpg";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import ReactLoading from "react-loading";
import { baseUrl } from "../../utils/constants";
import "./style.scss";
const cacheRtl = createCache({
  key: "muirtl",

  stylisPlugins: [rtlPlugin],

  prepend: true,
});

export default function SignUp() {
  React.useLayoutEffect(() => {
    document.body.setAttribute("dir", "rtl");
  });

  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const [apiResponse, setApiResponse] = useState(false);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <CacheProvider value={cacheRtl}>
      {apiResponse && (
        <Navigate
          to={{ pathname: "/email-verification", state: { values: values } }}
        />
      )}
      {!apiResponse && (
        <div dir="rtl">
          <Helmet>
            <title>ثبت نام</title>
          </Helmet>

          <div className="shadow">
            <Container
              maxWidth="xs"
              component="main"
              sx={{ margin: "auto auto 30px auto" }}
            >
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontFamily: "iranyekan",
                }}
              >
                <Avatar sx={{ m: 1, backgroundColor: "rgb(99, 36, 200)" }}>
                  <AccountCircleIcon />
                </Avatar>
                <Typography component="h1" variant="Button">
                  ثبت نام
                </Typography>

                <ToastContainer rtl={true} />

                <Grid>
                  <img src={background} alt="" className="responsive" />
                </Grid>

                <Formik
                  initialValues={{
                    username: "",
                    email: "",
                    password1: "",
                    password2: "",
                  }}
                  onSubmit={async (values) => {
                    try {
                      setLoading(true);
                      const res = await axios
                        .post(
                          `${baseUrl}/accounts/auth/check-username/`,
                          JSON.stringify(values),
                          {
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        )
                        .then((response) => {})
                        .catch((err) => {
                          setLoading(false);
                          throw "username";
                        });

                      const res2 = await axios
                        .post(
                          `${baseUrl}/accounts/auth/check-email/`,
                          JSON.stringify(values),
                          {
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        )
                        .then((response) => {})
                        .catch((err) => {
                          setLoading(false);
                          throw "email";
                        });

                      const res3 = await axios
                        .post(
                          `${baseUrl}/accounts/auth/activate/`,
                          JSON.stringify(values),
                          {
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        )
                        .then((response) => {
                          localStorage.setItem("email", values.email);
                          localStorage.setItem("username", values.username);
                          // history.push("/email-verification");
                          setLoading(false);
                          setApiResponse(response.status === 200);
                        })
                        .catch((err) => {
                          setLoading(false);
                          throw "activate";
                        });
                    } catch (error) {
                      if (error === "username") {
                        toast.error("این نام کاربری قبلا انتخاب شده", {
                          position: "bottom-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "dark",
                        });
                      } else if (error === "email") {
                        toast.error("این ایمیل قبلا در سیستم ثبت شده", {
                          position: "bottom-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "dark",
                        });
                      } else if (error === "activate") {
                        toast.error("مشکلی پیش اومده بعدا دوباره امتحان کن", {
                          position: "bottom-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "dark",
                        });
                      }
                    }
                  }}
                  validateOnChange={validateAfterSubmit}
                  validate={(values) => {
                    let error = {};

                    if (!values.username) {
                      error.username = " نام کاربری خودت رو وارد کن";
                    } else if (!values.email) {
                      error.email = " ایمیل خودت رو وارد کن";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                        values.email
                      )
                    ) {
                      error.email = "ایمیل نامعتبر";
                    } else if (!values.password1) {
                      error.password1 = " رمز عبور خودت رو وارد کن";
                    } else if (values.password1.length < 8) {
                      error.password1 = "طول رمز نباید کمتر از 8 کاراکتر باشه";
                    } else if (/^\d+$/i.test(values.password1)) {
                      error.password1 =
                        "رمز عبورت نباید فقط از اعداد تشکیل شده باشه";
                    } else if (!values.password2) {
                      error.password2 = " رمز عبور خودت رو دوباره وارد کن";
                    } else if (values.password2 !== values.password1) {
                      error.password2 = "با رمز اصلی یکسان نیست";
                    }

                    return error;
                  }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    setFieldValue,
                    values,
                    errors,
                    handleBlur,
                  }) => (
                    <Box
                      component="form"
                      noValidate
                      onSubmit={(e) => {
                        e.preventDefault();
                        setValidateAfterSubmit(true);
                        handleSubmit();
                      }}
                      sx={{ mt: 3 }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            autoComplete="given-name"
                            name="username"
                            required
                            fullWidth
                            id="username"
                            label="نام کاربری"
                            autoFocus
                            value={values.username}
                            onChange={handleChange}
                            helperText={
                              validateAfterSubmit ? errors.username : null
                            }
                            error={Boolean(errors.username)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="email"
                            label="ایمیل"
                            name="email"
                            autoComplete="email"
                            value={values.email}
                            onChange={handleChange}
                            helperText={
                              validateAfterSubmit ? errors.email : null
                            }
                            error={Boolean(errors.email)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="password1"
                            label="رمز عبور"
                            type="password"
                            id="password1"
                            autoComplete="new-password"
                            value={values.password1}
                            onChange={handleChange}
                            helperText={
                              validateAfterSubmit ? errors.password1 : null
                            }
                            error={Boolean(errors.password1)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="password2"
                            label="تکرار رمز عبور"
                            type="password"
                            id="password2"
                            autoComplete="new-password"
                            value={values.password2}
                            onChange={handleChange}
                            helperText={
                              validateAfterSubmit ? errors.password2 : null
                            }
                            error={Boolean(errors.password2)}
                          />
                        </Grid>
                      </Grid>

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                          mt: 3,
                          backgroundColor: "rgb(99, 36, 200) !important",
                        }}
                      >
                        {!loading && <span>ثبت نام</span>}
                        {loading && (
                          <ReactLoading
                            type="bubbles"
                            color="#fff"
                            className="loading-signup"
                          />
                        )}
                      </Button>
                      <Grid container justifyContent="flex-start">
                        <Grid item>
                          <Container sx={{ mt: 2, mr: 0 }}>
                            <Link
                              sx={{
                                textDecoration: "none",
                                color: "black",
                                mr: 0,
                              }}
                              to="/login"
                              variant="body2"
                            >
                              <span style={{ fontSize: "13px" }}>
                                قبلا ثبت نام کردی؟
                              </span>
                              <Button
                                sx={{
                                  color: "rgb(76, 175, 80)",
                                  fontSize: "13px",
                                }}
                              >
                                ورود
                              </Button>
                            </Link>
                          </Container>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </Formik>
              </Box>
            </Container>
          </div>
        </div>
      )}
    </CacheProvider>
  );
}
