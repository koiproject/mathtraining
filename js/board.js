'use strict';

let board = {
  newGame() {
    const gameSection = document.getElementById('game');
    gameSection.innerHTML = '';
    const divBoard = document.createElement('div');
    divBoard.setAttribute('class', 'board_field');
    const divMathExpr = document.createElement('div');
    divMathExpr.setAttribute('class', 'math_expression');
    divMathExpr.setAttribute('id', 'math_expression');
    divMathExpr.setAttribute('ondrop', 'game.mathExpressionDrop(event,this)');
    divMathExpr.setAttribute('ondragover', 'game.mathExpressionDragOver(event)');
    divBoard.appendChild(divMathExpr);
    gameSection.appendChild(divBoard);

    const divCheckBtn = document.createElement('div');
    divCheckBtn.setAttribute('class', 'button');
    divCheckBtn.setAttribute('id', 'check_answer');
    divCheckBtn.setAttribute('onclick', 'game.checkAnswer()');
    divCheckBtn.innerHTML = 'Проверить ответ';
    gameSection.appendChild(divCheckBtn);

    const divNumbers = document.createElement('div');
    divNumbers.setAttribute('class', 'numbers');
    divNumbers.setAttribute('id', 'numbers');
    for (let i = 0; i < 10; i++) {
      let img = document.createElement('img');
      img.setAttribute('class', 'symbol');
      img.setAttribute('src', `img/${i}.png`);
      img.style.order = `${i}`;
      img.setAttribute('alt', `${i}`);
      divNumbers.appendChild(img);
    }
    gameSection.appendChild(divNumbers);

    const divMathSign = document.createElement('div');
    divMathSign.setAttribute('class', 'numbers math_sign');
    divMathSign.setAttribute('id', 'math_signs');

    const plus = document.createElement('img');
    plus.setAttribute('class', 'symbol');
    plus.setAttribute('src', 'img/plus.png');
    plus.setAttribute('id', 'plus');
    plus.setAttribute('alt', '+');
    divMathSign.appendChild(plus);

    const minus = document.createElement('img');
    minus.setAttribute('class', 'symbol');
    minus.setAttribute('src', 'img/minus.png');
    minus.setAttribute('id', 'minus');
    minus.setAttribute('alt', '-');
    divMathSign.appendChild(minus);

    const multiplic = document.createElement('img');
    multiplic.setAttribute('class', 'symbol');
    multiplic.setAttribute('src', 'img/multiplic.png');
    multiplic.setAttribute('id', 'multiplic');
    multiplic.setAttribute('alt', '*');
    divMathSign.appendChild(multiplic);

    const division = document.createElement('img');
    division.setAttribute('class', 'symbol');
    division.setAttribute('src', 'img/division.png');
    division.setAttribute('id', 'division');
    division.setAttribute('alt', '/');
    divMathSign.appendChild(division);

    const equal = document.createElement('img');
    equal.setAttribute('class', 'symbol');
    equal.setAttribute('src', 'img/equal.png');
    equal.setAttribute('id', 'equal');
    equal.setAttribute('alt', '=');
    divMathSign.appendChild(equal);

    gameSection.appendChild(divMathSign);

    $('.numbers').attr('ondrop', 'game.numbersDrop(event,this)');
    $('.numbers').attr('ondragover', 'game.numbersDragOver(event)');
    $('.symbol').attr('ondragstart', 'game.symbolDragStart(event)');
    $('.symbol').attr('ondragend', 'game.symbolDragEnd(event)');

    $('.symbol').attr('ondblclick', 'game.symbolDblClick(event)');

    $('.symbol').attr('ontouchstart', 'game.touchClick(event)');

    const rightModal = document.createElement('div');
    rightModal.id = 'right_modal';
    rightModal.title = 'Правильно!';
    rightModal.innerHTML = 'Продолжем?';
    gameSection.appendChild(rightModal);

    $('#right_modal').dialog({
      autoOpen: false,
      modal: true,
      draggable: false,
      resizable: false,
      buttons: [
        { text: 'Да', click: continueBtn },
        { text: 'Нет', click: finishBtn },
      ],
    });

    function continueBtn() {
      board.newGame();
      $(this).dialog('close');
    }

    function finishBtn() {
      players.names[player.name] = player.score;
      players.updateNames();
      player = {};
      $(this).dialog('close');
    }

    const wrongModal = document.createElement('div');
    wrongModal.id = 'wrong_modal';
    wrongModal.title = 'Ошибка!';
    wrongModal.innerHTML = 'Неправильный ответ!';
    gameSection.appendChild(wrongModal);

    $('#wrong_modal').dialog({
      autoOpen: false,
      modal: true,
      draggable: false,
      resizable: false,
      buttons: [
        {
          text: 'OK',
          click: function () {
            $(this).dialog('close');
          },
        },
      ],
    });
  },
  showBestPlayers() {
    let sectionBestPlayers = document.getElementById('best');
    sectionBestPlayers.innerHTML = '';

    let tablePlayers = document.createElement('table');
    tablePlayers.setAttribute('class', 'best_results');

    let tableHeader = document.createElement('tr');
    let tableColName = document.createElement('td');
    tableColName.innerHTML = 'Имя';
    tableHeader.appendChild(tableColName);
    let tableColResult = document.createElement('td');
    tableColResult.innerHTML = 'Результат';
    tableHeader.appendChild(tableColResult);
    tablePlayers.appendChild(tableHeader);

    for (let name in players.names) {
      let tableCol = document.createElement('tr');
      let tableColName = document.createElement('td');
      tableColName.innerHTML = name;
      tableCol.appendChild(tableColName);
      let tableColResult = document.createElement('td');
      tableColResult.innerHTML = players.names[name];
      tableCol.appendChild(tableColResult);
      tablePlayers.appendChild(tableCol);
    }

    sectionBestPlayers.appendChild(tablePlayers);
  },
  initBoard() {
    const gameSection = document.getElementById('game');
    const userNameDiv = document.createElement('div');
    userNameDiv.id = 'user_name';
    userNameDiv.title = 'Имя игрока';
    userNameDiv.innerHTML = 'Введите ваше имя';
    const inputUserName = document.createElement('input');
    inputUserName.id = 'input_user_name';
    userNameDiv.appendChild(inputUserName);
    gameSection.appendChild(userNameDiv);
    $('#user_name').dialog({
      autoOpen: false,
      modal: true,
      draggable: false,
      resizable: false,
      buttons: [{ text: 'OK', click: clickOkBtn }],
      beforeClose: (event, ui) => {
        return checkChanges();
      },
    });

    function clickOkBtn() {
      $(this).dialog('close');
      player.name = $('#input_user_name').val();
      player.score = 0;
      players.addName(player.name, player.score);
      board.newGame();
    }

    function checkChanges(e, ui) {
      return $('#input_user_name').val() ? true : false;
    }
    this.drawRules();
    this.drawStudy();
    this.drawStudyMore();
  },
  drawRules() {
    const rulesSection = document.getElementById('rules');
    const boardDiv = document.createElement('div');
    boardDiv.classList = 'board_field';
    const rulesText = document.createElement('p');
    rulesText.classList = 'rules_text';
    $.ajax('txt/rules.txt', {
      type: 'GET',
      dataType: 'text',
      success: (data) => {
        rulesText.innerHTML = data;
      },
      error: (jqXHR, StatusStr, ErrorStr) => {
        console.log(StatusStr + ' ' + ErrorStr);
      },
    });
    boardDiv.appendChild(rulesText);
    rulesSection.appendChild(boardDiv);
  },
  drawStudy() {
    const studySection = document.getElementById('study');
    const boardDiv = document.createElement('div');
    boardDiv.classList = 'board_field';
    $.ajax('txt/study.html', {
      type: 'GET',
      dataType: 'html',
      success: (data) => {
        boardDiv.innerHTML = data;
      },
      error: (jqXHR, StatusStr, ErrorStr) => {
        console.log(StatusStr + ' ' + ErrorStr);
      },
    });

    studySection.appendChild(boardDiv);
  },
  drawStudyMore() {
    const studyMoreSection = document.getElementById('study-more');
    const boardDiv = document.createElement('div');
    boardDiv.classList = 'board_field';
    $.ajax('txt/study-more.html', {
      type: 'GET',
      dataType: 'html',
      success: (data) => {
        boardDiv.innerHTML = data;
      },
      error: (jqXHR, StatusStr, ErrorStr) => {
        console.log(StatusStr + ' ' + ErrorStr);
      },
    });

    studyMoreSection.appendChild(boardDiv);
  }
};

