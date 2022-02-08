import axios from 'axios';

let element = document.querySelector("#hello") as HTMLElement;
if (element) {
  element.innerHTML = "hello world";
}

(document.querySelector("#button") as HTMLElement).addEventListener("click", () => {
  getBase64();
  let base64 = (document.querySelector('#base64') as HTMLElement).innerText;

  axios
    .post("http://localhost:8080/api/embed", {
      image: base64,
      text: (document.querySelector('#embedText') as HTMLInputElement).value,
    })
    .then(function (response: any) {
      console.log(response.data);
      document.querySelector('#testimg')?.setAttribute('src', `data:image/png;base64,${response.data.image}`);
      let linkElement = document.querySelector('#download')!;
      linkElement.setAttribute('href', `data:image/png;base64,${response.data.image}`);
      linkElement.setAttribute('download', 'test.png');
    });
});

(document.querySelector("#button2") as HTMLElement).addEventListener("click", () => {
  getBase64();
  let base64 = (document.querySelector('#base64') as HTMLElement).innerText;

  axios
    .post("http://localhost:8080/api/decode", {
      image: base64,
    })
    .then(function (response: any) {
      console.log(response.data);
      (document.querySelector('#result') as HTMLElement).innerText = response.data.text;
    });
});

function getBase64() {
  //img要素オブジェクトを取得する
  let obj: HTMLCanvasElement = document.getElementById("preview") as HTMLCanvasElement;

  //canvas要素を生成してimg要素を反映する
  var cvs = document.createElement('canvas');
  cvs.width = obj.width;
  cvs.height = obj.height;
  var ctx = cvs.getContext('2d') as CanvasRenderingContext2D;
  ctx.drawImage(obj, 0, 0);

  //canvas要素をBase64化する
  var data = cvs.toDataURL("image/png");

  data = data.split(',')[1];

  //d1要素に書き出す
  (document.getElementById("base64") as HTMLElement).innerText = data;
}

(document.querySelector("#inputArea") as HTMLElement).addEventListener('change', (e) => {
  var reader = new FileReader();
  reader.onload = (e) => {
    document.querySelector("#preview")?.setAttribute('src', e.target!.result as string);
  }

  reader.readAsDataURL((e.target as HTMLInputElement)!.files![0]);
})