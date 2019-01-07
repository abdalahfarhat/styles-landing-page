// LINE GRAPH
var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
var lineChartData = {
  labels : ["January","February","March","April","May","June","July"],
  datasets : [
    {
      label: "My First dataset",
      fillColor : "rgba(220,220,220,0.2)",
      strokeColor : "rgba(220,220,220,1)",
      pointColor : "rgba(220,220,220,1)",
      pointStrokeColor : "#fff",
      pointHighlightFill : "#fff",
      pointHighlightStroke : "rgba(220,220,220,1)",
      data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
    },
    {
      label: "My Second dataset",
      fillColor : "rgba(151,187,205,0.2)",
      strokeColor : "rgba(151,187,205,1)",
      pointColor : "rgba(151,187,205,1)",
      pointStrokeColor : "#fff",
      pointHighlightFill : "#fff",
      pointHighlightStroke : "rgba(151,187,205,1)",
      data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
    }
  ]

}

// PIE CHART
var pieData = [
  {
    value: 300,
    color:"#F7464A",
    highlight: "#FF5A5E",
    label: "Sent"
  },
  {
    value: 50,
    color: "#46BFBD",
    highlight: "#5AD3D1",
    label: "Engaged"
  },
  {
    value: 100,
    color: "#FDB45C",
    highlight: "#FFC870",
    label: "Viewed"
  },
  {
    value: 40,
    color: "#949FB1",
    highlight: "#A8B3C5",
    label: "Bounced"
  },
  {
    value: 120,
    color: "#4D5360",
    highlight: "#616774",
    label: "Accepted"
  }

];


// Bar Chart
var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

var barChartData = {
  labels : ["January","February","March","April","May","June","July"],
  datasets : [
    {
      fillColor : "rgba(220,220,220,0.5)",
      strokeColor : "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
    },
    {
      fillColor : "rgba(151,187,205,0.5)",
      strokeColor : "rgba(151,187,205,0.8)",
      highlightFill : "rgba(151,187,205,0.75)",
      highlightStroke : "rgba(151,187,205,1)",
      data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
    }
  ]

}
window.onload = function(){
  var ctx3 = document.getElementById("barChart").getContext("2d");
  window.myBar = new Chart(ctx3).Bar(barChartData, {
    responsive : true
  });
}

window.onload = function(){
  var ctx = document.getElementById("canvas").getContext("2d");
  window.myLine = new Chart(ctx).Line(lineChartData, {
    responsive: true
  });
  var ctx2 = document.getElementById("pieChart").getContext("2d");
  window.myPie = new Chart(ctx2).Pie(pieData, {
    animation: true,
    responsive: true
  });
  var ctx3 = document.getElementById("barChart").getContext("2d");
  window.myBar = new Chart(ctx3).Bar(barChartData, {
    responsive : true
  });
}

$(document).ready(function(){
  $('ul.indivEmailsBottom li').append('<a class="trash fa fa-trash"></a><a class="supress fa fa-ban"></a><a class="edit fa fa-pencil"></a>');
  $('.emailLists li').on('click', function(){
    $(this).closest('.emailLists').find('.selected').removeClass('selected');
    $(this).addClass('selected');
  });
})