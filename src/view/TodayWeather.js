import { Component } from "../core";
import { fetchData } from "../domain/fetch";
import Card from "../templates/Card";
import { HeaderTwo } from "../templates/Header";
import { SubHeader } from "../templates/SubHeader";

export default class Today extends Component {
  setup() {
    //today데이터 가져올 함수 호출
    fetchData.fetchToday();
  }
  template() {
    const innerTemplate =
      HeaderTwo({ title: "Seoul" }) +
      SubHeader({ title: "2024년 1월 1일 11시 30분" });
    Card(innerTemplate);
  }

  setEvent() {
    this.addEvent('click', '.card', ()=>{
      //router이동 로직
    })
  }
}
