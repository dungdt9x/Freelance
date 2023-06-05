class Stop {
  constructor(json) {
    let {
      Address,
      Created,
      DocumentStatus,
      EndTime,
      EndTimeIsBefore,
      ImageUrls,
      IsOptimized,
      Latitude,
      Longitude,
      Name,
      Notes,
      Priority,
      RouteId,
      ShipmentId,
      StartTime,
      Status,
      StopOutputData,
      StopType,
      SubAddress,
      TimeAtStop,
      TimeMovedToCompleteTab,
      Type,
      Updated,
      UserEmail,
      Volume,
      Weight,
      id,
    } = json;
    this.Address = Address;
    this.Created = Created;
    this.DocumentStatus = DocumentStatus;
    this.EndTime = EndTime;
    this.EndTimeIsBefore = EndTimeIsBefore;
    this.ImageUrls = ImageUrls;
    this.IsOptimized = IsOptimized;
    this.Latitude = Latitude;
    this.Longitude = Longitude;
    this.Name = Name;
    this.Notes = Notes;
    this.Priority = Priority;
    this.RouteId = RouteId;
    this.ShipmentId = ShipmentId;
    this.StartTime = StartTime;
    this.Status = Status;
    this.StopOutputData = StopOutputData;
    this.StopType = StopType;
    this.SubAddress = SubAddress;
    this.TimeAtStop = TimeAtStop;
    this.TimeMovedToCompleteTab = TimeMovedToCompleteTab;
    this.Type = Type;
    this.Updated = Updated;
    this.UserEmail = UserEmail;
    this.Volume = Volume;
    this.Weight = Weight;
    this.id = id;
  }
}
export default Stop;
