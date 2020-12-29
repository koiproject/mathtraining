'use strict';

const hashAjaxName = 'GASPODARIK_MATH4KIDS_PLAYERS';

const AjaxHandlerScript = 'https://fe.it-academy.by/AjaxStringStorage2.php';

let player = {
  name: 'Без имени',
  score: 0,
};

let players = {
  names: {},
  /*insert() {
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      data: {
        f: 'INSERT',
        n: hashAjaxName,
        v: JSON.stringify(this.names),
      },
      cache: false,
      success: (response) => {
        console.log(response);
      },
      error: this.errorHandler,
    });
  },*/
  load() {
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      data: {
        f: 'READ',
        n: hashAjaxName,
      },
      cache: false,
      success: (response) => {
        if (response.result) {
          let result = JSON.parse(response.result);
          this.names = result;
        } else {
          this.names = {};
        }
      },
      error: this.errorHandler,
    });
  },
  addName(name, score) {
    this.names[name] = score;
    this.updateNames();
  },
  deleteName(name) {
    if (this.names[name]) {
      delete this.names[name];
    }
    this.updateNames();
  },
  getNames() {
    return Object.keys(this);
  },
  updateNames() {
    let that = this;
    let password = 'qaz123';
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      data: {
        f: 'LOCKGET',
        n: hashAjaxName,
        p: password,
      },
      cache: false,
      success: function () {
        $.ajax({
          url: AjaxHandlerScript,
          type: 'POST',
          data: {
            f: 'UPDATE',
            n: hashAjaxName,
            p: password,
            v: JSON.stringify(that.names),
          },
          cache: false,
          error: that.errorHandler,
        });
      },
      error: that.errorHandler,
    });
  },
  errorHandler() {
    console.log('Ошибка!');
  },
};
