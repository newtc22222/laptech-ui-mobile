import React from "react";
import { Dialog, Portal, Text, Button } from "react-native-paper";

const DialogInfo = ({
  children,
  icon,
  title,
  message,
  titleBtnClose = "Back",
  show,
  onHide,
}) => {
  return (
    <Portal>
      <Dialog visible={show} onDismiss={onHide}>
        {icon && <Dialog.Icon icon={icon} />}
        <Dialog.Title>{title || "Thông báo"}</Dialog.Title>
        <Dialog.Content>
          {children ? (
            children
          ) : (
            <Text variant="bodyMedium">{message || ""}</Text>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onHide}>{titleBtnClose}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogInfo;
