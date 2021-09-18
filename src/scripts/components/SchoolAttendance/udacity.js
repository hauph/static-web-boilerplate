/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function () {
  if (!localStorage.attendance) {
    console.log('Creating attendance records...');
    // eslint-disable-next-line
      function getRandom() {
      return Math.random() >= 0.5;
    }

    const nameColumns = $('tbody .name-col');
    const attendance = {};

    nameColumns.each(function () {
      const name = this.innerText;
      attendance[name] = [];

      for (let i = 0; i <= 11; i++) {
        attendance[name].push(getRandom());
      }
    });

    localStorage.attendance = JSON.stringify(attendance);
  }
})();

/* STUDENT APPLICATION */
$(
  (function () {
    const attendance = JSON.parse(localStorage.attendance);
    const $allMissed = $('tbody .missed-col');
    const $allCheckboxes = $('tbody input');

    // Count a student's missed days
    function countMissing() {
      $allMissed.each(function () {
        const studentRow = $(this).parent('tr');
        const dayChecks = $(studentRow).children('td').children('input');
        let numMissed = 0;

        dayChecks.each(function () {
          if (!$(this).prop('checked')) {
            numMissed++;
          }
        });

        $(this).text(numMissed);
      });
    }

    // Check boxes, based on attendace records
    $.each(attendance, (name, days) => {
      const studentRow = $(`tbody .name-col:contains("${name}")`).parent('tr');
      const dayChecks = $(studentRow).children('.attend-col').children('input');

      dayChecks.each(function (i) {
        $(this).prop('checked', days[i]);
      });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', () => {
      const studentRows = $('tbody .student');
      const newAttendance = {};

      studentRows.each(function () {
        const name = $(this).children('.name-col').text();
        const $allCheckboxes = $(this).children('td').children('input');

        newAttendance[name] = [];

        $allCheckboxes.each(function () {
          newAttendance[name].push($(this).prop('checked'));
        });
      });

      countMissing();
      localStorage.attendance = JSON.stringify(newAttendance);
    });

    countMissing();
  })(),
);
