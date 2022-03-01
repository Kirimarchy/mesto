export default class Section {
  //items — это массив данных, 
  //которые нужно добавить на страницу при инициализации класса.
  // Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
  constructor({ items, renderer }, container) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = container;
  }
//Содержит публичный метод, который отвечает за отрисовку всех элементов.
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
//Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер
//получает разметку через функцию-колбэк и вставляет её в контейнер.
  prependItem(elements) {
    this._container.prepend(elements);//Добавляем карточку в конце массива 
  }
}