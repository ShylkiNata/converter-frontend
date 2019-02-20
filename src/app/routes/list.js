import AuthPage from '../components/pages/Auth';
import Home from '../components/pages/Home';

export default [
    {
        path: '/',
        redirect: 'home',
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
        path: '/home',
        name: 'Home',
        component: Home
    },
];