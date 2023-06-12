import LocalizedStrings from 'react-localization';
const Strings = new LocalizedStrings({
  en: {
    permissionDeniedTitle: 'Access to Location Denied',
    permissionDeniedSubTitle:
      'Weather needs access to your location to retrieve accurate weather information for your current area',
    openSettings: 'Open Settings',
    updating: 'Updating',
  },
  vi: {
    permissionDeniedTitle: 'Quyền truy cập vị trí bị từ chối',
    permissionDeniedSubTitle:
      'Weather cần truy cập vào vị trí của bạn để lấy được thông tin thời tiết chính xác cho khu vực hiện tại của bạn',
    openSettings: 'Mở cài đặt',
    updating: 'Đang cập nhật',
  },
});

export default Strings;
