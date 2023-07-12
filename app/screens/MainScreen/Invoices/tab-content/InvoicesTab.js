import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { getCurrencyString } from "../../../../utils/formatCurrency";

const InvoicesTab = ({ invoices, show = true, handlePress }) => {
  if (!show) return <></>;

  if (invoices.length === 0) {
    return (
      <View style={styles.tabContentEmpty}>
        <Text style={styles.tabContentEmptyText}>Không có hóa đơn ở đây!</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ gap: 8 }}>
      {invoices.map((invoice) => (
        <TouchableOpacity
          key={invoice.id}
          style={styles.tabContent}
          onPress={() => handlePress(invoice)}
        >
          <View
            style={{
              backgroundColor: "#059345",
              paddingVertical: 8,
              paddingHorizontal: 5,
            }}
          >
            <Text style={{ color: "#fff" }}>{"Mã hóa đơn: " + invoice.id}</Text>
          </View>
          <View style={{ paddingVertical: 8, paddingHorizontal: 8, rowGap: 5 }}>
            <Text>Địa chỉ giao hàng: {invoice.address}</Text>
            <Text>Điện thoại: {invoice.phone}</Text>
            <Text>Số lượng hàng hóa: {invoice.paymentAmount}</Text>
            <Text>
              Tổng giá trị:{" "}
              {getCurrencyString(invoice.paymentTotal, "vi-VN", "VND")}
            </Text>
            <Text>
              Ngày tạo đơn hàng:{" "}
              {new Date(invoice.createdDate).toLocaleString("vi")}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tabContent: {
    borderWidth: 1,
    borderColor: "#059345",
  },
  tabContentEmpty: {
    paddingVertical: 20,
    alignItems: "center",
  },
  tabContentEmptyText: {
    fontSize: 18,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default InvoicesTab;
