import { styled } from 'nativewind';
import {
  Text as RNText,
  TouchableOpacity as RNTouchableOpacity,
  View as RNView,
  TextInput,
  Image as RNImage,
  Pressable as RNPressable,
  ScrollView as RNScrollView,
} from 'react-native';
import {
  Text as RNPaperText,
  Button as RNPaperButton,
  Modal as RNPaperModal,
  TextInput as RNPaperTextInput,
  Avatar as RNPaperAvatar,
  HelperText,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Text = styled(RNText);
export const TouchableOpacity = styled(RNTouchableOpacity);
export const View = styled(RNView, 'bg-white');
export const Input = styled(TextInput);
export const Image = styled(RNImage);
export const Pressable = styled(RNPressable);
export const ScrollView = styled(RNScrollView);

// Paper Components
export const PaperText = styled(RNPaperText);
export const PaperButton = styled(RNPaperButton);
export const PaperModal = styled(RNPaperModal);
export const PaperTextInput = styled(RNPaperTextInput);
export const PaperAvatar = styled(RNPaperAvatar);
export const PaperHelperText = styled(HelperText);

export const ColView = styled(RNView, 'flex-col');
export const RowView = styled(RNView, 'flex-row');
export const ContainerView = styled(SafeAreaView, 'flex-1 bg-white px-5 py-4');
