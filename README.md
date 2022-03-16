# watermarkApp

画像に電子透かしを埋め込む Web アプリケーションです

電子透かしはとは、画像の見た目をほとんど変えずにテキスト(著作権情報)を埋め込む技術です  
画像を無断利用をされた際に、著作者の証明に使うことができます

## 使用技術

サーバーサイド: Golang(Gin)  
フロントエンド: React

## 画像比較 
下に示す透かし埋め込み画像を、このアプリの検出にかけると「hasse09052」が検出されます  
原画像を検出にかけても何も検出されません  


原画像  
![Lenna](https://user-images.githubusercontent.com/49391176/158520824-fc95d028-3d8e-4256-b3eb-1fd22f571f7b.png)  

透かし埋め込み画像  
![watermark](https://user-images.githubusercontent.com/49391176/158520886-584b814a-67e4-4aa4-94b7-664ab23fa399.png)




## アプリ画面
画像にテキスト「hasse09052」を埋め込み、検出するまでの流れです

### 透かし情報の埋め込み

![embed_movie](https://user-images.githubusercontent.com/49391176/158519915-4016e3fd-be38-478e-9af5-9726ea8fc44e.gif)

### 透かし情報の検出

![decode_movie](https://user-images.githubusercontent.com/49391176/158520380-36d0b3bc-0d29-4396-9e0b-bf2cf6877fc6.gif)
