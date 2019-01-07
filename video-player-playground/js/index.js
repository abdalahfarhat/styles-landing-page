$("#select").on("change", function(e) {
  $(".video-container")
    .hide()
    .eq(e.target.value)
    .show();
});

var cld = cloudinary.Cloudinary.new({ cloud_name: "demo" });

// Set video sources
var source1 = {
  publicId: "snow_deer_short",
  info: {
    title: "Phasellus viverra nulla",
    subtitle: "Donec quam felis, ultricies nec",
    description:
      "Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu."
  }
};

var source2 = {
  publicId: "dirt_bike",
  info: {
    title: "Lorem ipsum",
    subtitle: "Dolor sit amet, consectetuer",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate."
  }
};

var source3 = {
  publicId: "snow_horses",
  info: {
    title: "Donec quam felis",
    subtitle: "Apellentesque eu, pretium quis",
    description: "Nullam dictum felis eu pede mollis."
  }
};

var source4 = {
  publicId: "finish_line",
  info: {
    title: "Cras dapibus",
    subtitle: "Aenean leo ligula, porttitor",
    description: "Aliquam lorem ante, dapibus in, viverra quis, feugiat."
  }
};

var source5 = {
  publicId: "snow_deer_short",
  info: {
    title: "Cras dapibus",
    subtitle: "Aenean leo ligula, porttitor",
    description: "Aliquam lorem ante, dapibus in, viverra quis, feugiat."
  }
};
// sea_turtle
// elephants
// marmots

source1.recommendations = [source2, source3, source4, source5];

// Initialize player 1
var player1 = cld.videoPlayer("example-player1", {
  playlistWidget: {
    direction: "horizontal",
    total: 4
  }
});

var playlistSources = [source1, source2, source3, source4, source5];
var playlistOptions = {
  autoAdvance: true,
  repeat: true,
  presentUpcoming: 8
};

player1.playlist(playlistSources, playlistOptions);

// Initialize player 2
var player2 = cld.videoPlayer("example-player2", {
  playlistWidget: {
    direction: "vertical",
    total: 4
  }
});

player2.playlist(playlistSources, playlistOptions);

// Initialize player 3
var player1 = cld.videoPlayer("example-player1", {
  autoShowRecommendations: true
});

player1.source(source1);

// Initialize player 4
var player4 = cld.videoPlayer("example-player4", {
  autoShowRecommendations: true
});

player4.source(source1);