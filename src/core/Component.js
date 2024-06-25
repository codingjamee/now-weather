export default class Component {
  $target;
  state;
  constructor($target) {
    //인스턴스 생성시 실행.
    this.$target = $target;
    this.setup();
    this.render();
    this.setEvent();
  }

  setup() {
    //템플릿에 사용할 데이터를 가져와서 this.state에 할당
  }
  template() {
    //화면에 그릴 템플릿을 가져옴
    return "";
  }
  render() {
    //그릴 화면을 템플릿에서 가져와서 렌더링함
    this.$target.innerHTML = this.template();
  }
  mounted() {
    //마운트 될 시 추가 동작 수행하는 함수
  }
  setEvent(eventType, selector, callback) {
    //각 이벤트를 등록함
    const children = [...this.$target.querySelectorAll(selector)];
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    });
  }
  setState(newState) {
    //state변경해주는 메서드
    this.state = { ...this.state, ...newState };
    this.render();
  }
  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    });
  }
}
