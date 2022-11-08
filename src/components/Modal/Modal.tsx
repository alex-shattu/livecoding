import { StyleSheet, View, Modal as RNModal } from 'react-native';
import React from 'react';

type ModalProps = {
  visible: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
};

const Modal = ({
  visible,
  onClose = () => {},
  children = null,
}: ModalProps) => {
  const handleClose = React.useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {children}
          {/* <Text style={styles.modalText}>Hello World!</Text> */}
          {/* <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable> */}
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 250,
  },
});
