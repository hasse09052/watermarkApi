package main

import (
	"time"
	"watermarkApi/lib"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Watermark struct {
	Image string `json:"image"`
	Text  string `json:"text"`
}

func embed(c *gin.Context) {
	var watermark Watermark
	c.BindJSON(&watermark)

	image := lib.DecodeBase64(watermark.Image)
	embedImage := lib.EmbedWatermark(image, watermark.Text)
	c.JSON(200, Watermark{
		Image: lib.EncodeBase64(embedImage),
		Text:  watermark.Text,
	})
}

func decode(c *gin.Context) {
	var watermark Watermark
	c.BindJSON(&watermark)

	image := lib.DecodeBase64(watermark.Image)
	decodeText := lib.DecodeWatermark(image)
	c.JSON(200, Watermark{
		Text: decodeText,
	})
}

func main() {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		// アクセスを許可したいアクセス元
		AllowOrigins: []string{
			"https://localhost:5000",
			"http://127.0.0.1:5500",
		},
		// アクセスを許可したいHTTPメソッド(以下の例だとPUTやDELETEはアクセスできません)
		AllowMethods: []string{
			"POST",
			"GET",
			"OPTIONS",
		},
		// 許可したいHTTPリクエストヘッダ
		AllowHeaders: []string{
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
		},
		// cookieなどの情報を必要とするかどうか
		AllowCredentials: true,
		// preflightリクエストの結果をキャッシュする時間
		MaxAge: 24 * time.Hour,
	}))

	router.POST("/api/embed", embed)
	router.POST("/api/decode", decode)

	router.Run()
}
