export default class Section {
  //items — это массив данных, 
  //которые нужно добавить на страницу при инициализации класса.
  // Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;//CSS-селектор контейнера. В него мы будем вставлять элементы разметки
  }
//Содержит публичный метод, который отвечает за отрисовку всех элементов.
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
//Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер
//получает разметку через функцию-колбэк и вставляет её в контейнер.
  //Публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер / в конец.
  addItem(element) {
    this._container.append(element);
  }
//Добавляем карточку в наачало массива 
  prependItem(elements) {
    this._container.prepend(elements);
  }
}