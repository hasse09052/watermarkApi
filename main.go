package main

import (
	"watermarkApi/controllers"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Static("/", "./views/build")
	router.POST("/api/embed", controllers.Embed)
	router.POST("/api/decode", controllers.Decode)
	router.POST("/api/test", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	router.Run()
}
