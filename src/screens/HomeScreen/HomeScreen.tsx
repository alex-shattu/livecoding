import {
  Button as RNButton,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootNavigatorParamList } from '../../navigation/RootNavigator';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import TextInput from '../../components/TextInput';
import { colors, sizes } from '../../constants';
import { persistor } from '../../utils';
import { ActionTypes, Item, reducer, select, storageKey } from './reducer';

type HomeScreenProps = NativeStackScreenProps<RootNavigatorParamList, 'Home'>;

// TODO
/**
 * Необходим прелоадер на асинхронные операции - сохранение, восстановление.
 * Варианты хранения - redux + redux-persis, mobx + mobx-persist.
 * Кнопки создания, удаления, редактирования стоит сделать иконками, т.к. на Андроид выглядит не очень
 * Делал с учётом того что поверка в основном будет на iOS
 */

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalInputValue, setModalInputValue] = React.useState('');
  const [selectedItemId, setSelectedItemId] = React.useState<number | null>(
    null,
  );
  const [state, dispatch] = React.useReducer(reducer, []);

  React.useEffect(() => {
    const initAsync = async () => {
      const cache: Item[] = await persistor.restore([], storageKey);
      dispatch({ type: ActionTypes.Init, payload: cache });
    };
    initAsync();
  }, []);

  const handleAddItem = React.useCallback(() => {
    setModalVisible(true);
  }, []);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <RNButton onPress={handleAddItem} title="Add" color="#000" />
      ),
    });
  }, [handleAddItem, navigation]);

  const handleCloseModal = React.useCallback(() => {
    setModalVisible(false);
    setSelectedItemId(null);
    setModalInputValue('');
  }, []);

  const handleCancel = React.useCallback(() => {
    handleCloseModal();
  }, [handleCloseModal]);

  const handleSaveItem = React.useCallback(() => {
    handleCloseModal();
    if (selectedItemId === null) {
      dispatch({
        type: ActionTypes.Add,
        payload: { value: modalInputValue, id: Date.now() },
      });
    } else {
      dispatch({
        type: ActionTypes.Edit,
        payload: { value: modalInputValue, id: selectedItemId },
      });
    }
  }, [handleCloseModal, modalInputValue, selectedItemId]);

  const handleEditItem = React.useCallback(
    (id: number) => {
      const item = select(state, id);
      setModalInputValue(item.value);
      setSelectedItemId(item.id);
      setModalVisible(true);
    },
    [state],
  );

  const handleDeleteItem = React.useCallback((id: number) => {
    dispatch({ type: ActionTypes.Delete, payload: id });
  }, []);

  const handleChangeText = React.useCallback((text: string) => {
    if (/^[a-z,а-яё]+$/i.test(text)) {
      setModalInputValue(text);
    }
  }, []);

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText} ellipsizeMode="tail" numberOfLines={1}>
        {item.value}
      </Text>
      <RNButton
        onPress={() => handleEditItem(item.id)}
        title="Edit"
        color={colors.primary}
      />
      <Spacer width={1} />
      <RNButton
        onPress={() => handleDeleteItem(item.id)}
        title="Delete"
        color={colors.destroy}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.itemsFlatList}
        data={state.sort((a, b) => a.value.localeCompare(b.value))}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Spacer height={2} />}
      />
      <Modal visible={modalVisible} onClose={handleCloseModal}>
        <View style={styles.modalContent}>
          <TextInput value={modalInputValue} onChange={handleChangeText} />
          <Spacer height={2} />
          <View style={styles.modalButtons}>
            <Button label="Save" onClick={handleSaveItem} />
            <Spacer width={1} />
            <Button
              label="Cancel"
              onClick={handleCancel}
              appearance="secondary"
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  itemsFlatList: {
    padding: sizes.step * 2,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: colors.primaryText,
  },
  modalButtons: {
    flexDirection: 'row',
  },
  modalContent: {
    width: '100%',
  },
  modalInput: {},
  itemContainer: {
    backgroundColor: colors.paperBackground,
    padding: sizes.step * 3,
    borderRadius: sizes.borderRadius,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
