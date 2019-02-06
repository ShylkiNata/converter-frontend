import AuthPage from '../components/AuthPage';
import ConverterCompressor from '../components/ConverterCompressor';

export default [
    {
        path: '/',
        redirect: 'sign-in',
    },
    {
        path: '/sign-in',
        name: 'Sign In',
        component: AuthPage,
    },
    {
        path: '/sign-up',
        name: 'Sign Up',
        component: AuthPage,
    },
    {
        path: '/service',
        name: 'converter-compressor',
        component: ConverterCompressor
    },
];