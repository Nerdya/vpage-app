import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, Button, StyleSheet } from "react-native";
import { MessageCode } from "@/helpers/config";

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const code = decodeURIComponent(params.code as string) as MessageCode;
  const errorMessage = decodeURIComponent(params.detail as string);

  const toIndex = () => {
    router.back();
  };

  const renderMessage = () => {
    switch (code) {
      case MessageCode.SUCCESS:
        return "Hoàn thành đăng ký\nBạn đã hoàn thành Videocall!\nVPBank sẽ thông báo đến bạn khi thẻ được phát hành thành công.";
      case MessageCode.END_CALL:
      case MessageCode.END_CALL_EARLY:
        return "Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi.\nQuý khách chưa hoàn tất cuộc gọi. Để thực hiện lại việc tự xác thực hoặc gặp tư vấn viên, vui lòng truy cập lại link trong tin nhắn.";
      case MessageCode.CALL_EXPIRED:
        return "Hiện tại các tổng đài viên đều đang bận! Vui lòng nhấn nút thử lại để kết nối hoặc đặt lịch hẹn với tư vấn viên. Xin trân trọng cảm ơn!";
      case MessageCode.CALL_TIMEOUT:
        return "Call timed out.";
      case MessageCode.ERROR_INIT:
        return "Có lỗi xảy ra khi khởi tạo cuộc gọi.";
      case MessageCode.ERROR_HOOK:
        return "Đã quá hạn của phiên xác thực.\nQuý khách vui lòng quay lại màn hình xác thực để tham gia.";
      case MessageCode.ERROR_CLOSE_VIDEO:
        return "Có lỗi xảy ra khi kết thúc cuộc gọi.";
      case MessageCode.ERROR:
        return "Có lỗi xảy ra trong quá trình cuộc gọi.";
      default:
        return "Có lỗi xảy ra.";
    }
  }

  const renderButton = () => {
    switch (code) {
      case MessageCode.SUCCESS:
        return null;
      default:
        return <Button title="Quay về trang chủ" onPress={toIndex} />;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{renderMessage()}</Text>
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      {renderButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  message: { fontSize: 18, textAlign: "center", margin: 10 },
  errorMessage: { color: "red", textAlign: "center", margin: 10 },
});
