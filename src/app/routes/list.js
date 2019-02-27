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
        meta: {
            guest: true
        }
    },
    {
        path: '/sign-up',
        name: 'Sign Up',
        component: AuthPage,
        meta: {
            guest: true
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/tool/:tool/:type',
        name: 'Loading Page',
        component: LoadingPage,
        meta: {
            requiresAuth: true
        }
    }
];