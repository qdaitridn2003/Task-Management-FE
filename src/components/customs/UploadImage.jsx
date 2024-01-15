import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { ContainerView, View, Text, TouchableOpacity, Image } from './TailwindComponent';
import { styled } from 'nativewind';
import { uploadImage } from '../../utilities';
import { Color } from '../../common';
import { Icon } from './CustomIcon';
const RNPaperCard = ({ label = '', type, onUploaded }) => {
  const [avatar, setAvatar] = useState('');

  const imagePicker = async () => {
    try {
      const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      //   console.log('Image: ', assets[0].uri);

      if (!canceled) {
        const imageUri = assets[0].uri;
        const result = await uploadImage('/client/upload-image/', imageUri, 'avatar');
        if (result) {
          setAvatar(result);
          onUploaded(result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteImage = () => {
    setAvatar('');
    onUploaded('');
  };
  return (
    <View className="flex px-5">
      {label && <Text tw="mb-2 text-base font-bold">{label}</Text>}
      <View className="flex flex-row">
        {avatar === '' ? (
          <TouchableOpacity
            onPress={imagePicker}
            className="w-32 h-20"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderStyle: 'dashed',
              borderColor: Color.primary,
              borderRadius: 16,
              borderWidth: 1,
            }}>
            <Icon size={24} source={require('../../assets/icons/Upload.png')} />
          </TouchableOpacity>
        ) : (
          <Image
            className="w-32 h-20 rounded-2xl"
            source={{
              uri: avatar,
            }}
          />
        )}

        <TouchableOpacity
          className="w-32 h-20 ml-3"
          onPress={handleDeleteImage}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderStyle: 'dashed',
            borderColor: Color.semanticRed,
            borderRadius: 16,
            borderWidth: 1,
          }}>
          <Icon
            size={24}
            color={Color.semanticRed}
            source={require('../../assets/icons/DeleteOutline.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const UploadImage = styled(RNPaperCard);
