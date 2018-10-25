

$(document).ready(function () {
  // moment.locale('en');
  // var now = moment();

  /** 
   * Many events
   */
  // events = [
  //   {
  //     start: now.startOf('week').add(9, 'h').format('X'),
  //     end: now.startOf('week').add(10, 'h').format('X'),
  //     title: '1',
  //     content: 'Hello World! <br> <p>Foo Bar</p>',
  //     category:'Professionnal'
  //   },
  //   {
  //     start: now.startOf('week').add(10, 'h').format('X'),
  //     end: now.startOf('week').add(11, 'h').format('X'),
  //     title: '2',
  //     content: 'Hello World! <br> <p>Foo Bar</p>',
  //     category:'Professionnal'
  //   },        
  //   {
  //    start: now.startOf('week').add(5, 'days').add(13, 'h').add(00, 'm').format('X'),
  //    end: now.startOf('week').add(5, 'days').add(14, 'h').format('X'),
  //    title: '23',
  //    content: 'Hello World! <br> <p>Foo Bar</p>',
  //    category:'CIAOO'
  //  }
  // ];

  /**
   * A daynote
   */
  var daynotes = [
    // {
    //   time: now.startOf('week').add(15, 'h').add(30, 'm').format('X'),
    //   title: 'Leo\'s holiday',
    //   content: 'yo',
    //   category: 'holiday'
    // }
  ];

  /**
   * Init the calendar
   */
  calendar = $('#calendar').Calendar({
    locale: 'en',
    weekday: {
      timeline: {
        intervalMinutes: 30,
        fromHour: 8,
        toHour: 19
      }
    },
    events: events,
    daynotes: daynotes
  }).init();

  
  /**
   * Listening for events
   */

  $('#calendar').on('Calendar.init', function (event, instance, before, current, after) {
    // console.log('event : Calendar.init');
    // console.log(instance);
    // console.log(before);
    // console.log(current);
    // console.log(after);
  });
  $('#calendar').on('Calendar.daynote-mouseenter', function (event, instance, elem) {
    //   console.log('event : Calendar.daynote-mouseenter');
    //   console.log(instance);
    //   console.log(elem);
  });
  $('#calendar').on('Calendar.daynote-mouseleave', function (event, instance, elem) {
    //   console.log('event : Calendar.daynote-mouseleave');
    //   console.log(instance);
    //   console.log(elem);
  });
  $('#calendar').on('Calendar.event-mouseenter', function (event, instance, elem) {
    // console.log('event : Calendar.event-mouseenter');
    // console.log(instance);
    // console.log(elem);
  });
  $('#calendar').on('Calendar.event-mouseleave', function (event, instance, elem) {
    //   console.log('event : Calendar.event-mouseleave');
    //   console.log(instance);
    //   console.log(elem);
  });
  $('#calendar').on('Calendar.daynote-click', function (event, instance, elem, evt) {
    //   console.log('event : Calendar.daynote-click');
    //   console.log(instance);
    //   console.log(elem);
    //   console.log(evt);
  });
  $('#calendar').on('Calendar.event-click', function (event, instance, elem, evt) {
    //   console.log('event : Calendar.event-click');
    //   console.log(instance);
    //   console.log(elem);
    //   console.log(evt);
  });


});
