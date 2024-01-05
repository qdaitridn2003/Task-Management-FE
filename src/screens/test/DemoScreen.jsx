import React from 'react';

import {
  AppBar,
  Button,
  ContainerView,
  EventCard,
  Icon,
  IconButton,
  ScrollView,
} from '../../components';
import { Color } from '../../common';

const DemoScreen = () => {
  return (
    <ContainerView>
      <AppBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <IconButton iconSource={require('../../assets/icons/Plus.png')} />
        <IconButton type="secondary" iconSource={require('../../assets/icons/Plus.png')} />
        <IconButton type="delete" iconSource={require('../../assets/icons/DeleteOutline.png')} />

        <EventCard status="upcoming" />
        <EventCard status="active" />

        <Button
          tw="mb-4"
          icon={'right'}
          iconSource={require('../../assets/icons/ForwardArow.png')}
          loading={false}>
          Tạo sự kiện
        </Button>

        <Button type="secondary" tw="mb-4" iconSource={require('../../assets/icons/Status.png')}>
          Tạo sự kiện
        </Button>

        <Button tw="mb-4" iconSource={require('../../assets/icons/Status.png')} loading={true}>
          Tạo sự kiện
        </Button>

        <Icon source={require('../../assets/icons/Account.png')} color={Color.primary} />
      </ScrollView>
    </ContainerView>
  );
};

export default DemoScreen;
