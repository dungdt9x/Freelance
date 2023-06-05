class Route {
  constructor(json) {
    let {Name, Created, UserEmail, id, current} = json;
    this.Name = Name;
    this.Created = Created;
    this.UserEmail = UserEmail;
    this.id = id;
    this.current = current;
  }
}

export default Route;
