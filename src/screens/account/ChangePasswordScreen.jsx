// import { useNavigation } from '@react-navigation/native';
// import { Image } from 'expo-image';
// import * as React from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';

// // import { Color, FontSize, Padding } from '../../components/styles/GlobalStyles';

// const ChangePasswordScreen = () => {
//   const navigation = useNavigation();
//   const [isPasswordVisible, setIsPasswordVisible] = React.useState(true);

//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible(!isPasswordVisible);
//   };

//   const ref_input2 = React.useRef();
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <Image style={styles.iconBackward} source={require('../../assets/icons/backward.png')} />
//       </TouchableOpacity>

//       <View style={[styles.title, styles.titleSpaceBlock]}>
//         <Text style={styles.ngNhp}>Đổi mật khẩu</Text>
//       </View>
//       <View style={styles.containerTextInput}>
//         <Image
//           style={styles.iconUsername}
//           contentFit="cover"
//           source={require('../../assets/icons/icon--lock-outline3x.png')}
//         />
//         <TextInput
//           style={styles.textInput}
//           returnKeyType="next"
//           placeholder="Mật khẩu"
//           secureTextEntry={isPasswordVisible}
//         />
//         <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
//           <Image
//             source={
//               isPasswordVisible
//                 ? require('../../assets/icons/eye-icon.png')
//                 : require('../../assets/icons/eye-off-icon.png')
//             }
//             style={styles.iconEyePass}
//           />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.containerTextInput}>
//         <Image
//           style={styles.iconUsername}
//           contentFit="cover"
//           source={require('../../assets/icons/icon--lock-outline3x.png')}
//         />
//         <TextInput
//           style={styles.textInput}
//           returnKeyType="next"
//           placeholder="Mật khẩu mới"
//           secureTextEntry
//         />
//         <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
//           <Image
//             source={
//               isPasswordVisible
//                 ? require('../../assets/icons/eye-icon.png')
//                 : require('../../assets/icons/eye-off-icon.png')
//             }
//             style={styles.iconEyePass}
//           />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.containerTextInput}>
//         <Image
//           style={styles.iconUsername}
//           contentFit="cover"
//           source={require('../../assets/icons/icon--lock-outline3x.png')}
//         />
//         <TextInput
//           style={styles.textInput}
//           returnKeyType="next"
//           placeholder="Xác nhận lại mật khẩu"
//           secureTextEntry
//         />
//         <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
//           <Image
//             source={
//               isPasswordVisible
//                 ? require('../../assets/icons/eye-icon.png')
//                 : require('../../assets/icons/eye-off-icon.png')
//             }
//             style={styles.iconEyePass}
//           />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
//         <Text style={styles.text}>Lưu thay đổi</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: Color.colorWhite,
//     width: '100%',
//     height: 812,
//     // paddingHorizontal: Padding.p_5xl,
//     // paddingVertical: Padding.p_base,
//   },
//   containerTextInput: {
//     marginTop: 16,
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 16,
//     backgroundColor: 'white',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 1,
//     elevation: 3,
//     overflow: 'hidden',
//   },
//   iconUsername: {
//     width: 20,
//     height: 20,
//     marginRight: 8,
//     marginLeft: 24,
//   },
//   iconEyePass: {
//     width: 20,
//     height: 20,
//     marginRight: 12,
//   },
//   iconBackward: {
//     width: 25,
//     height: 25,
//   },
//   textInput: {
//     flex: 1,
//     backgroundColor: 'white',
//     height: 40,
//   },
//   containerGoogle: {
//     marginTop: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 12,
//     backgroundColor: '#EFF1F3',
//     padding: 12,
//   },
//   iconGoogle: {
//     width: 24,
//     height: 24,
//     marginRight: 8,
//   },
//   iconContainer: {
//     padding: 8,
//   },
//   iconLayout: {
//     height: 24,
//     width: 24,
//     overflow: 'hidden',
//   },
//   titleSpaceBlock: {
//     marginTop: 16,
//     alignSelf: 'stretch',
//   },
//   hocClr: {
//     // color: Color.neutral2,
//     fontWeight: '500',
//   },
//   dividerLayout: {
//     height: 2,
//     // backgroundColor: Color.colorWhitesmoke,
//     flex: 1,
//   },
//   ngKTypo: {
//     textAlign: 'left',
//     lineHeight: 24,
//     // fontSize: FontSize.headlines16Medium_size,
//   },
//   ngNhp: {
//     // fontSize: FontSize.title24Bold_size,
//     lineHeight: 29,
//     textAlign: 'center',
//     // color: Color.colorMidnightblue,
//     fontWeight: '700',
//     flex: 1,
//   },
//   title: {
//     padding: 10,
//     margin: 16,
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   forgotPassword: {
//     justifyContent: 'flex-end',
//     textAlign: 'right',
//     marginTop: 16,
//     // color: Color.colorMidnightblue,
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   button: {
//     marginTop: 16,
//     height: 48,
//     backgroundColor: '#643FDB',
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   text: {
//     color: '#FFFFFF',
//     fontSize: 16,
//   },
//   hoc: {
//     marginLeft: 8,
//     lineHeight: 24,
//     // fontSize: FontSize.headlines16Medium_size,
//     // color: Color.neutral2,
//     textAlign: 'center',
//   },
//   dividerItem: {
//     marginLeft: 8,
//   },
//   divider: {
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   spacer: {
//     overflow: 'hidden',
//     flex: 1,
//     // backgroundColor: Color.colorWhite,
//   },
//   chaCTi: {
//     // color: Color.neutral2,
//     fontWeight: '500',
//   },
//   ngK: {
//     // color: Color.colorDarkorange,
//     marginLeft: 8,
//     fontWeight: '700',
//     textAlign: 'left',
//   },
//   footer: {
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
// });

// export default ChangePasswordScreen;
