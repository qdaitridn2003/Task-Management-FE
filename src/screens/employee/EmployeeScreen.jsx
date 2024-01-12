import { Color } from '../../common';
import {
  View,
  Text,
  ContainerView,
  MainHeaderBar,
  Searchbar,
  IconButton,
  EmployeeCard,
  FlatList,
} from '../../components';
import React, { useContext, useEffect } from 'react';
import { EmployeeContext } from '../../contexts';

const EmployeeScreen = () => {
  const { data } = useContext(EmployeeContext);
  console.log(data);
  return (
    <ContainerView>
      <MainHeaderBar type={'employees'} rightButton={false} />
      <View tw="flex-row px-5">
        <Searchbar
          tw="flex-1 mr-2.5 mb-2"
          // onSubmitEditing={handleSearch}
          // value={searchText}
          onChangeText={(text) => setSearchText(text)}
          // setSearchText={setSearchText}
        />
        <IconButton
          type="secondary"
          iconColor={Color.neutral2}
          iconSource={require('../../assets/icons/Tune.png')}
        />
      </View>

      <FlatList
        tw="mx-6 my-4 "
        data={data}
        renderItem={({ item }) => (
          <EmployeeCard
            name={item.name}
            role={item.auth.role.name}
            id={item._id}
            avatar={item.avatar}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </ContainerView>
  );
};

export default EmployeeScreen;
