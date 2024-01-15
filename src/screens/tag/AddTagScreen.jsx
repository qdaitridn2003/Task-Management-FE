import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, ContainerView, SubHeaderBar, TextInputWithLabel } from '../../components';
import { asyncStorageGetItem, axiosAuthPost } from '../../configs';
import { ScreenName, accessTokenKey } from '../../common';
import { TagContext } from '../../contexts';

const AddTagScreen = () => {
  const navigation = useNavigation();
  const { page, setPage } = useContext(TagContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({
    name: '',
  });

  const handleErrors = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const handleAddTag = async () => {
    const token = await asyncStorageGetItem(accessTokenKey);
    const response = await axiosAuthPost('/tag/create-tag', token, { name, description });
    if (response.message === 'Vui lòng đặt tên cho tag này') {
      handleErrors('Vui lòng đặt tên cho thẻ này', 'name');
    } else {
      setPage(1);
      navigation.navigate(ScreenName.tagList);
    }
  };

  return (
    <ContainerView>
      <SubHeaderBar
        tw="-mb-2 mx-5"
        title="Thêm thẻ công việc"
        onBackPress={() => navigation.navigate(ScreenName.tagList)}
      />
      <TextInputWithLabel
        className="mt-6"
        label="Tên thẻ"
        placeholder="Nhập tên thẻ"
        onChangeText={(text) => setName(text)}
        error={errors.name}
        onFocus={() => handleErrors(null, 'name')}
      />
      <TextInputWithLabel
        label="Mô tả"
        placeholder="Nhập mô tả"
        onChangeText={(text) => setDescription(text)}
      />
      <Button children="Thêm thẻ mới" onPress={handleAddTag} />
    </ContainerView>
  );
};

export default AddTagScreen;
