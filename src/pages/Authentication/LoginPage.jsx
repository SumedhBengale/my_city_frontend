import {React} from 'react';
import loginBackground from '../../assets/images/login/login_background.png';
import Logo from '../../assets/images/white_logo.png';
import GoogleLogo from '../../assets/images/login/google_logo.svg';
import FacebookLogo from '../../assets/images/login/facebook_logo.svg';
import EmailLogo from '../../assets/images/login/email_logo.svg';
import { useNavigate } from 'react-router-dom';
import {login} from './api'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const navigate = useNavigate();
  
    // Define the validation schema using Yup
    const validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });
  
    const handleSubmit = async (values) => {
        try {
          const response = await login(values.email, values.password);
          if (response.status === 200) {
            console.log(response);
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.userId)
            navigate('/');
          } else if (response.status === 404) {
            toast.error('User not Found');
          } else if (response.status === 401) {
            toast.error('Incorrect Password');
          } else {
            toast.error('Something went wrong');
          }
        } catch (error) {
          console.log(error);
          toast.error('An error occurred while processing your request');
        }
      };
  
    return (
        <>
      <div
        style={{
          backgroundImage: `url(${loginBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100vh',
        }}
      >
        {/* Background Image */}
        <div className="w-full flex justify-center items-center h-full">
          <div className="mx-4 md:w-1/2 xl:w-1/3">
            <div className='w-full flex justify-center items-center'>
            <img src={Logo} alt="My City Logo" className="w-48 self-center mb-5"></img>
            </div>
            <div className="w-full h-full p-4 bg-white bg-opacity-5 rounded-2xl border backdrop-blur-md">
              {/* Blur Rectangle */}
              <div className="WelcomeBack text-white text-[18px] font-bold">Welcome Back</div>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Field
                      name="email"
                      type="text"
                      className="w-full h-12 mt-4 px-2 bg-white rounded-lg"
                      placeholder="Email"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500" />
                    <Field
                      name="password"
                      type="password"
                      className="w-full h-12 mt-4 px-2 bg-white rounded-lg"
                      placeholder="Password"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500" />
                    {/* Forgot Password Link */}
                    <div className="flex justify-end items-center mt-4">
                      <div className="text-white underline">Forgot Password?</div>
                    </div>
                    <button
                      type="submit"
                      className="w-full flex justify-center items-center h-12 mt-4 px-2 bg-white rounded-lg font-bold text-black"
                    >
                      Login
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
                <div class="flex items-center w-full py-4"> {/* Divider */}
                    <hr className=" w-full border-sm my-4" />
                    <span class="flex-shrink font-custom text-lg text-white px-4 italic font-light">or</span>
                    <hr className="w-full border-sm my-4" />
                </div>

                <div className="w-full h-12 bg-white rounded-lg border border-zinc-900 mt-4 z-0" >
                <div class="w-full relative h-full z-0 flex">
                    <button className='w-full text-center self-center text-black flex justify-center items-center'>Continue with Facebook</button>

                    <div class="absolute inset-y-0 left-0 z-10 self-start">
                        <div class="flex h-full items-center justify-center">
                            <img src={FacebookLogo} alt='Google Logo' className='pl-4 pt-3 self-start z-10'></img>
                        </div>
                    </div>
                </div>
                </div>
                
                <div className="w-full h-12 bg-white rounded-lg border border-zinc-900 mt-4 z-0" >
                <div class="w-full relative h-full z-0 flex">
                    <button className='w-full text-center self-center text-black flex justify-center items-center'>Continue with Google</button>

                    <div class="absolute inset-y-0 left-0 z-10 self-start">
                        <div class="flex h-full items-center justify-center">
                            <img src={GoogleLogo} alt='Google Logo' className='pl-4 pt-3 self-start z-10'></img>
                        </div>
                    </div>
                </div>
                </div>

                <div className="w-full h-12 bg-white rounded-lg border border-zinc-900 mt-4 z-0" >
                <div class="w-full relative h-full z-0 flex">
                    <button className='w-full text-center self-center text-black flex justify-center items-center' onClick={()=>navigate('/signup')}>SignUp with Email</button>

                    <div class="absolute inset-y-0 left-0 z-10 self-start">
                        <div class="flex h-full items-center justify-center">
                            <img src={EmailLogo} alt='Google Logo' className='pl-4 pt-3 self-start z-10'></img>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
    <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    />
</>
  );
};

export default LoginPage;