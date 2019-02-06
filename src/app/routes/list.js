import AuthPage from '../components/pages/Auth';
import ConverterCompressor from '../components/pages/ConverterCompressor';

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