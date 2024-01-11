import React from 'react';

import { Text, Pressable, RowView } from './TailwindComponent';
import { NoticeActionType } from '../../common';
import { dateFormatDetail } from '../../utilities';

export const NotificationCard = (props) => {
  return (
    <Pressable
      className="mx-4 mb-2 border-b-[1px] border-neutral-100 pb-3"
      key={props.notification.item._id}>
      <Text className="text-xl">{props.notification.item.message}</Text>
      <RowView className="justify-between items-center">
        <Text className="font-semibold">{dateFormatDetail(props.notification.item.createdAt)}</Text>
        {props.notification.item.type === NoticeActionType.create ? (
          <Text className="bg-green-500 font-medium uppercase text-white p-2 rounded-lg w-1/6 text-center">
            Tạo
          </Text>
        ) : props.notification.item.type === NoticeActionType.update ? (
          <Text className="bg-yellow-500 font-medium uppercase text-white p-2 rounded-lg w-1/6 text-center">
            Sửa
          </Text>
        ) : (
          <Text className="bg-red-500 font-medium uppercase text-white p-2 rounded-lg w-1/6 text-center">
            Xóa
          </Text>
        )}
      </RowView>
    </Pressable>
  );
};
