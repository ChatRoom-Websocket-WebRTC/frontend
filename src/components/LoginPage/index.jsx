import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import store from '../../store/store';
import createCache from '@emotion/cache';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link as routerLink, history } from 'react-router-dom';
import * as yup from 'yup';
import rtl from 'jss-rtl';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions';
import imageSrc from '../../assets/images/avatar.png';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import './style.scss';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../utils/constants';
import apiInstance from '../../config/axios';
import loginImg from '../../assets/images/login.jpg'




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
  email: yup.string('').required('باید حتما ایمیل یا نام کاربریت رو بنویسی تا بتونی وارد بشی.'),
  password: yup.string('').required('باید حتما رمز عبورت رو بنویسی تا بتونی وارد بشی.'),
});

const LoginPage = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: async values => {
      try {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isEmail = re.test(String(values.email).toLowerCase());
        const body = {
          password: values.password,
        };
        if (isEmail) {
          body.email = values.email;
        } else {
          body.username = values.email;
        }
        setLoading(true);
        const res = await axios.post(`${baseUrl}/accounts/auth/signin`, body);
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        setLoading(false);
        toast.success('با موفقیت وارد شدی.');
        setTimeout( Navigate, 1500);
      } catch (error) {
        setLoading(false);
        toast.error('نام کاربری یا رمز عبورت اشتباهه!', {
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

  const Navigate = () => {
    store.dispatch(login()).then(() => {
      history('/chat')
    })
  }
  return (
    <CacheProvider value={rtl ? cacheRtl : cacheLtr}>
      <div dir="rtl">
        <Helmet>
          <title>ورود</title>
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
            <Avatar className="login-page-avatar" sx={{ m: 1 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontFamily: 'iranyekan' }}>
              ورود
            </Typography>
            <img src={loginImg} alt="login" style={{ width: '100%' }} />
            <Box
              component="form"
              dir="rtl !important"
              noValidate
              onSubmit={formik.handleSubmit}
              setFieldValue
              sx={{ mt: 1, fontFamily: 'iranyekan' }}
            >
              <TextField
                dir="rtl !important"
                margin="normal"
                required
                fullWidth
                id="email"
                label="نام کاربری یا ایمیل"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="رمز عبور"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                sx={{ fontFamily: 'iranyekan' }}
              />

              <Button type="submit" fullWidth variant="contained" className="login-page-button" sx={{ mt: 3, mb: 2 }}>
                {!loading && <span>ورود</span>}
                {loading && <ReactLoading type="bubbles" color="#fff" className="loading-login" />}
              </Button>
              <Grid item xs sx={{ mt: 3, mb: 2 }}>
                <Link
                  to="/forget-password"
                  component={routerLink}
                  variant="body2"
                  className="login-link__forget-password"
                >
                  رمز عبورتو یادت رفته؟
                </Link>
              </Grid>
              <Grid item sx={{ mt: 3, mb: 2 }}>
                <Link
                  to="/signup"
                  component={routerLink}
                  variant="body2"
                  sx={{ mt: 3, mb: 2 }}
                  className="login-link__not-registered"
                >
                  {'هنوز عضو نشدی؟! همین حالا عضو شو.'}
                </Link>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </CacheProvider>
  );
};

export default LoginPage;
