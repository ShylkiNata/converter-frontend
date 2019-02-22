export default {
    methods: {
        getTypeByProperty(key) {
            switch (key) {
                case 'password':
                case 'password_confirmation':
                    return 'password';
                default:
                    return 'text';
            }
        },
        getRulesByProperty(key) {
            switch(key) {
                case 'username':
                    return 'required|min:6|max:64';
                case 'email':
                    return 'required|min:6|max:64|email';
                case 'password':
                    return 'required|min:6|max:64';
                case 'password_confirmation':
                    return 'required|min:6|max:64|confirmed:password';
            }
        },
        uppercased(key) {
            let words = [];
            key.split(' ').forEach(word => {
                words.push(word.charAt(0).toUpperCase() + word.slice(1));
            });

            return words.join(' ').replace(/_/g, ' ');
        },
    }
}