package controllers

import (
	"watermarkApi/lib"
	"watermarkApi/models"

	"github.com/gin-gonic/gin"
)

func Embed(c *gin.Context) {
	var watermark models.Watermark
	c.BindJSON(&watermark)

	image := lib.DecodeBase64(watermark.Image)
	embedImage := lib.EmbedWatermark(image, watermark.Text)
	c.JSON(200, models.Watermark{
		Image: lib.EncodeBase64(embedImage),
		Text:  watermark.Text,
	})
}

func Decode(c *gin.Context) {
	var watermark models.Watermark
	c.BindJSON(&watermark)

	image := lib.DecodeBase64(watermark.Image)
	decodeText := lib.DecodeWatermark(image)
	c.JSON(200, models.Watermark{
		Text: decodeText,
	})
}
