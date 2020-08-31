ymaps.ready(init);
function init(){
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [55.76, 37.64],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 12,
    controls: []  
  });
  var coords = [
    [55.751999, 37.576133],
    [55.752141, 37.590713],
    [55.759997, 37.624010],
    [55.754932, 37.654278]
  ];

  var myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: './images/icons/placemark.svg',
    iconImageSize: [58, 73],
    iconImageOffset: [-3, -42]
  });
  
  for (var i = 0; i < coords.length; i++) {
    myCollection.add(new ymaps.Placemark(coords[i]));
  }
  
  myMap.geoObjects.add(myCollection);
  
  // При клике на карту все метки будут удалены.
  myCollection.getMap().events.add('click', function() {
    myCollection.removeAll();
  });
}


