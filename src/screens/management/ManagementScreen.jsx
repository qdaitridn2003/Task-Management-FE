import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { Color, ScreenName } from '../../common';
import {
  Button,
  ContainerView,
  View,
  Text,
  Image,
  Icon,
  TouchableOpacity,
  Pressable,
  MainHeaderBar,
} from '../../components';
import { AuthContext } from '../../contexts';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const ManagementScreen = () => {
  const { setIsLogin } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <ContainerView>
      <MainHeaderBar type="management" rightButton={false} />
      <View className="flex flex-row justify-between px-6 my-6 w-full h-auto">
        <Pressable onPress={() => navigation.navigate(ScreenName.account)}>
          <View className="w-40 h-40" style={styles.boxButton}>
            <Icon size={48} source={require('../../assets/icons/ButtonProfile.png')} />
            <Text
              style={{ color: Color.primary }}
              className="text-center text-base font-semibold mt-2">
              Cá nhân
            </Text>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate(ScreenName.client)}>
          <View className="w-40 h-40" style={styles.boxButton}>
            <Icon size={48} source={require('../../assets/icons/ButtonClient.png')} />
            <Text
              style={{ color: Color.primary }}
              className="text-center text-base font-semibold mt-2">
              Khách hàng
            </Text>
          </View>
        </Pressable>
      </View>

      <View className="flex flex-row justify-between px-6 my-6 w-full h-auto">
        <Pressable onPress={() => navigation.navigate(ScreenName.employee)}>
          <View className="w-40 h-40" style={styles.boxButton}>
            <Icon size={48} source={require('../../assets/icons/ButtonEmployee.png')} />
            <Text
              style={{ color: Color.primary }}
              className="text-center text-base font-semibold mt-2">
              Nhân viên
            </Text>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate(ScreenName.tag)}>
          <View className="w-40 h-40" style={styles.boxButton}>
            <Icon size={48} color={Color.primary} source={require('../../assets/icons/Tag.png')} />
            <Text
              style={{ color: Color.primary }}
              className="text-center text-base font-semibold mt-2">
              Quản lý thẻ
            </Text>
          </View>
        </Pressable>
      </View>

      <View className="flex flex-row justify-center px-3 my-6 w-ful">
        <Pressable onPress={() => setIsLogin(false)}>
          <View className="w-40 h-40" style={styles.boxButton}>
            <Icon size={48} source={require('../../assets/icons/ButtonSignOut.png')} />
            <Text
              style={{ color: Color.primary }}
              className="text-center text-base font-semibold mt-2">
              Đăng xuất
            </Text>
          </View>
        </Pressable>
      </View>

      {/* <Button tw="mb-4" type="secondary" onPress={() => navigation.navigate(ScreenName.account)}>
        Cá nhân
      </Button>
      <Button tw="mb-4" type="secondary" onPress={() => navigation.navigate(ScreenName.client)}>
        Quản lý Khách hàng
      </Button>

      <Button tw="mb-4" type="secondary" onPress={() => navigation.navigate(ScreenName.employee)}>
        Quản lý Nhân viên
      </Button>

      <Button tw="mb-4" type="secondary" onPress={() => navigation.navigate(ScreenName.demo)}>
        Màn hình demo
      </Button>

      <Button tw="mb-4" type="secondary" onPress={() => setIsLogin(false)}>
        Đăng xuất
      </Button> */}
    </ContainerView>
  );
};

export default ManagementScreen;
const styles = StyleSheet.create({
  boxButton: {
    elevation: 4,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
