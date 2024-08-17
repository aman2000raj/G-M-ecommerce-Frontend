import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../img/logo.svg';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const defaultTheme = createTheme();

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10,15}$/, 'Invalid phone number')
    .required('Mobile number is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/\d/, 'Password must contain a number')
    .matches(/[@$!%*?&]/, 'Password must contain a special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const SignUp = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
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
            Sign up
          </Typography>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              mobileNumber: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form>
                <Box
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        autoComplete='given-name'
                        name='firstName'
                        required
                        fullWidth
                        id='firstName'
                        label='First Name'
                        autoFocus
                        error={touched.firstName && !!errors.firstName}
                        helperText={<ErrorMessage name='firstName' />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        id='lastName'
                        label='Last Name'
                        name='lastName'
                        autoComplete='family-name'
                        error={touched.lastName && !!errors.lastName}
                        helperText={<ErrorMessage name='lastName' />}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        name='mobileNumber'
                        label='Mobile Number'
                        id='mobileNumber'
                        autoComplete='tel'
                        inputProps={{
                          maxLength: 15,
                        }}
                        error={touched.mobileNumber && !!errors.mobileNumber}
                        helperText={<ErrorMessage name='mobileNumber' />}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        error={touched.email && !!errors.email}
                        helperText={<ErrorMessage name='email' />}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='new-password'
                        error={touched.password && !!errors.password}
                        helperText={<ErrorMessage name='password' />}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        required
                        fullWidth
                        name='confirmPassword'
                        label='Confirm Password'
                        type='password'
                        id='confirmPassword'
                        autoComplete='new-password'
                        error={touched.confirmPassword && !!errors.confirmPassword}
                        helperText={<ErrorMessage name='confirmPassword' />}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </Button>
                </Box>
                <Grid container justifyContent='flex-end'>
                  <Grid item>
                    <Link
                      to={'/login'}
                      variant='body2'
                      className='cursor-pointer text-blue-500'
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
