import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router';
import ReactLoading from 'react-loading';
import * as yup from 'yup';
import rtl from 'jss-rtl';
import axios from 'axios';
import './style.scss';
import 'react-toastify/dist/ReactToastify.css';
import {baseUrl} from "../../utils/constants";
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
  prepend: true,
});

const cacheLtr = createCache({
  key: 'muiltr',
  prepend: true,
});

const validationSchema = yup.object({
  password1: yup
    .string('')
    .required('باید حتما رمز عبور جدیدت رو بنویسی.')
    .matches(/(?!^\d+$)^.+$/, 'رمز عبورت نباید فقط از اعداد تشکیل شده باشه')
    .matches(/^(?=.{8,})/, 'طول رمز نباید کمتر از 8 کاراکتر باشه'),
  password2: yup
    .string('')
    .required('باید حتما رمز عبور جدیدت رو بنویسی.')
    .oneOf([yup.ref('password1')], 'تکرار رمزعبور باید با رمزعبور یکسان باشه!'),
});

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  const uid = query.get('uid');
  const formik = useFormik({
    initialValues: {
      password1: '',
      password2: '',
    },

    onSubmit: async values => {
      try {
        setLoading(true);
        const res = await axios.post(`${baseUrl}/auth/users/reset_password_confirm/`, {
          new_password: values.password1,
          re_new_password: values.password1,
          uid,
          token,
        });
        toast.success('رمز عبور باموفقیت تغییر یافت.');
        setTimeout(() => {
          history('/login');
        }, 3000);
      } catch (error) {
        setLoading(false);
        toast.error('در سیستم مشکلی بوجود اومده. دوباره امتحان کن.', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          className: 'toast-error',
        });
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <CacheProvider value={rtl ? cacheRtl : cacheLtr}>
      {(token === null || uid === null) && <Navigate to="*" />}
      {/* not existing url to Navigate to NOtFound Page */}
      <div dir="rtl">
        <Helmet>
          <title>تغییر رمز عبور</title>
        </Helmet>
        <ToastContainer rtl={true} position="bottom-center" />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              dir: 'rtl !important',
              fontFamily: 'iranyekan',
            }}
          >
            <Avatar className="reset-password-avatar" sx={{ m: 1 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontFamily: 'iranyekan' }}>
              عوض کردن رمز عبور
            </Typography>
            <Box
              component="form"
              dir="rtl !important"
              //onSubmit={handleSubmit}
              noValidate
              onSubmit={formik.handleSubmit}
              setFieldValue
              sx={{ mt: 1, fontFamily: 'iranyekan' }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="password1"
                label="رمز عبور"
                type="password"
                id="password1"
                autoComplete="current-password"
                value={formik.values.password1}
                onChange={formik.handleChange}
                error={formik.touched.password1 && Boolean(formik.errors.password1)}
                helperText={formik.touched.password1 && formik.errors.password1}
                sx={{ fontFamily: 'iranyekan' }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password2"
                label="تکرار رمز عبور"
                type="password"
                id="password2"
                autoComplete="current-password"
                value={formik.values.password2}
                onChange={formik.handleChange}
                error={formik.touched.password2 && Boolean(formik.errors.password2)}
                helperText={formik.touched.password2 && formik.errors.password2}
                sx={{ fontFamily: 'iranyekan' }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="reset-password-button"
                sx={{ mt: 3, mb: 2 }}
              >
                {!loading && <span>ارسال</span>}
                {loading && <ReactLoading type="bubbles" color="#fff" className="loading-login" />}
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </CacheProvider>
  );
};

export default ResetPasswordPage;
