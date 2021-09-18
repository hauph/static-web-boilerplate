const TOTALD_DAYS = 12;
const defaultData = {
  slappy_the_frog: {
    name: 'Slappy the Frog',
    value: TOTALD_DAYS,
    missed_days: [],
  },
  lilly_the_lizard: {
    name: 'Lilly the Lizard',
    value: TOTALD_DAYS,
    missed_days: [],
  },
  paulrus_the_walrus: {
    name: 'Paulrus the Walrus',
    value: TOTALD_DAYS,
    missed_days: [],
  },
  gregory_the_goat: {
    name: 'Gregory the Goat',
    value: TOTALD_DAYS,
    missed_days: [],
  },
  adam_the_anaconda: {
    name: 'Adam the Anaconda',
    value: TOTALD_DAYS,
    missed_days: [],
  },
};

class SchoolAttendanceModel {
  constructor() {
    this.list = {};
    this.init();
  }

  init() {
    // Get data from localStorage
    const localData = localStorage.attendance;
    let data = defaultData;
    if (localData) {
      // If there is data from localStorage, set it to model's list
      data = JSON.parse(localData);
    }
    this.list = data;
  }

  updateData(key, index, isAttend) {
    const data = this.list[key];
    const value = data.value;
    const missed_days = data.missed_days;

    // Update data's value
    this.list[key].value = isAttend ? value - 1 : value + 1;

    // Update data's missed_days
    if (data.missed_days.includes(index)) {
      this.list[key].missed_days = missed_days.filter((val) => val !== index);
    } else {
      this.list[key].missed_days.push(index);
    }

    return this.list[key].value;
  }
}

class SchoolAttendanceView {
  render(list) {
    const keys = Object.keys(list);
    const htmlStr = keys.reduce((str, key) => {
      const data = list[key];
      let htmlCheckboxStr = '';
      for (let i = 0; i < 12; i++) {
        htmlCheckboxStr += `<td class="attend-col"><input ${
          data.missed_days.includes(i) ? 'checked' : ''
        } data-key=${key} type="checkbox" /></td>`;
      }

      str += `
        <tr class="student">
          <td class="name-col">${data.name}</td>
          ${htmlCheckboxStr}
          <td class="missed-col" data-key=${key}>${data.value}</td>
        </tr>
      `;

      return str;
    }, '');

    $('tbody')[0].insertAdjacentHTML('beforeend', htmlStr);
  }

  renderMissedCol(key, value) {
    $(`.missed-col[data-key="${key}"]`).html(value);
  }
}

export default class SchoolAttendanceController {
  constructor() {
    this.model = new SchoolAttendanceModel();
    this.view = new SchoolAttendanceView();
    this.init();
  }

  init() {
    this.view.render(this.model.list);
    this.onChangeCheckbox();
  }

  onChangeCheckbox() {
    $('[type="checkbox"]').on('change', (e) => {
      const $target = $(e.target);
      const isAttend = $target.prop('checked');
      const key = $(e.target).attr('data-key');
      const value = this.model.updateData(
        key,
        $target.parent().index() - 1,
        isAttend,
      );
      localStorage.attendance = JSON.stringify(this.model.list);
      this.view.renderMissedCol(key, value);
    });
  }
}
