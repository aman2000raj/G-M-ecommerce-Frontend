// src/components/SignIn.js
import * as React from 'react';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../img/logo.svg';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../contexts/UserContext.js';

const defaultTheme = createTheme();

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const SignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); 

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data); // Save user data to context and localStorage
        navigate('/'); // Redirect to home or another page
      } else {
        const errorData = await response.json();
        setErrors({ general: errorData.message || 'An error occurred' });
      }
    } catch (err) {
      console.error('Error:', err);
      setErrors({ general: 'An error occurred' });
    }
    setSubmitting(false);
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component='main'
        maxWidth='xs'
        sx={{
          height: '95vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className='flex flex-row items-center justify-center mb-2'>
            <img className='w-[40px] ml-2' src={Logo} alt='Logo' />
          </div>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Box sx={{ mt: 1 }}>
                  <Field
                    as={TextField}
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    autoFocus
                    error={Boolean(errors.email && touched.email)}
                    helperText={<ErrorMessage name='email' />}
                  />
                  <Field
                    as={TextField}
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    error={Boolean(errors.password && touched.password)}
                    helperText={<ErrorMessage name='password' />}
                  />
                  <FormControlLabel
                    control={<Checkbox value='remember' color='primary' />}
                    label='Remember me'
                  />
                  {errors.general && (
                    <Typography color='error'>{errors.general}</Typography>
                  )}
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isSubmitting}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href='#' variant='body2'>
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link
                        to={'/signup'}
                        variant='body2'
                        className='cursor-pointer text-blue-500'
                      >
                        Don&apos;t have an account? Sign Up
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
