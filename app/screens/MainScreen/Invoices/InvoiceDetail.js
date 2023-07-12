import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { AuthService, ProductService } from "../../../services";
import { useAppContext } from "../../../components/context/AppContext";

const InvoiceDetail = ({ invoice }) => {
  const {
    profile: { accessToken, refreshToken },
    handleUpdateAccessToken,
  } = useAppContext();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async (accessToken) => {
      const res = await ProductService.getItemsInvoices(
        invoice.id,
        accessToken
      );
      setItems(res.data);
    };
    try {
      fetchItems(accessToken);
    } catch (error) {
      AuthService.refreshToken(refreshToken).then((res) =>
        handleUpdateAccessToken(res.accessToken)
      );
    }
  }, []);

  return (
    <View>
      {items.map((item) => (
        <Text>{item.price}</Text>
      ))}
    </View>
  );
};

export default InvoiceDetail;
