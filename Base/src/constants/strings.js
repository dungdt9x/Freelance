import LocalizedStrings from 'react-localization';
const Strings = new LocalizedStrings({
  en: {
    permissionDeniedTitle: 'Access to Location Denied',
    permissionDeniedSubTitle:
      'Weather needs access to your location to retrieve accurate weather information for your current area',
    openSettings: 'Open Settings',
    updating: 'Updating',
    feelLike: 'Feel like',
    airQuality: 'Air quality',
    atmospheric: 'Atmospheric',
    humidity: 'Humidity',
    cloudiness: 'Cloudiness',
    windSpeed: 'Wind speed',
    windDirection: 'Wind direction',
    windGust: 'Wind gust',
    toDay: 'Today',
    other: 'Other day',
  },
  vi: {
    airQuality: 'Khí hậu',
    feelLike: 'Cảm giác như',
    permissionDeniedTitle: 'Quyền truy cập vị trí bị từ chối',
    permissionDeniedSubTitle:
      'Weather cần truy cập vào vị trí của bạn để lấy được thông tin thời tiết chính xác cho khu vực hiện tại của bạn',
    openSettings: 'Mở cài đặt',
    updating: 'Đang cập nhật',
    atmospheric: 'Áp suất',
    humidity: 'Độ ẩm',
    cloudiness: 'Độ mây',
    winSpeed: 'Tốc độ gió',
    windDirection: 'Hướng gió',
    windGust: 'Gió mạnh',
    toDay: 'Hôm nay',
    other: 'Ngày khác',
  },
});

export default Strings;
