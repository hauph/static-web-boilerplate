const $ = function (selector) {
  return document.querySelectorAll(selector);
};

class CatModel {
  constructor() {
    this.currCat = {};
    this.list = {
      cat_1: {
        img_url:
          'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg',
        counter: 0,
        name: 'Cat 1',
        nick_names: ['Mimi', 'MeoMeo'],
      },
      cat_2: {
        img_url:
          'https://i.natgeofe.com/n/f0dccaca-174b-48a5-b944-9bcddf913645/01-cat-questions-nationalgeographic_1228126.jpg?w=636&h=424',
        counter: 0,
        name: 'Cat 2',
        nick_names: ['Rambo Migazord'],
      },
      cat_3: {
        img_url:
          'https://www.vmcdn.ca/f/files/via/images/animals/cat-wearing-face-mask.jpg',
        counter: 0,
        name: 'Cat 3',
        nick_names: ['Rambo Megazord'],
      },
      cat_4: {
        img_url:
          'https://i.cbc.ca/1.5256404.1566499707!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/cat-behaviour.jpg',
        counter: 0,
        name: 'Cat 4',
        nick_names: ['Tomitom'],
      },
      cat_5: {
        img_url:
          'https://images-na.ssl-images-amazon.com/images/I/81BES%2BtsVvL.png',
        counter: 0,
        name: 'Cat 5',
        nick_names: [],
      },
    };
  }

  updateCurrCat(value) {
    this.currCat = this.list[value];
  }

  updateCounter(value) {
    this.update('counter', value);
    return this.currCat.counter;
  }

  update(subKey, value) {
    const keys = Object.keys(this.list);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const obj = this.list[key];
      if (obj === this.currCat) {
        // Update list
        this.list = {
          ...this.list,
          [key]: {
            ...obj,
            [subKey]: value,
          },
        };

        // Update currCat to match list
        this.currCat = this.list[key];
        break;
      }
    }
  }
}

class CatSelectorView {
  constructor(list) {
    this.list = list;
    this.render();
  }

  render() {
    const names = Object.keys(this.list);
    let htmlStr = '';
    names.forEach((name) => {
      const obj = this.list[name];
      htmlStr += `<option value="${name}">${obj.name}</option>`;
    });
    const $catSelector = $('#cat-select')[0];
    $catSelector.insertAdjacentHTML('beforeend', htmlStr);
  }
}

class CatView {
  render(obj) {
    const $parent = $('.cat__wrapper')[0];
    const $admin = $('.admin')[0];

    if (obj && Object.keys(obj).length) {
      // Set image
      const $currCat = $('.cat__img')[0];
      $currCat.setAttribute('src', obj.img_url);

      // Set name
      const name = obj.name;
      const $name = $parent.querySelector('.cat__name');
      $name.innerHTML = name;

      // Set status
      let status = 'New born';
      const value = obj.counter;
      if (value > 10 && value <= 20) {
        status = 'Infant';
      } else if (value > 20 && value <= 30) {
        status = 'Teen';
      } else if (value > 30) {
        status = 'Adult';
      }
      $parent.querySelector('.cat--status').innerHTML = status;

      // Set nicknames
      const nicknames = obj.nick_names;
      if (nicknames.length) {
        const htmlStr = nicknames.reduce((str, curr) => {
          str += `<li>${curr}</li>`;
          return str;
        }, '');
        $parent.querySelector('ul').innerHTML = htmlStr;
        $parent.querySelector('.cat__nicknames').classList.remove('hidden');
      } else {
        $parent.querySelector('.cat__nicknames').classList.add('hidden');
      }

      // Set counter
      const $counter = $parent.querySelector('.number-clicks');
      $counter.innerHTML = value;

      // Show cat
      $parent.classList.remove('hidden');
      $admin.classList.remove('hidden');
    } else {
      // Hide cat
      $parent.classList.add('hidden');
      $admin.classList.add('hidden');
    }
  }
}

class CatAdminView {
  render(obj) {
    $('[name="name"]')[0].value = obj.name;
    $('[name="img_url"]')[0].value = obj.img_url;
    $('[name="counter"]')[0].value = obj.counter;
  }
}

export default class CatController {
  constructor() {
    this.model = new CatModel();
    this.selector = new CatSelectorView(this.model.list);
    this.view = new CatView();
    this.admin = new CatAdminView();
    this.init();
  }

  init() {
    this.click();
    this.adminEvents();
    this.select();
  }

  click() {
    $('.cat__img')[0].addEventListener('click', (e) => {
      const $item = e.target;
      const $parent = $item.parentNode;
      const $counter = $parent.querySelector('.number-clicks');
      const currentNumb = this.model.currCat.counter;
      const value = this.model.updateCounter(currentNumb + 1);
      let status = 'New born';
      if (value > 10 && value <= 20) {
        status = 'Infant';
      } else if (value > 20 && value <= 30) {
        status = 'Teen';
      } else if (value > 30) {
        status = 'Adult';
      }
      $counter.innerHTML = this.model.updateCounter(currentNumb + 1);
      $parent.querySelector('.cat--status').innerHTML = status;
      this.admin.render(this.model.currCat);
    });
  }

  adminEvents() {
    const $adminForm = $('.admin__form')[0];
    $('#btn--cat-admin')[0].addEventListener('click', () => {
      this.admin.render(this.model.currCat);
      $adminForm.classList.toggle('hidden');
    });

    $('#btn--cat-cancel')[0].addEventListener('click', (e) => {
      e.preventDefault();
      $adminForm.classList.add('hidden');
    });

    $('#btn--cat-save')[0].addEventListener('click', (e) => {
      e.preventDefault();
      const formData = new FormData($('#update-cat')[0]);
      formData.forEach((data, key) => {
        this.model.update(key, key === 'counter' ? Number(data) : data);
      });
      $adminForm.classList.add('hidden');
      this.view.render(this.model.currCat);
    });
  }

  select() {
    const $catSelector = $('#cat-select')[0];
    $catSelector.addEventListener('change', (e) => {
      this.model.updateCurrCat(e.target.value);
      this.view.render(this.model.currCat);
    });
  }
}
