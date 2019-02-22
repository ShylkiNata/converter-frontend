import AuthPage from '../components/pages/Auth';
import Home from '../components/pages/Home';
import LoadingPage from '../components/pages/LoadingPage';

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
    {
        path: '/tool/:tool/:type',
        name: 'Loading Page',
        component: LoadingPage,
    }
];