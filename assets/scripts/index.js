var lazyLoad = new LazyLoad({
  elements_selector: ".lazy",
  callback_error: (img) => {
    img.setAttribute("src", "https://placehold.co/600x400?text=Error");
  },
});
