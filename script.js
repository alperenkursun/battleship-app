$(".container").css({ display: "none" });
$(document).ready(function () {
  $("img").css({ display: "none" });
  $(".container").css({ display: "flex" });
  var ship = "";
  var line = "horizontal";
  var rotateflag = 1;
  var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  var dropcount = 5;
  $("#rotate").click(function () {
    if (rotateflag == 1) {
      $("#carrier").css({
        width: "40px",
        height: "200px",
        "border-left": "0px",
        "border-top": "3px solid red",
      });
      $("#battleship").css({
        width: "40px",
        height: "160px",
        "margin-top": "0",
        "border-left": "0px",
        "border-top": "3px solid orange",
      });
      $("#cruiser").css({
        width: "40px",
        height: "120px",
        "margin-top": "0",
        "border-left": "0px",
        "border-top": "3px solid green",
      });
      $("#submarine").css({
        width: "40px",
        height: "120px",
        "margin-top": "0",
        "border-left": "0px",
        "border-top": "3px solid greenyellow",
      });
      $("#destroyer").css({
        width: "40px",
        height: "80px",
        "margin-top": "0",
        "border-left": "0px",
        "border-top": "3px solid purple",
      });

      $(".ships").css({
        display: "flex",
        "flex-direction": "row",
      });

      $("#rotate").html(`<i class="fa-solid fa-arrow-rotate-left"></i>`);

      line = "vertical";
      rotateflag = 0;
    } else if (rotateflag == 0) {
      $("#carrier").css({
        width: "200px",
        height: "40px",
        "border-top": "0px",
        "border-left": "3px solid red",
      });
      $("#battleship").css({
        width: "160px",
        height: "40px",
        "border-top": "0px",
        "border-left": "3px solid orange",
      });
      $("#cruiser").css({
        width: "120px",
        height: "40px",
        "border-top": "0px",
        "border-left": "3px solid green",
      });
      $("#submarine").css({
        width: "120px",
        height: "40px",
        "border-top": "0px",
        "border-left": "3px solid greenyellow",
      });
      $("#destroyer").css({
        width: "80px",
        height: "40px",
        "border-top": "0px",
        "border-left": "3px solid purple",
      });

      $(".ships").css({
        display: "block",
      });

      $("#rotate").html(`<i class="fa-solid fa-arrow-rotate-right"></i>`);

      line = "horizontal";
      rotateflag = 1;
    }
  });

  $("#selectcarrier").draggable({
    snap: true,
    drag: function () {
      ship = "carrier";
    },
  });
  $("#selectbattleship").draggable({
    snap: true,
    drag: function () {
      ship = "battleship";
    },
  });
  $("#selectcruiser").draggable({
    snap: true,
    drag: function () {
      ship = "cruiser";
    },
  });
  $("#selectsubmarine").draggable({
    snap: true,
    drag: function () {
      ship = "submarine";
    },
  });
  $("#selectdestroyer").draggable({
    snap: true,
    drag: function () {
      ship = "destroyer";
    },
  });

  $(".droppable").droppable({
    drop: function (event, ui) {
      dropcount--;
      console.log(dropcount);
      var letter = $(this).attr("id").substring(0, 1);
      var number = $(this).attr("id").substring(1, 3);
      var tempnumber = 0;
      var control = 1;
      // console.log($("#a1").hasClass("merhaba"));
      number = parseInt(number);
      if (ship == "carrier") {
        if (line == "horizontal") {
          if (number > 6) {
          } else {
            for (let i = 0; i < 5; i++) {
              tempnumber = number + i;
              if (
                $(`#${letter + tempnumber}`).hasClass("grey") == true ||
                $(`#${letter + tempnumber}`).hasClass("region") == true
              ) {
                control = 0;
              }
            }
            if (control == 1) {
              $("#selectcarrier").css("display", "none");
              for (let i = -1; i < 6; i++) {
                if (i == -1 || i == 5) {
                  tempnumber = number + i;
                  $(`#${letter + tempnumber}`).addClass("region");
                } else {
                  tempnumber = number + i;
                  $(`#${letter + tempnumber}`).addClass("grey");
                  console.log(letter + tempnumber);
                }
              }
              tempnumber = 0;
              for (let i = 0; i < 10; i++) {
                if (letters[i] == letter) {
                  for (let j = -1; j < 6; j++) {
                    tempnumber = number + j;
                    console.log(letters[i - 1] + tempnumber);
                    $(`#${letters[i - 1] + tempnumber}`).addClass("region");
                  }
                  for (let j = -1; j < 6; j++) {
                    tempnumber = number + j;
                    $(`#${letters[i + 1] + tempnumber}`).addClass("region");
                  }
                }
              }

              $(this).addClass("ui-state-highlight");
            }
          }
        } else if (line == "vertical") {
          for (let i = 0; i < 9; i++) {
            if (letters[i] == letter) {
              for (let j = 0; j < 5; j++) {
                if (
                  $(`#${letters[i + j] + number}`).hasClass("grey") == true ||
                  $(`#${letters[i + j] + number}`).hasClass("region") == true
                ) {
                  control = 0;
                }
              }
            }
          }
          if (control == 1) {
            if (
              letter == "g" ||
              letter == "h" ||
              letter == "i" ||
              letter == "j"
            ) {
            } else {
              $("#selectcarrier").css("display", "none");
              for (let i = 0; i < 10; i++) {
                if (letters[i] == letter) {
                  for (let j = -1; j < 6; j++) {
                    if (j == -1 || j == 5) {
                      $(`#${letters[i + j] + number}`).addClass("region");
                    } else {
                      $(`#${letters[i + j] + number}`).addClass("grey");
                    }
                    tempnumber = number - 1;
                    $(`#${letters[i + j] + tempnumber}`).addClass("region");
                    tempnumber = number + 1;
                    $(`#${letters[i + j] + tempnumber}`).addClass("region");
                  }
                }
              }
              $(this).addClass("ui-state-highlight");
            }
          }
        }
      }
      if (ship == "battleship") {
        if (line == "horizontal") {
          if (number > 7) {
          } else {
            for (let i = 0; i < 4; i++) {
              tempnumber = number + i;
              if (
                $(`#${letter + tempnumber}`).hasClass("grey") == true ||
                $(`#${letter + tempnumber}`).hasClass("region") == true
              ) {
                control = 0;
              }
            }
            if (control == 1) {
              $("#selectbattleship").css("display", "none");
              for (let i = -1; i < 5; i++) {
                if (i == -1 || i == 4) {
                  tempnumber = number + i;
                  $(`#${letter + tempnumber}`).addClass("region");
                } else {
                  tempnumber = number + i;
                  $(`#${letter + tempnumber}`).addClass("grey");
                  console.log(letter + tempnumber);
                }
              }
              tempnumber = 0;
              for (let i = 0; i < 10; i++) {
                if (letters[i] == letter) {
                  for (let j = -1; j < 5; j++) {
                    tempnumber = number + j;
                    console.log(letters[i - 1] + tempnumber);
                    $(`#${letters[i - 1] + tempnumber}`).addClass("region");
                  }
                  for (let j = -1; j < 5; j++) {
                    tempnumber = number + j;
                    $(`#${letters[i + 1] + tempnumber}`).addClass("region");
                  }
                }
              }

              $(this).addClass("ui-state-highlight");
            }
          }
        } else if (line == "vertical") {
          for (let i = 0; i < 10; i++) {
            if (letters[i] == letter) {
              for (let j = 0; j < 4; j++) {
                if (
                  $(`#${letters[i + j] + number}`).hasClass("grey") == true ||
                  $(`#${letters[i + j] + number}`).hasClass("region") == true
                ) {
                  control = 0;
                }
              }
            }
          }
          if (control == 1) {
            if (letter == "h" || letter == "i" || letter == "j") {
            } else {
              $("#selectbattleship").css("display", "none");
              for (let i = 0; i < 10; i++) {
                if (letters[i] == letter) {
                  for (let j = -1; j < 5; j++) {
                    if (j == -1 || j == 4) {
                      $(`#${letters[i + j] + number}`).addClass("region");
                    } else {
                      $(`#${letters[i + j] + number}`).addClass("grey");
                    }

                    tempnumber = number - 1;
                    $(`#${letters[i + j] + tempnumber}`).addClass("region");
                    tempnumber = number + 1;
                    $(`#${letters[i + j] + tempnumber}`).addClass("region");
                  }
                }
              }
              $(this).addClass("ui-state-highlight");
            }
          }
        }
      }
      if (ship == "cruiser") {
        if (line == "horizontal") {
          if (number > 8) {
          } else {
            for (let i = 0; i < 3; i++) {
              tempnumber = number + i;
              if (
                $(`#${letter + tempnumber}`).hasClass("grey") == true ||
                $(`#${letter + tempnumber}`).hasClass("region") == true
              ) {
                control = 0;
              }
            }
            if (control == 1) {
              $("#selectcruiser").css("display", "none");
              for (let i = -1; i < 4; i++) {
                if (i == -1 || i == 3) {
                  tempnumber = number + i;
                  $(`#${letter + tempnumber}`).addClass("region");
                } else {
                  tempnumber = number + i;
                  $(`#${letter + tempnumber}`).addClass("grey");
                  console.log(letter + tempnumber);
                }
              }
              tempnumber = 0;
              for (let i = 0; i < 10; i++) {
                if (letters[i] == letter) {
                  for (let j = -1; j < 4; j++) {
                    tempnumber = number + j;
                    console.log(letters[i - 1] + tempnumber);
                    $(`#${letters[i - 1] + tempnumber}`).addClass("region");
                  }
                  for (let j = -1; j < 4; j++) {
                    tempnumber = number + j;
                    $(`#${letters[i + 1] + tempnumber}`).addClass("region");
                  }
                }
              }

              $(this).addClass("ui-state-highlight");
            }
          }
        } else if (line == "vertical") {
          if (letter == "i" || letter == "j") {
          } else {
            for (let i = 0; i < 9; i++) {
              if (letters[i] == letter) {
                for (let j = 0; j < 3; j++) {
                  if (
                    $(`#${letters[i + j] + number}`).hasClass("grey") == true ||
                    $(`#${letters[i + j] + number}`).hasClass("region") == true
                  ) {
                    control = 0;
                  }
                }
              }
            }
            if (control == 1) {
              $("#selectcruiser").css("display", "none");
              for (let i = 0; i < 10; i++) {
                if (letters[i] == letter) {
                  for (let j = -1; j < 4; j++) {
                    if (j == -1 || j == 3) {
                      $(`#${letters[i + j] + number}`).addClass("region");
                    } else {
                      $(`#${letters[i + j] + number}`).addClass("grey");
                    }
                    tempnumber = number - 1;
                    $(`#${letters[i + j] + tempnumber}`).addClass("region");
                    tempnumber = number + 1;
                    $(`#${letters[i + j] + tempnumber}`).addClass("region");
                  }
                }
              }
              $(this).addClass("ui-state-highlight");
            }
          }
        }
      }
      if (ship == "submarine") {
        if (line == "horizontal") {
          if (number > 8) {
          } else {
            for (let i = 0; i < 3; i++) {
              tempnumber = number + i;
              if (
                $(`#${letter + tempnumber}`).hasClass("grey") == true ||
                $(`#${letter + tempnumber}`).hasClass("region") == true
              ) {
                control = 0;
              }
            }
            if (control == 1) {
              $("#selectsubmarine").css("display", "none");
              for (let i = -1; i < 4; i++) {
                if (i == -1 || i == 3) {
                  tempnumber = number + i;
                  $(`#${letter + tempnumber}`).addClass("region");
                } else {
                  tempnumber = number + i;
                  $(`#${letter + tempnumber}`).addClass("grey");
                  console.log(letter + tempnumber);
                }
              }
              tempnumber = 0;
              for (let i = 0; i < 10; i++) {
                if (letters[i] == letter) {
                  for (let j = -1; j < 4; j++) {
                    tempnumber = number + j;
                    console.log(letters[i - 1] + tempnumber);
                    $(`#${letters[i - 1] + tempnumber}`).addClass("region");
                  }
                  for (let j = -1; j < 4; j++) {
                    tempnumber = number + j;
                    $(`#${letters[i + 1] + tempnumber}`).addClass("region");
                  }
                }
              }

              $(this).addClass("ui-state-highlight");
            }
          }
        } else if (line == "vertical") {
          if (letter == "i" || letter == "j") {
          } else {
            for (let i = 0; i < 9; i++) {
              if (letters[i] == letter) {
                for (let j = 0; j < 3; j++) {
                  if (
                    $(`#${letters[i + j] + number}`).hasClass("grey") == true ||
                    $(`#${letters[i + j] + number}`).hasClass("region") == true
                  ) {
                    control = 0;
                  }
                }
              }
            }
            if (control == 1) {
              $("#selectsubmarine").css("display", "none");
              for (let i = 0; i < 10; i++) {
                if (letters[i] == letter) {
                  for (let j = -1; j < 4; j++) {
                    if (j == -1 || j == 3) {
                      $(`#${letters[i + j] + number}`).addClass("region");
                    } else {
                      $(`#${letters[i + j] + number}`).addClass("grey");
                    }

                    tempnumber = number - 1;
                    $(`#${letters[i + j] + tempnumber}`).addClass("region");
                    tempnumber = number + 1;
                    $(`#${letters[i + j] + tempnumber}`).addClass("region");
                  }
                }
              }
              $(this).addClass("ui-state-highlight");
            }
          }
        }
      }
      if (ship == "destroyer") {
        if (line == "horizontal") {
          if (number > 9) {
          } else {
            for (let i = 0; i < 2; i++) {
              tempnumber = number + i;
              if (
                $(`#${letter + tempnumber}`).hasClass("grey") == true ||
                $(`#${letter + tempnumber}`).hasClass("region") == true
              ) {
                control = 0;
              }
            }
            if (control == 1) {
              $("#selectdestroyer").css("display", "none");
              for (let i = -1; i < 3; i++) {
                if (i == -1 || i == 2) {
                  tempnumber = number + i;
                  $(`#${letter + tempnumber}`).addClass("region");
                } else {
                  tempnumber = number + i;
                  $(`#${letter + tempnumber}`).addClass("grey");
                  console.log(letter + tempnumber);
                }
              }
              tempnumber = 0;
              for (let i = 0; i < 10; i++) {
                if (letters[i] == letter) {
                  for (let j = -1; j < 3; j++) {
                    tempnumber = number + j;
                    console.log(letters[i - 1] + tempnumber);
                    $(`#${letters[i - 1] + tempnumber}`).addClass("region");
                  }
                  for (let j = -1; j < 3; j++) {
                    tempnumber = number + j;
                    $(`#${letters[i + 1] + tempnumber}`).addClass("region");
                  }
                }
              }

              $(this).addClass("ui-state-highlight");
            }
          }
        } else if (line == "vertical") {
          if (letter == "j") {
          } else {
            for (let i = 0; i < 9; i++) {
              if (letters[i] == letter) {
                for (let j = 0; j < 2; j++) {
                  if (
                    $(`#${letters[i + j] + number}`).hasClass("grey") == true ||
                    $(`#${letters[i + j] + number}`).hasClass("region") == true
                  ) {
                    control = 0;
                  }
                }
              }
            }
            if (control == 1) {
              $("#selectdestroyer").css("display", "none");
              for (let i = 0; i < 10; i++) {
                if (letters[i] == letter) {
                  for (let j = -1; j < 3; j++) {
                    if (j == -1 || j == 2) {
                      $(`#${letters[i + j] + number}`).addClass("region");
                    } else {
                      $(`#${letters[i + j] + number}`).addClass("grey");
                    }

                    tempnumber = number - 1;
                    $(`#${letters[i + j] + tempnumber}`).addClass("region");
                    tempnumber = number + 1;
                    $(`#${letters[i + j] + tempnumber}`).addClass("region");
                  }
                }
              }
              $(this).addClass("ui-state-highlight");
            }
          }
        }
      }
    },
  });

  ////////////////////////////////////////////////
  // letter = letters[(Math.random() * 10).toFixed()];
  // number = numbers[(Math.random() * 10).toFixed()];
  // console.log(letter);
  // console.log(number);
  // console.log((Math.random() * 10).toFixed());

  // var letter = $(this).attr("id").substring(0, 1);
  // var number = $(this).attr("id").substring(1, 3);
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randompcarea() {
    var tempnumber = 0;
    var control = 1;
    var randomnumber;
    var state = 1;
    var VH;
    var number;
    var letter;

    // number = parseInt(number);
    // ship = "carrier";
    //1111111111111111111111111111111111111111
    while (true) {
      control = 1;
      letter = letters[getRandomInt(0, 5)];
      number = getRandomInt(1, 6);
      randomnumber = getRandomInt(0, 1);
      // console.log("State 1 Letter:" + letter);
      // console.log("State 1 Number:" + number);
      number = parseInt(number);
      if (randomnumber % 2 == 0) {
        VH = "vertical";
      } else if (randomnumber % 2 == 1) {
        VH = "horizontal";
      }

      if (VH == "horizontal") {
        if (number > 6) {
        } else {
          for (let i = 0; i < 5; i++) {
            tempnumber = number + i;
            if (
              $(`.pcarea #${letter + tempnumber}`).hasClass("greyy") == true ||
              $(`.pcarea #${letter + tempnumber}`).hasClass("regionn") == true
            ) {
              control = 0;
            }
          }
          if (control == 1) {
            // $("#selectcarrier").css("display", "none");
            for (let i = -1; i < 6; i++) {
              if (i == -1 || i == 5) {
                tempnumber = number + i;
                $(`.pcarea #${letter + tempnumber}`).addClass("regionn");
              } else {
                tempnumber = number + i;
                $(`.pcarea #${letter + tempnumber}`).addClass("greyy");
              }
            }
            tempnumber = 0;
            for (let i = 0; i < 10; i++) {
              if (letters[i] == letter) {
                for (let j = -1; j < 6; j++) {
                  tempnumber = number + j;
                  $(`.pcarea #${letters[i - 1] + tempnumber}`).addClass(
                    "regionn"
                  );
                }
                for (let j = -1; j < 6; j++) {
                  tempnumber = number + j;
                  $(`.pcarea #${letters[i + 1] + tempnumber}`).addClass(
                    "regionn"
                  );
                }
              }
            }

            break;
          }
        }
      } else if (VH == "vertical") {
        for (let i = 0; i < 9; i++) {
          if (letters[i] == letter) {
            for (let j = 0; j < 5; j++) {
              if (
                $(`.pcarea #${letters[i + j] + number}`).hasClass("greyy") ==
                  true ||
                $(`.pcarea #${letters[i + j] + number}`).hasClass("regionn") ==
                  true
              ) {
                control = 0;
              }
            }
          }
        }
        if (control == 1) {
          if (
            letter == "g" ||
            letter == "h" ||
            letter == "i" ||
            letter == "j"
          ) {
          } else {
            // $("#selectcarrier").css("display", "none");
            for (let i = 0; i < 10; i++) {
              if (letters[i] == letter) {
                for (let j = -1; j < 6; j++) {
                  if (j == -1 || j == 5) {
                    $(`.pcarea #${letters[i + j] + number}`).addClass(
                      "regionn"
                    );
                  } else {
                    $(`.pcarea #${letters[i + j] + number}`).addClass("greyy");
                  }
                  tempnumber = number - 1;
                  $(`.pcarea #${letters[i + j] + tempnumber}`).addClass(
                    "regionn"
                  );
                  tempnumber = number + 1;
                  $(`.pcarea #${letters[i + j] + tempnumber}`).addClass(
                    "regionn"
                  );
                }
              }
            }

            break;
          }
        }
      }
    }

    // state++;
    // console.log(control);
    // if (state == 2) {
    randomnumber = getRandomInt(0, 1);

    if (randomnumber % 2 == 0) {
      VH = "vertical";
    } else if (randomnumber % 2 == 1) {
      VH = "horizontal";
    }
    //222222222222222222222222222222222
    while (true) {
      control = 1;
      console.log(state);
      letter = letters[getRandomInt(0, 6)];
      number = getRandomInt(1, 7);
      console.log("State 2 Letter:" + letter);
      console.log("State 2 Number:" + number);
      number = parseInt(number);

      if (VH == "horizontal") {
        if (number > 7) {
        } else {
          for (let i = 0; i < 4; i++) {
            tempnumber = number + i;
            if (
              $(`.pcarea #${letter + tempnumber}`).hasClass("greyy") == true ||
              $(`.pcarea #${letter + tempnumber}`).hasClass("regionn") == true
            ) {
              control = 0;
              // throw "girdi";
            }
          }
          if (control == 1) {
            // $("#selectbattleship").css("display", "none");
            for (let i = -1; i < 5; i++) {
              if (i == -1 || i == 4) {
                tempnumber = number + i;
                $(`.pcarea #${letter + tempnumber}`).addClass("regionn");
              } else {
                tempnumber = number + i;
                $(`.pcarea #${letter + tempnumber}`).addClass("greyy");
              }
            }
            tempnumber = 0;
            for (let i = 0; i < 10; i++) {
              if (letters[i] == letter) {
                for (let j = -1; j < 5; j++) {
                  tempnumber = number + j;
                  $(`.pcarea #${letters[i - 1] + tempnumber}`).addClass(
                    "regionn"
                  );
                }
                for (let j = -1; j < 5; j++) {
                  tempnumber = number + j;
                  $(`.pcarea #${letters[i + 1] + tempnumber}`).addClass(
                    "regionn"
                  );
                }
              }
            }

            break;
          }
        }
      } else if (VH == "vertical") {
        for (let i = 0; i < 10; i++) {
          if (letters[i] == letter) {
            for (let j = 0; j < 4; j++) {
              if (
                $(`.pcarea #${letters[i + j] + number}`).hasClass("greyy") ==
                  true ||
                $(`.pcarea #${letters[i + j] + number}`).hasClass("regionn") ==
                  true
              ) {
                control = 0;
                // throw "girdi";
              }
            }
          }
        }
        if (control == 1) {
          if (letter == "h" || letter == "i" || letter == "j") {
          } else {
            // $("#selectbattleship").css("display", "none");
            for (let i = 0; i < 10; i++) {
              if (letters[i] == letter) {
                for (let j = -1; j < 5; j++) {
                  if (j == -1 || j == 4) {
                    $(`.pcarea #${letters[i + j] + number}`).addClass(
                      "regionn"
                    );
                  } else {
                    $(`.pcarea #${letters[i + j] + number}`).addClass("greyy");
                  }
                  tempnumber = number - 1;
                  $(`.pcarea #${letters[i + j] + tempnumber}`).addClass(
                    "regionn"
                  );
                  tempnumber = number + 1;
                  $(`.pcarea #${letters[i + j] + tempnumber}`).addClass(
                    "regionn"
                  );
                }
              }
            }
          }
          break;
        }
      }
    }

    randomnumber = getRandomInt(0, 1);

    if (randomnumber % 2 == 0) {
      VH = "vertical";
    } else if (randomnumber % 2 == 1) {
      VH = "horizontal";
    }
    //33333333333333333333333333333333333333333
    while (true) {
      control = 1;
      console.log(state);
      letter = letters[getRandomInt(0, 7)];
      number = getRandomInt(1, 8);
      number = parseInt(number);
      if (VH == "horizontal") {
        if (number > 8) {
        } else {
          for (let i = 0; i < 3; i++) {
            tempnumber = number + i;
            if (
              $(`.pcarea #${letter + tempnumber}`).hasClass("greyy") == true ||
              $(`.pcarea #${letter + tempnumber}`).hasClass("regionn") == true
            ) {
              control = 0;
            }
          }
          if (control == 1) {
            // $("#selectcruiser").css("display", "none");
            for (let i = -1; i < 4; i++) {
              if (i == -1 || i == 3) {
                tempnumber = number + i;
                $(`.pcarea #${letter + tempnumber}`).addClass("regionn");
              } else {
                tempnumber = number + i;
                $(`.pcarea #${letter + tempnumber}`).addClass("greyy");
                console.log(letter + tempnumber);
              }
            }
            tempnumber = 0;
            for (let i = 0; i < 10; i++) {
              if (letters[i] == letter) {
                for (let j = -1; j < 4; j++) {
                  tempnumber = number + j;
                  console.log(letters[i - 1] + tempnumber);
                  $(`.pcarea #${letters[i - 1] + tempnumber}`).addClass(
                    "regionn"
                  );
                }
                for (let j = -1; j < 4; j++) {
                  tempnumber = number + j;
                  $(`.pcarea #${letters[i + 1] + tempnumber}`).addClass(
                    "regionn"
                  );
                }
              }
            }
            break;
          }
        }
      } else if (VH == "vertical") {
        if (letter == "i" || letter == "j") {
        } else {
          for (let i = 0; i < 9; i++) {
            if (letters[i] == letter) {
              for (let j = 0; j < 3; j++) {
                if (
                  $(`.pcarea #${letters[i + j] + number}`).hasClass("greyy") ==
                    true ||
                  $(`.pcarea #${letters[i + j] + number}`).hasClass(
                    "regionn"
                  ) == true
                ) {
                  control = 0;
                }
              }
            }
          }
          if (control == 1) {
            // $("#selectcruiser").css("display", "none");
            for (let i = 0; i < 10; i++) {
              if (letters[i] == letter) {
                for (let j = -1; j < 4; j++) {
                  if (j == -1 || j == 3) {
                    $(`.pcarea #${letters[i + j] + number}`).addClass(
                      "regionn"
                    );
                  } else {
                    $(`.pcarea #${letters[i + j] + number}`).addClass("greyy");
                  }
                  tempnumber = number - 1;
                  $(`.pcarea #${letters[i + j] + tempnumber}`).addClass(
                    "regionn"
                  );
                  tempnumber = number + 1;
                  $(`.pcarea #${letters[i + j] + tempnumber}`).addClass(
                    "regionn"
                  );
                }
              }
            }
            break;
          }
        }
      }
    }

    randomnumber = getRandomInt(0, 1);

    if (randomnumber % 2 == 0) {
      VH = "vertical";
    } else if (randomnumber % 2 == 1) {
      VH = "horizontal";
    }
    //44444444444444444444444444444444444
    while (true) {
      control = 1;
      console.log(state);
      letter = letters[getRandomInt(0, 7)];
      number = getRandomInt(1, 8);
      number = parseInt(number);
      if (VH == "horizontal") {
        if (number > 8) {
        } else {
          for (let i = 0; i < 3; i++) {
            tempnumber = number + i;
            if (
              $(`.pcarea #${letter + tempnumber}`).hasClass("greyy") == true ||
              $(`.pcarea #${letter + tempnumber}`).hasClass("regionn") == true
            ) {
              control = 0;
            }
          }
          if (control == 1) {
            // $("#selectcruiser").css("display", "none");
            for (let i = -1; i < 4; i++) {
              if (i == -1 || i == 3) {
                tempnumber = number + i;
                $(`.pcarea #${letter + tempnumber}`).addClass("regionn");
              } else {
                tempnumber = number + i;
                $(`.pcarea #${letter + tempnumber}`).addClass("greyy");
                console.log(letter + tempnumber);
              }
            }
            tempnumber = 0;
            for (let i = 0; i < 10; i++) {
              if (letters[i] == letter) {
                for (let j = -1; j < 4; j++) {
                  tempnumber = number + j;
                  console.log(letters[i - 1] + tempnumber);
                  $(`.pcarea #${letters[i - 1] + tempnumber}`).addClass(
                    "regionn"
                  );
                }
                for (let j = -1; j < 4; j++) {
                  tempnumber = number + j;
                  $(`.pcarea #${letters[i + 1] + tempnumber}`).addClass(
                    "regionn"
                  );
                }
              }
            }
            break;
          }
        }
      } else if (VH == "vertical") {
        if (letter == "i" || letter == "j") {
        } else {
          for (let i = 0; i < 9; i++) {
            if (letters[i] == letter) {
              for (let j = 0; j < 3; j++) {
                if (
                  $(`.pcarea #${letters[i + j] + number}`).hasClass("greyy") ==
                    true ||
                  $(`.pcarea #${letters[i + j] + number}`).hasClass(
                    "regionn"
                  ) == true
                ) {
                  control = 0;
                }
              }
            }
          }
          if (control == 1) {
            // $("#selectcruiser").css("display", "none");
            for (let i = 0; i < 10; i++) {
              if (letters[i] == letter) {
                for (let j = -1; j < 4; j++) {
                  if (j == -1 || j == 3) {
                    $(`.pcarea #${letters[i + j] + number}`).addClass(
                      "regionn"
                    );
                  } else {
                    $(`.pcarea #${letters[i + j] + number}`).addClass("greyy");
                  }
                  tempnumber = number - 1;

                  $(`.pcarea #${letters[i + j] + tempnumber}`).addClass(
                    "regionn"
                  );
                  tempnumber = number + 1;
                  $(`.pcarea #${letters[i + j] + tempnumber}`).addClass(
                    "regionn"
                  );
                }
              }
            }
            break;
          }
        }
      }
    }
    //5555555555555555555555555555
    while (true) {
      control = 1;
      console.log(state);
      letter = letters[getRandomInt(0, 8)];
      number = getRandomInt(1, 9);
      number = parseInt(number);
      if (VH == "horizontal") {
        if (number > 9) {
        } else {
          for (let i = 0; i < 2; i++) {
            tempnumber = number + i;
            if (
              $(`.pcarea #${letter + tempnumber}`).hasClass("greyy") == true ||
              $(`.pcarea #${letter + tempnumber}`).hasClass("regionn") == true
            ) {
              control = 0;
            }
          }
          if (control == 1) {
            // $("#selectcruiser").css("display", "none");
            for (let i = -1; i < 3; i++) {
              if (i == -1 || i == 2) {
                tempnumber = number + i;
                $(`.pcarea #${letter + tempnumber}`).addClass("regionn");
              } else {
                tempnumber = number + i;
                $(`.pcarea #${letter + tempnumber}`).addClass("greyy");
                console.log(letter + tempnumber);
              }
            }
            tempnumber = 0;
            for (let i = 0; i < 10; i++) {
              if (letters[i] == letter) {
                for (let j = -1; j < 3; j++) {
                  tempnumber = number + j;
                  console.log(letters[i - 1] + tempnumber);
                  $(`.pcarea #${letters[i - 1] + tempnumber}`).addClass(
                    "regionn"
                  );
                }
                for (let j = -1; j < 3; j++) {
                  tempnumber = number + j;
                  $(`.pcarea #${letters[i + 1] + tempnumber}`).addClass(
                    "regionn"
                  );
                }
              }
            }
            break;
          }
        }
      } else if (VH == "vertical") {
        if (letter == "i" || letter == "j") {
        } else {
          for (let i = 0; i < 9; i++) {
            if (letters[i] == letter) {
              for (let j = 0; j < 2; j++) {
                if (
                  $(`.pcarea #${letters[i + j] + number}`).hasClass("greyy") ==
                    true ||
                  $(`.pcarea #${letters[i + j] + number}`).hasClass(
                    "regionn"
                  ) == true
                ) {
                  control = 0;
                }
              }
            }
          }
          if (control == 1) {
            // $("#selectcruiser").css("display", "none");
            for (let i = 0; i < 10; i++) {
              if (letters[i] == letter) {
                for (let j = -1; j < 3; j++) {
                  if (j == -1 || j == 2) {
                    $(`.pcarea #${letters[i + j] + number}`).addClass(
                      "regionn"
                    );
                  } else {
                    $(`.pcarea #${letters[i + j] + number}`).addClass("greyy");
                  }
                  tempnumber = number - 1;
                  $(`.pcarea #${letters[i + j] + tempnumber}`).addClass(
                    "regionn"
                  );
                  tempnumber = number + 1;
                  $(`.pcarea #${letters[i + j] + tempnumber}`).addClass(
                    "regionn"
                  );
                }
              }
            }
            break;
          }
        }
      }
    }
  }

  // }

  randompcarea();

  $("#start").click(function () {
    if (pctotalcell == 0 || playertotalcell == 0) {
      location.reload();
    } else {
      if (dropcount == 0 || dropcount == -1) {
        $("h1").text("Your Turn.");
        for (let i = 0; i < 10; i++) {
          for (let j = 1; j < 11; j++) {
            $(`.playerarea #${letters[i] + j}`).removeClass("region");
          }
        }
        for (let i = 0; i < 10; i++) {
          for (let j = 1; j < 11; j++) {
            $(`.pcarea #${letters[i] + j}`).removeClass("regionn");
          }
        }
        isStart = 1;
      } else {
        $("h1").text("You didn't place all the ships!");
      }
    }
  });

  $("#again").click(function () {
    location.reload();
  });

  ////////////////////////////////////////
});
var isStart = 0;
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
var playertotalcell = 17;
var pctotalcell = 17;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var turn = 0;
function action(thiss) {
  if (isStart == 1) {
    $("h1").text("Your Turn.");
    if ($(thiss).hasClass("miss") || $(thiss).hasClass("hit")) {
    } else {
      if ($(thiss).hasClass("greyy") == true) {
        $(thiss).removeClass("greyy");
        $(thiss).addClass("hit");
        pctotalcell--;
      } else {
        $(thiss).addClass("miss");
      }
      $("h1").text("Computer Turn...");

      while (true) {
        i = getRandomInt(0, 9);
        j = getRandomInt(1, 10);
        if (
          $(`.playerarea #${letters[i] + j}`).hasClass("miss") ||
          $(`.playerarea #${letters[i] + j}`).hasClass("hit")
        ) {
        } else {
          if ($(`.playerarea #${letters[i] + j}`).hasClass("grey") == true) {
            $(`.playerarea #${letters[i] + j}`).removeClass("grey");
            $(`.playerarea #${letters[i] + j}`).addClass("hit");

            $("h1").text("Your Turn.");
            playertotalcell--;
            if (playertotalcell == 0) {
              $("h1").text("Computer win!!!");
              isStart = 0;
            }
            if (pctotalcell == 0) {
              $("h1").text("Player win!!!");
              isStart = 0;
            }
            break;
          } else {
            $(`.playerarea #${letters[i] + j}`).addClass("miss");
            $("h1").text("Your Turn.");
            if (pctotalcell == 0) {
              $("h1").text("Player win!!!");
              isStart = 0;
            }
            break;
          }
        }
      }
    }
  }
}

// .pcarea #${letters[i] + j}`
