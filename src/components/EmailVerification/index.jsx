import React, { useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import VerificationInput from "react-verification-input";
import image from "../../assets/images/email.png";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyTimer from "../MyTimer";
import { ToastContainer, toast } from "react-toastify";
import { baseUrl } from "../../utils/constants";
import { convertNumberToPersian } from "../../utils/helpers";
import ReactLoading from "react-loading";
import { useLocation, Navigate } from "react-router-dom";
import "./style.scss";

function EmailVerification(props) {
  const history = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const otp = useRef("");
  const [resend, setResend] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const email = localStorage.getItem("email")
  const username = localStorage.getItem("username")
  const time = new Date();
  time.setSeconds(time.getSeconds() + 5); // 10 minutes timer

  const onExpire = (newState) => {
    setResend(newState);
  };

  const resend_code = (event) => {
    event.preventDefault();
    setResend(false);
    
    const info = { email: email, username: username };

    axios
      .post(`${baseUrl}/accounts/auth/resend_otp/`, info, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success("کد تایید با موفقیت ارسال شد", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.log("error: ", err);
        toast.error("مشکلی در فرستادن کد پیش آمده لطفا دوباره امتحان کنید", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };
  const verifyAndSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    const info = { email: email, token: otp.current.value ?? null };

    try {
      const res = await axios
        .post(`${baseUrl}/accounts/auth/signup_otp/`, info, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setLoading(false);
          localStorage.removeItem("email")
          localStorage.removeItem("username")

          toast.success("ثبت نام با موفقیت انجام شد", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setTimeout(() => {
            setIsSignedUp(true);
          }, 3000);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.response.data);
          if (err.response.data == "otp is invalid") {
            throw "checkcode";
          } else {
            throw "signup";
          }
        });
    } catch (error) {
      if (error === "checkcode") {
        toast.error("کد وارد شده اشتباه است", {
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
      if (error === "signup") {
        toast.error("مشکلی پیش اومده دوباره امتحان کن", {
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
  };

  if(isSignedUp){
    history("/")
  }
  return (
    <div dir="ltr">
      {!isSignedUp && (
        <Container maxWidth="sm" component="main">
          <Box sx={{ mt: 12 }}>
            <Grid
              container
              spacing={1}
              align="center"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12}>
                <Grid container>
                  <ToastContainer rtl={true} />
                  <Grid item xs={12}>
                    <Typography
                      variant="h4"
                      color="text.secondary"
                      align="center"
                    >
                      لطفا کد تایید ایمیل رو وارد کن
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                      sx={{ mt: 4 }}
                    >
                      :کد {convertNumberToPersian(6)} رقمی به آدرس ایمیل زیر ارسال شده است
                      <p style={{marginTop:"5px"}}>{email}</p>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    component="form"
                    sx={{ margin: "80px 10px 0 0" }}
                    onSubmit={verifyAndSignUp}
                  >
                    <VerificationInput
                      ref={otp}
                      removeDefaultStyles
                      dir="ltr"
                      classNames={{
                        container: "email-verification-container",
                        character: "email-verification-character",
                        characterInactive: "character--inactive",
                        characterSelected: "character--selected",
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        mt: 4,
                        backgroundColor: "rgb(99, 36, 200) !important",
                      }}
                    >
                      {!loading && <span>تایید</span>}
                      {loading && (
                        <ReactLoading
                          type="bubbles"
                          color="#fff"
                          className="loading-signup"
                        />
                      )}
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                      sx={{ mt: 8 }}
                    >
                      ارسال دوباره کد بعد از{" "}
                      <span>
                        <MyTimer
                          expiryTimestamp={time}
                          expire={onExpire}
                          resend={resend}
                          seconds={60}
                        />
                      </span>{" "}
                      ثانیه
                      <Button
                        disabled={!resend}
                        variant="contained"
                        sx={{ m: 2 }}
                        onClick={resend_code}
                        className="resend-code"
                      >
                        ارسال
                      </Button>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <img src={image} alt="" className="responsive" />
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </div>
  );
}

export default EmailVerification;
