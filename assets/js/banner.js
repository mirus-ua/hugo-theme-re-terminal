const banner = document.getElementById("banner");
const buttons = banner.getElementsByTagName("button");

if (buttons?.[0]) {
  const listener = buttons[0].addEventListener("click", () => {
    banner.remove();
  });

  if (!document.getElementById("banner")) {
    removeEventListener("click", listener);
  }
}
