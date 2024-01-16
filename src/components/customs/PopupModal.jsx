import React from 'react';
import { styled } from 'nativewind';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { PaperActivityIndicator, Modal, Text, View } from './TailwindComponent';
import { Button } from './CustomButton';

export const PopupModal = ({
  visible,
  onRequestClose,
  dismissable = true,
  loading = false,
  loadingText = 'Đang tải...',
  title,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="fade"
      supportedOrientations={['portrait', 'landscape']}>
      <View tw="flex-1 justify-center items-center bg-black/50">
        {dismissable && (
          <TouchableWithoutFeedback onPress={onRequestClose}>
            <View
              style={{
                backgroundColor: 'transparent',
                ...StyleSheet.absoluteFillObject,
              }}></View>
          </TouchableWithoutFeedback>
        )}
        <View tw={`p-6 rounded-3xl bg-neutral4 w-9/12 ${!onCancel && !loading && 'w-6/12'}`}>
          {loading ? (
            <View>
              <PaperActivityIndicator />
              <Text tw="mt-4 text-primary">{loadingText}</Text>
            </View>
          ) : (
            <View>
              {/* Title */}
              {title && <Text tw="text-xl text-center font-bold self-center mb-6">{title}</Text>}

              {/* Buttons */}
              <View tw="flex-row justify-center">
                {onCancel && (
                  <Button tw="mb-0 mx-0 mr-3" type="secondary" onPress={onCancel}>
                    Hủy
                  </Button>
                )}

                <Button tw="mb-0 mx-0" onPress={onConfirm}>
                  {onCancel ? 'Xác nhận' : 'OK'}
                </Button>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
