import React from "react";
import { Modal, Portal, Button } from "react-native-paper";

const ModalInfo = ({
  children,
  titleBtnClose = "Trở lại",
  _containerStyle,
  _btnStyle,
  visible,
  onHide,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onHide}
        contentContainerStyle={[
          {
            backgroundColor: "#eee",
            padding: 20,
            marginHorizontal: 10,
            rowGap: 10,
          },
          _containerStyle,
        ]}
      >
        {children}
        <Button
          mode="outlined"
          onPress={onHide}
          style={[{ borderRadius: 5, backgroundColor: "#fff" }, _btnStyle]}
          labelStyle={{ fontSize: 18 }}
        >
          {titleBtnClose}
        </Button>
      </Modal>
    </Portal>
  );
};

export default ModalInfo;
