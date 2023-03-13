export default class SimpleSelect {
  constructor(selectEl, options) {
    // получаем оригинальный селект в зависимости от переданного параметра
    this.selectEl = typeof selectEl === 'string' ? document.querySelector(selectEl) : selectEl;
    
    if (!selectEl instanceof HTMLSelectElement) throw new Error('объект должен быть HTMLSelect элементом');
    
    this.options = options;
    this.onSetSelectedOptionClick = this.onSetSelectedOptionClick.bind(this);
    this.setState(this.selectEl);
    this.render();
  }
  
  setState(selectEl) {
    const originalOptGroup = Array.from(selectEl.children);
    
    // создаём массив объектов выриантов выбора
    const state = originalOptGroup.map((option) => {
      const { value, textContent } = option;
      const selected = option.getAttribute('selected') === 'true' ? true : false;
      
      return {
        id: uuid.v4(),
        value: value,
        text: textContent,
        selected: selected,
        originalOption: option,
      };
    });
    
    this.state = state;
  }
  
  setSelectedOption(id) {
    // получаем целевой и выбранный элементы
    const targetOption = this.state.find((option) => option.id === id);
    const prevSelectedOption = this.state.find((option) => option.selected);
    
    if (!!prevSelectedOption) {
      prevSelectedOption.selected = false;
      prevSelectedOption.originalOption.selected = 'false';
      prevSelectedOption.customOptionEl.hidden = false;
    }
    
    targetOption.selected = true;
    targetOption.originalOption.selected = 'true';
    targetOption.customOptionEl.hidden = true;
    
    // записываем выбранное значение в поле текущего значения селекта
    this.fieldEl.textContent = targetOption.text;
  }
  
  onSetSelectedOptionClick(ev) {
    const target = ev.target.closest('.js-custom-option');
    
    if (!target) return;
    
    const id = target.id;
    
    this.setSelectedOption(id);
  }
  
  createArrowEl(type, src) {
    
  }
  
  render() {
    const wrapperEl = document.createElement('div');
    const fieldEl = document.createElement('div');
    const listEl = document.createElement('ul');
    
    this.fieldEl = fieldEl;
    
    wrapperEl.classList.add('simple-select');
    fieldEl.classList.add('simple-select__inner');
    listEl.classList.add('simple-select__list');
    
    this.state.forEach((option) => {
      const { id, value, text, selected } = option;
      const optionEl = document.createElement('li');
      
      option.customOptionEl = optionEl;
      
      if (selected) fieldEl.textContent = text;
      
      optionEl.classList.add('simple-select__item', 'js-custom-option');
      optionEl.id = id;
      optionEl.textContent = text;
      optionEl.dataset.value = value;
      optionEl.dataset.selected = selected;
      
      listEl.append(optionEl);
    });
    
    // если ни один из вариантов не был выбран изначально, учтанавливаем текущее значение первого элемента
    if (!fieldEl.textContent) fieldEl.textContent = this.state[0].text;
    
    listEl.addEventListener('click', this.onSetSelectedOptionClick);
    
    wrapperEl.append(fieldEl, listEl);
    
    // прячем оригинальный селект
    this.selectEl.style.position = 'absolute';
    this.selectEl.style.visibility = 'hidden';
    this.selectEl.after(wrapperEl);
  }
}