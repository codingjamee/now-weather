import { Component } from "../core";
import { fetchData } from "../domain/fetch";
import Card from "../templates/Card";
import { HeaderTwo } from "../templates/Header";
import { SubHeader } from "../templates/SubHeader";
import { routes } from "../utils/constants";

export default class Today extends Component {
  async setup() {
    //today데이터 가져올 함수 호출
    const { lat, lon } = getLocation();
    const APIkey = process.env.APIkey;
    const data = await fetchData.fetchToday({ lat, lon, APIkey });
    this.state = data;
    this.setEvent("click", ".card", this.router.navigate(routes.fiveDays));
  }
  template() {
    const innerTemplate =
      HeaderTwo({ title: "Seoul" }) +
      SubHeader({ title: "2024년 1월 1일 11시 30분" });
    Card(innerTemplate);
  }
}
