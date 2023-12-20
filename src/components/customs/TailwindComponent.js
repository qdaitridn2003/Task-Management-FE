import { styled } from 'nativewind';
import {
    Text as RNText,
    TouchableOpacity as RNTouchableOpacity,
    View as RNView,
    TextInput,
} from 'react-native';
import { Text as RNPaperText } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Text = styled(RNText);
export const TouchableOpacity = styled(RNTouchableOpacity, 'w-full');
export const View = styled(RNView);
export const Input = styled(TextInput);
export const PaperText = styled(RNPaperText);

export const ColView = styled(RNView, 'flex-col');
export const RowView = styled(RNView, 'flex-row');
export const ContainerView = styled(SafeAreaView, 'flex-1 mx-4');
