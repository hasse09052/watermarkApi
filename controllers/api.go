package controllers

import (
	"watermarkApi/models"

	"github.com/gin-gonic/gin"
)

func Embed(c *gin.Context) {
	var watermark models.Watermark
	c.BindJSON(&watermark)

	c.JSON(200, models.Watermark{
		Image: watermark.EmbedWatermark(),
		Text:  watermark.Text,
	})
}

func Decode(c *gin.Context) {
	var watermark models.Watermark
	c.BindJSON(&watermark)

	c.JSON(200, models.Watermark{
		Text: watermark.DecodeWatermark(),
	})
}
