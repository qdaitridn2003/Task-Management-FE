import React, { useContext } from 'react';

import { ContainerView, Text, TouchableOpacity } from '../../components';
import { AuthContext } from '../../contexts';

const SignInScreen = () => {
    const { setIsLogin } = useContext(AuthContext);
    const signInHandler = () => {
        setIsLogin(true);
    };
    return (
        <ContainerView>
            <TouchableOpacity
                className="bg-primary py-3 mt-2 rounded-xl"
                onPress={() => signInHandler()}>
                <Text className="text-center text-white uppercase font-medium text-lg">
                    Sign In
                </Text>
            </TouchableOpacity>
        </ContainerView>
    );
};

export default SignInScreen;
