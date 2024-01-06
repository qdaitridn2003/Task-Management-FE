import { styled } from 'nativewind';
import {
  Text as RNText,
  TouchableOpacity as RNTouchableOpacity,
  View as RNView,
  Image as RNImage,
  Pressable as RNPressable,
  ScrollView as RNScrollView,
  ActivityIndicator as RNActivityIndicator,
  TextInput as RNTextInput,
  FlatList as RNFlatList,
} from 'react-native';
import {
  Text as RNPaperText,
  Button as RNPaperButton,
  Modal as RNPaperModal,
  TextInput as RNPaperTextInput,
  Avatar as RNPaperAvatar,
  HelperText,
  ActivityIndicator as RNPaperActivityIndicator,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Text = styled(RNText);
export const TouchableOpacity = styled(RNTouchableOpacity);
export const View = styled(RNView, 'bg-white');
export const Image = styled(RNImage);
export const Pressable = styled(RNPressable);
export const ScrollView = styled(RNScrollView);
export const ActivityIndicator = styled(RNActivityIndicator, 'flex-1');
export const TextInput = styled(RNTextInput);
export const FlatList = styled(RNFlatList);

// Paper Components
export const PaperText = styled(RNPaperText);
export const PaperButton = styled(RNPaperButton);
export const PaperModal = styled(RNPaperModal);
export const PaperTextInput = styled(RNPaperTextInput);
export const PaperAvatar = styled(RNPaperAvatar);
export const PaperHelperText = styled(HelperText);
export const PaperActivityIndicator = styled(RNPaperActivityIndicator, 'flex-1');

export const ColView = styled(RNView, 'flex-col');
export const RowView = styled(RNView, 'flex-row');
export const ContainerView = styled(SafeAreaView, 'flex-1 bg-white pt-4');