window.onhashchange = switchToStateFromUrlHash;

function switchToStateFromUrlHash() {
  let page = window.location.hash.substr(1);
  if (page === '') {
    page = 'game';
  }

  switch (page) {
    case 'game':
      $('#game').show();
      $('#rules').hide();
      $('#study').hide();
      $('#study-more').hide();
      $('#best').hide();
      break;
    case 'rules':
      $('#game').hide();
      $('#rules').show();
      $('#study').hide();
      $('#study-more').hide();
      $('#best').hide();
      break;
    case 'study':
      $('#game').hide();
      $('#rules').hide();
      $('#study').show();
      $('#study-more').hide();
      $('#best').hide();
      break;
    case 'study/more':
      $('#game').hide();
      $('#rules').hide();
      $('#study').hide();
      $('#study-more').show();
      $('#best').hide();
      break;
    case 'best':
      $('#game').hide();
      $('#rules').hide();
      $('#study').hide();
      $('#study-more').hide();
      $('#best').show();
      break;
    default:
      $('#game').show();
      $('#rules').hide();
      $('#study').hide();
      $('#study-more').hide();
      $('#best').hide();
      break;
  }
}
switchToStateFromUrlHash();

$(document).ready(() => {
  let soundLink = document.getElementById('menu_sound');
  $('.menu_item').mouseenter(() => {
    soundLink.play();
  });

  players.load();
  board.initBoard();
});

$('#bestBtn').click(() => {
  //players.names = {};
  board.showBestPlayers();
});

$('#playBtn').click(() => {
  $.MessageBox({
    input: true,
    message: 'Ваше имя?',
  }).done((data) => {
    if ($.trim(data)) {
      $.MessageBox('Привет, <b>' + data + '</b>!');
      player.name = data;
    } else {
      $.MessageBox("Пусть будет 'Ученик'!");
      player.name = 'Ученик';
    }
    player.score = 0;
    players.addName(player.name, player.score);
    board.newGame();
  });
});
