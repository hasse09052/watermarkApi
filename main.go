package main

import (
	"net/http"
	"watermarkApi/lib"

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

	router.StaticFS("/", http.Dir("views"))
	router.POST("/api/embed", embed)
	router.POST("/api/decode", decode)

	router.Run()
}
