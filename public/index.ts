$("#search").submit((e) => {
  $("#result").html("");
  $.ajax({
    url: "/search",
    type: "POST",
    data: $("#search").serialize(),
    success: (data) => {
      $("#result").html(data);
    },
  });
  e.preventDefault();
});
