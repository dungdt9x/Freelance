class Setting {
  constructor(json) {
    let {
      VehicleType,
      MaxWeight,
      MaxQty,
      AverageSpeed,
      DistanceUnit,
      DefaultStopType,
      DefaultTimeAtStop,
      OptimizationOption,
      DefaultAddressLatitude,
      DefaultAddressLongitude,
      DefaultAddressName,
      DefaultSubAddressName,
    } = json;
    this.VehicleType = VehicleType;
    this.MaxWeight = MaxWeight;
    this.MaxQty = MaxQty;
    this.AverageSpeed = AverageSpeed;
    this.DistanceUnit = DistanceUnit;
    this.DefaultStopType = DefaultStopType;
    this.DefaultTimeAtStop = DefaultTimeAtStop;
    this.OptimizationOption = OptimizationOption;
    this.DefaultAddressLatitude = DefaultAddressLatitude;
    this.DefaultAddressLongitude = DefaultAddressLongitude;
    this.DefaultAddressName = DefaultAddressName;
    this.DefaultSubAddressName = DefaultSubAddressName;
  }
}

export default Setting;
