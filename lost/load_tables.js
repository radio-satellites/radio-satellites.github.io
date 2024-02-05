const xhr = new XMLHttpRequest();
xhr.open("GET", "https://raw.githubusercontent.com/radio-satellites/UTS_LF_DATA/main/lost.txt");
xhr.send();
xhr.responseType = "json";
xhr.onload = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    console.log(xhr.response);
  } else {
    console.log(`Error: ${xhr.status}`);
  }
};
