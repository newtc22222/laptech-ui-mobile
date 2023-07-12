import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Provider } from "react-native-paper";

import { useAppContext } from "../../../components/context/AppContext";
import { AuthService, ProductService, UserService } from "../../../services";
import InvoicesTab from "./tab-content/InvoicesTab";
import DialogInfo from "../../../components/common/DialogInfo";

import { getCurrencyString } from "../../../utils/formatCurrency";

const tabNames = [
  "Tất cả",
  "Chờ xác nhận",
  "Đang giao hàng",
  "Đã giao",
  "Đã hủy",
];

const selectInvoice = (invoiceList, tabName) => {
  switch (tabName) {
    case tabNames[1]:
      return invoiceList.filter(
        (i) => i.orderStatus === "PENDING" || i.orderStatus === "WAIT_CONFIRMED"
      );
    case tabNames[2]:
      return invoiceList.filter((i) => i.orderStatus === "SHIPPED");
    case tabNames[3]:
      return invoiceList.filter((i) => i.orderStatus === "RECEIVED");
    case tabNames[4]:
      return invoiceList.filter(
        (i) =>
          i.orderStatus === "CANCELED" ||
          i.orderStatus === "FAILED" ||
          i.orderStatus === "IGNORED"
      );
    default:
      return invoiceList;
  }
};

const InvoicesScreen = ({ navigation }) => {
  const {
    profile: { accessToken, refreshToken },
    handleUpdateAccessToken,
  } = useAppContext();
  const [tabSelect, setTabSelect] = useState(tabNames[0]);
  const [invoiceSelect, setInvoiceSelect] = useState(null);
  const [invoiceList, setInvoiceList] = useState([]);
  const [invoiceDetailItems, setInvoiceDetailItems] = useState([]);
  const [showInvoiceDetailDialog, setShowInvoiceDetailDialog] = useState(false);

  useEffect(() => {
    const fetchInvoice = async (accessToken) => {
      const res = await UserService.getInvoiceOfUser(accessToken);
      setInvoiceList(res.data);
    };

    try {
      fetchInvoice(accessToken);
    } catch (error) {
      console.error(error);
      AuthService.refreshToken(refreshToken).then((res) =>
        handleUpdateAccessToken(res.accessToken)
      );
    }
  }, [accessToken]);

  const handleShowInvoiceDetail = (invoice) => {
    setInvoiceSelect(invoice);
    ProductService.getItemsInvoices(invoice.id, accessToken)
      .then((res) => {
        setInvoiceDetailItems(res.data);
        setShowInvoiceDetailDialog(true);
      })
      .catch((error) => {
        console.error(error);
        AuthService.refreshToken(refreshToken).then((res) =>
          handleUpdateAccessToken(res.accessToken)
        );
      });
  };

  return (
    <Provider>
      <DialogInfo
        title={"Sản phẩm trong đơn hàng " + invoiceSelect?.id}
        show={showInvoiceDetailDialog}
        onHide={() => setShowInvoiceDetailDialog(false)}
      >
        <ScrollView contentContainerStyle={{ rowGap: 5 }}>
          {invoiceDetailItems.map((item) => (
            <View
              key={item.id}
              style={{
                flexDirection: "row",
                padding: 10,
                borderWidth: 1,
                borderColor: "teal",
                backgroundColor: "#fff",
                columnGap: 10,
              }}
            >
              <Image
                source={{ uri: item.imageRepresent }}
                style={{ height: 100, width: 100, resizeMode: "contain" }}
              />
              <View style={{ width: 180, rowGap: 5 }}>
                <Text numberOfLines={3} style={{ fontWeight: "bold" }}>
                  {item.product.name}
                </Text>
                {item.discountPrice < item.price ? (
                  <View style={{ flexDirection: "row", columnGap: 5 }}>
                    <Text style={{ fontWeight: "bold", color: "teal" }}>
                      {getCurrencyString(item.discountPrice, "vi-VN", "VND")}
                    </Text>
                    <Text style={{ textDecorationLine: "line-through" }}>
                      {getCurrencyString(item.price, "vi-VN", "VND")}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={{ fontWeight: "bold", color: "teal" }}>
                      {getCurrencyString(item.price, "vi-VN", "VND")}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                ></View>
                <Text>Số lượng: {item.quantity}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </DialogInfo>
      <ScrollView contentContainerStyle={styles.container}>
        <ScrollView horizontal contentContainerStyle={styles.tabContainer}>
          {tabNames.map((tabName) => (
            <TouchableOpacity
              key={tabName}
              onPress={() => setTabSelect(tabName)}
              style={[
                styles.tabButton,
                tabName === tabSelect ? styles.tabButtonSelect : {},
              ]}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  tabName === tabSelect ? styles.tabButtonTextSelect : {},
                ]}
              >
                {tabName}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {tabNames.map((tab) => (
          <InvoicesTab
            key={tab}
            invoices={selectInvoice(invoiceList, tab)}
            show={tab === tabSelect}
            handlePress={handleShowInvoiceDetail}
          />
        ))}
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    rowGap: 10,
  },
  tabContainer: {
    paddingVertical: 10,
  },
  tabButton: {
    width: 140,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#ddd",
  },
  tabButtonSelect: {
    backgroundColor: "teal",
  },
  tabButtonText: {
    fontSize: 14,
    textAlign: "center",
    textTransform: "uppercase",
  },
  tabButtonTextSelect: {
    color: "#fff",
  },
});

export default InvoicesScreen;
